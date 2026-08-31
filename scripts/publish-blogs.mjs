/**
 * One-time fix: publish all draft blogs that were seeded with isPublished:false
 * Run once with: node scripts/publish-blogs.mjs
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("❌ MONGODB_URI missing"); process.exit(1); }

const BlogSchema = new mongoose.Schema({}, { strict: false });
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

await mongoose.connect(MONGODB_URI, { bufferCommands: false });
console.log("✅  Connected.");

const result = await Blog.updateMany({ isPublished: false }, { $set: { isPublished: true } });
console.log(`✔  Published ${result.modifiedCount} blog(s).`);

await mongoose.disconnect();
console.log("🔌  Done.");
