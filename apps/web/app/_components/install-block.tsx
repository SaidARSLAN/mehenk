"use client";

import { useState } from "react";

type Tab = "cursor" | "claude" | "manual";

const MCP_URL = "https://mcp.mehenk.com/api/mcp";
const CURSOR_DEEPLINK_CONFIG = btoa(
  JSON.stringify({
    url: MCP_URL,
    headers: { Authorization: "Bearer ${MEHENK_API_KEY}" },
  }),
);
const CURSOR_DEEPLINK = `cursor://anysphere.cursor-deeplink/mcp/install?name=mehenk&config=${CURSOR_DEEPLINK_CONFIG}`;

const CLAUDE_CMD = `claude mcp add mehenk \\
  ${MCP_URL} \\
  --transport http \\
  --header "Authorization: Bearer $MEHENK_API_KEY"`;

const MANUAL_JSON = `// ~/.cursor/mcp.json  ·  claude_desktop_config.json
{
  "mcpServers": {
    "mehenk": {
      "url": "${MCP_URL}",
      "headers": {
        "Authorization": "Bearer \${MEHENK_API_KEY}"
      }
    }
  }
}`;

export function InstallBlock() {
  const [tab, setTab] = useState<Tab>("cursor");
  const [copied, setCopied] = useState(false);

  const tabs: { id: Tab; label: string; sub: string }[] = [
    { id: "cursor", label: "Cursor", sub: "1-click deeplink" },
    { id: "claude", label: "Claude Code", sub: "CLI command" },
    { id: "manual", label: "Manual", sub: "any MCP client" },
  ];

  const content = (() => {
    if (tab === "cursor") return CURSOR_DEEPLINK;
    if (tab === "claude") return CLAUDE_CMD;
    return MANUAL_JSON;
  })();

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section
      id="install"
      className="relative z-10 mx-auto max-w-5xl scroll-mt-24 px-6 pb-32"
    >
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
          MCP-native
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Install in your agent
        </h2>
        <p className="mt-2 text-muted-foreground">
          Drop mehenk into Cursor, Claude Code, or any MCP-aware client. Four
          tools: <code className="font-mono text-foreground/80">generate_tests</code>,{" "}
          <code className="font-mono text-foreground/80">analyze_coverage</code>,{" "}
          <code className="font-mono text-foreground/80">suggest_improvements</code>,{" "}
          <code className="font-mono text-foreground/80">validate_syntax</code>.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-secondary/30 p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex flex-col items-start gap-0.5 rounded-md border px-4 py-2 text-left transition-all ${
                  active
                    ? "border-violet-500/50 bg-violet-500/10"
                    : "border-border bg-background/40 hover:border-border/80"
                }`}
              >
                <span
                  className={`text-sm font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {t.label}
                </span>
                <span className="text-xs text-muted-foreground/70">
                  {t.sub}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <pre className="overflow-x-auto rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed text-foreground/85">
            {content}
          </pre>
          <button
            type="button"
            onClick={copy}
            className="absolute right-3 top-3 rounded-md border border-border bg-secondary/60 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? "copied ✓" : "copy"}
          </button>
        </div>

        {tab === "cursor" && (
          <a
            href={CURSOR_DEEPLINK}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Add to Cursor
            <ArrowRight />
          </a>
        )}

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground/80">
          <span>
            <strong className="text-foreground/80">Auth:</strong>{" "}
            Bearer token (v0 demo is open — keys land in v0.2)
          </span>
          <span>
            <strong className="text-foreground/80">Transport:</strong>{" "}
            Streamable HTTP
          </span>
          <span>
            <strong className="text-foreground/80">Spec:</strong> MCP 2025-11
          </span>
        </div>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M5 12 L19 12 M13 6 L19 12 L13 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
