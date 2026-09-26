/** Logic lễ hội theo ngày âm: khoảng ngày, lần tổ chức kế tiếp, nhóm theo tháng, liên kết với nhân vật. Chỉ dùng import tương đối (script sitemap chạy ngoài Next). */
import { jdFromDate, type SolarDate } from "@licham/core";
import { LE_HOI } from "./data/le-hoi";
import { NHAN_VAT } from "./data/nhan-vat";
import { lunarDayWord, lunarToSolarSafe, normalizeVi, type SolarLabel } from "./logic";
import { FIXTURE_SLUG, type LeHoi, type NhanVat } from "./types";

export const LE_HOI_PATH = "/van-hoa/le-hoi/";
/** Ảnh ngang chung cho trang tổng và 12 trang tháng; chưa có file thì dùng ảnh mặc định của Văn hoá. */
export const LE_HOI_BANNER = "/heritage/van-hoa/le-hoi/le-hoi-banner-hero.webp";
export const leHoiPath = (slug: string) => `${LE_HOI_PATH}${slug}/`;
export const leHoiMonthPath = (month: number) => `${LE_HOI_PATH}thang-${month}/`;
export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const MONTH_WORD = ["Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười Một", "Chạp"];
/** "Giêng", "Hai", … "Chạp" (tháng 1..12). */
export const monthWord = (month: number): string => MONTH_WORD[month - 1] ?? String(month);
export const monthLabel = (month: number): string => `tháng ${monthWord(month)}`;

interface Pos {
  month: number;
  day: number;
}
export interface Span {
  from: Pos;
  to: Pos;
}

/** Có ngày âm cố định: theo âm lịch, có tháng và ngày bắt đầu. Lịch Chăm (Katê) và tục lệ không cố định ngày thì không. */
export function hasFixedLunarDate(f: LeHoi): boolean {
  return f.calendar === "am" && f.lunarMonth !== undefined && f.startDay !== undefined;
}

/**
 * Khoảng ngày âm của lễ hội. Có endDay: startDay–endDay. Không có endDay: chỉ hai ngày startDay và mainDay;
 * mainDay nhỏ hơn startDay nghĩa là lễ hội kéo sang tháng sau (vd. Đình Trà Cổ: 30 tháng Năm → mùng 1 tháng Sáu).
 */
export function lunarSpan(f: LeHoi): Span | null {
  if (!hasFixedLunarDate(f)) return null;
  const month = f.lunarMonth!;
  const start = f.startDay!;
  if (f.endDay !== undefined) return { from: { month, day: start }, to: { month: f.endMonth ?? month, day: f.endDay } };
  // Không có endDay: chỉ startDay và mainDay; mainDay nhỏ hơn startDay thì thuộc tháng sau.
  const end = f.mainDay ?? start;
  return { from: { month, day: start }, to: { month: end < start ? (month % 12) + 1 : month, day: end } };
}

/** Ngày âm (tháng thường) nằm trong khoảng ngày của lễ hội? */
export function matchesLunarDay(f: LeHoi, day: number, month: number): boolean {
  const span = lunarSpan(f);
  if (!span) return false;
  // Không có endDay: chỉ hai ngày startDay và mainDay, không phải cả khoảng giữa.
  if (f.endDay === undefined) return (month === span.from.month && day === span.from.day) || (month === span.to.month && day === span.to.day);
  if (span.from.month === span.to.month) return month === span.from.month && day >= span.from.day && day <= span.to.day;
  return (month === span.from.month && day >= span.from.day) || (month === span.to.month && day <= span.to.day);
}

/** Lễ hội diễn ra vào ngày âm này: chính hội lên trước, rồi theo tên; tối đa `max`. Tháng nhuận → không có. */
export function leHoiOfLunarDay(day: number, month: number, leap = false, max = 5, list: readonly LeHoi[] = LE_HOI): LeHoi[] {
  if (leap) return [];
  const main = (f: LeHoi) => (f.mainDay === day && (lunarSpan(f)?.from.month === month || f.endDay === undefined) ? 0 : 1);
  return list
    .filter((f) => matchesLunarDay(f, day, month))
    .sort((a, b) => main(a) - main(b) || a.name.localeCompare(b.name, "vi"))
    .slice(0, max);
}

