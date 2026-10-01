// Sinh ảnh thu nhỏ tĩnh cho thẻ danh sách: public/heritage/<x>.<ext> -> public/heritage-thumb/<x>.webp (cạnh dài <= 480px, không phóng to).
// Chạy lúc build/dev (thư mục đầu ra không đưa vào git). Bỏ qua file đã mới hơn nguồn. Thẻ dùng thumbOf() trong lib/heritage-assets.ts.
import { mkdirSync, readdirSync, statSync, utimesSync } from "node:fs";
import { dirname, join, relative, sep, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WEB = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(WEB, "public", "heritage");
const DST = join(WEB, "public", "heritage-thumb");
const MAX_EDGE = 480;
const RASTER = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);

function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (RASTER.has(extname(name).toLowerCase())) out.push(full);
  }
  return out;
}

let made = 0, kept = 0;
const queue = walk(SRC);
async function one(file) {
  const rel = relative(SRC, file).split(sep).join("/").replace(/\.[^.]+$/, ".webp");
  const out = join(DST, rel);
  try { if (statSync(out).mtimeMs >= statSync(file).mtimeMs) { kept++; return; } } catch {}
  mkdirSync(dirname(out), { recursive: true });
  await sharp(file).resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true }).webp({ quality: 76, effort: 4 }).toFile(out);
  utimesSync(out, new Date(), new Date());
  made++;
}
const POOL = 6;
await Promise.all(Array.from({ length: POOL }, async () => { for (let f; (f = queue.shift()); ) await one(f); }));
console.log(`heritage thumbs: ${made} mới, ${kept} giữ nguyên`);
