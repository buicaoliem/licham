#!/usr/bin/env node
/**
 * Sinh tử vi hằng ngày cho 12 con giáp (một request Gemini) rồi lưu vào content/tu-vi/{YYYY-MM-DD}.json.
 * KHÔNG nằm trong `pnpm build`: chạy bởi workflow .github/workflows/tu-vi-hang-ngay.yml (hoặc tay khi cần), workflow
 * commit file lên main để mọi lần build sau chỉ đọc. Logic nằm ở lib/tu-vi-generate.ts.
 *
 * Biến môi trường: GEMINI_API_KEY (bắt buộc), GEMINI_MODEL (tùy chọn, thay model chính),
 * TU_VI_MAX_REQUESTS (tùy chọn, trần request của lượt, mặc định 3).
 *
 * Mã thoát: 0 = đã lưu hoặc đã có sẵn; 1 = thất bại (không lưu gì); 2 = thiếu khóa; 3 = lượt khác đang chạy;
 * 4 = bị từ chối vì đang trong build/deploy. Khi chạy trong GitHub Actions, ghi status/date/category vào GITHUB_OUTPUT.
 * Không bao giờ in khóa API.
 */
import { appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_MAX_REQUESTS, refuseInBuildEnv, runTuViGeneration, type TuViGenerateResult } from "../lib/tu-vi-generate";

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "content", "tu-vi");

function output(fields: Record<string, string>): void {
  const file = process.env.GITHUB_OUTPUT;
  if (!file) return;
  appendFileSync(file, Object.entries(fields).map(([k, v]) => `${k}=${v.replace(/[\r\n]+/g, " ")}\n`).join(""));
}

const EXIT: Record<TuViGenerateResult["status"], number> = { written: 0, exists: 0, failed: 1, "no-key": 2, locked: 3 };

const refused = refuseInBuildEnv(process.env);
if (refused) {
  console.error(`tu-vi: từ chối chạy — ${refused}. Không gọi Gemini.`);
  output({ status: "refused" });
  process.exit(4);
}

const maxRequests = Number.parseInt(process.env.TU_VI_MAX_REQUESTS ?? "", 10);
let result: TuViGenerateResult;
try {
  result = await runTuViGeneration({
    dataDir: DATA_DIR,
    apiKey: process.env.GEMINI_API_KEY?.trim() || undefined,
    primaryModel: process.env.GEMINI_MODEL?.trim() || undefined,
    maxRequests: Number.isInteger(maxRequests) && maxRequests > 0 ? Math.min(maxRequests, 10) : DEFAULT_MAX_REQUESTS,
  });
} catch (err) {
  console.error("tu-vi: LỖI không mong đợi, không lưu gì:", err instanceof Error ? err.message : err);
  output({ status: "failed", category: "unexpected" });
  process.exit(1);
}

output({
  status: result.status,
  date: result.date,
  ...(result.status === "failed" ? { category: result.category } : {}),
  ...(result.status === "written" ? { model: result.model } : {}),
  ...("requests" in result ? { requests: String(result.requests) } : {}),
});
process.exit(EXIT[result.status]);
