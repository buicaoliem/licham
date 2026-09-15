/**
 * Thập nhị trực. The month here is the solar-term month (tháng tiết): it
 * begins on the day a "tiết" (Lập xuân 315°, Kinh trập 345°, …, every 30°)
 * starts, Lập xuân opening month Dần. Kiến falls on the day whose chi equals
 * the month's chi, and the 12 trực then advance one per day; on the day a
 * tiết begins, the trực of the previous day repeats.
 */

export const TRUC = [
  "Kiến",
  "Trừ",
  "Mãn",
  "Bình",
  "Định",
  "Chấp",
  "Phá",
  "Nguy",
  "Thành",
  "Thu",
  "Khai",
  "Bế",
] as const;

export type TrucName = (typeof TRUC)[number];

export interface Truc {
  index: number;
  name: TrucName;
}

/** Chi index (Dần = 2) of the solar-term month containing solar longitude `lambda`. */
export function solarMonthChiIndex(lambda: number): number {
  const monthsSinceLapXuan = Math.floor((((lambda - 315) % 360) + 360) % 360 / 30);
  return (monthsSinceLapXuan + 2) % 12;
}

export function getTruc(dayChiIndex: number, solarMonthChi: number): Truc {
  const index = (((dayChiIndex - solarMonthChi) % 12) + 12) % 12;
  return { index, name: TRUC[index] as TrucName };
}
