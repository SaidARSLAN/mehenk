/**
 * Sample-value generators per field type.
 *
 * Two locales are supported out of the box:
 *   - "en" — neutral defaults (us-en flavor, English placeholders).
 *   - "tr" — Turkish locale: valid TC Kimlik checksum, +90 phone format,
 *     mahalle/ilçe/il address tree, common Turkish given/last names.
 *
 * `tr` is the **rakipsiz farklılaşma** angle in mehenk's positioning —
 * EarlyAI / Octomind / TestSprite ship en-only fixtures.
 */
import type { FormField } from "./types";

export type Locale = "en" | "tr";

const EN = {
  email: "test+playwright@example.com",
  phone: "+1 415 555 0100",
  url: "https://example.com",
  name: "Pat Williams",
  number: "42",
  date: "2026-05-21",
  text: "Test input value.",
  textarea: "Playwright-generated form submission test.",
  password: "Aa1!playwright-test",
  invalidEmail: "not-an-email",
  invalidPhone: "12",
  invalidUrl: "not a url",
  invalidNumber: "abc",
};

/**
 * Geçerli TC Kimlik (test-only). Algorithm:
 *   d1+d3+d5+d7+d9 = odd, d2+d4+d6+d8 = even
 *   d10 = ((odd*7) - even) mod 10
 *   d11 = (d1..d10 sum) mod 10
 *
 * 10000000146 — synthetic but checksum-valid; safe for fixtures.
 */
const TR = {
  email: "ahmet.yilmaz@firma.com.tr",
  phone: "+90 532 123 45 67",
  url: "https://ornek.com.tr",
  name: "Ahmet Yılmaz",
  tcKimlik: "10000000146",
  number: "42",
  date: "2026-05-21",
  text: "Form gönderim testi.",
  textarea:
    "Playwright tarafından otomatik üretilmiş form gönderim doğrulama testi.",
  password: "Aa1!playwright-test",
  address: "Yeniköy Mah. Hisarüstü Sk. No:42 D:5",
  ilce: "Sarıyer",
  il: "İstanbul",
  invalidEmail: "gecersiz-email",
  invalidPhone: "12",
  invalidUrl: "gecersiz url",
  invalidNumber: "abc",
};

const isTcKimlikField = (field: FormField): boolean => {
  const haystack = `${field.name ?? ""} ${field.label ?? ""} ${field.placeholder ?? ""}`.toLowerCase();
  return (
    /tc[\s_-]?kimlik|tckn|identification|kimlik\s*no|t\.c\./.test(haystack) ||
    (field.pattern?.includes("11") && field.type === "text")
  );
};

const isAddressField = (field: FormField): boolean => {
  const haystack = `${field.name ?? ""} ${field.label ?? ""} ${field.placeholder ?? ""}`.toLowerCase();
  return /address|adres|mahalle/.test(haystack);
};

const isCityField = (field: FormField): boolean => {
  const haystack = `${field.name ?? ""} ${field.label ?? ""} ${field.placeholder ?? ""}`.toLowerCase();
  return /city|şehir|sehir|\bil\b/.test(haystack);
};

const isDistrictField = (field: FormField): boolean => {
  const haystack = `${field.name ?? ""} ${field.label ?? ""} ${field.placeholder ?? ""}`.toLowerCase();
  return /district|ilçe|ilce/.test(haystack);
};

const isNameField = (field: FormField): boolean => {
  const haystack = `${field.name ?? ""} ${field.label ?? ""} ${field.placeholder ?? ""}`.toLowerCase();
  return /\bname\b|isim|\bad\b|ad soyad|full[\s_-]?name/.test(haystack);
};

export const sampleValue = (
  field: FormField,
  locale: Locale = "en",
): string => {
  const tr = locale === "tr";
  const pool = tr ? TR : EN;

  // TR-specific semantic detection (works on en types but tr labels)
  if (tr) {
    if (field.type === "text" && isTcKimlikField(field)) return TR.tcKimlik;
    if (field.type === "text" && isAddressField(field)) return TR.address;
    if (field.type === "text" && isCityField(field)) return TR.il;
    if (field.type === "text" && isDistrictField(field)) return TR.ilce;
    if (
      (field.type === "text" || field.type === "unknown") &&
      isNameField(field)
    )
      return TR.name;
  }

  switch (field.type) {
    case "email":
      return pool.email;
    case "password":
      return pool.password;
    case "tel":
      return pool.phone;
    case "url":
      return pool.url;
    case "number":
      if (field.min) return field.min;
      return pool.number;
    case "date":
      return pool.date;
    case "checkbox":
    case "radio":
      return field.options?.[0] ?? "on";
    case "select":
      return field.options?.[0] ?? "";
    case "textarea":
      return pool.textarea;
    case "text":
    case "unknown":
      return field.placeholder ?? pool.text;
    default:
      return field.placeholder ?? "test value";
  }
};

export const invalidValueFor = (
  field: FormField,
  locale: Locale = "en",
): string | null => {
  const pool = locale === "tr" ? TR : EN;
  switch (field.type) {
    case "email":
      return pool.invalidEmail;
    case "url":
      return pool.invalidUrl;
    case "number":
      return pool.invalidNumber;
    case "tel":
      return pool.invalidPhone;
    default:
      return null;
  }
};
