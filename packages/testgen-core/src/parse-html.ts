import * as cheerio from "cheerio";
import { type FormField, type FormSchemaT, FormSchema } from "./types.js";

const TYPE_MAP: Record<string, FormField["type"]> = {
  text: "text",
  email: "email",
  password: "password",
  tel: "tel",
  url: "url",
  number: "number",
  date: "date",
  checkbox: "checkbox",
  radio: "radio",
  file: "file",
  hidden: "hidden",
  submit: "submit",
};

const inferType = (raw: string | undefined): FormField["type"] => {
  if (!raw) return "text";
  return TYPE_MAP[raw.toLowerCase()] ?? "unknown";
};

const pickSelector = (
  $form: cheerio.Cheerio<cheerio.AnyNode>,
  $el: cheerio.Cheerio<cheerio.AnyNode>,
  $: cheerio.CheerioAPI,
  index: number,
): { selector: string; kind: FormField["selectorKind"] } => {
  const id = $el.attr("id");
  if (id) return { selector: `#${id}`, kind: "id" };

  const name = $el.attr("name");
  if (name) {
    return { selector: `[name="${name}"]`, kind: "name" };
  }

  // <label for="..."> match handled via id branch.
  // Try wrapping <label>X</label> — Playwright supports getByLabel.
  const label = $el.closest("label").text().trim();
  if (label) {
    return { selector: `label:has-text("${label}")`, kind: "label" };
  }

  const placeholder = $el.attr("placeholder");
  if (placeholder) {
    return {
      selector: `[placeholder="${placeholder}"]`,
      kind: "placeholder",
    };
  }

  const role = $el.attr("role");
  if (role) return { selector: `[role="${role}"]`, kind: "role" };

  return { selector: `form :nth-of-type(${index + 1})`, kind: "nth" };
};

const collectLabel = (
  $el: cheerio.Cheerio<cheerio.AnyNode>,
  $: cheerio.CheerioAPI,
): string | undefined => {
  const id = $el.attr("id");
  if (id) {
    const explicit = $(`label[for="${id}"]`).first().text().trim();
    if (explicit) return explicit;
  }
  const wrapping = $el.closest("label").text().trim();
  if (wrapping) return wrapping;
  return undefined;
};

const collectOptions = (
  $el: cheerio.Cheerio<cheerio.AnyNode>,
): string[] | undefined => {
  if ($el.prop("tagName")?.toLowerCase() !== "select") return undefined;
  const opts: string[] = [];
  $el.find("option").each((_, opt) => {
    const value = $(opt as cheerio.AnyNode).attr("value") ?? "";
    if (value) opts.push(value);
  });
  return opts.length > 0 ? opts : undefined;
};

const parseField = (
  $form: cheerio.Cheerio<cheerio.AnyNode>,
  el: cheerio.AnyNode,
  $: cheerio.CheerioAPI,
  index: number,
): FormField | null => {
  const $el = $(el);
  const tag = $el.prop("tagName")?.toLowerCase();

  let type: FormField["type"];
  if (tag === "select") type = "select";
  else if (tag === "textarea") type = "textarea";
  else if (tag === "button") {
    if ($el.attr("type") === "submit") type = "submit";
    else return null;
  } else if (tag === "input") {
    type = inferType($el.attr("type"));
  } else return null;

  const { selector, kind } = pickSelector($form, $el, $, index);

  return {
    selector,
    selectorKind: kind,
    type,
    name: $el.attr("name"),
    label: collectLabel($el, $),
    placeholder: $el.attr("placeholder"),
    required: $el.attr("required") !== undefined,
    options: collectOptions($el),
    pattern: $el.attr("pattern"),
    min: $el.attr("min"),
    max: $el.attr("max"),
  };
};

/**
 * Parse a raw HTML string and pull out the **first** form's fields.
 *
 * Throws if no <form> is found. Returns a validated FormSchema.
 */
export const parseHtmlForm = (html: string): FormSchemaT => {
  const $ = cheerio.load(html);
  const $form = $("form").first();

  if ($form.length === 0) {
    throw new Error("No <form> element found in the provided HTML.");
  }

  const fields: FormField[] = [];
  const els: cheerio.AnyNode[] = [];
  $form.find("input, select, textarea, button").each((_, el) => {
    els.push(el);
  });

  els.forEach((el, idx) => {
    const field = parseField($form, el, $, idx);
    if (field) fields.push(field);
  });

  const submitButton = $form.find("button[type='submit'], input[type='submit']").first();
  const submitSelector = submitButton.length
    ? (submitButton.attr("id")
        ? `#${submitButton.attr("id")}`
        : "button[type='submit'], input[type='submit']")
    : null;

  const formId = $form.attr("id");
  const formSelector = formId ? `#${formId}` : "form";

  const method = ($form.attr("method") ?? "POST").toUpperCase();

  return FormSchema.parse({
    url: "unknown",
    action: $form.attr("action") ?? null,
    method: method === "GET" ? "GET" : "POST",
    selector: formSelector,
    fields: fields.filter((f) => f.type !== "submit"),
    submitSelector,
  });
};
