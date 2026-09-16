import { type SolarDate, getDayInfo, jdFromDate, jdToDate } from "@licham/core";

export interface MonthCell {
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  lunarDay: number;
  lunarMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isMungMotOrRam: boolean;
  isHoangDao: boolean;
  saoTotNames: string[];
  saoXauNames: string[];
}

/** Monday-first day-of-week index (0 = Thứ hai … 6 = Chủ nhật) for `dayOfWeek()` (0 = Sunday). */
function mondayFirst(dow: number): number {
  return (dow + 6) % 7;
}

/**
 * Full weeks covering `month`/`year`, including the trailing days of the previous
 * month and the leading days of the next month needed to fill a Monday-first grid.
 */
export function getMonthCells(month: number, year: number, today: SolarDate): MonthCell[] {
  const firstJd = jdFromDate(1, month, year);
  const firstDow = mondayFirst((firstJd + 1) % 7);
  const daysInThisMonth = new Date(year, month, 0).getDate();
  const totalBeforePad = firstDow + daysInThisMonth;
  const totalCells = Math.ceil(totalBeforePad / 7) * 7;

  const cells: MonthCell[] = [];
  for (let i = 0; i < totalCells; i++) {
    const jd = firstJd - firstDow + i;
    const solar = jdToDate(jd);
    const info = getDayInfo(solar);
    cells.push({
      solarDay: solar.day,
      solarMonth: solar.month,
      solarYear: solar.year,
      lunarDay: info.lunar.day,
      lunarMonth: info.lunar.month,
      isCurrentMonth: solar.month === month && solar.year === year,
      isToday: solar.day === today.day && solar.month === today.month && solar.year === today.year,
      isMungMotOrRam: info.lunar.day === 1 || info.lunar.day === 15,
      isHoangDao: info.thanSatNgay.isHoangDao,
      saoTotNames: (info.saoTot ?? []).map((s) => s.name),
      saoXauNames: (info.saoXau ?? []).map((s) => s.name),
    });
  }
  return cells;
}
