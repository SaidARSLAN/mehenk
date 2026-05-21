import { describe, expect, it } from "vitest";
import { generatePlaywrightTests, parseHtmlForm } from "./index.js";

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
});
