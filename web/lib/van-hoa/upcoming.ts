/**
 * "Văn hoá trong N ngày tới" — gộp lễ (lib/le.ts) và lễ hội có ngày âm cố định (LE_HOI) đang tới gần.
 * Chỉ dùng ngày truyền thống lặp lại hằng năm qua lõi lịch, không suy ra hay gán ngày cho chương trình
 * một năm cụ thể (một địa điểm/ban tổ chức nào đó có thể đổi lịch năm nay so với lệ thường).
 */
import type { SolarDate } from "@licham/core";
import { daysUntil, nextOccurrence as nextLeOccurrence } from "@/lib/le-date-engine";
import { LE_LIST } from "@/lib/le";
import { LE_HOI } from "./data/le-hoi";
import { hasFixedLunarDate, leHoiPath, nextOccurrence as nextLeHoiOccurrence } from "./le-hoi";

export interface UpcomingItem {
  kind: "le" | "le-hoi";
  slug: string;
  name: string;
  desc: string;
  href: string;
  date: SolarDate;
  daysUntil: number;
}

/** Các dịp (lễ + lễ hội) có lần diễn ra tiếp theo trong vòng `days` ngày kể từ `today`, sắp theo ngày gần nhất trước. */
export function upcomingInDays(today: SolarDate, days = 30): UpcomingItem[] {
  const items: UpcomingItem[] = [];

  for (const p of LE_LIST) {
    const occ = nextLeOccurrence(p, today);
    const d = daysUntil(today, occ.solar);
    if (d >= 0 && d <= days) {
      items.push({ kind: "le", slug: p.slug, name: p.tieuDe, desc: p.moTa, href: `/le/${p.slug}/`, date: occ.solar, daysUntil: d });
    }
  }

  for (const f of LE_HOI) {
    if (!hasFixedLunarDate(f)) continue;
    const occ = nextLeHoiOccurrence(f, today);
    if (!occ) continue;
    const d = daysUntil(today, occ.start.solar);
    if (d >= 0 && d <= days) {
      items.push({ kind: "le-hoi", slug: f.slug, name: f.name, desc: f.summary, href: leHoiPath(f.slug), date: occ.start.solar, daysUntil: d });
    }
  }

  items.sort((a, b) => a.daysUntil - b.daysUntil || a.name.localeCompare(b.name, "vi"));
  return items;
}
