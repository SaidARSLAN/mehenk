import "@repo/design-system/styles/globals.css";
import { fonts } from "@repo/design-system/lib/fonts";
import { ThemeProvider } from "@repo/design-system/providers/theme";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "mehenk — AI test forge for Playwright",
  description:
    "AI-powered Playwright test generation for developers and AI agents. MCP-native, TR-locale aware.",
  metadataBase: new URL("https://mehenk-web.vercel.app"),
  openGraph: {
    title: "mehenk — The touchstone for your tests",
    description:
      "AI-powered Playwright test generation. Built for developers and AI agents.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={fonts}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
