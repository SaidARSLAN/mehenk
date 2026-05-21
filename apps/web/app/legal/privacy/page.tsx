import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — mehenk",
  description:
    "How mehenk handles your data: what we collect, what we do not, and your rights under GDPR and KVKK.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm text-muted-foreground">Effective date: 2026-05-21</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          mehenk is a developer tool that turns HTML you paste into test code. This
          policy explains, in plain language, what data the service touches and what
          it does not.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">What we collect</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          The HTML snippet you paste into the demo is sent to our generation
          endpoint, used to produce a test artifact, and then discarded. We do not
          persist your input. We collect basic, aggregated traffic metrics through
          Vercel Analytics (page views, country, device class) — no personal
          identifiers.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">What we don&apos;t collect</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          During beta there is no signup, no account, no profile. We do not set
          tracking cookies. We do not fingerprint your browser. We do not sell or
          share data with advertisers — there are no advertisers.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Third parties</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          We rely on a small set of processors to operate the service:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground leading-relaxed">
          <li>
            <span className="text-foreground">Vercel</span> — hosting and edge
            delivery.
          </li>
          <li>
            <span className="text-foreground">GitHub</span> — source hosting; OAuth
            sign-in is planned for a future release and will be opt-in.
          </li>
          <li>
            <span className="text-foreground">PostHog</span> — optional,
            cookieless product analytics; only enabled if you have not opted out at
            the browser level (DNT / GPC respected).
          </li>
        </ul>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Data residency</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Today the service runs on Vercel&apos;s <code>iad1</code> region (US East).
          A Turkey (TR) region deployment is planned for the V1 milestone to align
          with KVKK data-locality preferences. We will update this page when the TR
          deployment goes live.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Your rights</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Under the GDPR (EU/EEA) and the KVKK (Turkey), you may request access to,
          correction of, deletion of, or a portable export of any personal data we
          hold about you. Because beta does not produce user accounts, in practice
          this applies only to optional waitlist emails. Send requests to{" "}
          <a
            href="mailto:contact@mehenk.dev"
            className="text-violet-400 underline decoration-violet-400/60 underline-offset-4 transition hover:text-violet-300"
          >
            contact@mehenk.dev
          </a>
          .
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Children</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          mehenk is a tool for software engineers. It is not directed at, and not
          intended for, children under the age of 16.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Changes to this policy</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Material changes will be announced at least 30 days before they take
          effect, via the project website and (when applicable) the waitlist email
          list.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Questions, requests, or disclosures:{" "}
          <a
            href="mailto:contact@mehenk.dev"
            className="text-violet-400 underline decoration-violet-400/60 underline-offset-4 transition hover:text-violet-300"
          >
            contact@mehenk.dev
          </a>
          .
        </p>

        <hr className="mt-16 border-border" />
        <div className="mt-8 flex items-center justify-between text-sm">
          <Link
            href="/"
            className="text-violet-400 underline decoration-violet-400/60 underline-offset-4 transition hover:text-violet-300"
          >
            ← Back to home
          </Link>
          <span className="text-xs text-muted-foreground">
            Last updated: 2026-05-21
          </span>
        </div>
      </article>
    </main>
  );
}
