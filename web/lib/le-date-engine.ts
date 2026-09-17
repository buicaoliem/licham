/** Tính ngày dương lịch cho các trang /le/[slug], dùng lõi lịch @licham/core (không sửa core). */
import {
  type SolarDate,
  canChiOfYear,
  dayOfWeek,
  getSolarTermsOfYear,
  jdFromDate,
  lunarToSolar,
  solarToLunar,
  vietnamDateOf,
} from "@licham/core";
import { daysInMonth } from "./format";
import { LE_LIST, type LePage } from "./le";

/** Ngày cuối cùng của tháng 12 âm lịch năm `lunarYear` (29 hoặc 30 tùy năm đủ/thiếu). */
export function lastDayOfLunarDecember(lunarYear: number): SolarDate {
  try {
    return lunarToSolar(30, 12, lunarYear, false);
  } catch {
    return lunarToSolar(29, 12, lunarYear, false);
  }
}

/** Ngày trong tháng ứng với "thứ N của tuần" (weekday: 0=CN..6=Thứ Bảy, khớp dayOfWeek()). */
export function nthWeekdayOfMonth(nth: number, weekday: number, month: number, year: number): SolarDate {
  const total = daysInMonth(month, year);
  let count = 0;
  for (let day = 1; day <= total; day++) {
    if (dayOfWeek(jdFromDate(day, month, year)) === weekday) {
      count++;
      if (count === nth) return { day, month, year };
    }
  }
  throw new Error(`Không tìm thấy lần thứ ${nth} của thứ ${weekday} trong tháng ${month}/${year}`);
}

/** Ngày dương lịch bắt đầu tiết khí `name` trong năm dương lịch `year`. */
export function solarTermStart(name: string, year: number): SolarDate {
  const terms = getSolarTermsOfYear(year);
  const term = terms.find((t) => t.name === name);
  if (!term) throw new Error(`Không tìm thấy tiết khí "${name}" trong năm ${year}`);
  return vietnamDateOf(term.start);
}

/**
 * Ngày dương lịch của một trang lễ ứng với "năm hàng" `year`:
 * - am: lunarToSolar(ngày, tháng, year, false) — year là năm âm lịch.
 * - am-cuoi-thang: ngày cuối tháng Chạp NĂM ÂM LỊCH `year` (rơi vào khoảng cuối tháng 1 – giữa tháng 2 dương lịch của year+1).
 * - tiet-khi: ngày dương lịch bắt đầu tiết khí trong năm dương lịch `year`.
 * - duong: ngày/tháng cố định của năm dương lịch `year`.
 * - duong-thu: thứ N trong tuần của tháng, năm dương lịch `year`.
 */
export function occurrenceInYear(page: LePage, year: number): SolarDate {
  const nc = page.ngayChinh;
  switch (page.lich) {
    case "am": {
      if (!nc.am) throw new Error(`Thiếu ngayChinh.am cho trang ${page.slug}`);
      return lunarToSolar(nc.am.ngay, nc.am.thang, year, false);
    }
    case "am-cuoi-thang": {
      return lastDayOfLunarDecember(year);
    }
    case "tiet-khi": {
      if (!nc.tietKhi) throw new Error(`Thiếu ngayChinh.tietKhi cho trang ${page.slug}`);
      return solarTermStart(nc.tietKhi, year);
    }
    case "duong": {
      if (!nc.duong) throw new Error(`Thiếu ngayChinh.duong cho trang ${page.slug}`);
      return { day: nc.duong.ngay, month: nc.duong.thang, year };
    }
    case "duong-thu": {
      if (!nc.duongThu) throw new Error(`Thiếu ngayChinh.duongThu cho trang ${page.slug}`);
      return nthWeekdayOfMonth(nc.duongThu.thuTu, nc.duongThu.thu, nc.duongThu.thang, year);
    }
  }
}

export interface LeYearRow {
  /** Nhãn "Năm" hiển thị ở bảng — với am-cuoi-thang đây là năm âm lịch mà đêm giao thừa thuộc về. */
  year: number;
  /** Tên can chi của năm âm lịch tương ứng với ngày tính ra (vd. "Nhâm Dần"). */
  canChi: string;
  /** "ngày/tháng" âm lịch thực tế của ngày tính ra, vd "20/8". */
  lunarLabel: string;
  solar: SolarDate;
  /** 0..6, 0 = Chủ nhật (khớp dayOfWeek()/WEEKDAY_LONG). */
  weekday: number;
}

export function yearRow(page: LePage, year: number): LeYearRow {
  const solar = occurrenceInYear(page, year);
  const lunar = solarToLunar(solar.day, solar.month, solar.year);
  const canChi = canChiOfYear(lunar.year).name;
  const weekday = dayOfWeek(jdFromDate(solar.day, solar.month, solar.year));
  return { year, canChi, lunarLabel: `${lunar.day}/${lunar.month}`, solar, weekday };
}

export function tenYearTable(page: LePage, startYear: number, endYear: number): LeYearRow[] {
  const rows: LeYearRow[] = [];
  for (let y = startYear; y <= endYear; y++) rows.push(yearRow(page, y));
  return rows;
}

/** Lần xuất hiện tiếp theo (>= today) của trang lễ, tìm trong [today.year - 1, today.year + 3]. */
export function nextOccurrence(page: LePage, today: SolarDate): LeYearRow {
  const todayJd = jdFromDate(today.day, today.month, today.year);
  for (let y = today.year - 1; y <= today.year + 3; y++) {
    const row = yearRow(page, y);
    const jd = jdFromDate(row.solar.day, row.solar.month, row.solar.year);
    if (jd >= todayJd) return row;
  }
  // Không nên xảy ra trong thực tế, nhưng tránh throw để build không vỡ.
  return yearRow(page, today.year + 3);
}

/** Số ngày còn lại từ `today` tới `target` (âm nếu đã qua). */
export function daysUntil(today: SolarDate, target: SolarDate): number {
  return jdFromDate(target.day, target.month, target.year) - jdFromDate(today.day, today.month, today.year);
}

/** Các trang lễ trùng đúng ngày dương lịch `date` — dùng cho liên kết chéo trên /ngay/[slug]. */
export function holidaysOnDate(date: SolarDate): LePage[] {
  const targetJd = jdFromDate(date.day, date.month, date.year);
  const matches: LePage[] = [];
  for (const page of LE_LIST) {
    for (const y of [date.year - 1, date.year, date.year + 1]) {
      const occ = occurrenceInYear(page, y);
      if (jdFromDate(occ.day, occ.month, occ.year) === targetJd) {
        matches.push(page);
        break;
      }
    }
  }
  return matches;
}
