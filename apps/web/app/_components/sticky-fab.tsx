"use client";

/**
 * Client component — sticky "Try it now" floating action button.
 *
 * Behavior:
 * - Hidden until the user scrolls past 600px AND the `#demo` element is
 *   off-screen.
 * - Click smoothly scrolls to the `#demo` section.
 * - Respects `prefers-reduced-motion` for both the fade transition and the
 *   scroll behavior.
 * - Anchored to the bottom-right with safe-area insets so it doesn't sit
 *   under the iOS home indicator.
 */

import { useEffect, useState } from "react";

export function StickyFab() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const demo = document.getElementById("demo");

    const compute = () => {
      const scrolledEnough = window.scrollY > 600;
      if (!scrolledEnough) {
        setShow(false);
        return;
      }
      if (!demo) {
        setShow(true);
        return;
      }
      const rect = demo.getBoundingClientRect();
      const offscreen =
        rect.bottom < 0 || rect.top > window.innerHeight;
      setShow(offscreen);
    };

    let observer: IntersectionObserver | null = null;
    if (demo) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          const scrolledEnough = window.scrollY > 600;
          setShow(!entry.isIntersecting && scrolledEnough);
        },
        { threshold: 0.05 },
      );
      observer.observe(demo);
    }

    const onScroll = () => compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    compute();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleClick = () => {
    const demo = document.getElementById("demo");
    if (!demo) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    demo.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Jump to demo"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      data-visible={show ? "true" : "false"}
      className={[
        "fixed z-50",
        "right-[max(1.5rem,env(safe-area-inset-right))]",
        "bottom-[max(1.5rem,env(safe-area-inset-bottom))]",
        "inline-flex items-center gap-2 rounded-full",
        "bg-foreground text-background",
        "px-4 py-3 text-sm font-medium",
        "shadow-lg shadow-violet-500/25",
        "ring-1 ring-foreground/10",
        "transition-[opacity,transform,box-shadow] duration-200 ease-out",
        "hover:shadow-xl hover:shadow-violet-500/40 hover:ring-2 hover:ring-violet-500/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none",
        mounted && show
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
    >
      <span>Try it now</span>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
