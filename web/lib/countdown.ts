import { type SolarDate, solarToLunar } from "@licham/core";
import { daysUntil, nextOccurrence } from "@/lib/le-date-engine";
import { type LePage, leBySlug } from "@/lib/le";
import { MONTH_WORD, pad2 } from "@/lib/format";

export interface CountdownDef {
  slug: string;
  leSlug: string;
  h1: string;
  titleYear: (year: number) => string;
  description: (year: number) => string;
  intro: (year: number) => string;
}

/** Chỉ lễ có nhu cầu đếm ngược thật — không nhân mọi trang /le. */
export const COUNTDOWN_LIST: readonly CountdownDef[] = [
  {
    slug: "tet",
    leSlug: "tet-nguyen-dan",
    h1: "Đếm ngược Tết Nguyên đán",
    titleYear: (y) => `Còn bao nhiêu ngày nữa đến Tết ${y}? — Lịch Âm`,
    description: (y) =>
      `Đếm ngược Tết Nguyên đán ${y}: số ngày còn lại, ngày dương lịch và ngày âm lịch mùng 1 tháng Giêng.`,
    intro: (y) =>
      `Tết Nguyên đán ${y} rơi vào mùng 1 tháng Giêng âm lịch. Trang này lấy đúng ngày dương từ lõi lịch, cập nhật mỗi lần dựng trang theo giờ Việt Nam — không gắn cứng một mốc Tết.`,
  },
  {
    slug: "vu-lan",
    leSlug: "vu-lan",
    h1: "Đếm ngược lễ Vu Lan (rằm tháng Bảy)",
    titleYear: (y) => `Còn bao nhiêu ngày nữa đến Vu Lan ${y}? — Lịch Âm`,
    description: (y) => `Đếm ngược rằm tháng Bảy / Vu Lan ${y}: số ngày còn lại, ngày dương và ngày âm.`,
    intro: (y) =>
      `Vu Lan ${y} là rằm tháng Bảy âm lịch — dịp báo hiếu và xá tội vong nhân. Ngày dương đổi từng năm; trang này tính từ lịch âm, không lấy một ngày dương cố định.`,
  },
  {
    slug: "trung-thu",
    leSlug: "tet-trung-thu",
    h1: "Đếm ngược Tết Trung thu",
    titleYear: (y) => `Còn bao nhiêu ngày nữa đến Trung thu ${y}? — Lịch Âm`,
    description: (y) => `Đếm ngược Tết Trung thu ${y} (rằm tháng Tám): số ngày còn lại, ngày dương và ngày âm.`,
    intro: (y) =>
      `Trung thu ${y} là rằm tháng Tám âm lịch. Ngày dương dịch theo trăng; số ngày còn lại dưới đây tính từ hôm nay theo giờ Việt Nam.`,
  },
  {
    slug: "doan-ngo",
    leSlug: "tet-doan-ngo",
    h1: "Đếm ngược Tết Đoan ngọ",
    titleYear: (y) => `Còn bao nhiêu ngày nữa đến Đoan ngọ ${y}? — Lịch Âm`,
    description: (y) => `Đếm ngược Tết Đoan ngọ ${y} (mùng 5 tháng Năm âm): số ngày còn lại, ngày dương và ngày âm.`,
    intro: (y) =>
      `Đoan ngọ ${y} là mùng 5 tháng Năm âm lịch. Ngày dương đổi từng năm; trang này tính từ lịch âm, không gắn 5/5 dương lịch.`,
  },
  {
    slug: "ong-tao",
    leSlug: "ong-cong-ong-tao",
    h1: "Đếm ngược ông Công ông Táo",
    titleYear: (y) => `Còn bao nhiêu ngày nữa đến ông Táo ${y}? — Lịch Âm`,
    description: (y) => `Đếm ngược ông Công ông Táo ${y} (23 tháng Chạp): số ngày còn lại, ngày dương và ngày âm.`,
    intro: (y) =>
      `Ông Táo ${y} là 23 tháng Chạp âm lịch — mốc vào tuần Tết. Ngày dương lấy từ lõi lịch, cập nhật mỗi lần dựng trang.`,
  },
  {
    slug: "giao-thua",
    leSlug: "giao-thua",
    h1: "Đếm ngược giao thừa",
    titleYear: (y) => `Còn bao nhiêu ngày nữa đến giao thừa ${y}? — Lịch Âm`,
    description: (y) => `Đếm ngược giao thừa Tết ${y}: đêm cuối năm âm, ngày dương và số ngày còn lại.`,
    intro: (y) =>
      `Giao thừa không phải lúc nào cũng “30 Tết”: tháng Chạp có năm 29 ngày, có năm 30. Trang này lấy đúng ngày cuối tháng 12 âm.`,
  },
];

export function countdownBySlug(slug: string): CountdownDef | undefined {
  return COUNTDOWN_LIST.find((c) => c.slug === slug);
}

export function countdownSlugForLe(leSlug: string): string | undefined {
  return COUNTDOWN_LIST.find((c) => c.leSlug === leSlug)?.slug;
}

export interface CountdownState {
  def: CountdownDef;
  le: LePage;
  target: SolarDate;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  lunarIsLeap: boolean;
  daysLeft: number;
  targetYearLabel: number;
}

export function countdownState(def: CountdownDef, today: SolarDate): CountdownState {
  const le = leBySlug(def.leSlug);
  if (!le) throw new Error(`Thiếu trang lễ ${def.leSlug} cho countdown ${def.slug}`);
  const next = nextOccurrence(le, today);
  const lunar = solarToLunar(next.solar.day, next.solar.month, next.solar.year);
  return {
    def,
    le,
    target: next.solar,
    lunarDay: lunar.day,
    lunarMonth: lunar.month,
    lunarYear: lunar.year,
    lunarIsLeap: lunar.isLeapMonth,
    daysLeft: daysUntil(today, next.solar),
    targetYearLabel: next.year,
  };
}

export function formatCountdownSolar(d: SolarDate): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;
}

export function lunarMonthWord(month: number, isLeap: boolean): string {
  return `${MONTH_WORD[month - 1]}${isLeap ? " nhuận" : ""}`;
}
