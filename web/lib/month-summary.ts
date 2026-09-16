import type { MonthCell } from "@/lib/month-grid";

export interface MonthDayRef {
  day: number;
  month: number;
  year: number;
  lunarDay: number;
  lunarMonth: number;
}

export interface MonthSummary {
  totalDays: number;
  goodDays: MonthDayRef[];
  avoidDays: MonthDayRef[];
  mungMotOrRamDays: MonthDayRef[];
}

function toRef(cell: MonthCell): MonthDayRef {
  return {
    day: cell.solarDay,
    month: cell.solarMonth,
    year: cell.solarYear,
    lunarDay: cell.lunarDay,
    lunarMonth: cell.lunarMonth,
  };
}

/** Tổng hợp ngày hoàng đạo / hắc đạo / mùng một · rằm trong tháng, chỉ tính các ô thuộc đúng tháng đang xem. */
export function getMonthSummary(cells: MonthCell[]): MonthSummary {
  const currentMonthCells = cells.filter((c) => c.isCurrentMonth);
  return {
    totalDays: currentMonthCells.length,
    goodDays: currentMonthCells.filter((c) => c.isHoangDao).map(toRef),
    avoidDays: currentMonthCells.filter((c) => !c.isHoangDao).map(toRef),
    mungMotOrRamDays: currentMonthCells.filter((c) => c.isMungMotOrRam).map(toRef),
  };
}
