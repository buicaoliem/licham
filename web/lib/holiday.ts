/**
 * Mô hình chung cho ngày lễ / ngày giỗ, dựng trên dữ liệu `LePage` (lib/le.ts).
 * Ngày dương của mỗi năm luôn được TÍNH từ quy tắc (âm lịch / dương lịch / tiết khí), không lưu cứng.
 */
import { type SolarDate, jdFromDate } from "@licham/core";
import { LE_LIST, type LeLich, type LeNhom, type LePage, leBySlug } from "./le";
import { type LeYearRow, daysUntil, nextOccurrence, yearRow } from "./le-date-engine";

export type SourceType = "astronomical" | "traditional" | "editorial";

export interface HolidaySource {
  type: SourceType;
  label: string;
}

export type HolidayType = LeNhom;

export type LunarRule = { kind: "lunar"; day: number; month: number } | { kind: "lunar-last-day"; month: number };
export type SolarRule =
  | { kind: "solar"; day: number; month: number }
  | { kind: "solar-nth-weekday"; nth: number; weekday: number; month: number }
  | { kind: "solar-term"; term: string };

export interface HolidayEvent {
  slug: string;
  name: string;
  shortName: string;
  type: HolidayType;
  lunarRule?: LunarRule;
  solarRule?: SolarRule;
  description: string;
  historicalContext: string[];
  traditions: string[];
  relatedPrayerSlug?: string;
  sources: HolidaySource[];
}

export interface HolidayOccurrence extends LeYearRow {
  slug: string;
  daysLeft: number;
}

function ruleOf(p: LePage): Pick<HolidayEvent, "lunarRule" | "solarRule"> {
  const nc = p.ngayChinh;
  const lich: LeLich = p.lich;
  if (lich === "am" && nc.am) return { lunarRule: { kind: "lunar", day: nc.am.ngay, month: nc.am.thang } };
  if (lich === "am-cuoi-thang") return { lunarRule: { kind: "lunar-last-day", month: nc.amCuoiThang?.thang ?? 12 } };
  if (lich === "tiet-khi" && nc.tietKhi) return { solarRule: { kind: "solar-term", term: nc.tietKhi } };
  if (lich === "duong" && nc.duong) return { solarRule: { kind: "solar", day: nc.duong.ngay, month: nc.duong.thang } };
  if (lich === "duong-thu" && nc.duongThu) {
    return { solarRule: { kind: "solar-nth-weekday", nth: nc.duongThu.thuTu, weekday: nc.duongThu.thu, month: nc.duongThu.thang } };
  }
  return {};
}

function sourcesOf(p: LePage): HolidaySource[] {
  const out: HolidaySource[] = [];
  if (p.lich === "tiet-khi") out.push({ type: "astronomical", label: "Tiết khí tính từ kinh độ Mặt Trời (múi giờ UTC+7)" });
  else if (p.lich === "am" || p.lich === "am-cuoi-thang") out.push({ type: "astronomical", label: "Ngày âm lịch tính từ sóc (trăng mới) theo giờ Việt Nam UTC+7" });
  else out.push({ type: "traditional", label: "Quy ước dương lịch cố định hoặc theo thứ trong tháng" });
  out.push({ type: p.nhom === "am-lich" || p.nhom === "nghi-le" ? "traditional" : "editorial", label: "Nội dung ý nghĩa và phong tục do licham.app biên soạn" });
  return out;
}

function toEvent(p: LePage): HolidayEvent {
  return {
    slug: p.slug,
    name: p.tieuDe,
    shortName: p.ten,
    type: p.nhom,
    ...ruleOf(p),
    description: p.moTa,
    historicalContext: p.yNghia,
    traditions: p.bullets ?? [],
    relatedPrayerSlug: p.vanKhan[0],
    sources: sourcesOf(p),
  };
}

const EVENTS: readonly HolidayEvent[] = LE_LIST.map(toEvent);

export function listHolidays(): readonly HolidayEvent[] {
  return EVENTS;
}

export function getHoliday(slug: string): HolidayEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

