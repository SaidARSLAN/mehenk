"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Getting Started", href: "/docs" },
  { label: "Install", href: "/docs/install" },
  { label: "MCP setup", href: "/docs/mcp" },
  { label: "Tools reference", href: "/docs/tools" },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-4 py-6">
      <div className="mb-3 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Documentation
      </div>
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href ||
              (item.href !== "/docs" && pathname?.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`-ml-px block border-l-2 px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "border-violet-500 bg-secondary/50 text-foreground"
                : "border-transparent text-muted-foreground hover:bg-secondary/30 hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary/30 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground lg:hidden"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-semibold tracking-tight">mehenk</span>
              <span className="text-muted-foreground">/ docs</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <a
              href="https://github.com/SaidARSLAN/mehenk"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-[240px] shrink-0 border-r border-border lg:block">
          <div className="sticky top-[65px] max-h-[calc(100dvh-65px)] overflow-y-auto">
            <SidebarNav />
          </div>
        </aside>

        {open ? (
          <div className="fixed inset-0 z-30 lg:hidden" role="dialog" aria-modal="true">
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <aside className="absolute left-0 top-0 h-full w-[240px] border-r border-border bg-background shadow-xl">
              <SidebarNav onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        ) : null}

        <main className="min-w-0 flex-1 px-6 py-10 lg:px-12 lg:py-14">
          <article className="mx-auto max-w-3xl">{children}</article>
        </main>
      </div>
    </div>
  );
}
