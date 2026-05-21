import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started — mehenk docs",
  description:
    "Welcome to mehenk — an AI-powered Playwright test forge for developers and AI agents.",
};

export default function DocsIndexPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">
        Welcome to mehenk
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        mehenk is a touchstone for your end-to-end tests. Drop in a snippet of
        HTML — a checkout form, an onboarding modal, a dashboard widget — and
        get back a clean, idiomatic Playwright spec with stable selectors,
        edge-case coverage, and a locale-aware data model. It runs in the
        browser, on the command line, and inside any{" "}
        <Link
          href="/docs/mcp"
          className="text-violet-300 underline-offset-4 hover:text-violet-200 hover:underline"
        >
          MCP-capable agent
        </Link>
        .
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Whether you&apos;re a developer who just wants tests to write
        themselves, or an AI agent stitching together a CI pipeline, the same
        engine and the same tool surface are available everywhere — web, SDK,
        MCP.
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        30-second tour
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground marker:text-muted-foreground/60">
        <li>
          <span className="text-foreground">Paste HTML</span> — drop a rendered
          fragment of any page into the demo widget or the{" "}
          <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
            generate_tests
          </code>{" "}
          tool.
        </li>
        <li>
          <span className="text-foreground">Get a spec</span> — receive a
          Playwright test file with stable locators, assertions, and
          edge-case scenarios out of the box.
        </li>
        <li>
          <span className="text-foreground">Wire up MCP</span> — point Cursor,
          Claude Code, or any MCP client at{" "}
          <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
            https://mcp.mehenk.dev/api/mcp
          </code>{" "}
          and call the tools directly from your editor.
        </li>
        <li>
          <span className="text-foreground">Ship to CI</span> — commit the
          generated spec, run it on every push, and let{" "}
          <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
            detect_flaky_tests
          </code>{" "}
          keep your suite honest.
        </li>
      </ul>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Where to go next
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Link
          href="/docs/install"
          className="group rounded-lg border border-border bg-secondary/30 p-5 transition-colors hover:border-violet-500/40 hover:bg-secondary/50"
        >
          <div className="text-sm font-medium text-foreground">Install</div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Use the web demo, the MCP server, or the SDK. Pick whichever path
            fits your workflow.
          </p>
        </Link>
        <Link
          href="/docs/mcp"
          className="group rounded-lg border border-border bg-secondary/30 p-5 transition-colors hover:border-violet-500/40 hover:bg-secondary/50"
        >
          <div className="text-sm font-medium text-foreground">MCP setup</div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Connect Cursor, Claude Code, or any MCP client to mehenk in under
            a minute.
          </p>
        </Link>
        <Link
          href="/docs/tools"
          className="group rounded-lg border border-border bg-secondary/30 p-5 transition-colors hover:border-violet-500/40 hover:bg-secondary/50"
        >
          <div className="text-sm font-medium text-foreground">
            Tools reference
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Every tool, input schema, and example invocation in one place.
          </p>
        </Link>
      </div>
    </div>
  );
}
