/**
 * The 12 thần sát (Thanh Long, Minh Đường, …) used for both giờ hoàng đạo /
 * hắc đạo (hour granularity) and ngày hoàng đạo / hắc đạo (day granularity).
 * Ngày hoàng đạo/hắc đạo — NOT trực — decides which of the two a day is;
 * trực is a separate system that only says which activities suit the day.
 *
 * Giờ hoàng đạo: the 12 stars follow each other hour by hour; the hour of
 * Thanh Long depends on the day's chi:
 * Tý/Ngọ → Thân, Sửu/Mùi → Tuất, Dần/Thân → Tý, Mão/Dậu → Dần, Thìn/Tuất → Thìn, Tỵ/Hợi → Ngọ.
 *
 * Ngày hoàng đạo: the 12 stars follow each other day by day; the day of
 * Thanh Long depends on the solar-term month's chi, by the same Tý/Ngọ →
 * Thân, … mapping as above but keyed on the month's chi instead of a day's.
 */

export const HOUR_STARS = [
  "Thanh Long",
  "Minh Đường",
  "Thiên Hình",
  "Chu Tước",
  "Kim Quỹ",
  "Bảo Quang",
  "Bạch Hổ",
  "Ngọc Đường",
  "Thiên Lao",
  "Nguyên Vũ",
  "Tư Mệnh",
  "Câu Trận",
] as const;

export type HourStarName = (typeof HOUR_STARS)[number];

const HOANG_DAO_STARS: ReadonlySet<HourStarName> = new Set([
  "Thanh Long",
  "Minh Đường",
  "Kim Quỹ",
  "Bảo Quang",
  "Ngọc Đường",
  "Tư Mệnh",
]);

export interface HourStar {
  /** 0..11, 0 = giờ Tý. */
  chiIndex: number;
  star: HourStarName;
  isHoangDao: boolean;
}

/** Star and hoàng đạo flag for each of the 12 hours, given the day's chi index. */
export function getHourStars(dayChiIndex: number): HourStar[] {
  const thanhLongHour = (2 * (dayChiIndex % 6) + 8) % 12;
  return HOUR_STARS.map((_, chiIndex) => {
    const star = HOUR_STARS[(chiIndex - thanhLongHour + 12) % 12] as HourStarName;
    return { chiIndex, star, isHoangDao: HOANG_DAO_STARS.has(star) };
  });
}

export interface DayStar {
  star: HourStarName;
  isHoangDao: boolean;
}

/**
 * Star and hoàng đạo/hắc đạo flag for a day, given its own chi index and the
 * chi index of the solar-term month it falls in (see `solarMonthChiIndex`).
 * On the day a tiết begins, the month's chi changes but the day's chi only
 * advances by one, so the star can repeat or skip one step — the same
 * behavior trực already has at tiết boundaries (see truc.ts).
 */
export function getDayStar(dayChiIndex: number, solarMonthChi: number): DayStar {
  const thanhLongDay = (2 * (solarMonthChi % 6) + 8) % 12;
  const star = HOUR_STARS[(dayChiIndex - thanhLongDay + 12) % 12] as HourStarName;
  return { star, isHoangDao: HOANG_DAO_STARS.has(star) };
}
