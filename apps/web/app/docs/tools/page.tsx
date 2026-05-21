import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tools reference — mehenk docs",
  description:
    "Every mehenk MCP tool: input schemas, example invocations, and example output.",
};

type ToolCardProps = {
  id: string;
  name: string;
  description: string;
  schema: string;
  example: string;
  output: string;
};

function ToolCard({
  id,
  name,
  description,
  schema,
  example,
  output,
}: ToolCardProps): ReactNode {
  return (
    <section
      id={id}
      className="mt-10 rounded-lg border border-border bg-secondary/20 p-6"
    >
      <div className="flex items-baseline gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {name}
        </h2>
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
          mcp:{name}
        </code>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <h3 className="mt-6 text-sm font-medium text-foreground">
        Input schema
      </h3>
      <pre className="mt-2 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{schema}
      </pre>

      <h3 className="mt-6 text-sm font-medium text-foreground">
        Example invocation
      </h3>
      <pre className="mt-2 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{example}
      </pre>

      <h3 className="mt-6 text-sm font-medium text-foreground">
        Example output
      </h3>
      <pre className="mt-2 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{output}
      </pre>
    </section>
  );
}

const GENERATE_TESTS_SCHEMA = `z.object({
  html: z.string().min(1).describe("Rendered HTML fragment to test against"),
  baseUrl: z.string().url().optional().describe("Origin to use in navigation steps"),
  testName: z.string().optional().describe("Custom test name; inferred if omitted"),
  language: z.enum(["typescript", "javascript"]).default("typescript"),
  includeEdgeCases: z.boolean().default(true),
  locale: z.string().default("en-US").describe("BCP-47 locale for sample data"),
})`;

const GENERATE_TESTS_EXAMPLE = `{
  "html": "<form><label>Email<input name='email'/></label><button>Sign up</button></form>",
  "baseUrl": "https://example.com",
  "testName": "signup happy path",
  "language": "typescript",
  "includeEdgeCases": true,
  "locale": "tr-TR"
}`;

const GENERATE_TESTS_OUTPUT = `## Generated test — signup happy path

\`\`\`ts
import { test, expect } from "@playwright/test";

test("signup happy path", async ({ page }) => {
  await page.goto("https://example.com");
  await page.getByLabel("Email").fill("ayse.yilmaz@ornek.com");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page).toHaveURL(/welcome/);
});
\`\`\`

3 edge cases included (empty email, invalid format, duplicate account).`;

const ANALYZE_COVERAGE_SCHEMA = `z.object({
  html: z.string().min(1).describe("Reference HTML to score coverage against"),
  testCode: z.string().min(1).describe("Existing Playwright spec"),
})`;

const ANALYZE_COVERAGE_EXAMPLE = `{
  "html": "<form>...</form>",
  "testCode": "import { test } from '@playwright/test'; ..."
}`;

const ANALYZE_COVERAGE_OUTPUT = `## Coverage report

- Interactive elements covered: 4 / 7 (57%)
- Assertions per element: 1.2 avg
- Uncovered: \`button[name='Cancel']\`, \`a[href='/help']\`, \`input[name='referralCode']\`

### Suggestions
1. Add an assertion that the Cancel button closes the modal.
2. Verify referralCode is optional but accepted when present.`;

const SUGGEST_IMPROVEMENTS_SCHEMA = `z.object({
  testCode: z.string().min(1).describe("Playwright spec to lint and improve"),
})`;

const SUGGEST_IMPROVEMENTS_EXAMPLE = `{
  "testCode": "test('login', async ({ page }) => { await page.click('.btn-primary'); });"
}`;

const SUGGEST_IMPROVEMENTS_OUTPUT = `## Improvements (3)

1. **Replace CSS selector with role-based locator**
   \`page.click('.btn-primary')\` → \`page.getByRole('button', { name: /sign in/i }).click()\`
2. **Add an explicit assertion**
   Tests without \`expect(...)\` calls are not actually testing anything.
3. **Prefer \`getByLabel\` for form fields**
   Improves resilience to DOM shuffles and a11y at the same time.`;

const DETECT_FLAKY_SCHEMA = `z.object({
  format: z.enum(["junit-xml", "json"]).describe("Shape of the report payload"),
  data: z.string().min(1).describe("Raw report contents"),
})`;

