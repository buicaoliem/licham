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

/** Sự kiện của các năm mang can chi này, xếp theo năm tăng dần. */
export function eventsOfCanChi(canChi: CanChi, all: readonly NamSuKien[]): NamSuKien[] {
  return all.filter((e) => canChiOfYear(e.year).index === canChi.index).sort((a, b) => a.year - b.year);
}

export interface SolarLabel {
  solar: SolarDate;
  weekday: string;
  text: string;
}

function label(solar: SolarDate): SolarLabel {
  const wd = WEEKDAY_LONG[(jdFromDate(solar.day, solar.month, solar.year) + 1) % 7] ?? "";
  return { solar, weekday: wd, text: `${wd}, ${pad2(solar.day)}/${pad2(solar.month)}/${solar.year}` };
}

/** Ngày dương của ngày âm (tháng thường); ngày 30 không tồn tại thì lùi về ngày 29. Lỗi → null. */
export function lunarToSolarSafe(day: number, month: number, year: number, leap = false): SolarLabel | null {
  for (const d of day === 30 ? [30, 29] : [day]) {
    try {
      const s = lunarToSolar(d, month, year, leap);
      const back = solarToLunar(s.day, s.month, s.year);
      if (back.day === d && back.month === month) return label(s);
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
