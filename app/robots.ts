import type { MetadataRoute } from "next";

const BASE = "https://barrisolceiling.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all well-behaved crawlers full access
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",       // admin panel
          "/api/",         // API routes
          "/_next/",       // Next.js internals
        ],
      },
      {
        // Block GPTBot (OpenAI) — remove if you want ChatGPT to index
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        // Block Claude's crawler — remove if you want Anthropic to index
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        // Block common AI scrapers
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
