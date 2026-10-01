#!/usr/bin/env node
/** Kiểm tra feed đã sinh trong public/api/app/content/ theo hợp đồng; thoát mã 1 nếu có lỗi. */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateFeed } from "../lib/app-content/validate";

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const errors = validateFeed({ feedDir: join(PUBLIC_DIR, "api", "app", "content"), publicDir: PUBLIC_DIR });
if (errors.length) {
  console.error(`app-content feed không hợp lệ (${errors.length} lỗi):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("app-content feed hợp lệ");
