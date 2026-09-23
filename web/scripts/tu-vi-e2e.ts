#!/usr/bin/env node
/**
 * Kiểm thử E2E THẬT với Gemini — tách riêng khỏi `pnpm test`, tiêu quota thật nên phải bật có chủ đích:
 *
 *   TU_VI_E2E=1 GEMINI_API_KEY=... pnpm tu-vi:e2e
 *
 * Giới hạn cứng: đúng 1 request (không thử lại, không model dự phòng), timeout 120 giây. Ghi vào thư mục tạm của hệ điều
 * hành, KHÔNG ghi vào content/tu-vi, nên không ảnh hưởng dữ liệu sẽ commit. Không in khóa API.
 * Đừng chạy khi biết quota đang hết: request vẫn bị tính.
 */
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { CON_GIAP_LIST } from "../lib/tu-vi";
import { runTuViGeneration } from "../lib/tu-vi-generate";

if (process.env.TU_VI_E2E !== "1") {
  console.error("tu-vi-e2e: cần đặt TU_VI_E2E=1 để xác nhận sẽ gọi Gemini thật (1 request).");
  process.exit(2);
}

const dir = mkdtempSync(join(tmpdir(), "tu-vi-e2e-"));
const model = process.env.GEMINI_MODEL?.trim() || undefined;
const r = await runTuViGeneration({
  dataDir: dir,
  apiKey: process.env.GEMINI_API_KEY?.trim() || undefined,
  primaryModel: model,
  fallbackModel: model, // không đổi model: E2E chỉ đo đúng một model, một request
  maxRequests: 1,
  maxRunMs: 150_000,
  timeoutMs: 120_000,
});
console.log(`tu-vi-e2e: kết quả ${r.status}${"requests" in r ? `, ${r.requests} request` : ""}`);
if (r.status !== "written") process.exit(1);

const data = JSON.parse(readFileSync(r.location, "utf8")) as {
  model: string;
  canChiNgay: string;
  tuoi: Record<string, { luan: string; diem: number; gioTot: string }>;
};
console.log(`tu-vi-e2e: ${r.date}, ngày ${data.canChiNgay}, model ${data.model}, file tạm ${r.location}`);
for (const cg of CON_GIAP_LIST) {
  const e = data.tuoi[cg.slug]!;
  console.log(`  ${cg.ten.padEnd(5)} ${e.diem}/5  ${e.gioTot.padEnd(7)} ${e.luan.length} ký tự — ${e.luan.slice(0, 70)}…`);
}
