import { type CanChi, canChiOfYear, jdFromDate, lunarToSolar, solarToLunar, type SolarDate } from "@licham/core";
import { ALL_CAN_CHI, CHI_LIST, canChiSlug } from "../tuoi";
import { WEEKDAY_LONG, pad2 } from "../format";
import type { Festival, NamSuKien } from "./types";

const CAN_HANH = ["Mộc", "Mộc", "Hỏa", "Hỏa", "Thổ", "Thổ", "Kim", "Kim", "Thủy", "Thủy"] as const;

export interface CanChiYearHeader {
  slug: string;
  canChi: CanChi;
  canHanh: string;
  chiOrder: number;
  conGiap: string;
  menh: string;
  menhHanh: string;
  tuoiHref: string;
}

export function canChiYearHeader(canChi: CanChi): CanChiYearHeader {
  const chi = CHI_LIST[canChi.chiIndex];
  const slug = canChiSlug(canChi);
  return {
    slug,
    canChi,
    canHanh: CAN_HANH[canChi.canIndex] ?? "",
    chiOrder: canChi.chiIndex + 1,
    conGiap: chi?.conVat ?? "",
    menh: canChi.napAm.name,
    menhHanh: canChi.napAm.element,
    tuoiHref: `/tuoi/${slug}/`,
  };
}

export const CAN_CHI_YEAR_SLUGS: readonly string[] = ALL_CAN_CHI.map((c) => canChiSlug(c));

/** Năm âm lịch dùng để gắn mốc vào trang năm can chi: `lunarYear` (thiếu thì `year`); null = không gắn. */
export function canChiYearOfEvent(e: Pick<NamSuKien, "year" | "lunarYear">): number | null {
  return e.lunarYear === undefined ? e.year : e.lunarYear;
}

/** Sự kiện của các năm âm lịch mang can chi này, xếp theo năm tăng dần. */
export function eventsOfCanChi(canChi: CanChi, all: readonly NamSuKien[]): NamSuKien[] {
  return all
    .filter((e) => {
      const y = canChiYearOfEvent(e);
      return y !== null && canChiOfYear(y).index === canChi.index;
    })
    .sort((a, b) => (canChiYearOfEvent(a) ?? a.year) - (canChiYearOfEvent(b) ?? b.year) || a.year - b.year);
}

/** "Ngày 26/7 âm lịch", "Tháng 8 âm lịch", "Mùa xuân"; kèm ngày dương nếu có. */
export function eventDateText(e: Pick<NamSuKien, "lunarDate" | "lunarDay" | "solar" | "solarDateSource">): string | null {
  const t = e.lunarDate?.trim();
  const lunar = !t ? "" : e.lunarDay ? `Ngày ${t} âm lịch` : /^tháng/i.test(t) ? `${t[0]!.toUpperCase()}${t.slice(1)} âm lịch` : `${t[0]!.toUpperCase()}${t.slice(1)}`;
  const solar = e.solar ? `${e.solarDateSource === "computed" ? "khoảng " : ""}${pad2(e.solar.day)}/${pad2(e.solar.month)}/${e.solar.year}` : "";
  if (lunar && solar) return `${lunar} · dương lịch ${solar}`;
  if (solar) return `Ngày ${solar}`;
  return lunar || null;
}

/** "mùng 7", "ngày 15" — cách gọi ngày âm trong tháng. */
export function lunarDayWord(day: number): string {
  return day <= 10 ? `mùng ${day}` : `ngày ${day}`;
}

export interface SolarLabel {
  solar: SolarDate;
  weekday: string;
  text: string;
}

export function solarLabel(solar: SolarDate): SolarLabel {
  const wd = WEEKDAY_LONG[(jdFromDate(solar.day, solar.month, solar.year) + 1) % 7] ?? "";
  return { solar, weekday: wd, text: `${wd}, ${pad2(solar.day)}/${pad2(solar.month)}/${solar.year}` };
}

/** Ngày dương của ngày âm (tháng thường); ngày 30 không tồn tại thì lùi về ngày 29. Lỗi → null. */
export function lunarToSolarSafe(day: number, month: number, year: number, leap = false): SolarLabel | null {
  for (const d of day === 30 ? [30, 29] : [day]) {
    try {
      const s = lunarToSolar(d, month, year, leap);
      const back = solarToLunar(s.day, s.month, s.year);
      if (back.day === d && back.month === month) return solarLabel(s);
    } catch {
      /* thử ngày kế tiếp */
    }
  }
  return null;
}

export interface FestivalYearRow {
  year: number;
  canChi: string;
  cells: (SolarLabel | null)[];
}

/** Bảng `count` năm từ `startYear`: mỗi lễ hội một cột, ngày dương tính từ ngày âm bằng lõi lịch. */
export function festivalTable(festivals: readonly Festival[], startYear: number, count = 10): FestivalYearRow[] {
  return Array.from({ length: count }, (_, i) => {
    const year = startYear + i;
    return {
      year,
      canChi: canChiOfYear(year).name,
      cells: festivals.map((f) => lunarToSolarSafe(f.lunarDay, f.lunarMonth, year)),
    };
  });
}

export function normalizeVi(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}
