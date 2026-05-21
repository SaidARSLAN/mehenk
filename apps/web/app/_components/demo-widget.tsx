"use client";

import { useEffect, useState } from "react";
import { SAMPLES, type Sample } from "./samples";

type Field = {
  type: string;
  label: string;
  required: boolean;
  selector: string;
};

type Result = {
  schema: { fields: Field[]; submitSelector: string | null };
  test: { filename: string; language: string; code: string };
};

export function DemoWidget() {
  const [activeSample, setActiveSample] = useState<Sample>(SAMPLES[0]);
  const [html, setHtml] = useState(SAMPLES[0].html);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState(false);
  const [locale, setLocale] = useState<"en" | "tr">("en");

  // Hydrate from URL hash on mount: #example/<sample-id>
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.location.hash.match(/example\/([\w-]+)/);
    if (!m) return;
    const s = SAMPLES.find((x) => x.id === m[1]);
    if (s) {
      setActiveSample(s);
      setHtml(s.html);
      if (s.id === "tr-uyelik") setLocale("tr");
      // Smooth scroll to the demo so the deep link feels useful
      requestAnimationFrame(() => {
        document.getElementById("demo")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, []);

  const pickSample = (s: Sample) => {
    setActiveSample(s);
    setHtml(s.html);
    setResult(null);
    setError(null);
    setTouched(false);
    if (s.id === "tr-uyelik") setLocale("tr");
    // Reflect selection in the URL without re-render
    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}#example/${s.id}`,
      );
    }
  };

  const shareLink = async () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#example/${activeSample.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const generate = async () => {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html,
          testName: `${activeSample.id} form`,
          baseUrl: "http://localhost:3000",
          locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed.");
      } else {
        setResult(data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.test.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob([result.test.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.test.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Try it now
        </h2>
        <p className="mt-2 text-muted-foreground">
          Pick a sample or paste your own. Get a Playwright spec in
          milliseconds.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          fixtures
        </span>
        <div className="inline-flex overflow-hidden rounded-full border border-border bg-secondary/30 text-xs">
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`px-3 py-1 transition-colors ${
              locale === "en"
                ? "bg-violet-500/20 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🇺🇸 EN
          </button>
          <button
            type="button"
            onClick={() => setLocale("tr")}
            className={`px-3 py-1 transition-colors ${
              locale === "tr"
                ? "bg-violet-500/20 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🇹🇷 TR
          </button>
        </div>
        {locale === "tr" && (
          <span className="font-mono text-[10px] text-muted-foreground/80">
            TC kimlik (checksum-valid) · +90 · mahalle/ilçe/il
          </span>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {SAMPLES.map((s) => {
          const active = s.id === activeSample.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => pickSample(s)}
              className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all ${
                active
                  ? "border-violet-500/50 bg-violet-500/10 text-foreground"
                  : "border-border bg-secondary/30 text-muted-foreground hover:border-border/80 hover:text-foreground"
              }`}
            >
              <span className="font-medium">{s.label}</span>
              <span
                className={`hidden text-xs sm:inline ${
                  active ? "text-muted-foreground" : "text-muted-foreground/60"
                }`}
              >
                {s.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              input · html
            </span>
            {touched && (
              <button
                type="button"
                onClick={() => {
                  setHtml(activeSample.html);
                  setTouched(false);
                }}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                reset to sample
              </button>
            )}
          </div>
          <textarea
            value={html}
            onChange={(e) => {
              setHtml(e.target.value);
              setTouched(true);
            }}
            spellCheck={false}
            className="h-72 w-full resize-none rounded-md border border-border bg-background/60 p-3 font-mono text-xs leading-relaxed outline-none ring-violet-500/40 transition-all focus:ring-2"
          />
          <button
            type="button"
            onClick={generate}
            disabled={busy || html.trim().length < 20}
            className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-foreground text-sm font-medium text-background transition-all hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(124,92,255,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {busy ? (
              <>
                <Spinner />
                Generating…
              </>
            ) : (
              <>
                Generate Playwright test
                <ArrowRight />
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              output · {result?.test.filename ?? "playwright spec"}
            </span>
            {result && (
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={shareLink}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  title="Copy share-link to this sample"
                >
                  ↗ share
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  ↓ download
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? "copied ✓" : "copy"}
                </button>
              </div>
            )}
          </div>
          <div className="relative h-72 w-full overflow-auto rounded-md border border-border bg-background/60 font-mono text-xs leading-relaxed">
            {error ? (
              <div className="p-3 text-red-400">⨯ {error}</div>
            ) : result ? (
              <HighlightedCode code={result.test.code} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Sparkle />
                  <p className="mt-3 text-sm">
                    Click "Generate" to see the spec here.
                  </p>
                </div>
              </div>
            )}
          </div>
          {result && (
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <Stat label="fields" value={result.schema.fields.length} />
              <Stat
                label="required"
                value={result.schema.fields.filter((f) => f.required).length}
              />
              <Stat
                label="tests"
                value={(result.test.code.match(/test\(/g) ?? []).length}
              />
            </div>
          )}
        </div>
      </div>

      {result && (
        <SchemaView fields={result.schema.fields} />
      )}
    </div>
  );
}

function SchemaView({ fields }: { fields: Field[] }) {
  return (
    <div className="mt-6 rounded-lg border border-border bg-secondary/20 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          parsed schema
        </span>
        <span className="font-mono text-xs text-muted-foreground/60">
          {fields.length} field{fields.length === 1 ? "" : "s"} detected
        </span>
      </div>
      <div className="grid gap-2">
        {fields.map((f, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-background/40 px-3 py-2"
          >
            <span className="font-mono text-xs text-violet-300">{f.type}</span>
            <span className="text-sm">{f.label}</span>
            {f.required && (
              <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
                required
              </span>
            )}
            <span className="ml-auto font-mono text-xs text-muted-foreground/70">
              {f.selector}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HighlightedCode({ code }: { code: string }) {
  // Tokenize, then walk tokens splitting on newlines so we can emit line numbers.
  const tokens = highlight(code);
  const lines: { gutter: number; spans: Token[] }[] = [{ gutter: 1, spans: [] }];
  for (const tok of tokens) {
    const parts = tok.text.split("\n");
    parts.forEach((part, i) => {
      if (part.length > 0) {
        lines[lines.length - 1].spans.push({ text: part, cls: tok.cls });
      }
      if (i < parts.length - 1) {
        lines.push({ gutter: lines.length + 1, spans: [] });
      }
    });
  }
  return (
    <div className="overflow-auto font-mono text-xs leading-relaxed">
      <div className="flex">
        <div
          aria-hidden
          className="sticky left-0 select-none border-r border-border bg-background/80 px-2 py-3 text-right text-muted-foreground/40"
        >
          {lines.map((l) => (
            <div key={l.gutter} className="tabular-nums">
              {l.gutter}
            </div>
          ))}
        </div>
        <pre className="flex-1 whitespace-pre p-3 text-foreground/85">
          {lines.map((l, lineIdx) => (
            <div key={lineIdx}>
              {l.spans.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                l.spans.map((t, i) => (
                  <span key={i} className={t.cls}>
                    {t.text}
                  </span>
                ))
              )}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

type Token = { text: string; cls: string };

const TS_KEYWORDS = new Set([
  "import",
  "from",
  "const",
  "let",
  "var",
  "async",
  "await",
  "function",
  "return",
  "if",
  "else",
  "true",
  "false",
  "null",
  "undefined",
  "new",
  "this",
  "type",
  "interface",
  "export",
  "default",
  "as",
  "of",
  "in",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "continue",
  "try",
  "catch",
  "finally",
  "throw",
  "require",
]);

function highlight(code: string): Token[] {
  const tokens: Token[] = [];
  const re =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|\s+|[^\w\s])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    const t = m[0];
    if (t.startsWith("//") || t.startsWith("/*")) {
      tokens.push({ text: t, cls: "text-muted-foreground/55 italic" });
    } else if (t.startsWith("\"") || t.startsWith("'") || t.startsWith("`")) {
      tokens.push({ text: t, cls: "text-emerald-300/90" });
    } else if (/^\d/.test(t)) {
      tokens.push({ text: t, cls: "text-amber-300/90" });
    } else if (TS_KEYWORDS.has(t)) {
      tokens.push({ text: t, cls: "text-violet-300" });
    } else if (/^[A-Z]/.test(t)) {
      tokens.push({ text: t, cls: "text-cyan-300/90" });
    } else if (/^\w+$/.test(t)) {
      tokens.push({ text: t, cls: "text-foreground/85" });
    } else {
      tokens.push({ text: t, cls: "text-muted-foreground/70" });
    }
  }
  return tokens;
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-background/40 px-3 py-2">
      <div className="font-mono text-lg font-semibold tabular-nums">
        {value}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
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

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 animate-spin"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M12 2 a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mx-auto h-8 w-8 text-violet-400/60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 3 L13.5 9 L19 10 L13.5 11 L12 17 L10.5 11 L5 10 L10.5 9 Z" />
    </svg>
  );
}
