import type { MetadataRoute } from "next";

const BASE_URL = "https://mehenk-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/changelog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/docs", changeFrequency: "weekly", priority: 0.9 },
    { path: "/docs/install", changeFrequency: "monthly", priority: 0.7 },
    { path: "/docs/mcp", changeFrequency: "monthly", priority: 0.8 },
    { path: "/docs/tools", changeFrequency: "monthly", priority: 0.7 },
    { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/legal/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/legal/kvkk", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