function pageOf(slug: string): LePage {
  const p = leBySlug(slug);
  if (!p) throw new Error(`Không có ngày lễ "${slug}"`);
  return p;
}

/** Ngày lễ `slug` trong năm hàng `year` (năm âm lịch với lễ âm lịch, năm dương lịch với lễ dương lịch/tiết khí). */
export function getHolidayOccurrence(slug: string, year: number, today?: SolarDate): HolidayOccurrence {
  const row = yearRow(pageOf(slug), year);
  return { ...row, slug, daysLeft: today ? daysUntil(today, row.solar) : 0 };
}

export function getHolidayOccurrences(slug: string, fromYear: number, toYear: number, today?: SolarDate): HolidayOccurrence[] {
  const out: HolidayOccurrence[] = [];
  for (let y = fromYear; y <= toYear; y++) out.push(getHolidayOccurrence(slug, y, today));
  return out;
}

/** Lần diễn ra kế tiếp (>= hôm nay) của một lễ. */
export function getNextHolidayOccurrence(slug: string, today: SolarDate): HolidayOccurrence {
  const row = nextOccurrence(pageOf(slug), today);
  return { ...row, slug, daysLeft: daysUntil(today, row.solar) };
}

/** `count` lễ gần nhất kể từ hôm nay, sắp theo ngày, có thể lọc theo nhóm / loại trừ slug. */
export function getUpcomingHolidays(
  today: SolarDate,
  count: number,
  opts: { exclude?: string; types?: readonly HolidayType[] } = {},
): { event: HolidayEvent; occurrence: HolidayOccurrence }[] {
  return EVENTS.filter((e) => e.slug !== opts.exclude && (!opts.types || opts.types.includes(e.type)))
    .map((event) => ({ event, occurrence: getNextHolidayOccurrence(event.slug, today) }))
    .sort((a, b) => jd(a.occurrence.solar) - jd(b.occurrence.solar) || a.event.slug.localeCompare(b.event.slug))
    .slice(0, count);
}

/** Lễ liên quan: cùng nhóm trước, rồi lễ diễn ra gần nhất về thời gian; xác định, không ngẫu nhiên. */
export function getRelatedHolidays(slug: string, today: SolarDate, count = 4): HolidayEvent[] {
  const self = getHoliday(slug);
  if (!self) return [];
  const anchor = jd(getNextHolidayOccurrence(slug, today).solar);
  return EVENTS.filter((e) => e.slug !== slug)
    .map((e) => ({ e, gap: Math.abs(jd(getNextHolidayOccurrence(e.slug, today).solar) - anchor), same: e.type === self.type ? 0 : 1 }))
    .sort((a, b) => a.same - b.same || a.gap - b.gap || a.e.slug.localeCompare(b.e.slug))
    .slice(0, count)
    .map((x) => x.e);
}

function jd(d: SolarDate): number {
  return jdFromDate(d.day, d.month, d.year);
}

// ---------- Thêm vào lịch (không cần tài khoản) ----------

const ymd = (d: SolarDate) => `${d.year}${String(d.month).padStart(2, "0")}${String(d.day).padStart(2, "0")}`;

function nextDay(d: SolarDate): SolarDate {
  const t = new Date(Date.UTC(d.year, d.month - 1, d.day + 1));
  return { day: t.getUTCDate(), month: t.getUTCMonth() + 1, year: t.getUTCFullYear() };
}

export function googleCalendarUrl(title: string, solar: SolarDate, details: string): string {
  const q = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${ymd(solar)}/${ymd(nextDay(solar))}`, details });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

/** Sự kiện cả ngày dạng .ics, nhúng thành data: URI để tải về mà không cần route hay JS. */
export function icsDataUri(title: string, solar: SolarDate, slug: string, description: string): string {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//licham.app//VN",
    "BEGIN:VEVENT",
    `UID:${slug}-${ymd(solar)}@licham.app`,
    `DTSTAMP:${ymd(solar)}T000000Z`,
    `DTSTART;VALUE=DATE:${ymd(solar)}`,
    `DTEND;VALUE=DATE:${ymd(nextDay(solar))}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
