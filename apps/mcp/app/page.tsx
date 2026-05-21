export default function McpHomePage() {
  return (
    <main
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        background: "#0a0a0a",
        color: "#fafafa",
        minHeight: "100vh",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, marginBottom: 16, fontWeight: 600 }}>
          mehenk MCP server
        </h1>
        <p style={{ color: "#a1a1aa", lineHeight: 1.6, marginBottom: 24 }}>
          This is an agent endpoint, not a human page. Connect via the Model
          Context Protocol (Streamable HTTP transport).
        </p>

        <h2 style={{ marginTop: 32, fontSize: 18, color: "#7c5cff" }}>
          Endpoint
        </h2>
        <pre
          style={{
            background: "#111",
            border: "1px solid #1f1f1f",
            padding: 12,
            borderRadius: 6,
            overflow: "auto",
          }}
        >
          POST /api/mcp{"\n"}Authorization: Bearer &lt;your-api-key&gt;{"\n"}
          Content-Type: application/json
        </pre>

        <h2 style={{ marginTop: 32, fontSize: 18, color: "#7c5cff" }}>
          Claude Code
        </h2>
        <pre
          style={{
            background: "#111",
            border: "1px solid #1f1f1f",
            padding: 12,
            borderRadius: 6,
            overflow: "auto",
          }}
        >
          {`claude mcp add mehenk \\
  https://mcp.mehenk.dev/api/mcp \\
  --header "Authorization: Bearer $MEHENK_API_KEY"`}
        </pre>

        <h2 style={{ marginTop: 32, fontSize: 18, color: "#7c5cff" }}>
          Cursor
        </h2>
        <pre
          style={{
            background: "#111",
            border: "1px solid #1f1f1f",
            padding: 12,
            borderRadius: 6,
            overflow: "auto",
          }}
        >
          {`// ~/.cursor/mcp.json
{
  "mcpServers": {
    "mehenk": {
      "url": "https://mcp.mehenk.dev/api/mcp",
      "headers": {
        "Authorization": "Bearer \${MEHENK_API_KEY}"
      }
    }
  }
}`}
        </pre>

        <h2 style={{ marginTop: 32, fontSize: 18, color: "#7c5cff" }}>
          Tools
        </h2>
        <ul style={{ color: "#a1a1aa", lineHeight: 1.8, paddingLeft: 20 }}>
          <li>
            <code style={{ color: "#06b6d4" }}>generate_tests</code> — HTML
            form → Playwright spec
          </li>
          <li>
            <code style={{ color: "#06b6d4" }}>analyze_coverage</code> — schema
            ∩ test, gap report
          </li>
          <li>
            <code style={{ color: "#06b6d4" }}>suggest_improvements</code> —
            heuristics for resilience
          </li>
          <li>
            <code style={{ color: "#06b6d4" }}>validate_syntax</code> — quick
            structural checks
          </li>
        </ul>

        <p
          style={{
            marginTop: 48,
            paddingTop: 16,
            borderTop: "1px solid #1f1f1f",
            color: "#71717a",
            fontSize: 12,
          }}
        >
          v0.1 — early access. Docs:{" "}
          <a
            href="https://github.com/SaidARSLAN/mehenk"
            style={{ color: "#a1a1aa", textDecoration: "underline" }}
          >
            github.com/SaidARSLAN/mehenk
          </a>
        </p>
      </div>
    </main>
  );
}
