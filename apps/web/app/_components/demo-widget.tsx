"use client";

import { useState } from "react";

const SAMPLE_HTML = `<form action="/api/signup" method="POST" id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required placeholder="you@studio.com" />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required minlength="8" />

  <label>
    <input type="checkbox" name="newsletter" /> Subscribe to weekly digest
  </label>

  <button id="submit" type="submit">Create account</button>
</form>`;

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
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

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
          testName: "form submission",
          baseUrl: "http://localhost:3000",
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

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Try it now
        </h2>
        <p className="mt-2 text-muted-foreground">
          Paste any HTML <code className="font-mono text-foreground/80">&lt;form&gt;</code>{" "}
          — get a Playwright spec in milliseconds.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              input · html
            </span>
            <button
              type="button"
              onClick={() => setHtml(SAMPLE_HTML)}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              reset to sample
            </button>
          </div>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
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
              <button
                type="button"
                onClick={copy}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied ? "copied ✓" : "copy"}
              </button>
            )}
          </div>
          <div className="relative h-72 w-full overflow-auto rounded-md border border-border bg-background/60 p-3 font-mono text-xs leading-relaxed">
            {error ? (
              <div className="text-red-400">⨯ {error}</div>
            ) : result ? (
              <pre className="whitespace-pre-wrap text-foreground/90">
                {result.test.code}
              </pre>
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
    </div>
  );
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
