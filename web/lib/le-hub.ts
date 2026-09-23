/**
 * Dữ liệu dựng giao diện Ngày lễ (danh mục, thẻ, thông tin nhanh). Chỉ đọc lại LE_LIST, lõi lịch
 * và tiết khí từ @licham/core — không thêm ngày lễ hay quy tắc tính ngày mới.
 */
import { type SolarDate, getSolarTermsOfYear, jdFromDate, vietnamDateOf } from "@licham/core";
import { WEEKDAY_LONG, pad2 } from "@/lib/format";
import { hasHeroIllustration } from "@/components/LeIllustration";
import { leImage } from "@/lib/heritage-assets";
import { LE_LIST, LE_NHOM_LABEL, type LeNhom, type LePage } from "@/lib/le";
import { daysUntil, nextOccurrence } from "@/lib/le-date-engine";

export type LeLichKind = "am" | "duong" | "tiet-khi";

const MONTH_AM = ["Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Chạp"];
const THU = ["Chủ nhật", "thứ Hai", "thứ Ba", "thứ Tư", "thứ Năm", "thứ Sáu", "thứ Bảy"];

export function leLichKind(page: LePage): LeLichKind {
  if (page.lich === "am" || page.lich === "am-cuoi-thang") return "am";
  if (page.lich === "tiet-khi") return "tiet-khi";
  return "duong";
}

export const LE_LICH_LABEL: Record<LeLichKind, string> = { am: "Âm lịch", duong: "Dương lịch", "tiet-khi": "Tiết khí" };

/** Quy tắc ngày của lễ bằng lời, lấy nguyên từ ngayChinh (vd. "Rằm tháng Tám âm lịch", "2/9 dương lịch"). */
export function leRuleLabel(page: LePage): string {
  const nc = page.ngayChinh;
  if (page.lich === "am" && nc.am) {
    const thang = `tháng ${MONTH_AM[nc.am.thang - 1]}`;
    if (nc.am.ngay === 15) return `Rằm ${thang} âm lịch`;
    if (nc.am.ngay <= 10) return `Mùng ${nc.am.ngay} ${thang} âm lịch`;
    return `${nc.am.ngay} ${thang} âm lịch`;
  }
  if (page.lich === "am-cuoi-thang") return "Ngày cuối tháng Chạp âm lịch";
  if (page.lich === "tiet-khi" && nc.tietKhi) return `Tiết ${nc.tietKhi}`;
  if (page.lich === "duong" && nc.duong) return `${nc.duong.ngay}/${nc.duong.thang} dương lịch`;
  if (page.lich === "duong-thu" && nc.duongThu) {
    const thu = THU[nc.duongThu.thu]!;
    return `${thu.charAt(0).toUpperCase()}${thu.slice(1)} thứ ${nc.duongThu.thuTu} của tháng ${nc.duongThu.thang}`;
  }
  return LE_LICH_LABEL[leLichKind(page)];
}

export type LeArt = { kind: "img"; src: string } | { kind: "photo" } | { kind: "icon"; slug: string } | null;

/** Hình cho thẻ/hero: tranh heritage phù hợp, ảnh thật (chỉ Hồ Chí Minh), minh hoạ SVG anh hùng, hoặc không có. */
export function leArt(page: LePage): LeArt {
  if (page.coAnhThat) return { kind: "photo" };
  const img = leImage(page.slug);
  if (img) return { kind: "img", src: img };
  if (page.nhom === "anh-hung" && hasHeroIllustration(page.slug)) return { kind: "icon", slug: page.slug };
  return null;
}

export interface LeItem {
  slug: string;
  ten: string;
  tieuDe: string;
  nhom: LeNhom;
  nhomLabel: string;
  lich: LeLichKind;
  rule: string;
  moTa: string;
  day: number;
  month: number;
  year: number;
  weekday: string;
  lunarLabel: string;
  daysLeft: number;
  /** Julian day của lần diễn ra kế tiếp — để sắp xếp. */
  jd: number;
  nghiLe: number | null;
  art: LeArt;
}

export function leItem(page: LePage, today: SolarDate): LeItem {
  const next = nextOccurrence(page, today);
  return {
    slug: page.slug,
    ten: page.ten,
    tieuDe: page.tieuDe,
    nhom: page.nhom,
    nhomLabel: LE_NHOM_LABEL[page.nhom],
    lich: leLichKind(page),
    rule: leRuleLabel(page),
    moTa: page.moTa,
    day: next.solar.day,
    month: next.solar.month,
    year: next.solar.year,
    weekday: WEEKDAY_LONG[next.weekday]!,
    lunarLabel: next.lunarLabel,
    daysLeft: daysUntil(today, next.solar),
    jd: jdFromDate(next.solar.day, next.solar.month, next.solar.year),
    nghiLe: page.nghiLe?.soNgay ?? null,
    art: leArt(page),
  };
}

export function leItems(today: SolarDate): LeItem[] {
  return LE_LIST.map((p) => leItem(p, today));
}

export function solarLabel(d: { day: number; month: number; year: number }): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;
}

export interface TietKhiItem {
  name: string;
  /** Kinh độ Mặt Trời bắt đầu tiết (độ). */
  longitude: number;
  day: number;
  month: number;
  year: number;
  daysLeft: number;
}

/** 24 tiết khí của năm dương lịch `year` (ngày bắt đầu theo giờ Việt Nam), tính từ lõi lịch. */
export function tietKhiNam(year: number, today: SolarDate): TietKhiItem[] {
  return getSolarTermsOfYear(year)
    .map((t) => {
      const d = vietnamDateOf(t.start);
      return { name: t.name, longitude: t.longitude, day: d.day, month: d.month, year: d.year, daysLeft: daysUntil(today, d) };
    })
    .sort((a, b) => jdFromDate(a.day, a.month, a.year) - jdFromDate(b.day, b.month, b.year));
}

/** `count` tiết khí kế tiếp kể từ hôm nay (có thể sang năm sau). */
export function tietKhiSapToi(today: SolarDate, count: number): TietKhiItem[] {
  return [...tietKhiNam(today.year, today), ...tietKhiNam(today.year + 1, today)].filter((t) => t.daysLeft >= 0).slice(0, count);
}
