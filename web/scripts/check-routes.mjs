#!/usr/bin/env node
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(import.meta.dirname, "..", "out");

function countHtmlFiles(dir) {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      count += countHtmlFiles(full);
    } else if (entry.endsWith(".html")) {
      count += 1;
    }
  }
  return count;
}

function countMatchingPages(dir, pattern) {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter((entry) => pattern.test(entry)).length;
}

const errors = [];

if (!existsSync(OUT_DIR)) {
  console.error(`Thiếu thư mục xuất: ${OUT_DIR}. Hãy chạy "pnpm build" trước.`);
  process.exit(1);
}

const totalHtml = countHtmlFiles(OUT_DIR);
console.log(`Tổng số file html: ${totalHtml}`);

const indexPath = join(OUT_DIR, "index.html");
if (!existsSync(indexPath)) {
  errors.push("Thiếu out/index.html (trang chủ)");
} else {
  console.log("Có out/index.html");
}

const dayPageCount = countMatchingPages(join(OUT_DIR, "ngay"), /^\d{2}-\d{2}-\d{4}(\.html)?$/);
console.log(`Số trang ngày: ${dayPageCount}`);
if (dayPageCount < 365) {
  errors.push(`Thiếu trang ngày: chỉ có ${dayPageCount}, cần ít nhất 365`);
}

const monthPageCount = countMatchingPages(OUT_DIR, /^lich-thang-\d{1,2}-\d{4}(\.html)?$/);
console.log(`Số trang tháng: ${monthPageCount}`);
if (monthPageCount < 12) {
  errors.push(`Thiếu trang tháng: chỉ có ${monthPageCount}, cần ít nhất 12`);
}

const requiredStatic = [
  "tinh-tuoi/index.html",
  "xem-ngay-tot/index.html",
  "ten/index.html",
  "ten/minh/index.html",
  "tu-vi/ty/2026/index.html",
  "countdown/tet/index.html",
  "phong-thuy/xung-tuoi/index.html",
  "phong-thuy/xem-tuoi-xay-nha/index.html",
  "sinh-nam/1990/index.html",
];
for (const rel of requiredStatic) {
  if (!existsSync(join(OUT_DIR, rel))) errors.push(`Thiếu ${rel}`);
}

if (errors.length > 0) {
  console.error("\nKiểm tra thất bại:");
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log("\nKiểm tra thành công: đủ trang chủ, trang ngày và trang tháng.");
