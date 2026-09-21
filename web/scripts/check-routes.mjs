#!/usr/bin/env node
// Kiểm tra sau build: Next không còn "output: export", nên đọc thư mục app đã prerender trong .next/server/app.
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const APP_DIR = join(import.meta.dirname, "..", ".next", "server", "app");
const errors = [];

if (!existsSync(APP_DIR)) {
  console.error(`Thiếu thư mục dựng: ${APP_DIR}. Hãy chạy "pnpm build" trước.`);
  process.exit(1);
}

function count(dir, pattern) {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter((f) => pattern.test(f)).length;
}

const days = count(join(APP_DIR, "ngay"), /^\d{4}-\d{2}-\d{2}\.html$/);
const months = count(join(APP_DIR, "thang"), /^\d{4}-\d{2}\.html$/);
const years = count(join(APP_DIR, "nam"), /^\d{4}\.html$/);
console.log(`Trang ngày dựng sẵn: ${days}, tháng: ${months}, năm: ${years}`);
if (days < 365) errors.push(`Thiếu trang ngày dựng sẵn: chỉ có ${days}, cần ít nhất 365`);
if (months < 12) errors.push(`Thiếu trang tháng dựng sẵn: chỉ có ${months}, cần ít nhất 12`);
if (years < 1) errors.push("Thiếu trang năm dựng sẵn");

for (const rel of [
  "index.html",
  "tinh-tuoi.html",
  "xem-ngay-tot.html",
  "ten.html",
  "ten/minh.html",
  "tu-vi/ty/2026.html",
  "countdown/tet.html",
  "countdown/giao-thua.html",
  "sinh-nam/1940.html",
  "sinh-nam/1990.html",
  "phong-thuy/xung-tuoi.html",
  "phong-thuy/xem-tuoi-xay-nha.html",
]) {
  if (!existsSync(join(APP_DIR, rel))) errors.push(`Thiếu ${rel}`);
}

if (errors.length > 0) {
  console.error("\nKiểm tra thất bại:");
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log("\nKiểm tra thành công.");
