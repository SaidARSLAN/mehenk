import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — mehenk",
  description: "What shipped, when",
};

type EntryCategory = "Added" | "Changed" | "Fixed";

type Entry = {
  version: string;
  date: string;
  title: string;
  items: { category: EntryCategory; text: string }[];
};

const entries: Entry[] = [
  {
    version: "v0.1.5",
    date: "2026-05-21",
    title: "Flaky-test detection & shareable samples",
    items: [
      { category: "Added", text: "detect_flaky_tests MCP tool (5th tool)" },
      { category: "Added", text: "URL hash sample sharing (#example/<id>)" },
      { category: "Added", text: "Line numbers in demo output" },
      {
        category: "Added",
        text: "TR-locale fixtures (TC Kimlik + +90 + mahalle/ilçe/il)",
      },
      { category: "Added", text: "TR Üyelik sample" },
      { category: "Added", text: "EN/TR toggle" },
    ],
  },
  {
    version: "v0.1.4",
    date: "2026-05-21",
    title: "MCP server & install experience",
    items: [
      {
        category: "Added",
        text: "MCP server (apps/mcp) — 4 tools, Streamable HTTP, Bearer auth",
      },
      {
        category: "Added",
        text: "Install block on landing (Cursor 1-click / Claude Code / Manual)",
      },
      { category: "Added", text: "GitHub stars badge" },
      { category: "Added", text: "Open Graph image + branded favicons" },
      { category: "Added", text: "FAQ section (8 questions)" },
    ],
  },
  {
    version: "v0.1.3",
    date: "2026-05-21",
    title: "Demo widget v2 & theming",
    items: [
      {
        category: "Added",
        text: "Demo widget v2 (4 sample picker, syntax highlight, schema view, download)",
      },
      { category: "Added", text: "Theme toggle (light/dark)" },
      { category: "Added", text: "\"How it works\" section" },
    ],
  },
  {
    version: "v0.1.2",
    date: "2026-05-21",
    title: "testgen-core & interactive demo",
    items: [
      {
        category: "Added",
        text: "testgen-core package (parseHtmlForm + generatePlaywrightTests)",
      },
      { category: "Added", text: "Interactive demo widget on landing" },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-05-21",
    title: "Initial public preview",
    items: [
      {
        category: "Added",
        text: "Initial public preview — Next-Forge bootstrap, Linear/Cursor design system, Vercel deploy",
      },
    ],
  },
];

function CategoryLabel({ category }: { category: EntryCategory }) {
  return (
    <span className="mr-2 inline-block min-w-[64px] font-mono text-xs uppercase tracking-wider text-muted-foreground">
      {category}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <header className="mb-16">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Changelog
        </h1>
        <p className="mt-3 text-muted-foreground">What shipped, when</p>
      </header>

      <div>
        {entries.map((entry, index) => (
          <article
            key={entry.version}
            className={
              index === 0
                ? "grid grid-cols-1 gap-6 sm:grid-cols-[180px_1fr]"
                : "mt-8 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-[180px_1fr]"
            }
          >
            <div className="flex flex-col gap-2">
              <time
                dateTime={entry.date}
                className="font-mono text-xs text-muted-foreground"
              >
                {entry.date}
              </time>
              <span className="inline-block w-fit rounded-full border border-border bg-secondary/30 px-2 py-0.5 font-mono text-xs text-foreground">
                {entry.version}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {entry.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {entry.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-foreground/90"
                  >
                    <CategoryLabel category={item.category} />
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
