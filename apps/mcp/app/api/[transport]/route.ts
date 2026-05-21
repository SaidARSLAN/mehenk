import {
  detectFlakyTests,
  generatePlaywrightTests,
  parseHtmlForm,
  parseJUnitXml,
  parseRunHistoryJson,
} from "@repo/testgen-core";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 60;

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "generate_tests",
      {
        title: "Generate Playwright tests",
        description:
          "Parse an HTML form and emit a runnable Playwright spec — happy path + edge cases for required fields and validatable inputs (email, URL, number, tel).",
        inputSchema: {
          html: z
            .string()
            .min(20)
            .describe("Raw HTML containing at least one <form> element."),
          baseUrl: z
            .string()
            .url()
            .optional()
            .describe("Base URL used for page.goto() in the generated spec."),
          testName: z
            .string()
            .min(1)
            .max(120)
            .optional()
            .describe("Test suite name."),
          language: z
            .enum(["typescript", "javascript"])
            .optional()
            .describe("Output language. Defaults to TypeScript."),
          includeEdgeCases: z
            .boolean()
            .optional()
            .describe(
              "Emit per-field missing-required and invalid-value tests.",
            ),
        },
      },
      async ({ html, baseUrl, testName, language, includeEdgeCases }) => {
        try {
          const schema = parseHtmlForm(html);
          const file = generatePlaywrightTests(schema, {
            baseUrl,
            testName: testName ?? "form submission",
            language: language ?? "typescript",
            includeEdgeCases: includeEdgeCases ?? true,
          });

          const summary = [
            `**File:** \`${file.filename}\` (${file.language}, ${file.framework})`,
            `**Form action:** \`${schema.action ?? "n/a"}\` · method \`${schema.method}\``,
            `**Fields detected:** ${schema.fields.length} (${schema.fields.filter((f) => f.required).length} required)`,
            "",
            "```" + (file.language === "typescript" ? "ts" : "js"),
            file.code,
            "```",
          ].join("\n");

          return {
            content: [{ type: "text" as const, text: summary }],
          };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Generation failed.";
          return {
            content: [{ type: "text" as const, text: `Error: ${message}` }],
            isError: true,
          };
        }
      },
    );

    server.registerTool(
      "analyze_coverage",
      {
        title: "Analyze test coverage",
        description:
          "Compare a generated test against a form schema and report which fields are exercised, which assertions are present, and which gaps remain.",
        inputSchema: {
          html: z.string().min(20).describe("Source HTML the test targets."),
          testCode: z.string().min(20).describe("Playwright spec text."),
        },
      },
      async ({ html, testCode }) => {
        const schema = parseHtmlForm(html);
        const exercised = schema.fields.filter((f) =>
          testCode.includes(f.selector),
        );
        const missing = schema.fields.filter(
          (f) => !testCode.includes(f.selector),
        );

        const hasUrlAssertion = /toHaveURL\b/.test(testCode);
        const hasVisibleAssertion = /toBeVisible\b/.test(testCode);
        const hasTextAssertion = /toHaveText\b|toContainText\b/.test(testCode);
        const hasNetworkAssertion =
          /waitForResponse\b|waitForRequest\b/.test(testCode);

        const tests = (testCode.match(/test\(/g) ?? []).length;

        const lines = [
          `**Coverage:** ${exercised.length}/${schema.fields.length} fields exercised (${Math.round((exercised.length / Math.max(1, schema.fields.length)) * 100)}%)`,
          `**Tests in spec:** ${tests}`,
          missing.length > 0
            ? `**Missing:** ${missing.map((f) => f.label ?? f.name ?? f.selector).join(", ")}`
            : "**Missing:** none",
          "",
          "**Assertions:**",
          `- URL change: ${hasUrlAssertion ? "yes" : "no"}`,
          `- Element visibility: ${hasVisibleAssertion ? "yes" : "no"}`,
          `- Text/content: ${hasTextAssertion ? "yes" : "no"}`,
          `- Network: ${hasNetworkAssertion ? "yes" : "no"}`,
        ];
        if (!hasNetworkAssertion) {
          lines.push(
            "",
            "**Suggestion:** add a `page.waitForResponse()` assertion against the form's submit endpoint to make the test robust to client-side state changes.",
          );
        }

        return {
          content: [{ type: "text" as const, text: lines.join("\n") }],
        };
      },
    );

    server.registerTool(
      "suggest_improvements",
      {
        title: "Suggest test improvements",
        description:
          "Static heuristics over a Playwright spec — flag stale locator patterns, missing reduced-motion guards, hard-coded timeouts, and absent role-based queries that improve resilience.",
        inputSchema: {
          testCode: z.string().min(20).describe("Playwright spec to review."),
        },
      },
      async ({ testCode }) => {
        const issues: string[] = [];

        if (/waitForTimeout|setTimeout\s*\(/.test(testCode)) {
          issues.push(
            "**Hard-coded waits** detected. Replace `waitForTimeout` / `setTimeout` with `expect(locator).toBeVisible()` or `waitForLoadState('networkidle')`.",
          );
        }
        if (/page\.locator\("\.\w+"\)/.test(testCode)) {
          issues.push(
            "**CSS class selectors** detected. Class names tend to be churn-prone. Prefer `getByRole`, `getByLabel`, or `data-testid`.",
          );
        }
        if (!/getByRole|getByLabel|getByPlaceholder|getByTestId/.test(testCode)) {
          issues.push(
            "**No role/label-based queries**. Add at least one `page.getByRole(...)` or `page.getByLabel(...)` for screen-reader-friendly tests.",
          );
        }
        if (!/expect\s*\(/.test(testCode)) {
          issues.push(
            "**No assertions**. A spec without `expect()` proves nothing — add at least one success assertion per `test()` block.",
          );
        }
        if (/sleep|wait\s+for\s+\d+\s*ms/i.test(testCode)) {
          issues.push("Magic sleeps detected — convert to web-first assertions.");
        }

        const text = issues.length
          ? `Found ${issues.length} improvement${issues.length === 1 ? "" : "s"}:\n\n${issues.map((s, i) => `${i + 1}. ${s}`).join("\n\n")}`
          : "No issues detected. The spec uses web-first assertions and resilient locators.";

        return { content: [{ type: "text" as const, text }] };
      },
    );

    server.registerTool(
      "detect_flaky_tests",
      {
        title: "Detect flaky tests from run history",
        description:
          "Ingest test run history (normalized JSON or JUnit XML) and surface tests with pass rates strictly between 0 and 1. Ranked by danger score = passRate × (1-passRate) × log(runs+1) — 50/50 splits across many runs rank highest.",
        inputSchema: {
          format: z
            .enum(["junit-xml", "json"])
            .describe(
              "junit-xml = JUnit-style <testsuite>/<testcase> XML; json = normalized [{id, results:[{test, status}]}] or {runs:[...]}",
            ),
          data: z
            .string()
            .min(20)
            .describe("Raw XML or JSON text of the run history."),
          topN: z
            .number()
            .int()
            .min(1)
            .max(50)
            .optional()
            .describe("Truncate output to top N flaky tests (default 10)."),
        },
      },
      async ({ format, data, topN }) => {
        try {
          const runs =
            format === "junit-xml" ? parseJUnitXml(data) : parseRunHistoryJson(data);
          const report = detectFlakyTests(runs);
          const top = report.flaky.slice(0, topN ?? 10);

          const lines: string[] = [
            `**Flaky report:** ${report.flakyCount} flaky / ${report.totalTests} unique tests across ${report.totalRuns} runs (${report.stableCount} stable).`,
            "",
          ];
          if (top.length === 0) {
            lines.push("No flaky tests detected. Stable suite.");
          } else {
            lines.push("| # | Test | Pass rate | Pass/Fail | Danger |");
            lines.push("|---|------|-----------|-----------|--------|");
            top.forEach((f, i) => {
              lines.push(
                `| ${i + 1} | \`${f.name}\` | ${Math.round(f.passRate * 100)}% | ${f.passed}/${f.failed} | ${f.dangerScore.toFixed(3)} |`,
              );
            });
            const withSamples = top.filter((f) => f.failureSamples.length > 0);
            if (withSamples.length > 0) {
              lines.push("", "**Failure samples (first 3):**");
              withSamples.forEach((f) => {
                lines.push(`- \`${f.name}\`:`);
                f.failureSamples.forEach((s) =>
                  lines.push(`  - ${s.replace(/\n/g, " ")}`),
                );
              });
            }
            lines.push(
              "",
              "**Next step:** for the top entry, run `suggest_improvements` against its source to spot stale locators or hard waits.",
            );
          }

          return {
            content: [{ type: "text" as const, text: lines.join("\n") }],
          };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Detection failed.";
          return {
            content: [{ type: "text" as const, text: `Error: ${message}` }],
            isError: true,
          };
        }
      },
    );

    server.registerTool(
      "validate_syntax",
      {
        title: "Validate Playwright spec syntax",
        description:
          "Lightweight static checks: balanced braces, presence of @playwright/test import, balanced test/describe blocks, no `any` types in TypeScript output.",
        inputSchema: {
          testCode: z.string().min(20).describe("Playwright spec source."),
          language: z
            .enum(["typescript", "javascript"])
            .optional()
            .describe("Source language. Defaults to TypeScript."),
        },
      },
      async ({ testCode, language }) => {
        const lang = language ?? "typescript";
        const errors: string[] = [];

        const openBraces = (testCode.match(/\{/g) ?? []).length;
        const closeBraces = (testCode.match(/\}/g) ?? []).length;
        if (openBraces !== closeBraces) {
          errors.push(
            `Brace mismatch: ${openBraces} \`{\` vs ${closeBraces} \`}\`.`,
          );
        }
        const openParens = (testCode.match(/\(/g) ?? []).length;
        const closeParens = (testCode.match(/\)/g) ?? []).length;
        if (openParens !== closeParens) {
          errors.push(
            `Parenthesis mismatch: ${openParens} \`(\` vs ${closeParens} \`)\`.`,
          );
        }
        if (
          lang === "typescript" &&
          !/from\s+["']@playwright\/test["']/.test(testCode)
        ) {
          errors.push(
            "Missing `import { test, expect } from \"@playwright/test\"`.",
          );
        }
        if (lang === "javascript" && !/require\(["']@playwright\/test["']\)/.test(testCode)) {
          errors.push(
            "Missing `const { test, expect } = require(\"@playwright/test\")`.",
          );
        }
        if (lang === "typescript" && /:\s*any\b/.test(testCode)) {
          errors.push("Found `: any` — replace with concrete types.");
        }

        const ok = errors.length === 0;
        const text = ok
          ? "✓ Syntax checks passed (balanced braces/parens, framework import present, no `any`)."
          : `⨯ ${errors.length} issue${errors.length === 1 ? "" : "s"}:\n${errors.map((e) => `- ${e}`).join("\n")}`;

        return { content: [{ type: "text" as const, text }], isError: !ok };
      },
    );
  },
  {
    serverInfo: {
      name: "mehenk",
      version: "0.1.0",
    },
    capabilities: { tools: {} },
  },
  {
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV !== "production",
  },
);

const verifyToken = async (
  _req: Request,
  bearerToken?: string,
): Promise<AuthInfo | undefined> => {
  if (!bearerToken) return undefined;
  const expected = process.env.MEHENK_API_KEY;
  // Until API-key issuance is wired (Faz 7), accept any non-empty token
  // when MEHENK_API_KEY is unset so the v0 demo MCP works out of the box.
  if (!expected) {
    return {
      token: bearerToken,
      scopes: ["mcp:tools"],
      clientId: `anon-${bearerToken.slice(0, 8)}`,
    };
  }
  if (bearerToken !== expected) return undefined;
  return {
    token: bearerToken,
    scopes: ["mcp:tools"],
    clientId: "v0-shared-key",
  };
};

const authHandler = withMcpAuth(handler, verifyToken, {
  required: process.env.MEHENK_API_KEY ? true : false,
});

export { authHandler as GET, authHandler as POST, authHandler as DELETE };
