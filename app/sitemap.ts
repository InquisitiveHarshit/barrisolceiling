import type { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import Blog from "@/models/Blog";

const BASE = "https://barrisolceiling.com";

// Static pages with their priorities and change frequencies
const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url: BASE,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${BASE}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE}/service`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${BASE}/gallery`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE}/contact`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  },
  {
    url: `${BASE}/privacypolicy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE}/termscondition`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  // ── Service detail pages ──────────────────────────────
  const services = await Service.find(
    { isPublished: true },
    { slug: 1, updatedAt: 1 }
  ).lean();

  const serviceUrls: MetadataRoute.Sitemap = services.map((s: any) => ({
    url: `${BASE}/service-detail/${s.slug}`,
    lastModified: s.updatedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Blog detail pages ─────────────────────────────────
  const blogs = await Blog.find(
    { isPublished: true },
    { slug: 1, updatedAt: 1 }
  ).lean();

  const blogUrls: MetadataRoute.Sitemap = blogs.map((b: any) => ({
    url: `${BASE}/blog-details/${b.slug}`,
    lastModified: b.updatedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...STATIC_PAGES, ...serviceUrls, ...blogUrls];
}
