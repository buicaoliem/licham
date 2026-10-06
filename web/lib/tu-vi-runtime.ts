import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type TuViDayData, dateStr } from "./tu-vi";
import { getTuViDataBundled } from "./tu-vi-bundled";
import { type R2BucketLike, loadTuViDayR2 } from "./tu-vi-r2";

type Day = { day: number; month: number; year: number };

/** Gộp hai nguồn: R2 (ưu tiên) rồi bản gói lúc build. Tách ra để kiểm thử mà không cần Cloudflare. */
export async function resolveTuViData(today: Day, bucket: R2BucketLike | undefined): Promise<TuViDayData | null> {
  if (bucket) {
    try {
      const r = await loadTuViDayR2(bucket, dateStr(today));
      if (r.status === "ok") return r.data;
    } catch {
      // R2 lỗi tạm thời: dùng bản gói, không làm vỡ trang.
    }
  }
  return getTuViDataBundled(today);
}

/**
 * Lời luận tử vi của `today` cho trang. Trên Cloudflare Worker đọc R2 (`TU_VI_R2`, do Worker `licham-tu-vi-daily` ghi) nên ngày mới
 * có lời luận ngay khi cron 00:05 dựng lại trang, không cần build lại. Lúc `next build` (không có binding thật) hoặc khi R2 chưa có
 * file hợp lệ của đúng ngày này thì dùng bản đã gói; vẫn không có thì null (trang hiện dự phòng, không mượn ngày khác).
 */
export async function getTuViDataRuntime(today: Day): Promise<TuViDayData | null> {
  let bucket: R2BucketLike | undefined;
  try {
    bucket = ((await getCloudflareContext({ async: true })).env as { TU_VI_R2?: R2BucketLike }).TU_VI_R2;
  } catch {
    bucket = undefined; // không chạy trong Worker (build, test)
  }
  return resolveTuViData(today, bucket);
}
