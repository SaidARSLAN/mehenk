"use client";

import { useState } from "react";
import {
  CommandPalette,
  useCommandPaletteShortcut,
} from "./command-palette";

export function CommandPaletteHost() {
  const [open, setOpen] = useState(false);
  useCommandPaletteShortcut(() => setOpen((v) => !v));
  return <CommandPalette open={open} onClose={() => setOpen(false)} />;
}
