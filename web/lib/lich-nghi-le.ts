import { type SolarDate, dayOfWeek, jdFromDate } from "@licham/core";
import { LE_LIST, type LePage } from "@/lib/le";
import { occurrenceInYear } from "@/lib/le-date-engine";
import { WEEKDAY_LONG, pad2 } from "@/lib/format";

export const NGHI_LE_YEAR_START = 2022;
export const NGHI_LE_YEAR_END = 2031;

export function nghiLePages(): LePage[] {
  return LE_LIST.filter((p) => p.nghiLe);
}

export interface NghiLeRow {
  page: LePage;
  solar: SolarDate;
  weekday: string;
  soNgay: number;
  ghiChu?: string;
}

/** Các ngày nghỉ lễ trong một năm dương — ngày dương tính từ lõi lịch, số ngày theo dữ liệu trang lễ. */
export function nghiLeCuaNam(year: number): NghiLeRow[] {
  const rows: NghiLeRow[] = [];
  for (const page of nghiLePages()) {
    if (page.slug === "ngay-van-hoa-viet-nam" && year < 2026) continue;
    const solar = occurrenceInYear(page, year);
    if (solar.year !== year && page.lich === "am") {
      // Tết âm có thể rơi năm dương khác nhãn năm âm — vẫn liệt kê theo ngày dương thật.
    }
    const wd = dayOfWeek(jdFromDate(solar.day, solar.month, solar.year));
    rows.push({
      page,
      solar,
      weekday: WEEKDAY_LONG[wd]!,
      soNgay: page.nghiLe!.soNgay,
      ghiChu: page.nghiLe!.ghiChu,
    });
  }
  rows.sort((a, b) => a.solar.year - b.solar.year || a.solar.month - b.solar.month || a.solar.day - b.solar.day);
  return rows;
}

export function formatNghiLeDate(d: SolarDate): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;
}

export function nghiLeYears(): number[] {
  const years: number[] = [];
  for (let y = NGHI_LE_YEAR_START; y <= NGHI_LE_YEAR_END; y++) years.push(y);
  return years;
}
