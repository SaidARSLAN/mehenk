import { z } from "zod";

/**
 * One input field detected on a form.
 *
 * `selector` is what the generated test should target (id > name > label > role,
 * falling back to a generated nth-of-type as last resort).
 */
export const FormFieldSchema = z.object({
  selector: z.string(),
  selectorKind: z.enum(["id", "name", "label", "role", "placeholder", "nth"]),
  type: z.enum([
    "text",
    "email",
    "password",
    "tel",
    "url",
    "number",
    "date",
    "checkbox",
    "radio",
    "select",
    "textarea",
    "file",
    "hidden",
    "submit",
    "unknown",
  ]),
  name: z.string().optional(),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(), // for select/radio
  pattern: z.string().optional(), // HTML5 pattern attr
  min: z.string().optional(),
  max: z.string().optional(),
});

export type FormField = z.infer<typeof FormFieldSchema>;

export const FormSchema = z.object({
  /** Form's URL or "unknown" if parsed from raw HTML. */
  url: z.string().default("unknown"),
  /** Form's `action` attribute or `null`. */
  action: z.string().nullable().default(null),
  method: z.enum(["GET", "POST"]).default("POST"),
  /** Selector that targets the form element itself. */
  selector: z.string().default("form"),
  fields: z.array(FormFieldSchema),
  submitSelector: z.string().nullable().default(null),
});

export type FormSchemaT = z.infer<typeof FormSchema>;

export const GenerateOptionsSchema = z.object({
  /** Target framework. Playwright is V1; selenium follows. */
  framework: z.enum(["playwright"]).default("playwright"),
  /** Language. */
  language: z.enum(["typescript", "javascript"]).default("typescript"),
  /** Test name. */
  testName: z.string().default("submits the form"),
  /** Base URL for `page.goto()`. */
  baseUrl: z.string().default("http://localhost:3000"),
  /** Include happy path + edge cases (missing required, invalid email, etc). */
  includeEdgeCases: z.boolean().default(true),
  /** Generate trace + screenshot on failure. */
  withTrace: z.boolean().default(true),
});

export type GenerateOptions = z.infer<typeof GenerateOptionsSchema>;

export type TestFile = {
  filename: string;
  language: "typescript" | "javascript";
  framework: "playwright";
  code: string;
};
