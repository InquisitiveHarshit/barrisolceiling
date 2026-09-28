import type { MetadataRoute } from "next";

const BASE = "https://barrisolceiling.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Default: all crawlers may access the site except private areas ──
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image"],
        disallow: ["/admin/", "/api/", "/_next/data/"],
      },

      // ── AI assistants & AI search ──────────────────────────────────────
      // These fetch pages when a person asks about the site — allow them.
      {
        userAgent: "Claude-User",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },

      // ── AI training-only crawlers (blocked) ───────────────────────────
      // CCBot and Bytespider are pure training scrapers — keep them out.
      { userAgent: "CCBot",      disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },

      // ── AI assistants that read/index for users ────────────────────────
      // GPTBot: ChatGPT browsing — allow so ChatGPT can answer about us.
      { userAgent: "GPTBot",          allow: "/", disallow: ["/admin/", "/api/"] },
      // ClaudeBot: Claude reading — allow so Claude can read the site.
      { userAgent: "ClaudeBot",       allow: "/", disallow: ["/admin/", "/api/"] },
      // Google-Extended: Gemini/SGE — allow so Google AI can surface us.
      { userAgent: "Google-Extended", allow: "/", disallow: ["/admin/", "/api/"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
