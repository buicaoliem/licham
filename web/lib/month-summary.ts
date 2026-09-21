import type { MonthCell } from "@/lib/calendar/calendar-month";

export interface MonthDayRef {
  day: number;
  month: number;
  year: number;
  lunarDay: number;
  lunarMonth: number;
  /** Tên 2 sao tiêu biểu nhất cho lý do ngày này được chọn. */
  topStars: string[];
}

export interface MonthSummary {
  totalDays: number;
  goodDaysCount: number;
  avoidDaysCount: number;
  goodDays: MonthDayRef[];
  avoidDays: MonthDayRef[];
  mungMotOrRamDays: MonthDayRef[];
}

const MAX_PICKS = 6;

function toRef(cell: MonthCell, topStars: string[]): MonthDayRef {
  return {
    day: cell.solarDay,
    month: cell.solarMonth,
    year: cell.solarYear,
    lunarDay: cell.lunarDay,
    lunarMonth: cell.lunarMonth,
    topStars,
  };
}

function byDayAsc(a: MonthCell, b: MonthCell): number {
  return a.solarDay - b.solarDay;
}

/**
 * 6 ngày hoàng đạo có điểm (số sao tốt trừ số sao xấu) cao nhất, sắp lại theo ngày tăng dần.
 * Ít hơn 6 ngày đủ điều kiện thì lấy hết, không bù bằng ngày không phải hoàng đạo.
 */
function pickGoodDays(cells: MonthCell[]): MonthDayRef[] {
  const candidates = cells.filter((c) => c.isHoangDao);
  const ranked = [...candidates].sort(
    (a, b) => b.saoTotNames.length - b.saoXauNames.length - (a.saoTotNames.length - a.saoXauNames.length),
  );
  return ranked
    .slice(0, MAX_PICKS)
    .sort(byDayAsc)
    .map((c) => toRef(c, c.saoTotNames.slice(0, 2)));
}

/**
 * 6 ngày hắc đạo có điểm (số sao xấu trừ số sao tốt) cao nhất, sắp lại theo ngày tăng dần.
 * Ít hơn 6 ngày đủ điều kiện thì lấy hết, không bù bằng ngày không phải hắc đạo.
 */
function pickAvoidDays(cells: MonthCell[]): MonthDayRef[] {
  const candidates = cells.filter((c) => !c.isHoangDao);
  const ranked = [...candidates].sort(
    (a, b) => b.saoXauNames.length - b.saoTotNames.length - (a.saoXauNames.length - a.saoTotNames.length),
  );
  return ranked
    .slice(0, MAX_PICKS)
    .sort(byDayAsc)
    .map((c) => toRef(c, c.saoXauNames.slice(0, 2)));
}

/** Tổng hợp ngày hoàng đạo / hắc đạo / mùng một · rằm trong tháng, chỉ tính các ô thuộc đúng tháng đang xem. */
export function getMonthSummary(cells: MonthCell[]): MonthSummary {
  const currentMonthCells = cells.filter((c) => c.isCurrentMonth);
  return {
    totalDays: currentMonthCells.length,
    goodDaysCount: currentMonthCells.filter((c) => c.isHoangDao).length,
    avoidDaysCount: currentMonthCells.filter((c) => !c.isHoangDao).length,
    goodDays: pickGoodDays(currentMonthCells),
    avoidDays: pickAvoidDays(currentMonthCells),
    mungMotOrRamDays: currentMonthCells.filter((c) => c.isMungMotOrRam).map((c) => toRef(c, [])),
  };
}
