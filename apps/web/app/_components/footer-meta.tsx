/**
 * Server component — small footer status strip showing operational state,
 * last shipped timestamp, version, and runtime. Static metadata; update the
 * constants below when shipping a new release.
 */

const VERSION = "v0.1.5";
// ISO date for the last ship; the visible label is "2 hours ago".
const LAST_SHIPPED_ISO = "2026-05-21T10:00:00Z";
const LAST_SHIPPED_LABEL = "2 hours ago";

export function FooterMeta() {
  return (
    <div
      role="contentinfo"
      aria-label="System status"
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
    >
      <span className="inline-flex items-center gap-2">
        <span className="relative inline-flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>Operational</span>
        <span className="sr-only">— all systems normal</span>
      </span>

      <span aria-hidden="true">·</span>

      <span className="inline-flex items-center gap-1">
        <span>Last shipped</span>
        <time dateTime={LAST_SHIPPED_ISO}>{LAST_SHIPPED_LABEL}</time>
      </span>

      <span aria-hidden="true">·</span>

      <span className="inline-flex items-center rounded-full border border-border/60 bg-secondary/30 px-2 py-0.5 font-mono tabular-nums text-[0.7rem] text-foreground/80">
        {VERSION}
      </span>

      <span aria-hidden="true">·</span>

      <span className="inline-flex items-center gap-1.5">
        <NextTriangle />
        <span>Built on Next.js</span>
      </span>
    </div>
  );
}

function NextTriangle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 text-foreground/70"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 4 L19 12 L5 20 Z" />
    </svg>
  );
}
