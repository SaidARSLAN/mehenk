/**
 * Sample-value generators per field type. These are placeholders the LLM
 * enhancer will eventually replace with smarter, context-aware data — but
 * the template-based generator below ships valid Playwright tests on day 1.
 *
 * Turkish-locale fixtures will live in a separate `@mehenk/tr-fixtures`
 * package (Faz 4).
 */
import type { FormField } from "./types.js";

const EMAIL = "test+playwright@example.com";
const PHONE = "+1 415 555 0100";
const URL = "https://example.com";

const INVALID_EMAIL = "not-an-email";

export const sampleValue = (field: FormField): string => {
  switch (field.type) {
    case "email":
      return EMAIL;
    case "password":
      return "Aa1!playwright-test";
    case "tel":
      return PHONE;
    case "url":
      return URL;
    case "number":
      if (field.min) return field.min;
      return "42";
    case "date":
      return "2026-05-21";
    case "checkbox":
    case "radio":
      return field.options?.[0] ?? "on";
    case "select":
      return field.options?.[0] ?? "";
    case "textarea":
      return "Playwright-generated form submission test.";
    default:
      return field.placeholder ?? "test value";
  }
};

export const invalidValueFor = (field: FormField): string | null => {
  switch (field.type) {
    case "email":
      return INVALID_EMAIL;
    case "url":
      return "not a url";
    case "number":
      return "abc";
    case "tel":
      return "12";
    default:
      return null;
  }
};
