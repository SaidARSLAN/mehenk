import Link from "next/link";
import { Suspense } from "react";
import { DemoWidget } from "./_components/demo-widget";
import { FAQ } from "./_components/faq";
import { GitHubStars } from "./_components/github-stars";
import { InstallBlock } from "./_components/install-block";
import { ThemeToggle } from "./_components/theme-toggle";

export default function HomePage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <BackgroundGradient />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold tracking-tight">mehenk</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="#demo"
            className="hidden transition-colors hover:text-foreground sm:inline"
          >
            Demo
          </Link>
          <Link
            href="#install"
            className="hidden transition-colors hover:text-foreground sm:inline"
          >
            Install
          </Link>
          <Link
            href="#faq"
            className="hidden transition-colors hover:text-foreground md:inline"
          >
            FAQ
          </Link>
          <a
            href="https://github.com/SaidARSLAN/mehenk"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <ThemeToggle />
          <Link
            href="#waitlist"
            className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Join waitlist
          </Link>
        </nav>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-100 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            Open beta · free for early users
          </div>
          <Suspense fallback={null}>
            <GitHubStars />
          </Suspense>
        </div>

        <h1 className="font-sans text-5xl font-semibold tracking-tighter sm:text-7xl">
          The touchstone <br />
          <span className="bg-gradient-to-br from-violet-300 via-cyan-300 to-violet-500 bg-clip-text text-transparent">
            for your tests.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Paste a form, get a typed Playwright spec in{" "}
          <span className="text-foreground">~1.8s</span>. Drop into Claude Code
          or Cursor over MCP. The only generator that ships{" "}
          <span className="text-foreground">Turkish-locale fixtures</span> —
          TC Kimlik, +90, mahalle/ilçe/il — out of the box.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#demo"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-all hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(124,92,255,0.5)]"
          >
            Try it live
            <ArrowRight />
          </Link>
          <a
            href="https://github.com/SaidARSLAN/mehenk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Star />
            Star on GitHub
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span>Built for</span>
            <span className="font-mono text-foreground/80">Claude Code</span>
            <span>·</span>
            <span className="font-mono text-foreground/80">Cursor</span>
            <span>·</span>
            <span className="font-mono text-foreground/80">Copilot</span>
          </span>
          <span>·</span>
          <Stat label="median gen" value="1.8s" />
          <Stat label="p95" value="3.5s" />
          <Stat label="MCP tools" value="5" />
          <Stat label="locales" value="2" />
        </div>
      </section>

      <div id="demo" className="scroll-mt-24">
        <DemoWidget />
      </div>

      <InstallBlock />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-2 text-muted-foreground">
            Three steps. No setup. No subscription.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Step
            n="01"
            title="Drop HTML in"
            desc="Paste any <form> markup, point to a component file, or let your AI agent send it over MCP."
          />
          <Step
            n="02"
            title="Get a Playwright spec"
            desc="Smart selectors (id > name > label), happy path, edge cases for every required field, and validation traps for emails, URLs, and numbers."
          />
          <Step
            n="03"
            title="Run it in your CI"
            desc="Drop the spec into your existing Playwright pipeline. Anti-flaky engine warns on stale locators. TR-locale fixtures roll out in v0.2."
          />
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Why mehenk
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="MCP-native"
            description="Drop into Claude Code, Cursor, or any MCP-aware agent. Four tools out of the box: generate, analyze, suggest, validate."
            mono="claude mcp add mehenk"
          />
          <Feature
            title="Anti-flaky engine"
            description="Detect patterns that cause intermittent failures. Auto-heal locators and race conditions before they ship."
            mono="mehenk heal ./e2e/login.spec.ts"
          />
          <Feature
            title="TR-locale fixtures"
            description="Geçerli checksum'lu TC kimlik, +90 telefon, mahalle/ilçe/il hiyerarşisi. Faker.js TR-locale eksiğini kapatır."
            mono='import { tr } from "@mehenk/fixtures"'
          />
        </div>
      </section>

      <FAQ />

      <footer
        id="waitlist"
        className="relative z-10 mx-auto max-w-3xl px-6 pb-24 text-center"
      >
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Early access waitlist
        </h2>
        <p className="mt-3 text-muted-foreground">
          Drop your email — we'll ping you when the first MCP build is signed.
        </p>
        <form
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          action="https://formspree.io/f/placeholder"
          method="POST"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@yourstudio.com"
            className="h-11 flex-1 rounded-md border border-border bg-background/60 px-4 text-sm outline-none ring-violet-500/40 backdrop-blur transition-all focus:ring-2"
            autoComplete="email"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Notify me
          </button>
        </form>
        <p className="mt-10 text-xs text-muted-foreground">
          © 2026 mehenk · Mihenk taşı ·{" "}
          <a
            href="https://github.com/SaidARSLAN/mehenk"
            className="underline-offset-2 hover:underline"
          >
            github.com/SaidARSLAN/mehenk
          </a>
        </p>
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="font-mono text-foreground/80 tabular-nums">
        {value}
      </span>
      <span className="text-muted-foreground/70">{label}</span>
    </span>
  );
}

function Step({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-secondary/30 p-6">
      <div className="font-mono text-xs text-muted-foreground">{n}</div>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>
    </article>
  );
}

function Feature({
  title,
  description,
  mono,
}: {
  title: string;
  description: string;
  mono: string;
}) {
  return (
    <article className="group rounded-lg border border-border bg-secondary/30 p-6 transition-all hover:border-border/80 hover:bg-secondary/50">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <pre className="mt-5 overflow-x-auto rounded-md border border-border bg-background/60 p-3 font-mono text-xs text-foreground/80">
        {mono}
      </pre>
    </article>
  );
}

function BackgroundGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
      <div className="absolute top-40 left-1/4 h-[300px] w-[500px] rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,transparent,var(--color-background))]" />
    </div>
  );
}

function Logo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        d="M3 18 L12 4 L21 18 Z"
        className="text-violet-400"
        strokeLinejoin="round"
      />
      <path d="M8 14 L16 14" strokeLinecap="round" />
    </svg>
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

function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path
        d="M12 3 L14.5 9 L21 9.5 L16 14 L17.5 20.5 L12 17 L6.5 20.5 L8 14 L3 9.5 L9.5 9 Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
