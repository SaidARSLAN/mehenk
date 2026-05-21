import { NextResponse } from "next/server";

export const runtime = "edge";

export const GET = () =>
  NextResponse.json({
    name: "mehenk-mcp",
    version: "0.1.0",
    status: "ok",
    tools: [
      "generate_tests",
      "analyze_coverage",
      "suggest_improvements",
      "validate_syntax",
    ],
  });
