type Q = { q: string; a: string };

const FAQS: Q[] = [
  {
    q: "Is mehenk an SaaS or a CLI?",
    a: "Both, eventually. Today: a hosted MCP server + a paste-and-go web demo. A CLI ships in v0.2. The MCP server is your agent's interface; the demo is your human one.",
  },
  {
    q: "Where does my pasted HTML go?",
    a: "Each /api/generate call is processed in a Vercel function and never persisted. The MCP endpoint behaves the same. No login, no data retention in v0. Audit-ready storage lands when teams arrive.",
  },
  {
    q: "Why MCP, not a Playwright plugin?",
    a: "MCP makes mehenk usable from Claude Code, Cursor, Copilot, and any agent that speaks the protocol — without you installing an editor plugin. The same engine still ships as @mehenk/sdk for direct TypeScript use.",
  },
  {
    q: "Why focus on Turkish locale fixtures?",
    a: "Faker.js TR-locale is incomplete: no checksum-valid TC Kimlik, weak +90 formatting, no mahalle/ilçe/il hierarchy. Octomind / EarlyAI / TestSprite ship en-only. mehenk closes the gap for Turkish dev teams.",
  },
  {
    q: "How fast is a generation?",
    a: "Median ~1.8s per spec, p95 under 3.5s in our pre-launch benchmarks (10-field forms, Vercel Edge cold-start excluded). The widget streams output as soon as the schema is parsed.",
  },
  {
    q: "Does it work for non-form components?",
    a: "v0 is HTML-form-focused. v0.2 adds JSON-schema input and component-source mode (paste a React component, get a test). Sandboxed runtime execution arrives in V1.1.",
  },
  {
    q: "What's the pricing model?",
    a: "Free during open beta. After GA: indie tier (~$9/mo, 500 generations), team tier with API keys for agents, and a metered agent plan for MCP-heavy use. No hidden seats.",
  },
  {
    q: "Can I self-host?",
    a: "The MCP server is a standard Next.js Route Handler with mcp-handler — self-hosting on Vercel/Fly is one fork away. Source is open on GitHub. Hosted instance stays the canonical reference.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-6 pb-32"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked
        </h2>
        <p className="mt-2 text-muted-foreground">
          The questions we get every time mehenk is shown to a dev team.
        </p>
      </div>
      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <details
            key={i}
            className="group rounded-lg border border-border bg-secondary/30 transition-colors hover:border-border/80 open:bg-secondary/50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium">
              <span>{item.q}</span>
              <span
                aria-hidden
                className="text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