const DETECT_FLAKY_EXAMPLE = `{
  "format": "junit-xml",
  "data": "<testsuites>...<testcase name='checkout'>...</testcase></testsuites>"
}`;

const DETECT_FLAKY_OUTPUT = `## Flaky test ranking

| Rank | Test                          | Flake rate | Last 10 runs |
|------|-------------------------------|-----------:|--------------|
| 1    | checkout > applies coupon     |      40%   | ✓✗✓✗✓✗✓✓✗✓   |
| 2    | auth > resets password         |      20%   | ✓✓✗✓✓✓✗✓✓✓   |
| 3    | dashboard > loads widgets      |      10%   | ✓✓✓✓✓✗✓✓✓✓   |

### Likely causes
- \`applies coupon\`: race on toast disappearance — add \`waitFor({ state: "hidden" })\`.
- \`resets password\`: time-based token, freeze clock in setup.`;

const VALIDATE_SYNTAX_SCHEMA = `z.object({
  testCode: z.string().min(1).describe("Source to validate"),
  language: z.enum(["typescript", "javascript"]).default("typescript"),
})`;

const VALIDATE_SYNTAX_EXAMPLE = `{
  "testCode": "import { test } from '@playwright/test'\\ntest('ok', async ({ page } => {})",
  "language": "typescript"
}`;

const VALIDATE_SYNTAX_OUTPUT = `## Validation: FAILED

- **Brace balance**: 2 open \`{\`, 1 close \`}\` — unbalanced.
- **Imports**: \`@playwright/test\` resolved.
- **Types**: \`page\` parameter destructuring missing closing \`)\` at line 2:38.

### Suggested fix
\`\`\`ts
test('ok', async ({ page }) => {});
\`\`\``;

export default function ToolsPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">Tools reference</h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Every mehenk MCP tool exposes a strict input schema (validated with
        Zod on the server), returns Markdown for the model to render, and is
        safe to call repeatedly — they&apos;re pure functions of their input.
        Five tools cover the full loop from generation to maintenance.
      </p>

      <ToolCard
        id="generate-tests"
        name="generate_tests"
        description="Turn an HTML fragment into an idiomatic Playwright spec with role-based locators, sensible assertions, and (optionally) edge-case scenarios. Locale-aware sample data."
        schema={GENERATE_TESTS_SCHEMA}
        example={GENERATE_TESTS_EXAMPLE}
        output={GENERATE_TESTS_OUTPUT}
      />

      <ToolCard
        id="analyze-coverage"
        name="analyze_coverage"
        description="Compare an existing Playwright spec against a reference HTML fragment and return a coverage report — which interactive elements are exercised, which are missed, and what to add."
        schema={ANALYZE_COVERAGE_SCHEMA}
        example={ANALYZE_COVERAGE_EXAMPLE}
        output={ANALYZE_COVERAGE_OUTPUT}
      />

      <ToolCard
        id="suggest-improvements"
        name="suggest_improvements"
        description="Static heuristics over Playwright source — flag brittle selectors, missing assertions, common anti-patterns, and propose concrete rewrites."
        schema={SUGGEST_IMPROVEMENTS_SCHEMA}
        example={SUGGEST_IMPROVEMENTS_EXAMPLE}
        output={SUGGEST_IMPROVEMENTS_OUTPUT}
      />

      <ToolCard
        id="detect-flaky-tests"
        name="detect_flaky_tests"
        description="Ingest a JUnit XML or JSON report from CI, rank tests by flake rate, and surface likely root causes (timing races, time-dependent fixtures, ordering)."
        schema={DETECT_FLAKY_SCHEMA}
        example={DETECT_FLAKY_EXAMPLE}
        output={DETECT_FLAKY_OUTPUT}
      />

      <ToolCard
        id="validate-syntax"
        name="validate_syntax"
        description="Lightweight pre-flight check before running tests — brace/bracket balance, import resolution, and rough type sanity for TypeScript or JavaScript Playwright specs."
        schema={VALIDATE_SYNTAX_SCHEMA}
        example={VALIDATE_SYNTAX_EXAMPLE}
        output={VALIDATE_SYNTAX_OUTPUT}
      />
    </div>
  );
}
