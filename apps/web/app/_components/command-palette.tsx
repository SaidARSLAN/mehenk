"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CommandAction = {
  id: string;
  label: string;
  hint?: string;
  kbd?: string;
  icon?: string;
  run: () => void;
};

function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.hash = hash;
  }
}

function clickSamplePill(label: string) {
  const buttons = Array.from(
    document.querySelectorAll<HTMLElement>(
      "button, [role='button'], [data-sample]",
    ),
  );
  const match = buttons.find((btn) => {
    const text = (btn.textContent || "").trim().toLowerCase();
    const data = (btn.getAttribute("data-sample") || "").toLowerCase();
    const target = label.toLowerCase();
    return text === target || data === target || text.includes(target);
  });
  if (match) {
    match.click();
    scrollToHash("#demo");
  } else {
    scrollToHash("#demo");
  }
}

function buildActions(close: () => void): CommandAction[] {
  const wrap = (fn: () => void) => () => {
    fn();
    close();
  };
  return [
    {
      id: "try-demo",
      label: "Try the demo",
      hint: "Scroll to the live demo widget",
      kbd: "D",
      icon: "▶",
      run: wrap(() => scrollToHash("#demo")),
    },
    {
      id: "sample-signup",
      label: "Pick sample: Signup",
      hint: "Load the signup form sample",
      icon: "✦",
      run: wrap(() => clickSamplePill("Signup")),
    },
    {
      id: "sample-login",
      label: "Pick sample: Login",
      hint: "Load the login form sample",
      icon: "✦",
      run: wrap(() => clickSamplePill("Login")),
    },
    {
      id: "sample-contact",
      label: "Pick sample: Contact",
      hint: "Load the contact form sample",
      icon: "✦",
      run: wrap(() => clickSamplePill("Contact")),
    },
    {
      id: "sample-checkout",
      label: "Pick sample: Checkout",
      hint: "Load the checkout form sample",
      icon: "✦",
      run: wrap(() => clickSamplePill("Checkout")),
    },
    {
      id: "sample-tr",
      label: "Pick sample: TR Üyelik",
      hint: "Load the Turkish membership form sample",
      icon: "✦",
      run: wrap(() => clickSamplePill("TR Üyelik")),
    },
    {
      id: "toggle-theme",
      label: "Toggle theme",
      hint: "Switch between light and dark mode",
      kbd: "T",
      icon: "☾",
      run: wrap(() => {
        window.dispatchEvent(new CustomEvent("mehenk:theme-toggle"));
      }),
    },
    {
      id: "open-github",
      label: "Open GitHub",
      hint: "View the mehenk repository",
      kbd: "G",
      icon: "★",
      run: wrap(() => {
        window.open(
          "https://github.com/SaidARSLAN/mehenk",
          "_blank",
          "noopener,noreferrer",
        );
      }),
    },
    {
      id: "open-docs",
      label: "Open Docs",
      hint: "Read the documentation",
      kbd: "?",
      icon: "📖",
      run: wrap(() => {
        window.location.href = "/docs";
      }),
    },
    {
      id: "open-install",
      label: "Open MCP install",
      hint: "Jump to the installation block",
      kbd: "I",
      icon: "⬇",
      run: wrap(() => scrollToHash("#install")),
    },
  ];
}

export function useCommandPaletteShortcut(onToggle: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modifier = isMac ? e.metaKey : e.ctrlKey;
      if (modifier && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onToggle]);
}

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const actions = useMemo(() => buildActions(onClose), [onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((action) => {
      const haystack = `${action.label} ${action.hint ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [actions, query]);

  // Reset query + selection when opened.
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      // Defer focus so the element exists.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Clamp selection when filter shrinks the list.
  useEffect(() => {
    if (selectedIndex >= filtered.length) {
      setSelectedIndex(Math.max(0, filtered.length - 1));
    }
  }, [filtered.length, selectedIndex]);

  // Scroll selected item into view.
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector<HTMLElement>(
      `[data-cmd-index="${selectedIndex}"]`,
    );
    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (filtered.length === 0 ? 0 : (i + 1) % filtered.length));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) =>
          filtered.length === 0 ? 0 : (i - 1 + filtered.length) % filtered.length,
        );
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const action = filtered[selectedIndex];
        if (action) action.run();
        return;
      }
    },
    [filtered, selectedIndex, onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-center pt-24">
        <div className="w-full max-w-xl rounded-xl border border-border bg-secondary/95 shadow-2xl overflow-hidden">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search…"
            className="block w-full h-12 px-4 bg-transparent border-b border-border outline-none placeholder:text-muted-foreground text-foreground"
            aria-label="Command palette search"
            autoComplete="off"
            spellCheck={false}
          />

          <ul
            ref={listRef}
            role="listbox"
            aria-label="Commands"
            className="max-h-80 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </li>
            ) : (
              filtered.map((action, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li
                    key={action.id}
                    data-cmd-index={idx}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => action.run()}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm ${
                      isSelected ? "bg-secondary/60" : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 items-center justify-center text-base text-muted-foreground"
                    >
                      {action.icon ?? "›"}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-foreground truncate">
                        {action.label}
                      </span>
                      {action.hint ? (
                        <span className="block text-xs text-muted-foreground truncate">
                          {action.hint}
                        </span>
                      ) : null}
                    </span>
                    {action.kbd ? (
                      <kbd className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded border border-border px-1.5 text-[10px] font-medium text-muted-foreground">
                        {action.kbd}
                      </kbd>
                    ) : null}
                  </li>
                );
              })
            )}
          </ul>

          <div className="flex justify-end px-4 py-2 text-xs text-muted-foreground border-t border-border">
            <span>↑↓ navigate · ↵ select · Esc close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
