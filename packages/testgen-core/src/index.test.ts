import { describe, expect, it } from "vitest";
import {
  detectFlakyTests,
  generatePlaywrightTests,
  parseHtmlForm,
  parseJUnitXml,
  parseRunHistoryJson,
} from "./index";

const LOGIN_FORM = `
<form action="/api/login" method="POST" id="login-form">
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required placeholder="you@example.com" />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required minlength="8" />

  <label>
    <input type="checkbox" name="remember" /> Remember me
  </label>

  <button id="submit" type="submit">Sign in</button>
</form>
`;

describe("parseHtmlForm", () => {
  it("extracts visible fields, skips submit, keeps required flags", () => {
    const schema = parseHtmlForm(LOGIN_FORM);
    expect(schema.action).toBe("/api/login");
    expect(schema.method).toBe("POST");
    expect(schema.selector).toBe("#login-form");
    expect(schema.submitSelector).toBe("#submit");

    const types = schema.fields.map((f) => f.type);
    expect(types).toContain("email");
    expect(types).toContain("password");
    expect(types).toContain("checkbox");
    expect(types).not.toContain("submit");

    const email = schema.fields.find((f) => f.type === "email");
    expect(email?.required).toBe(true);
    expect(email?.selectorKind).toBe("id");
    expect(email?.selector).toBe("#email");
  });

  it("throws when no form is present", () => {
    expect(() => parseHtmlForm("<div>nothing</div>")).toThrow(/No <form>/);
  });
});

describe("generatePlaywrightTests", () => {
  it("emits a valid spec with happy + edge cases", () => {
    const schema = parseHtmlForm(LOGIN_FORM);
    const file = generatePlaywrightTests(schema, {
      testName: "login form",
      baseUrl: "http://localhost:3000/login",
    });

    expect(file.framework).toBe("playwright");
    expect(file.language).toBe("typescript");
    expect(file.code).toContain('import { test, expect } from "@playwright/test"');
    expect(file.code).toContain("login form — happy path");
    expect(file.code).toContain("await page.locator(\"#email\").fill");
    expect(file.code).toContain("await page.locator(\"#submit\").click()");
    // edge case for required email missing
    expect(file.code).toContain("rejects when required field 'email' is missing");
    // edge case invalid email
    expect(file.code).toContain("rejects invalid email value");
  });

  it("respects framework + language options", () => {
    const schema = parseHtmlForm(LOGIN_FORM);
    const file = generatePlaywrightTests(schema, {
      language: "javascript",
      includeEdgeCases: false,
    });
    expect(file.filename).toBe("form.spec.js");
    expect(file.code).toContain("const { test, expect } = require");
    // edge cases off → no edge case test blocks
    expect(file.code).not.toContain("rejects when required");
  });

  it("ranks flaky tests by danger score (closer to 50/50 + more runs)", () => {
    const runs = [
      { id: "1", results: [
        { test: "stable.test", status: "passed" as const },
        { test: "flaky.50.test", status: "passed" as const },
        { test: "flaky.20.test", status: "passed" as const },
      ]},
      { id: "2", results: [
        { test: "stable.test", status: "passed" as const },
        { test: "flaky.50.test", status: "failed" as const, errorMessage: "TimeoutError" },
        { test: "flaky.20.test", status: "passed" as const },
      ]},
      { id: "3", results: [
        { test: "stable.test", status: "passed" as const },
        { test: "flaky.50.test", status: "passed" as const },
        { test: "flaky.20.test", status: "passed" as const },
      ]},
      { id: "4", results: [
        { test: "stable.test", status: "passed" as const },
        { test: "flaky.50.test", status: "failed" as const },
        { test: "flaky.20.test", status: "failed" as const },
      ]},
    ];
    const report = detectFlakyTests(runs);
    expect(report.totalRuns).toBe(4);
    expect(report.flakyCount).toBe(2);
    expect(report.stableCount).toBe(1);
    // 50/50 split is more dangerous than 80/20 with same N
    expect(report.flaky[0].name).toBe("flaky.50.test");
    expect(report.flaky[0].passRate).toBeCloseTo(0.5);
    expect(report.flaky[0].failureSamples).toContain("TimeoutError");
  });

  it("parses run history JSON (array + {runs:[]} shapes)", () => {
    const arr = parseRunHistoryJson(JSON.stringify([
      { id: "r1", results: [{ test: "a", status: "passed" }] },
    ]));
    expect(arr).toHaveLength(1);

    const wrapped = parseRunHistoryJson(JSON.stringify({
      runs: [{ id: "r2", results: [{ test: "b", status: "failed" }] }],
    }));
    expect(wrapped[0].id).toBe("r2");
  });

  it("parses minimal JUnit XML with failures + skipped", () => {
    const xml = `
      <testsuite name="run-1">
        <testcase name="pass.case" classname="A" />
        <testcase name="fail.case" classname="A">
          <failure message="boom">Stack here</failure>
        </testcase>
        <testcase name="skip.case" classname="A">
          <skipped />
        </testcase>
      </testsuite>
      <testsuite name="run-2">
        <testcase name="pass.case" classname="A" />
        <testcase name="fail.case" classname="A" />
      </testsuite>
    `;
    const runs = parseJUnitXml(xml);
    expect(runs).toHaveLength(2);
    expect(runs[0].results.find((r) => r.test.includes("pass"))?.status).toBe("passed");
    expect(runs[0].results.find((r) => r.test.includes("fail"))?.status).toBe("failed");
    expect(runs[0].results.find((r) => r.test.includes("skip"))?.status).toBe("skipped");

    const report = detectFlakyTests(runs);
    // fail.case passed in run-2 but failed in run-1 → flaky
    expect(report.flaky.some((f) => f.name.includes("fail.case"))).toBe(true);
  });

  it("emits Turkish fixtures when locale=tr (TC Kimlik, +90, mahalle/ilçe/il)", () => {
    const TR_FORM = `
      <form id="kayit" method="POST">
        <label for="ad">Ad Soyad</label>
        <input id="ad" name="ad_soyad" type="text" required />
        <label for="tckimlik">TC Kimlik No</label>
        <input id="tckimlik" name="tc_kimlik" type="text" required pattern="[0-9]{11}" />
        <label for="telefon">Telefon</label>
        <input id="telefon" name="telefon" type="tel" required />
        <label for="il">İl</label>
        <input id="il" name="il" type="text" required />
        <label for="adres">Adres</label>
        <input id="adres" name="adres" type="text" required />
        <button type="submit">Kaydet</button>
      </form>
    `;
    const schema = parseHtmlForm(TR_FORM);
    const file = generatePlaywrightTests(schema, { locale: "tr" });

    // TC Kimlik checksum-valid sample
    expect(file.code).toContain("10000000146");
    // +90 phone
    expect(file.code).toContain("+90 532");
    // İstanbul (il)
    expect(file.code).toContain("İstanbul");
    // Address
    expect(file.code).toContain("Mah.");
    // Turkish name
    expect(file.code).toContain("Ahmet Yılmaz");
  });
});
