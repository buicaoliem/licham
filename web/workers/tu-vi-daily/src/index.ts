// Worker hẹn giờ sinh tử vi hằng ngày (thay cho workflow GitHub `tu-vi-hang-ngay`, GitHub Actions đang bị chặn).
// Sinh lời luận của NGÀY MAI (giờ Việt Nam) bằng Gemini, ghi vào R2 `tu-vi/YYYY-MM-DD.json`. Worker `licham` đọc file này khi
// dựng lại trang lúc 00:05 (cron của chính nó), nên phải xong trước 00:05: ba lượt 23:00 / 23:25 / 23:50 giờ VN, lượt sau
// là no-op nếu lượt trước đã lưu xong (không gọi Gemini lần nữa); thêm lượt thử lại 05:30 cho đúng ngày hôm đó nếu đêm trước hỏng hết. Bí mật: GEMINI_API_KEY (Secret của Worker này), không ghi vào file.
import { vietnamDateOf } from "@licham/core";
import { DEFAULT_MAX_REQUESTS, runTuViGeneration } from "../../../lib/tu-vi-generate";
import { dateStr } from "../../../lib/tu-vi";
import { type R2BucketLike, loadTuViDayR2, r2TuViStore } from "../../../lib/tu-vi-r2";

export interface Env {
  TU_VI_R2: R2BucketLike;
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string;
  TU_VI_MAX_REQUESTS?: string;
  /** Chỉ để chạy thử cục bộ với Gemini giả (scripts/dry-run); không đặt ở production. */
  GEMINI_API_BASE?: string;
}

const DAY_MS = 24 * 3600_000;
/**
 * Mốc quyết định ngày cần sinh: từ 12:00 giờ VN trở đi (lượt 23:xx) là NGÀY MAI; trước 12:00 (lượt thử lại 05:30) là HÔM NAY,
 * vì lượt đêm hôm trước chưa lưu được thì sáng nay vẫn còn cơ hội bù cho đúng ngày hôm nay.
 */
export function targetNow(now: Date): Date {
  const vnHour = new Date(now.getTime() + 7 * 3600_000).getUTCHours();
  return vnHour >= 12 ? new Date(now.getTime() + DAY_MS) : now;
}

export async function runDaily(env: Env, now: Date = new Date()): Promise<unknown> {
  const max = Number.parseInt(env.TU_VI_MAX_REQUESTS ?? "", 10);
  const result = await runTuViGeneration({
    store: r2TuViStore(env.TU_VI_R2),
    apiKey: env.GEMINI_API_KEY?.trim() || undefined,
    primaryModel: env.GEMINI_MODEL?.trim() || undefined,
    apiBase: env.GEMINI_API_BASE?.trim() || undefined,
    now: targetNow(now),
    maxRequests: Number.isInteger(max) && max > 0 ? Math.min(max, 10) : DEFAULT_MAX_REQUESTS,
  });
  const summary = { cron: "tu-vi-daily", ...result };
  console.log(JSON.stringify(summary));
  return summary;
}

const worker = {
  async scheduled(event: { scheduledTime: number }, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }) {
    ctx.waitUntil(runDaily(env, new Date(event.scheduledTime)));
  },
  // Chỉ để xem trạng thái (không gọi Gemini, không lộ nội dung): ngày mai/hôm nay đã có dữ liệu hợp lệ trong R2 hay chưa.
  async fetch(_req: Request, env: Env) {
    const now = new Date();
    const dates = [dateStr(vietnamDateOf(now)), dateStr(vietnamDateOf(targetNow(now)))];
    const status = Object.fromEntries(await Promise.all(dates.map(async (d) => [d, (await loadTuViDayR2(env.TU_VI_R2, d)).status] as const)));
    return new Response(JSON.stringify({ worker: "licham-tu-vi-daily", hasKey: Boolean(env.GEMINI_API_KEY), status }), {
      headers: { "content-type": "application/json", "x-robots-tag": "noindex, nofollow" },
    });
  },
};

export default worker;
