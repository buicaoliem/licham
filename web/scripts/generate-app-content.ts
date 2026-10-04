#!/usr/bin/env node
/**
 * Chạy lúc BUILD (trước "next build"): sinh feed nội dung tĩnh cho app di động vào
 * public/api/app/content/ — manifest.json + catalog/heritage/articles (mỗi collection hai bản:
 * tên cố định và tên có hash, bản có hash là immutable). Hợp đồng: licham_mobile docs/CONTENT_SYNC.md.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { COLLECTIONS, buildFeed } from "../lib/app-content/feed";

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const FEED_DIR = join(PUBLIC_DIR, "api", "app", "content");

const feed = buildFeed();
rmSync(FEED_DIR, { recursive: true, force: true });
mkdirSync(FEED_DIR, { recursive: true });
for (const name of COLLECTIONS) {
  const f = feed.files[name];
  writeFileSync(join(FEED_DIR, f.name), f.bytes);
  writeFileSync(join(FEED_DIR, f.hashedName), f.bytes);
}
writeFileSync(join(FEED_DIR, "manifest.json"), JSON.stringify(feed.manifest, null, 2) + "\n", "utf8");
console.log(`app-content feed → ${FEED_DIR}`);
for (const name of COLLECTIONS) {
  console.log(`  ${feed.files[name].hashedName}  ${feed.files[name].bytes.length} bytes  ${feed.files[name].hash}`);
}
