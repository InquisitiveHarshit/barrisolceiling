/**
 * Utilities for masking and rewriting Cloudinary image URLs
 * to first-party Barrisol domain URLs (e.g. /media/... or https://barrisolceiling.com/media/...)
 */

const CLOUDINARY_UPLOAD_REGEX = /^https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//;

/**
 * Converts a raw Cloudinary URL into a first-party Barrisol domain URL.
 *
 * @example
 * // Input:
 * // https://res.cloudinary.com/fifvpxxi/image/upload/v1788772755/borocelling/gallery/translucent.webp
 * // Output:
 * // /media/v1788772755/borocelling/gallery/translucent.webp
 *
 * @param url The image URL from DB or Cloudinary
 * @param absolute Whether to return full absolute URL (e.g. for Sitemaps, SEO schemas)
 */
export function toBarrisolUrl(url: string | null | undefined, absolute = false): string {
  if (!url) return "";

  const trimmed = url.trim();

  // If already a relative /media path
  if (trimmed.startsWith("/media/")) {
    if (absolute) {
      const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://barrisolceiling.com").replace(/\/$/, "");
      return `${base}${trimmed}`;
    }
    return trimmed;
  }

  // If it's a Cloudinary URL, replace the host and upload path with /media/
  if (CLOUDINARY_UPLOAD_REGEX.test(trimmed)) {
    const relativePath = trimmed.replace(CLOUDINARY_UPLOAD_REGEX, "/media/");
    if (absolute) {
      const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://barrisolceiling.com").replace(/\/$/, "");
      return `${base}${relativePath}`;
    }
    return relativePath;
  }

  return trimmed;
}

/**
 * Generates an SEO-clean slug from an image title or filename.
 * Used when uploading new images so the resulting URL contains clean keywords.
 */
export function generateImageSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\.[^/.]+$/, "") // strip extension
    .replace(/[^a-z0-9]+/g, "-") // convert non-alphanumeric to hyphens
    .replace(/^-+|-+$/g, ""); // strip leading and trailing hyphens
}
