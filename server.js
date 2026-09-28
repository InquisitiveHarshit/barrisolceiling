/**
 * server.js — Hostinger Passenger startup file
 *
 * Passenger (Node.js shared hosting) requires a startup file.
 * This simply starts Next.js on the port Passenger provides via
 * the PORT environment variable (falls back to 3000 locally).
 *
 * Deployment checklist:
 *   1. Run `npm run build` (locally or on the server)
 *   2. Upload .next/, public/, package.json, package-lock.json,
 *      next.config.ts, postcss.config.mjs, server.js
 *   3. On Hostinger: npm install --omit=dev
 *   4. Set startup file to: server.js
 */

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error handling request:", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port} [${dev ? "dev" : "production"}]`);
  });
});
