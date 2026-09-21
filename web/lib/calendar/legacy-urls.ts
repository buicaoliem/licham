import { canPublishDay, canPublishMonth } from "./policy";
import { dayHref, monthHref } from "./urls";

export type LegacyResult = { kind: "redirect"; to: string } | { kind: "gone" };

/**
 * Chỉ để tương thích URL cũ (đã từng được index), không dùng trong UI, menu hay sitemap:
 *   /ngay/DD-MM-YYYY       → /ngay/YYYY-MM-DD/
 *   /lich-thang-M-YYYY     → /thang/YYYY-MM/
 * Ngày/tháng không hợp lệ hoặc ngoài khoảng hỗ trợ trả "gone" (404) thay vì redirect sang URL cũng 404.
 * Redirect thẳng tới URL cuối có dấu "/", không qua bước trung gian.
 */
export function resolveLegacyUrl(pathname: string): LegacyResult | null {
  const day = /^\/ngay\/(\d{2})-(\d{2})-(\d{4})\/?$/.exec(pathname);
  if (day) {
    const date = { day: Number(day[1]), month: Number(day[2]), year: Number(day[3]) };
    return canPublishDay(date) ? { kind: "redirect", to: dayHref(date) } : { kind: "gone" };
  }
  const month = /^\/lich-thang-(\d{1,2})-(\d{4})\/?$/.exec(pathname);
  if (month) {
    const [m, y] = [Number(month[1]), Number(month[2])];
    return canPublishMonth(m, y) ? { kind: "redirect", to: monthHref(m, y) } : { kind: "gone" };
  }
  return null;
}
