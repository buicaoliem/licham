#!/usr/bin/env node
/**
 * Chạy lúc BUILD (xem package.json "build"), không chạy khi người dùng mở trang.
 * Gọi Gemini mỗi con giáp một lần (có thử lại khi lỗi tạm thời) sinh nội dung tử vi cho ngày hôm nay (giờ Việt Nam)
 * rồi ghi vào data/tu-vi/{YYYY-MM-DD}.json để trang đọc tĩnh. Logic nằm ở lib/tu-vi-generate.ts.
 *
 * Không làm hỏng build: thiếu khóa, model không tồn tại hay Gemini lỗi đều ghi lỗi rõ ràng rồi KHÔNG ghi file nào —
 * trang tự hiện trạng thái dự phòng trung thực thay vì lời luận giữ chỗ hay lời luận chép từ ngày khác.
 *
 * Biến môi trường: GEMINI_API_KEY (bắt buộc để có lời luận), GEMINI_MODEL (tùy chọn, thay model chính).
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runTuViGeneration } from "../lib/tu-vi-generate";

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "tu-vi");

try {
  // KHÔNG bao giờ in khóa API ra màn hình hay ghi vào file.
  await runTuViGeneration({
    dataDir: DATA_DIR,
    apiKey: process.env.GEMINI_API_KEY?.trim() || undefined,
    primaryModel: process.env.GEMINI_MODEL?.trim() || undefined,
  });
} catch (err) {
  console.error("tu-vi: LỖI không mong đợi, không ghi file, build vẫn tiếp tục:", err instanceof Error ? err.message : err);
}
