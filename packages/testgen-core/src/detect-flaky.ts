/**
 * Flaky-test detection over historical test-run data.
 *
 * Input is a normalized run history: an array of runs, each containing per-test
 * pass/fail status. A test is "flaky" if its pass-rate is in (0, 1) — i.e. it
 * has both passed and failed across the observed runs. We rank flakies by
 * **danger score** = passRate × (1 - passRate) × log(runs), which is highest
 * at ~50/50 split (the most cognitively expensive flakes) and grows with the
 * sample size (so a 50/50 split over 100 runs ranks above 50/50 over 4 runs).
 *
 * Two ingest paths shipped:
 *   - parseRunHistoryJson(jsonText) — accepts the normalized FlakyRun[] shape.
 *   - parseJUnitXml(xmlText)        — best-effort JUnit XML reader; aggregates
 *                                     <testcase> nodes, classifies as failed if
 *                                     a <failure>, <error>, or `status="failed"`
 *                                     attribute is present.
 *
 * This is the **defensible "test quality" angle** in mehenk's positioning.
 */
import { z } from "zod";

export const FlakyTestResultSchema = z.object({
  test: z.string().min(1),
  status: z.enum(["passed", "failed", "skipped"]),
  durationMs: z.number().optional(),
  errorMessage: z.string().optional(),
});

export const FlakyRunSchema = z.object({
  id: z.string().min(1),
  startedAt: z.string().optional(),
  results: z.array(FlakyTestResultSchema),
});

export type FlakyRun = z.infer<typeof FlakyRunSchema>;
export type FlakyTestResult = z.infer<typeof FlakyTestResultSchema>;

export type FlakyTest = {
  name: string;
  runs: number;
  passed: number;
  failed: number;
  skipped: number;
  passRate: number;
  dangerScore: number;
  failureSamples: string[];
};

export type FlakyReport = {
  totalRuns: number;
  totalTests: number;
  flakyCount: number;
  stableCount: number;
  flaky: FlakyTest[];
};

const dangerScore = (passRate: number, runs: number): number => {
  if (passRate <= 0 || passRate >= 1) return 0;
  return passRate * (1 - passRate) * Math.log(1 + runs);
};

export const detectFlakyTests = (runs: FlakyRun[]): FlakyReport => {
  if (runs.length === 0) {
    return {
      totalRuns: 0,
      totalTests: 0,
      flakyCount: 0,
      stableCount: 0,
      flaky: [],
    };
  }

  const tally = new Map<
    string,
    { passed: number; failed: number; skipped: number; samples: string[] }
  >();

  for (const run of runs) {
    for (const r of run.results) {
      const acc =
        tally.get(r.test) ??
        { passed: 0, failed: 0, skipped: 0, samples: [] };
      if (r.status === "passed") acc.passed += 1;
      else if (r.status === "failed") {
        acc.failed += 1;
        if (r.errorMessage && acc.samples.length < 3) {
          acc.samples.push(r.errorMessage.slice(0, 200));
        }
      } else acc.skipped += 1;
      tally.set(r.test, acc);
    }
  }

  const flaky: FlakyTest[] = [];
  let stable = 0;

  for (const [name, acc] of tally) {
    const runsForTest = acc.passed + acc.failed;
    if (runsForTest === 0) continue;
    const passRate = acc.passed / runsForTest;
    if (passRate > 0 && passRate < 1) {
      flaky.push({
        name,
        runs: runsForTest,
        passed: acc.passed,
        failed: acc.failed,
        skipped: acc.skipped,
        passRate,
        dangerScore: dangerScore(passRate, runsForTest),
        failureSamples: acc.samples,
      });
    } else {
      stable += 1;
    }
  }

  flaky.sort((a, b) => b.dangerScore - a.dangerScore);

  return {
    totalRuns: runs.length,
    totalTests: tally.size,
    flakyCount: flaky.length,
    stableCount: stable,
    flaky,
  };
};

export const parseRunHistoryJson = (jsonText: string): FlakyRun[] => {
  const data = JSON.parse(jsonText);
  const arr = Array.isArray(data) ? data : data.runs;
  if (!Array.isArray(arr)) {
    throw new Error(
      "Expected array of runs at top level, or { runs: [...] } wrapper.",
    );
  }
  return arr.map((r, i) =>
    FlakyRunSchema.parse({
      id: r.id ?? `run-${i + 1}`,
      startedAt: r.startedAt,
      results: r.results,
    }),
  );
};

/**
 * Lightweight JUnit XML reader. We don't pull a full XML parser into the bundle
 * — instead, we walk the document with regex over the well-known JUnit shape.
 * Each <testsuite> we see becomes one run; each <testcase> a result.
 *
 * Handles:
 *   - `<testcase name="..." classname="..." />`              → passed
 *   - `<testcase ...><failure ...>...</failure></testcase>`  → failed
 *   - `<testcase ...><error ...>...</error></testcase>`      → failed
 *   - `<testcase ...><skipped />...`                         → skipped
 *
 * Two or more <testsuite>s are interpreted as separate runs.
 */
export const parseJUnitXml = (xmlText: string): FlakyRun[] => {
  const suites = [
    ...xmlText.matchAll(
      /<testsuite\b[^>]*?(?:name=["']([^"']*)["'])?[^>]*?>([\s\S]*?)<\/testsuite>/g,
    ),
  ];

  if (suites.length === 0) {
    throw new Error("No <testsuite> found in XML input.");
  }

  return suites.map((suite, suiteIdx) => {
    const suiteName = suite[1] ?? `suite-${suiteIdx + 1}`;
    const suiteBody = suite[2];

    const cases = [
      ...suiteBody.matchAll(
        /<testcase\b([^>]*?)(?:\/>|>([\s\S]*?)<\/testcase>)/g,
      ),
    ];

    const results: FlakyTestResult[] = cases.map((c) => {
      const attrs = c[1] ?? "";
      const body = c[2] ?? "";

      const nameMatch = attrs.match(/\bname=["']([^"']+)["']/);
      const classnameMatch = attrs.match(/\bclassname=["']([^"']+)["']/);
      const statusAttr = attrs.match(/\bstatus=["']([^"']+)["']/);

      const name = `${classnameMatch?.[1] ? `${classnameMatch[1]} · ` : ""}${nameMatch?.[1] ?? "(unnamed)"}`;

      let status: FlakyTestResult["status"] = "passed";
      if (/<skipped\b/.test(body)) status = "skipped";
      if (/<failure\b/.test(body) || /<error\b/.test(body)) status = "failed";
      if (statusAttr?.[1] === "failed") status = "failed";
      if (statusAttr?.[1] === "skipped") status = "skipped";

      const errorMessageMatch = body.match(
        /<(?:failure|error)\b[^>]*?(?:message=["']([^"']+)["'])?[^>]*?>([\s\S]*?)<\/(?:failure|error)>/,
      );
      const errorMessage =
        errorMessageMatch?.[1] ?? errorMessageMatch?.[2]?.trim() ?? undefined;

      return { test: name, status, errorMessage };
    });

    return FlakyRunSchema.parse({
      id: suiteName,
      results,
    });
  });
};
