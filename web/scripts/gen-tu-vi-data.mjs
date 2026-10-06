// Gói dữ liệu tử vi hằng ngày vào một module TS để trang đọc lúc chạy trên Cloudflare Worker (Worker không có fs).
// Ghi web/lib/tu-vi-data.generated.ts (git-ignored) từ web/content/tu-vi/YYYY-MM-DD.json. Chỉ giữ KEEP file mới nhất:
// trang chỉ cần "hôm nay", vài ngày gần nhất là đủ dự phòng và giữ Worker nhỏ. Nội dung vẫn được kiểm bằng validateTuViDayData
// lúc đọc, nên file hỏng/giữ chỗ bị loại giống hệt khi đọc từ đĩa.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const KEEP = 7;
const web = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(web, "content", "tu-vi");
const out = join(web, "lib", "tu-vi-data.generated.ts");

const files = readdirSync(srcDir)
  .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
  .sort()
  .reverse()
  .slice(0, KEEP)
  .sort();

const days = {};
for (const f of files) {
  try {
    days[f.slice(0, -5)] = JSON.parse(readFileSync(join(srcDir, f), "utf8"));
  } catch {
    // File ghi dở: bỏ qua, giống loadTuViDay coi là không hợp lệ.
  }
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(
  out,
  `// TỰ SINH bởi scripts/gen-tu-vi-data.mjs từ content/tu-vi/*.json. KHÔNG sửa tay, không commit.\nexport const TU_VI_RAW: Readonly<Record<string, unknown>> = ${JSON.stringify(days)};\n`,
  "utf8",
);
console.log(`tu-vi-data.generated.ts: ${Object.keys(days).length} ngày (${Object.keys(days).at(-1) ?? "trống"})`);
