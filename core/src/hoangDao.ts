/**
 * Giờ hoàng đạo / hắc đạo. The 12 stars follow each other hour by hour; the
 * hour of Thanh Long depends on the day's chi:
 * Tý/Ngọ → Thân, Sửu/Mùi → Tuất, Dần/Thân → Tý, Mão/Dậu → Dần, Thìn/Tuất → Thìn, Tỵ/Hợi → Ngọ.
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
