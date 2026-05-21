import type { ReactNode } from "react";

export const metadata = {
  title: "mehenk MCP server",
  description: "MCP-native test forge — agent endpoint.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
