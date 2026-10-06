import { type TuViDayData, type TuViLoad, validateTuViDayData } from "./tu-vi";
import type { TuViStore } from "./tu-vi-generate";

/**
 * Tử vi hằng ngày lưu trong R2 (cùng bucket với cache ISR, tiền tố riêng `tu-vi/`): Worker hẹn giờ `licham-tu-vi-daily` ghi,
 * Worker `licham` đọc lúc chạy khi dựng lại trang lúc 00:05. Chỉ dùng phần tối thiểu của R2 binding nên không cần gói kiểu Cloudflare.
 */
export interface R2ObjectLike {
  uploaded: Date;
  json(): Promise<unknown>;
}
export interface R2BucketLike {
  get(key: string): Promise<R2ObjectLike | null>;
  put(key: string, value: string, options?: { onlyIf?: { etagDoesNotMatch?: string }; httpMetadata?: { contentType?: string } }): Promise<unknown | null>;
  delete(key: string): Promise<void>;
}

export const tuViKey = (date: string) => `tu-vi/${date}.json`;
const lockKey = (date: string) => `tu-vi/.${date}.lock`;

/** Đọc và kiểm file của đúng một ngày — cùng luật kiểm như khi đọc từ đĩa; hỏng/thiếu thì không bao giờ mượn ngày khác. */
export async function loadTuViDayR2(bucket: R2BucketLike, date: string): Promise<TuViLoad> {
  const obj = await bucket.get(tuViKey(date));
  if (!obj) return { status: "missing" };
  let raw: unknown;
  try {
    raw = await obj.json();
  } catch (err) {
    return { status: "invalid", errors: [`không đọc được JSON: ${err instanceof Error ? err.message : String(err)}`] };
  }
  const v = validateTuViDayData(raw, date);
  return v.ok ? { status: "ok", data: v.data } : { status: "invalid", errors: v.errors };
}

export function r2TuViStore(bucket: R2BucketLike, now: () => Date = () => new Date()): TuViStore {
  return {
    describe: (date) => `R2:${tuViKey(date)}`,
    load: (date) => loadTuViDayR2(bucket, date),
    async save(data: TuViDayData) {
      await bucket.put(tuViKey(data.date), `${JSON.stringify(data, null, 2)}\n`, { httpMetadata: { contentType: "application/json" } });
    },
    // R2 không có "tạo nếu chưa có" riêng, nhưng put có điều kiện etagDoesNotMatch "*" thất bại (trả null) khi object đã tồn tại.
    async tryLock(date, staleMs) {
      const key = lockKey(date);
      for (let attempt = 0; attempt < 2; attempt++) {
        const put = await bucket.put(key, JSON.stringify({ at: now().toISOString() }), { onlyIf: { etagDoesNotMatch: "*" } });
        if (put) return () => bucket.delete(key);
        const held = await bucket.get(key);
        if (held && now().getTime() - held.uploaded.getTime() < staleMs) return null;
        await bucket.delete(key); // khóa của lượt đã chết
      }
      return null;
    },
  };
}
