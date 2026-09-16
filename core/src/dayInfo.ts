import {
  type CanChi,
  type CanChiHour,
  canChiOfDay,
  canChiOfHours,
  canChiOfMonth,
  canChiOfYear,
} from "./canChi";
import { type DayStar, type HourStarName, getDayStar, getHourStars } from "./hoangDao";
import { type SolarDate, dayOfWeek, isValidSolarDate, jdFromDate } from "./julian";
import { type LunarDate, VN_TIME_ZONE, solarToLunar } from "./lunar";
import { type SolarTermInfo, getSolarTerm, solarLongitudeAt } from "./solarTerms";
import { hyThanOfCan, taiThanOfCan } from "./tables/huong-xuat-hanh";
import { khongMinhOfLunarDay } from "./tables/khong-minh";
import { lyThuanPhongOfDay } from "./tables/ly-thuan-phong";
import { DERIVED_SAO, derivedSaoMatches } from "./tables/ngoc-hap-derived";
import { nhiThapBatTuIndexOfJd, nhiThapBatTuOfJd } from "./tables/nhi-thap-bat-tu";
import { type Truc, getTruc, solarMonthChiIndex } from "./truc";

export interface HourInfo extends CanChiHour {
  star: HourStarName;
  isHoangDao: boolean;
}

/** Placeholder shapes for data to be loaded from an external source later. */
export interface NamedEntry {
  name: string;
}
export interface DirectionEntry {
  direction: string;
}
export interface RatedEntry {
  name: string;
  isGood: boolean;
}
export interface HourRatedEntry extends RatedEntry {
  chiIndex: number;
}
export interface TuoiXung {
  ngay: CanChi[];
  thang: CanChi[];
}

export interface DayInfo {
  solar: SolarDate & { dayOfWeek: number; jd: number };
  lunar: LunarDate;
  canChi: {
    day: CanChi;
    month: CanChi;
    year: CanChi;
  };
  /** The 12 hours, starting with giờ Tý. */
  hours: HourInfo[];
  /** Solar term in effect at the end of this day (a term starting during the day counts). */
  solarTerm: SolarTermInfo;
  truc: Truc;
  /** Ngày hoàng đạo/hắc đạo — determined by the 12 thần sát, not by trực. */
  thanSatNgay: DayStar;

  nhiThapBatTu: RatedEntry | null;
  /** Sao tốt theo bảng suy ngược (ngoc-hap-derived). Chưa có phần mô tả. */
  saoTot: NamedEntry[] | null;
  /** Sao xấu theo bảng suy ngược (ngoc-hap-derived). Chưa có phần mô tả. */
  saoXau: NamedEntry[] | null;
  // TODO: nạp từ nguồn ngoài, xem GĐ1b
  hyThan: DirectionEntry | null;
  // TODO: nạp từ nguồn ngoài, xem GĐ1b
  taiThan: DirectionEntry | null;
  // TODO: nạp từ nguồn ngoài, xem GĐ1b
  khongMinh: RatedEntry | null;
  // TODO: nạp từ nguồn ngoài, xem GĐ1b
  lyThuanPhong: HourRatedEntry[] | null;
  // TODO: nạp từ nguồn ngoài, xem GĐ1b
  tuoiXung: TuoiXung | null;
}

const VN_OFFSET_MS = VN_TIME_ZONE * 3600000;

/** Civil date in Vietnam (UTC+7) of an instant. */
export function vietnamDateOf(date: Date): SolarDate {
  const ms = date.getTime();
  if (Number.isNaN(ms)) throw new RangeError("Invalid Date");
  const local = new Date(ms + VN_OFFSET_MS);
  return { day: local.getUTCDate(), month: local.getUTCMonth() + 1, year: local.getUTCFullYear() };
}

/**
 * Everything computable for one civil day in Vietnam.
 * A `Date` argument is interpreted as an instant and mapped to its Vietnam (UTC+7) calendar date.
 */
export function getDayInfo(date: Date | SolarDate): DayInfo {
  const { day, month, year } = date instanceof Date ? vietnamDateOf(date) : date;
  if (!isValidSolarDate(day, month, year)) {
    throw new RangeError(`Invalid solar date ${day}/${month}/${year}`);
  }
  const jd = jdFromDate(day, month, year);
  const lunar = solarToLunar(day, month, year);
  const dayCanChi = canChiOfDay(jd);

  // Last millisecond of the day, Vietnam time.
  const endOfDay = new Date(Date.UTC(year, month - 1, day + 1) - VN_OFFSET_MS - 1);
  const solarTerm = getSolarTerm(endOfDay);
  const solarMonthChi = solarMonthChiIndex(solarLongitudeAt(endOfDay));
  const truc = getTruc(dayCanChi.chiIndex, solarMonthChi);
  const thanSatNgay = getDayStar(dayCanChi.chiIndex, solarMonthChi);

  const nhiThapBatTu = nhiThapBatTuOfJd(jd);
  const yearCanChi = canChiOfYear(lunar.year);

  const saoDay = {
    lunarMonth: lunar.month,
    lunarDay: lunar.day,
    dayCan: dayCanChi.canIndex,
    dayChi: dayCanChi.chiIndex,
    termMonthChi: solarMonthChi,
    yearCan: yearCanChi.canIndex,
    nhiThapBatTuIndex: nhiThapBatTuIndexOfJd(jd),
    jd,
  };
  const sao = DERIVED_SAO.filter((s) => derivedSaoMatches(s, saoDay));
  const khongMinh = khongMinhOfLunarDay(lunar.day);
  const hyThan = hyThanOfCan(dayCanChi.can);
  const taiThan = taiThanOfCan(dayCanChi.can);
  const lyThuanPhong = lyThuanPhongOfDay(lunar.day, lunar.month);

  const stars = getHourStars(dayCanChi.chiIndex);
  const hours = canChiOfHours(dayCanChi.canIndex).map((h, i) => {
    const s = stars[i]!;
    return { ...h, star: s.star, isHoangDao: s.isHoangDao };
  });

  return {
    solar: { day, month, year, dayOfWeek: dayOfWeek(jd), jd },
    lunar,
    canChi: {
      day: dayCanChi,
      month: canChiOfMonth(lunar.month, lunar.year),
      year: yearCanChi,
    },
    hours,
    solarTerm,
    truc,
    thanSatNgay,
    nhiThapBatTu,
    saoTot: sao.filter((s) => s.isGood).map((s) => ({ name: s.name })),
    saoXau: sao.filter((s) => !s.isGood).map((s) => ({ name: s.name })),
    hyThan,
    taiThan,
    khongMinh,
    lyThuanPhong,
    tuoiXung: null, // TODO: Liêm cấp bảng
  };
}
