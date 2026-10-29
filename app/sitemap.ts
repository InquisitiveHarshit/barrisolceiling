import type { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import Blog from "@/models/Blog";
import { GalleryImage } from "@/models/GalleryImage";
import { toBarrisolUrl } from "@/lib/media";

// Force Next.js to dynamically evaluate the sitemap on each request
// instead of baking it into a static file at build time.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://barrisolceiling.com").replace(/\/$/, "");

/**
 * Ensures a URL is safe for XML by replacing bare `&` with `%26`.
 * `&` is valid in a URL path but breaks XML parsers unless encoded.
 */
function safeUrl(raw: string): string {
  return raw.replace(/&/g, "%26");
}

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
  try {
    await connectDB();

    // ── Gallery images attached to /gallery page ─────────
    const galleryDocs = await GalleryImage.find({}, { url: 1 }).limit(100).lean();
    const galleryImageUrls = galleryDocs
      .map((g: any) => toBarrisolUrl(g?.url, true))
      .filter(Boolean);

    const staticUrls: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => {
      if (page.url === `${BASE}/gallery` && galleryImageUrls.length > 0) {
        return {
          ...page,
          images: galleryImageUrls,
        };
      }
      return page;
    });

    // ── Service detail pages ──────────────────────────────
    const services = await Service.find(
      { isPublished: { $ne: false }, slug: { $exists: true, $ne: "" } },
      { slug: 1, coverImage: 1, updatedAt: 1 }
    ).lean();

    const serviceUrls: MetadataRoute.Sitemap = services
      .filter((s: any) => s && s.slug)
      .map((s: any) => {
        const imgUrl = toBarrisolUrl(s.coverImage, true);
        return {
          url: safeUrl(`${BASE}/service-detail/${s.slug}`),
          lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
          ...(imgUrl ? { images: [safeUrl(imgUrl)] } : {}),
        };
      });

    // ── Blog detail pages ─────────────────────────────────
    const blogs = await Blog.find(
      { isPublished: true, slug: { $exists: true, $ne: "" } },
      { slug: 1, coverImage: 1, updatedAt: 1 }
    ).lean();

    const blogUrls: MetadataRoute.Sitemap = blogs
      .filter((b: any) => b && b.slug)
      .map((b: any) => {
        const imgUrl = toBarrisolUrl(b.coverImage, true);
        return {
          url: safeUrl(`${BASE}/blog-details/${b.slug}`),
          lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
          ...(imgUrl ? { images: [safeUrl(imgUrl)] } : {}),
        };
      });

    return [...staticUrls, ...serviceUrls, ...blogUrls];
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
    // In case DB is temporarily unreachable, fallback to static pages without breaking sitemap.xml
    return STATIC_PAGES;
  }
}

