import { chromium } from "playwright";
const [url, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
await p.route("**/*", (r) => r.continue({ headers: { ...r.request().headers(), host: "xfer.parkscomputing.com" } }));
await p.goto(url, { waitUntil: "networkidle" });
await p.screenshot({ path: out });
await b.close();
