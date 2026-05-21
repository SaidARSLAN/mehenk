import {
  generatePlaywrightTests,
  parseHtmlForm,
} from "@repo/testgen-core";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 10;

const RequestBodySchema = z.object({
  html: z.string().min(20).max(20_000),
  baseUrl: z.string().url().optional(),
  testName: z.string().min(1).max(120).optional(),
  includeEdgeCases: z.boolean().optional(),
});

export const POST = async (request: NextRequest) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = RequestBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const schema = parseHtmlForm(parsed.data.html);
    const file = generatePlaywrightTests(schema, {
      baseUrl: parsed.data.baseUrl,
      testName: parsed.data.testName ?? "form submission",
      includeEdgeCases: parsed.data.includeEdgeCases ?? true,
    });

    return NextResponse.json(
      {
        schema: {
          fields: schema.fields.map((f) => ({
            type: f.type,
            label: f.label ?? f.name ?? f.placeholder ?? "(unnamed)",
            required: f.required,
            selector: f.selector,
          })),
          submitSelector: schema.submitSelector,
        },
        test: {
          filename: file.filename,
          language: file.language,
          framework: file.framework,
          code: file.code,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate test.";
    return NextResponse.json({ error: message }, { status: 422 });
  }
};
