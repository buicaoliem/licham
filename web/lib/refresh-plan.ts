/**
 * Cron Trigger hằng đêm (00:05 giờ Việt Nam): dựng lại các trang phụ thuộc "hôm nay". Thay cho bước dựng lại toàn site mà
 * Deploy Hook của Vercel từng làm lúc 00:05. Module thuần (không import gì) để cả Worker entry lẫn test dùng được.
 *
 * Danh sách này suy ra bằng thực nghiệm: dựng cả site với đồng hồ giả lập 5/10 và 6/10/2026 rồi so HTML từng trang
 * (143 trên 3.126 trang đổi: trang chủ, hôm nay/ngày mai, lễ, tiết khí, đếm ngược, tử vi, xem ngày tốt, anh hùng, lịch tháng/năm
 * hiện tại, ngày hôm qua/hôm nay, nhật-nguyệt thực). Trang chỉ đổi theo NĂM (nhãn năm ở chân trang, danh sách theo năm) không nằm
 * ở đây: chúng được làm mới bởi lần build hằng ngày 03:00 (Worker `sf-daily-rebuild` gọi Deploy Hook của Workers Builds), xem licham-cutover.md.
 */

const VN_OFFSET_MS = 7 * 3600_000;
const pad2 = (n: number) => String(n).padStart(2, "0");

/** "YYYY-MM-DD" theo giờ Việt Nam. */
export function vnDateKey(now: Date): string {
  const d = new Date(now.getTime() + VN_OFFSET_MS);
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

function shiftDays(key: string, days: number): string {
  const [y, m, d] = key.split("-").map(Number) as [number, number, number];
  return vnDateKey(new Date(Date.UTC(y, m - 1, d + days) - VN_OFFSET_MS));
}

/** Tiền tố route (tập con của route đã prerender) mà nội dung đổi mỗi ngày. */
const DAILY_PREFIXES = ["/le/", "/tiet-khi/", "/countdown/", "/xem-ngay-tot/", "/anh-hung-dan-toc/", "/tu-vi/"] as const;
/** Route cố định đổi mỗi ngày. */
const DAILY_EXACT = ["/", "/hom-nay/", "/ngay-mai/", "/doi-ngay-am-duong/", "/tinh-tuoi/", "/le/", "/tu-vi/", "/xem-ngay-tot/", "/anh-hung-dan-toc/", "/van-hoa/thien-van/nhat-nguyet-thuc/"] as const;

/** Chuẩn hoá khoá của prerender-manifest ("/le/tet") về URL có "/" cuối như site phục vụ (trailingSlash). */
const withSlash = (p: string) => (p === "/" || p.endsWith("/") ? p : `${p}/`);

export interface RefreshInput {
  now: Date;
  /** Khoá `routes` của prerender-manifest.json. */
  routes: readonly string[];
  /** Ngày (YYYY-MM-DD, giờ VN) lần chạy thành công gần nhất, hoặc null. */
  lastRunDate: string | null;
}

/** Trang cần dựng lại; mảng rỗng khi hôm nay đã chạy rồi (lần gọi thứ hai không làm gì). */
export function pathsToRefresh({ now, routes, lastRunDate }: RefreshInput): string[] {
  const today = vnDateKey(now);
  if (lastRunDate === today) return [];
  const out = new Set<string>(DAILY_EXACT);
  for (const r of routes) {
    const p = withSlash(r);
    // Chỉ trang một cấp (/tu-vi/ty/), không phải /tu-vi/ty/2026/ (tử vi theo năm không đổi theo ngày).
    if (p.split("/").length === 4 && DAILY_PREFIXES.some((x) => p.startsWith(x))) out.add(p);
  }
  const [y, m] = today.split("-") as [string, string];
  out.add(`/thang/${y}-${m}/`);
  out.add(`/nam/${y}/`);
  out.add(`/ngay/${today}/`);
  out.add(`/ngay/${shiftDays(today, -1)}/`);
  out.add(`/ngay/${shiftDays(today, 1)}/`);
  const prevMonth = shiftDays(`${y}-${m}-01`, -1).slice(0, 7);
  out.add(`/thang/${prevMonth}/`);
  return [...out].sort();
}
