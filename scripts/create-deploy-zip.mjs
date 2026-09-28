/**
 * create-deploy-zip.mjs
 * ─────────────────────────────────────────────────────────────────
 * Builds the Next.js project and creates a hostinger-deploy.zip
 * ready to upload to Hostinger Node.js hosting.
 *
 * Usage:
 *   node scripts/create-deploy-zip.mjs
 *
 * What goes into the zip:
 *   .next/          – compiled Next.js output
 *   public/         – static assets
 *   package.json    – so Hostinger can run `npm install --production`
 *   package-lock.json
 *   next.config.ts
 *   postcss.config.mjs
 *   tsconfig.json
 *   .env.local      – environment variables (keep this safe!)
 *
 * After uploading to Hostinger:
 *   1. Extract the zip in your Node.js app root
 *   2. Run:  npm install --omit=dev
 *   3. Set start command to:  npm start   (runs `next start`)
 * ─────────────────────────────────────────────────────────────────
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { ZipArchive } = require("archiver");

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
// Create in parent folder as requested
const OUT_PATH = path.join(ROOT, "..", "borocelling-hostinger-deploy.zip");

// ── ANSI helpers ────────────────────────────────────────────────
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

// ── Step 1: Build ────────────────────────────────────────────────
console.log(bold("\n📦  Hostinger Deploy — ZIP Creator\n"));

const skipBuild = process.argv.includes("--skip-build");

if (skipBuild) {
  console.log(yellow("⚡  --skip-build flag detected, skipping `next build`"));
} else {
  console.log("🔨  Running next build...\n");
  try {
    execSync("npm run build", { cwd: ROOT, stdio: "inherit" });
    console.log(green("\n✅  Build succeeded\n"));
  } catch {
    console.error(red("\n❌  Build failed — fix errors above and retry\n"));
    process.exit(1);
  }
}

// ── Step 2: Verify .next exists ──────────────────────────────────
const nextDir = path.join(ROOT, ".next");
if (!fs.existsSync(nextDir)) {
  console.error(red("❌  .next directory not found. Run without --skip-build first."));
  process.exit(1);
}

// ── Step 3: Remove old zip if present ───────────────────────────
if (fs.existsSync(OUT_PATH)) {
  fs.unlinkSync(OUT_PATH);
  console.log(yellow(`🗑️   Removed old ${path.basename(OUT_PATH)}`));
}

// ── Step 4: Create zip ───────────────────────────────────────────
console.log("🗜️   Creating hostinger-deploy.zip...\n");

const output = fs.createWriteStream(OUT_PATH);
const archive = new ZipArchive({ zlib: { level: 9 } });

// Track progress
let lastPercent = -1;
archive.on("progress", ({ entries, fs: { processedBytes, totalBytes } }) => {
  const pct = totalBytes > 0 ? Math.floor((processedBytes / totalBytes) * 100) : 0;
  if (pct !== lastPercent && pct % 10 === 0) {
    console.log(`   ${pct}% (${entries.processed} files)`);
    lastPercent = pct;
  }
});

archive.on("warning", (err) => {
  if (err.code !== "ENOENT") throw err;
  console.warn(yellow(`⚠️   Warning: ${err.message}`));
});

archive.on("error", (err) => {
  console.error(red(`❌  Archiver error: ${err.message}`));
  process.exit(1);
});

output.on("close", () => {
  const bytes = archive.pointer();
  const mb = (bytes / 1024 / 1024).toFixed(2);
  console.log(green(`\n✅  hostinger-deploy.zip created — ${mb} MB`));
  printInstructions();
});

archive.pipe(output);

// ── Files & folders to include ───────────────────────────────────

// Include everything except the things we don't need for a remote build
archive.glob("**/*", {
  cwd: ROOT,
  dot: true,
  ignore: [
    "node_modules/**",
    ".next/**",
    ".git/**",
    ".gitignore",
    ".env*",
    ".agents/**",
    "scripts/**",
    "hostinger-deploy.zip",
    "borocelling-hostinger-deploy.zip",
    "deploy.zip",
    ".impeccable/**"
  ],
});

archive.finalize();

// ── Post-zip instructions ────────────────────────────────────────
function printInstructions() {
  console.log(`
${bold("📋  Hostinger Deployment Steps:")}

  1. Log in to Hostinger hPanel
  2. Go to Websites → Manage → Node.js
  3. Upload ${bold("hostinger-deploy.zip")} and extract it in your app root
  4. In the Node.js section set:
       • Node version : 22.x
       • Startup file : server.js
       • Run command  : npm install --omit=dev
  5. Add your environment variables from .env.local in the
     Hostinger "Environment Variables" panel (safer than shipping .env.local)
  6. Click Start / Restart app

${bold("💡  Tip:")} Run with ${yellow("--skip-build")} flag to re-zip without rebuilding:
     ${yellow("node scripts/create-deploy-zip.mjs --skip-build")}
`);
}
