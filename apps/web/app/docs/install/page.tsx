import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Install — mehenk docs",
  description:
    "Install mehenk: use the web demo, run the MCP server in Cursor or Claude Code, or wait for the SDK.",
};

const CURSOR_DEEPLINK =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=mehenk&config=eyJ1cmwiOiJodHRwczovL21jcC5tZWhlbmsuZGV2L2FwaS9tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIn0=";

const CLAUDE_CODE_CMD = `claude mcp add mehenk https://mcp.mehenk.dev/api/mcp --transport http --header "Authorization: Bearer $MEHENK_API_KEY"`;

const MANUAL_JSON = `{
  "mcpServers": {
    "mehenk": {
      "url": "https://mcp.mehenk.dev/api/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer \${MEHENK_API_KEY}"
      }
    }
  }
}`;

export default function InstallPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">Install</h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Three ways to use mehenk. Start with the web demo if you just want to
        kick the tires; switch to the MCP server when you&apos;re ready to
        wire it into an editor or agent.
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Use the web demo
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        No install, no account, no API key. Paste an HTML fragment, hit
        generate, copy the spec. Useful for one-offs and for getting a feel
        for the output before committing to MCP.
      </p>
      <p className="mt-4 text-sm leading-relaxed">
        <a
          href="https://mehenk-web.vercel.app/#demo"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 underline-offset-4 hover:text-violet-200 hover:underline"
        >
          Open the demo →
        </a>
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Use the MCP server
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        The MCP server speaks Streamable HTTP. Once registered, every mehenk
        tool — <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">generate_tests</code>,{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">analyze_coverage</code>,{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">suggest_improvements</code>,{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">detect_flaky_tests</code>,{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">validate_syntax</code>
        {" "}— shows up as a first-class tool in your client.
      </p>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        Option 1 — Cursor deeplink
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Click the link below (or paste it into your browser) and Cursor will
        register the server automatically.
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{CURSOR_DEEPLINK}
      </pre>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        Option 2 — Claude Code CLI
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Run from a terminal. Replace{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
          $MEHENK_API_KEY
        </code>{" "}
        with your key (or leave it — the v0 server is currently open).
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{CLAUDE_CODE_CMD}
      </pre>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        Option 3 — Manual config
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Drop the snippet below into{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
          ~/.cursor/mcp.json
        </code>{" "}
        (or the equivalent config for your client) and restart.
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{MANUAL_JSON}
      </pre>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Use the SDK
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        A first-class TypeScript SDK ships in{" "}
        <span className="text-foreground">v0.2</span>. It will wrap the same
        engine the MCP server uses — no HTTP boundary, no network round-trip,
        same tools. Until then, hit the MCP endpoint directly or use the web
        demo.
      </p>
      <div className="mt-4 rounded-md border border-border bg-secondary/30 p-4 text-xs leading-relaxed text-muted-foreground">
        <span className="text-foreground">Coming v0.2 —</span>{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
          npm install @mehenk/sdk
        </code>
      </div>

      <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
        Next:{" "}
        <Link
          href="/docs/mcp"
          className="text-violet-300 underline-offset-4 hover:text-violet-200 hover:underline"
        >
          MCP setup
        </Link>{" "}
        ·{" "}
        <Link
          href="/docs/tools"
          className="text-violet-300 underline-offset-4 hover:text-violet-200 hover:underline"
        >
          Tools reference
        </Link>
      </p>
    </div>
  );
}
