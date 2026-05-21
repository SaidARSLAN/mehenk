/**
 * Template-based Playwright spec generator.
 *
 * Strategy: emit one `test.describe` block per FormSchema. Inside, a happy-path
 * test fills every required field with sampleValue(), clicks submit, and
 * asserts the URL/response changed. If `includeEdgeCases` is on, we add one
 * test per validatable field (missing required, invalid type).
 *
 * LLM enhancement (V0.2) will rewrite assertions to be page-aware after a
 * dry-run trace.
 */
import { invalidValueFor, sampleValue } from "./sample-data";
import type { FormField, FormSchemaT, GenerateOptions, TestFile } from "./types";
import { GenerateOptionsSchema } from "./types";

const indent = (s: string, n = 2): string =>
  s
    .split("\n")
    .map((line) => (line.length > 0 ? " ".repeat(n) + line : line))
    .join("\n");

const playwrightLocator = (field: FormField): string => {
  switch (field.selectorKind) {
    case "label":
      // Playwright getByLabel handles wrapping <label> + label[for].
      if (field.label)
        return `page.getByLabel(${JSON.stringify(field.label)})`;
      return `page.locator(${JSON.stringify(field.selector)})`;
    case "placeholder":
      if (field.placeholder)
        return `page.getByPlaceholder(${JSON.stringify(field.placeholder)})`;
      return `page.locator(${JSON.stringify(field.selector)})`;
    case "role":
      return `page.getByRole(${JSON.stringify(field.selector.match(/\[role="(.+)"]/)?.[1] ?? "textbox")})`;
    default:
      return `page.locator(${JSON.stringify(field.selector)})`;
  }
};

const fillStmt = (field: FormField, value: string): string => {
  const loc = playwrightLocator(field);
  if (field.type === "checkbox" || field.type === "radio") {
    return `await ${loc}.check();`;
  }
  if (field.type === "select") {
    return `await ${loc}.selectOption(${JSON.stringify(value)});`;
  }
  if (field.type === "file") {
    return `await ${loc}.setInputFiles(${JSON.stringify(value)});`;
  }
  return `await ${loc}.fill(${JSON.stringify(value)});`;
};

const happyPath = (schema: FormSchemaT, locale: "en" | "tr" = "en"): string => {
  const lines = schema.fields
    .filter((f) => f.type !== "hidden" && f.type !== "submit")
    .map((f) => fillStmt(f, sampleValue(f, locale)));

  const submit = schema.submitSelector
    ? `await page.locator(${JSON.stringify(schema.submitSelector)}).click();`
    : `await page.locator(${JSON.stringify(schema.selector)}).press("Enter");`;

  return [
    "await page.goto(BASE_URL);",
    "",
    ...lines,
    "",
    submit,
    "",
    "// Assert: page navigated or a success element appeared.",
    "// Tighten this assertion once the real success state is known.",
    "await expect(page).not.toHaveURL(BASE_URL);",
  ].join("\n");
};

const missingRequiredCase = (
  schema: FormSchemaT,
  omitField: FormField,
  locale: "en" | "tr" = "en",
): string | null => {
  const fields = schema.fields.filter(
    (f) => f !== omitField && f.type !== "hidden" && f.type !== "submit",
  );
  const fills = fields.map((f) => fillStmt(f, sampleValue(f, locale)));
  const submit = schema.submitSelector
    ? `await page.locator(${JSON.stringify(schema.submitSelector)}).click();`
    : `await page.locator(${JSON.stringify(schema.selector)}).press("Enter");`;

  return [
    "await page.goto(BASE_URL);",
    "",
    ...fills,
    "",
    submit,
    "",
    "// Assert: the form did NOT navigate (validation prevented submission).",
    "await expect(page).toHaveURL(BASE_URL);",
  ].join("\n");
};

const invalidValueCase = (
  schema: FormSchemaT,
  invalidField: FormField,
  invalidValue: string,
  locale: "en" | "tr" = "en",
): string => {
  const lines = schema.fields
    .filter((f) => f.type !== "hidden" && f.type !== "submit")
    .map((f) =>
      f === invalidField
        ? fillStmt(f, invalidValue)
        : fillStmt(f, sampleValue(f, locale)),
    );
  const submit = schema.submitSelector
    ? `await page.locator(${JSON.stringify(schema.submitSelector)}).click();`
    : `await page.locator(${JSON.stringify(schema.selector)}).press("Enter");`;

  return [
    "await page.goto(BASE_URL);",
    "",
    ...lines,
    "",
    submit,
    "",
    `// Assert: ${invalidField.type} validation rejected the input.`,
    "await expect(page).toHaveURL(BASE_URL);",
  ].join("\n");
};

export const generatePlaywrightTests = (
  schema: FormSchemaT,
  rawOptions: Partial<GenerateOptions> = {},
): TestFile => {
  const options = GenerateOptionsSchema.parse(rawOptions);

  const blocks: string[] = [];

  blocks.push(
    `test("${options.testName} — happy path", async ({ page }) => {\n${indent(
      happyPath(schema, options.locale),
    )}\n});`,
  );

  if (options.includeEdgeCases) {
    schema.fields
      .filter((f) => f.required && f.type !== "hidden" && f.type !== "submit")
      .forEach((field) => {
        const body = missingRequiredCase(schema, field, options.locale);
        if (!body) return;
        blocks.push(
          `test("rejects when required field '${field.name ?? field.label ?? field.type}' is missing", async ({ page }) => {\n${indent(body)}\n});`,
        );
      });

    schema.fields
      .filter((f) => f.type !== "hidden" && f.type !== "submit")
      .forEach((field) => {
        const invalid = invalidValueFor(field, options.locale);
        if (!invalid) return;
        blocks.push(
          `test("rejects invalid ${field.type} value for '${field.name ?? field.label ?? field.type}'", async ({ page }) => {\n${indent(
            invalidValueCase(schema, field, invalid, options.locale),
          )}\n});`,
        );
      });
  }

  const ext = options.language === "typescript" ? "spec.ts" : "spec.js";
  const importStmt =
    options.language === "typescript"
      ? `import { test, expect } from "@playwright/test";`
      : `const { test, expect } = require("@playwright/test");`;

  const code = [
    importStmt,
    "",
    `const BASE_URL = ${JSON.stringify(options.baseUrl)};`,
    "",
    `test.describe(${JSON.stringify(options.testName)}, () => {`,
    ...blocks.map((b) => indent(b)),
    "});",
    "",
  ].join("\n");

  return {
    filename: `form.${ext}`,
    language: options.language,
    framework: "playwright",
    code,
  };
};
