import { type TuViDayData, type TuViLoad, dateStr, validateTuViDayData } from "./tu-vi";
import { TU_VI_RAW } from "./tu-vi-data.generated";

/**
 * Dữ liệu tử vi hằng ngày đã được gói vào bundle lúc build (scripts/gen-tu-vi-data.mjs) — trang không đọc fs, nên chạy được
 * cả khi dựng lại trên Cloudflare Worker. Kiểm bằng cùng validateTuViDayData như khi đọc từ đĩa.
 */
export function loadTuViDayBundled(date: string, raw: Readonly<Record<string, unknown>> = TU_VI_RAW): TuViLoad {
  const day = raw[date];
  if (day === undefined) return { status: "missing" };
  const v = validateTuViDayData(day, date);
  return v.ok ? { status: "ok", data: v.data } : { status: "invalid", errors: v.errors };
}

/** Giống getTuViData (lib/tu-vi.ts) nhưng đọc từ bản đã gói: null khi chưa có nội dung hợp lệ sinh riêng cho đúng ngày này. */
export function getTuViDataBundled(today: { day: number; month: number; year: number }): TuViDayData | null {
  const r = loadTuViDayBundled(dateStr(today));
  return r.status === "ok" ? r.data : null;
}
