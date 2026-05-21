/**
 * Server component — fetches the current star count from GitHub once per
 * minute (revalidate) so the badge stays fresh without runtime calls per
 * visitor. Falls back gracefully on error (badge renders without a count).
 */

const REPO = "SaidARSLAN/mehenk";

async function fetchStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}

export async function GitHubStars() {
  const stars = await fetchStars();
  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-border/80 hover:text-foreground"
    >
      <Star />
      <span className="font-mono">{REPO}</span>
      {stars != null && (
        <span className="rounded-full bg-background/60 px-1.5 font-mono tabular-nums">
          ★ {stars}
        </span>
      )}
    </a>
  );
}

function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
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
