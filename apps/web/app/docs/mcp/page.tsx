import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP setup — mehenk docs",
  description:
    "Connect mehenk to any MCP client — Cursor, Claude Code, or your own — over Streamable HTTP.",
};

const CURSOR_DEEPLINK =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=mehenk&config=eyJ1cmwiOiJodHRwczovL21jcC5tZWhlbmsuZGV2L2FwaS9tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIn0=";

const CLAUDE_CODE_CMD = `claude mcp add mehenk https://mcp.mehenk.dev/api/mcp --transport http --header "Authorization: Bearer $MEHENK_API_KEY"`;

const GENERIC_JSON = `{
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

const HEALTH_CURL = `curl -sS https://mcp.mehenk.dev/health \\
  -H "Authorization: Bearer $MEHENK_API_KEY"`;

const HEALTH_OUTPUT = `{
  "status": "ok",
  "version": "0.1.3",
  "transport": "streamable-http",
  "tools": [
    "generate_tests",
    "analyze_coverage",
    "suggest_improvements",
    "detect_flaky_tests",
    "validate_syntax"
  ]
}`;

export default function McpPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">MCP setup</h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        The mehenk MCP server gives any compatible client — Cursor, Claude
        Code, Zed, your own agent — direct access to the same engine that
        powers the web demo. No vendor SDK, no proprietary RPC, just MCP over
        Streamable HTTP.
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        What is MCP?
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        The Model Context Protocol is an open standard for connecting LLM
        clients to tools, data sources, and services. A client (your editor or
        agent) talks to a server (mehenk) through a small set of typed
        primitives — tools, resources, prompts — over HTTP, stdio, or SSE.
        Once the server is registered, its tools become first-class actions
        the model can call by name.
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Server endpoint
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        The production endpoint is:
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{"https://mcp.mehenk.dev/api/mcp"}
      </pre>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        It speaks{" "}
        <span className="text-foreground">Streamable HTTP</span> (the
        recommended transport for remote MCP servers as of late 2025). Older
        SSE-only clients should fall back to{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
          /api/mcp/sse
        </code>
        .
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Authentication
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Authentication is via a bearer token in the{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
          Authorization
        </code>{" "}
        header. The v0 endpoint is currently{" "}
        <span className="text-foreground">open</span> — any token (or none)
        works, and rate limits are generous. Scoped API keys land with{" "}
        <span className="text-foreground">v0.2</span>; once available, you can
        rotate, revoke, and bind keys to projects from the dashboard.
      </p>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Adding to your client
      </h2>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        Cursor
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        The fastest path is the deeplink — open it from any browser and
        Cursor takes care of the rest.
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{CURSOR_DEEPLINK}
      </pre>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        Claude Code
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Use the{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
          claude mcp add
        </code>{" "}
        command. The CLI persists the server in your user config so it&apos;s
        available across all projects.
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{CLAUDE_CODE_CMD}
      </pre>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        Other MCP clients
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Anything that speaks MCP over Streamable HTTP can connect. Drop the
        snippet below into your client&apos;s config file.
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{GENERIC_JSON}
      </pre>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Testing your connection
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Hit the health endpoint to confirm the server is reachable and your
        token (if set) is accepted.
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{HEALTH_CURL}
      </pre>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        A healthy server returns:
      </p>
      <pre className="mt-3 rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{HEALTH_OUTPUT}
      </pre>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">
        Troubleshooting
      </h2>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        CORS errors in the browser
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        The MCP endpoint is server-to-server; calls from a browser context
        are blocked by design. Use a desktop client (Cursor, Claude Code) or
        proxy through your own backend.
      </p>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        401 / token rejected
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Confirm the{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
          Authorization
        </code>{" "}
        header is being sent (some clients strip headers unless explicitly
        whitelisted). On v0 the server accepts any bearer — if you&apos;re
        still seeing 401, the request never reached the server.
      </p>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        Transport mismatch
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        If your client only supports the legacy SSE transport, point it at{" "}
        <code className="rounded bg-secondary/60 px-1.5 py-0.5 font-mono text-xs">
          https://mcp.mehenk.dev/api/mcp/sse
        </code>{" "}
        instead. Streamable HTTP is preferred for new integrations.
      </p>

      <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
        Next:{" "}
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
