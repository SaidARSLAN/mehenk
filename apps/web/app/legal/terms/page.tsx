import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — mehenk",
  description:
    "Terms governing your use of mehenk during the public beta, including acceptable use, output ownership, and liability.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm text-muted-foreground">Effective date: 2026-05-21</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          These terms govern your use of mehenk (the &ldquo;Service&rdquo;). By
          accessing the Service you agree to them. If you do not agree, do not use
          the Service.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Beta status</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          mehenk is currently in public beta. It is provided free of charge for
          evaluation purposes. There is no service-level agreement: the Service may
          be slow, may be temporarily unavailable, and may change without notice.
          Do not rely on it as a production dependency.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Acceptable use</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          You agree not to:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground leading-relaxed">
          <li>scrape, mirror, or systematically harvest the Service or its output;</li>
          <li>
            send traffic intended to degrade availability (DDoS, sustained
            high-rate automation, abusive retries);
          </li>
          <li>
            paste personally identifiable information (PII), secrets, or confidential
            third-party content into examples that may be shared publicly;
          </li>
          <li>
            use the Service to build content that violates applicable law or
            third-party rights.
          </li>
        </ul>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Ownership of output</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          You own the test code mehenk generates from your input. We claim no
          rights in it. You are responsible for reviewing, testing, and licensing
          that output before shipping it.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">No warranty</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          The Service is provided <span className="text-foreground">AS IS</span>{" "}
          and <span className="text-foreground">AS AVAILABLE</span>, without
          warranties of any kind, express or implied, including merchantability,
          fitness for a particular purpose, and non-infringement. Generated code
          may contain bugs, security issues, or hallucinated APIs — review it.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Limitation of liability</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          To the maximum extent permitted by law, mehenk&apos;s total aggregate
          liability arising out of or in connection with the Service is capped at{" "}
          <span className="text-foreground">USD $50</span>. We are not liable for
          indirect, incidental, consequential, or punitive damages.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Termination</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          We may suspend or terminate access at any time, for any reason — for
          example, to mitigate abuse or to wind down the beta. You may stop using
          the Service at any time.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Governing law</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          These terms are governed by the laws of the Republic of Türkiye. The
          courts of Istanbul (Çağlayan) have exclusive jurisdiction over any
          dispute arising from them, subject to any non-waivable consumer
          protections in your country of residence.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Modifications</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          We may update these terms. Material changes will be announced on the
          website. Continued use of the Service after a change takes effect
          constitutes acceptance.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Questions:{" "}
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