/** "mùng 6 – mùng 8 tháng Giêng", "ngày 30 tháng Năm – mùng 1 tháng Sáu", "mùng 5 tháng Giêng". */
export function lunarSpanText(f: LeHoi): string | null {
  const span = lunarSpan(f);
  if (!span) return null;
  const { from, to } = span;
  if (from.month !== to.month) return `${lunarDayWord(from.day)} ${monthLabel(from.month)} – ${lunarDayWord(to.day)} ${monthLabel(to.month)}`;
  return from.day === to.day ? `${lunarDayWord(from.day)} ${monthLabel(from.month)}` : `${lunarDayWord(from.day)} – ${lunarDayWord(to.day)} ${monthLabel(from.month)}`;
}

/** Dạng ngắn cho dòng thời gian: "6–8/1", "5/1", "30/5–1/6". */
export function lunarSpanShort(f: LeHoi): string {
  const span = lunarSpan(f);
  if (!span) return "";
  const { from, to } = span;
  if (from.month !== to.month) return `${from.day}/${from.month}–${to.day}/${to.month}`;
  return from.day === to.day ? `${from.day}/${from.month}` : `${from.day}–${to.day}/${from.month}`;
}

export interface Occurrence {
  start: SolarLabel;
  end: SolarLabel;
}

const jd = (d: SolarDate) => jdFromDate(d.day, d.month, d.year);

/** Lần tổ chức kế tiếp (hoặc đang diễn ra) tính từ `today`: ngày dương của startDay và ngày cuối. Không có ngày âm cố định → null. */
export function nextOccurrence(f: LeHoi, today: SolarDate): Occurrence | null {
  const span = lunarSpan(f);
  if (!span) return null;
  for (const lunarYear of [today.year - 1, today.year, today.year + 1]) {
    const start = lunarToSolarSafe(span.from.day, span.from.month, lunarYear);
    const end = lunarToSolarSafe(span.to.day, span.to.month, span.to.month < span.from.month ? lunarYear + 1 : lunarYear);
    if (start && end && jd(end.solar) >= jd(today)) return { start, end };
  }
  return null;
}

/** Lễ hội của một tháng âm (có tháng cố định), sắp theo ngày bắt đầu rồi tên. */
export function leHoiOfMonth(month: number, list: readonly LeHoi[] = LE_HOI): LeHoi[] {
  return list.filter((f) => f.lunarMonth === month).sort((a, b) => (a.startDay ?? 99) - (b.startDay ?? 99) || a.name.localeCompare(b.name, "vi"));
}

/** Nhóm "Không cố định ngày": không có tháng âm (tục lệ theo mùa vụ, theo dòng họ) hoặc theo lịch Chăm. */
export function leHoiFloating(list: readonly LeHoi[] = LE_HOI): LeHoi[] {
  return list.filter((f) => f.calendar === "cham" || f.lunarMonth === undefined).sort((a, b) => a.name.localeCompare(b.name, "vi"));
}

/** Biệt danh trùng từ chung (vd. "tam vị Thủy Thần" là ba vị thần sông, không phải Thủy Tinh) không dùng để khớp. */
const GENERIC_ALIASES = new Set(["thuy than", "tho than", "than dat", "vua bep"]);
const nameKeys = (nv: NhanVat) =>
  [nv.name, ...(nv.otherNames ?? [])]
    .filter((n) => n.length > 3)
    .map(normalizeVi)
    .filter((k) => !GENERIC_ALIASES.has(k));

/** Liên kết bổ sung lễ hội → nhân vật khi trường "worship" không nêu tên (lễ hội gắn với truyền thuyết của nhân vật). */
const EXTRA_FIGURES: Record<string, readonly string[]> = {
  "le-hoi-chu-dong-tu-tien-dung": ["chu-dong-tu", "tien-dung"],
  "le-hoi-co-loa": ["an-duong-vuong", "cao-lo", "my-chau"],
};

/** Nhân vật (trong 20 nhân vật) được nêu ở trường "worship" của lễ hội, cộng liên kết bổ sung. */
export function figuresOfLeHoi(f: LeHoi, figures: readonly NhanVat[] = NHAN_VAT): NhanVat[] {
  const worship = normalizeVi(f.worship);
  // "danh tướng thời Hùng Vương" chỉ nêu thời đại, không phải đối tượng thờ.
  return figures.filter((nv) => nv.slug !== FIXTURE_SLUG && (EXTRA_FIGURES[f.slug]?.includes(nv.slug) || nameKeys(nv).some((k) => worship.replace(`thoi ${k}`, "").includes(k))));
}

/** Lễ hội mà trường "worship" nêu tên nhân vật này. */
export function leHoiOfFigure(nv: NhanVat, list: readonly LeHoi[] = LE_HOI): LeHoi[] {
  return list.filter((f) => figuresOfLeHoi(f, [nv]).length > 0);
}
