#!/usr/bin/env node
/**
 * Kiểm tra quy tắc 410 (lib/legacy-gone.ts) không chạm vào trang hiện tại:
 *  - mọi URL trong sitemap (đã sinh bởi generate-sitemap) không được khớp quy tắc 410;
 *  - mọi URL sitemap phải dùng https://licham.app (apex, không www);
 *  - tên thư mục route đầu tiên của app/ và tệp trong public/ không được khớp quy tắc 410.
 * Chạy sau `pnpm generate:sitemap`. Thoát mã 1 nếu có lỗi.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isGonePath } from "../lib/legacy-gone";
import { SITE_URL } from "../lib/site";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = join(ROOT, "public");
const errors: string[] = [];

function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
}

const indexPath = join(PUBLIC_DIR, "sitemap.xml");
if (!existsSync(indexPath)) {
  console.error("Thiếu public/sitemap.xml: chạy `pnpm generate:sitemap` trước.");
  process.exit(1);
}

const files = locs(readFileSync(indexPath, "utf8"));
let total = 0;
for (const loc of [...files, ...files.flatMap((f) => locs(readFileSync(join(PUBLIC_DIR, "sitemaps", f.split("/").pop() as string), "utf8")))]) {
  total++;
  if (!loc.startsWith(`${SITE_URL}/`)) errors.push(`URL sitemap không dùng ${SITE_URL}: ${loc}`);
  const u = new URL(loc);
  if (isGonePath(u.pathname, u.search)) errors.push(`URL sitemap bị quy tắc 410 chặn: ${loc}`);
}

const topLevel = [
  ...readdirSync(join(ROOT, "app"), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => `/${e.name}`),
  ...readdirSync(PUBLIC_DIR).map((n) => `/${n}`),
];
for (const p of topLevel) if (isGonePath(p)) errors.push(`Route/tệp hiện tại bị quy tắc 410 chặn: ${p}`);
if (isGonePath("/")) errors.push("Trang chủ bị quy tắc 410 chặn");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`check:gone OK — ${total} URL sitemap, ${topLevel.length} route/tệp gốc không bị 410.`);
