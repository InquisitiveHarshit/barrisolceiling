/**
 * Seed Script — Barrisol Ceiling
 *
 * Inserts all service-detail and blog-detail pages into MongoDB
 * with just their slugs and placeholder content so you can fill
 * them in later through the admin panel.
 *
 * Usage:
 *   npm run seed
 *
 * Behaviour:
 *   - Services  → isPublished: true   (visible on /service-detail/[slug])
 *   - Blogs     → isPublished: false  (draft, hidden until you publish via admin)
 *   - Duplicate slugs are SKIPPED (safe to re-run)
 */

import mongoose from "mongoose";
import slugify from "slugify";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// ─── Load .env.local ──────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI not found in .env.local");
  process.exit(1);
}

// ─── Mongoose Models (inline — no TypeScript needed here) ─────────────────────
const ServiceSchema = new mongoose.Schema(
  {
    title:            { type: String, required: true, trim: true },
    slug:             { type: String, unique: true, index: true },
    category:         { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    content:          { type: String, default: "" },
    metaTitle:        { type: String },
    metaDescription:  { type: String },
    coverImage:       { type: String },
    tags:             { type: [String], default: [] },
    isPublished:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BlogSchema = new mongoose.Schema(
  {
    title:           { type: String, required: true, trim: true },
    slug:            { type: String, unique: true, sparse: true, index: true },
    category:        { type: String, trim: true },
    content:         { type: String, required: true },
    excerpt:         { type: String },
    metaTitle:       { type: String },
    metaDescription: { type: String },
    coverImage:      { type: String },
    tags:            { type: [String], default: [] },
    isPublished:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);
const Blog =
  mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

// ─── Helper: slug → readable title ───────────────────────────────────────────
function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── SERVICE SLUGS (45) ───────────────────────────────────────────────────────
const serviceSlugs = [
  "stretch-ceiling-lights",
  "3d-stretch-ceiling",
  "printed-stretch-ceiling",
  "translucent-stretch-ceiling",
  "transparent-ceiling-light-solutions-by-berrisol-ceiling",
  "acoustics-ceiling-solution-and-acoustics-stretch-manufacturers",
  "hospital-stretch-ceiling-supplier-manufacturers",
  "ceiling-marble-modern-durable-stylish",
  "upgrade-your-interiors-with-stretch-ceilings-in-bharatpur",
  "add-a-modern-touch-with-stretch-ceilings-in-alwar",
  "transform-your-space-with-stretch-ceilings-in-shamli",
  "upgrade-your-space-with-elegant-stretch-ceilings-in-muzaffarnagar",
  "give-your-space-a-modern-makeover-with-stretch-ceilings-in-baghpat",
  "transform-your-interiors-with-stretch-ceilings-in-bulandshahr",
  "redefine-your-interiors-with-stretch-ceilings-in-hapur",
  "give-your-space-a-fresh-look-with-stretch-ceilings-in-meerut",
  "transform-your-interiors-with-stretch-ceilings-in-ghaziabad",
  "upgrade-your-interiors-with-stretch-ceilings-in-greater-noida",
  "enhance-your-space-with-stylish-stretch-ceilings-in-noida",
  "transform-your-interiors-with-stretch-ceilings-in-bhiwani",
  "enhance-your-space-with-stretch-ceilings-in-mahendragarh",
  "transform-your-interiors-with-stretch-ceilings-in-rewari",
  "redefine-your-space-with-stretch-ceilings-in-panipat",
  "modern-interior-solutions-with-stretch-ceilings-in-sonipat",
  "give-your-space-a-modern-touch-with-stretch-ceilings-in-jhajjar",
  "modern-design-solutions-with-stretch-ceilings-in-rohtak",
  "modern-interior-design-with-stretch-ceilings-in-palwal",
  "transform-your-space-with-stretch-ceilings-in-gurugram",
  "enhance-your-interiors-with-stretch-ceilings-in-central-delhi",
  "elegant-and-durable-stretch-ceilings-in-west-delhi",
  "stretch-ceilings-in-east-delhi-modern-ceiling-design-experts",
  "premium-stretch-ceilings-installation-services-in-south-delhi",
  "stretch-ceilings-in-north-delhi-modern-ceiling-design-experts",
  "premium-stretch-ceilings-in-new-delhi-modern-ceiling-solutions",
  "stretch-ceiling-in-vadodara-modern-luxury-with-european-quality",
  "premium-stretch-ceiling-in-lucknow-barrisol",
  "premium-stretch-ceiling-in-bangalore-barrisol",
  "stretch-ceilings-in-nagpur-stylish-durable-affordable-ceiling-solutions",
  "stretch-ceiling-in-kanpur",
  "stretch-ceiling-in-delhi-berrisol-illusion-decors",
  "stretch-ceiling-in-dubai-uae-berrisol-illusion-decors",
  "stretch-ceiling-manufacturers-suppliers-from-noida-india",
  "custom-lighting-solutions-for-berrisol-ceilings",
  "berrisol-stretch-ceiling-installation",
  "premium-stretch-ceiling-solutions-for-every-space",
];

// ─── BLOG SLUGS (30) ──────────────────────────────────────────────────────────
const blogSlugs = [
  "why-stretch-ceilings-first-choice-modern-indian-interiors",
  "complete-guide-pvc-stretch-ceiling-systems",
  "reasons-homeowners-prefer-stretch-ceilings-over-false-ceilings",
  "stretch-ceiling-for-commercial-spaces-in-india-berrisol-ceiling",
  "pvc-stretch-ceiling-manufacturer-in-delhi-commercial-office-ceilings",
  "best-stretch-ceiling-company-in-india-premium-ceiling-solutions",
  "stretch-ceiling-manufacturer-in-india-modern-interior-trends",
  "stretch-ceiling-installation-services-in-delhi-for-modern-homes-berrisol-ceiling",
  "top-false-ceiling-contractors-in-delhi-berrisol-ceiling",
  "3d-stretch-ceiling-in-delhi-modern-ceiling-designs-by-berrisol-ceiling",
  "stretch-ceiling-in-delhi-modern-interior-solutions-by-berrisol-ceiling",
  "berrisol-stretch-ceilings-transform-your-space-with-modern-elegance",
  "stretch-ceilings-cost-in-india-a-complete-guide",
  "stretch-ceiling-maintenance-cleaning-ceiling-care-tips",
  "eco-friendly-stretch-ceiling-sustainable-and-energy-efficient-ceiling-for-green-homes",
  "pvc-vs-fabric-stretch-ceiling-best-ceiling-comparison-for-modern-interiors",
  "pros-and-cons-of-stretch-ceilings-understanding-the-advantages-and-disadvantage",
  "stretch-ceilings-advantages-and-disadvantages-you-should-know",
  "colorful-and-playful-stretch-ceilings-for-children-creative-ideas-to-brighten-kids-rooms",
  "9-simple-stretch-ceiling-diy-ceiling-ideas-for-any-room",
  "transform-your-space-with-berrisol-ceiling-printing-design",
  "elevate-your-interiors-with-3d-stretch-ceilings-by-berrisol",
  "transform-your-space-with-a-fabric-false-ceiling",
  "residential-stretch-ceiling-modern-designs-easy-installation",
  "pvc-stretch-ceiling-modern-designs-easy-installation",
  "stretch-ceiling-design-modern-stylish-ideas-for-your-home",
  "stretch-fabric-ceiling-modern-designs-lighting-ideas-benefits-for-your-home",
  "inspiration-innovation-interior-ideas",
  "the-art-of-barrisol-stretch-ceilings",
  "a-creative-revolution",
];

// ─── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🔗  Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log("✅  Connected.\n");

  // ── Services ──
  console.log(`📋  Seeding ${serviceSlugs.length} service pages...`);
  let sInserted = 0, sSkipped = 0;

  for (const slug of serviceSlugs) {
    const title = slugToTitle(slug);
    const exists = await Service.findOne({ slug });

    if (exists) {
      console.log(`   ⏭  SKIP  (already exists)  →  ${slug}`);
      sSkipped++;
      continue;
    }

    await Service.create({
      title,
      slug,
      category:         "Stretch Ceiling",
      shortDescription: `${title} — content coming soon.`,
      content:          "<p>Content coming soon. Update this from the admin panel.</p>",
      metaTitle:        title,
      metaDescription:  `${title} — premium stretch ceiling solutions by Barrisol Ceiling.`,
      isPublished:      true,
    });

    console.log(`   ✔  INSERTED  →  ${slug}`);
    sInserted++;
  }

  // ── Blogs ──
  console.log(`\n📋  Seeding ${blogSlugs.length} blog pages...`);
  let bInserted = 0, bSkipped = 0;

  for (const slug of blogSlugs) {
    const title = slugToTitle(slug);
    const exists = await Blog.findOne({ slug });

    if (exists) {
      console.log(`   ⏭  SKIP  (already exists)  →  ${slug}`);
      bSkipped++;
      continue;
    }

    await Blog.create({
      title,
      slug,
      category:        "Stretch Ceiling",
      content:         "<p>Content coming soon. Update this from the admin panel.</p>",
      excerpt:         `${title} — read more about stretch ceiling solutions.`,
      metaTitle:       title,
      metaDescription: `${title} — expert insights by Barrisol Ceiling.`,
      isPublished:     true,    // visible — edit content later from admin
    });

    console.log(`   ✔  INSERTED  →  ${slug}`);
    bInserted++;
  }

  // ── Summary ──
  console.log("\n─────────────────────────────────────────");
  console.log(`Services  →  ${sInserted} inserted,  ${sSkipped} skipped`);
  console.log(`Blogs     →  ${bInserted} inserted,  ${bSkipped} skipped`);
  console.log("─────────────────────────────────────────\n");

  await mongoose.disconnect();
  console.log("🔌  Disconnected. Done!\n");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  mongoose.disconnect();
  process.exit(1);
});
