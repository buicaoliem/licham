import {
  type SolarDate,
  SOLAR_TERM_NAMES,
  getSolarTerm,
  jdFromDate,
  jdToDate,
  solarToLunar,
  vietnamDateOf,
} from "@licham/core";
import { dateToSlug } from "@/lib/date-slug";
import { pad2 } from "@/lib/format";

export interface UpcomingOccasion {
  label: string;
  solar: SolarDate;
  href: string;
}

const LUNAR_HOLIDAYS = [
  { name: "Tết Nguyên đán", month: 1, day: 1, href: "/countdown/tet" },
  { name: "Rằm tháng Giêng", month: 1, day: 15, href: "/le/ram-thang-gieng" },
  { name: "Giỗ Tổ Hùng Vương", month: 3, day: 10, href: "/le/gio-to-hung-vuong" },
  { name: "Tết Đoan ngọ", month: 5, day: 5, href: "/countdown/doan-ngo" },
  { name: "Vu lan", month: 7, day: 15, href: "/countdown/vu-lan" },
  { name: "Trung thu", month: 8, day: 15, href: "/countdown/trung-thu" },
  { name: "Ông Công ông Táo", month: 12, day: 23, href: "/countdown/ong-tao" },
] as const;

/** "dd/mm" — nhãn cột ngày quan trọng sắp tới. */
export function formatSolarShort(d: SolarDate): string {
  return `${pad2(d.day)}/${pad2(d.month)}`;
}

/** The next four calendar milestones after `today`, computed directly from the lunar/solar-term engine. */
export function getUpcomingOccasions(today: SolarDate): UpcomingOccasion[] {
  const todayJd = jdFromDate(today.day, today.month, today.year);

  let nextMungMot: SolarDate | undefined;
  let nextRam: SolarDate | undefined;
  let nextHoliday: { name: string; href: string; solar: SolarDate } | undefined;

  for (let offset = 1; offset <= 400; offset++) {
    const solar = jdToDate(todayJd + offset);
    const lunar = solarToLunar(solar.day, solar.month, solar.year);

    if (!nextMungMot && lunar.day === 1) {
      nextMungMot = solar;
    }
    if (!nextRam && lunar.day === 15) {
      nextRam = solar;
    }
    if (!nextHoliday && !lunar.isLeapMonth) {
      const match = LUNAR_HOLIDAYS.find((h) => h.month === lunar.month && h.day === lunar.day);
      if (match) {
        nextHoliday = { name: match.name, href: match.href, solar };
      }
    }
    if (nextMungMot && nextRam && nextHoliday) break;
  }

  const currentTerm = getSolarTerm(new Date());
  const nextTermName = SOLAR_TERM_NAMES[(currentTerm.index + 1) % 24]!;
  const nextTermSolar = vietnamDateOf(currentTerm.end);

  const occasions: UpcomingOccasion[] = [];
  if (nextMungMot) {
    occasions.push({
      label: "Mùng một âm lịch",
      solar: nextMungMot,
      href: `/ngay/${dateToSlug(nextMungMot)}`,
    });
  }
  if (nextRam) {
    occasions.push({
      label: "Ngày rằm",
      solar: nextRam,
      href: `/ngay/${dateToSlug(nextRam)}`,
    });
  }
  occasions.push({
    label: nextTermName,
    solar: nextTermSolar,
    href: `/ngay/${dateToSlug(nextTermSolar)}`,
  });
  if (nextHoliday) {
    occasions.push({ label: nextHoliday.name, solar: nextHoliday.solar, href: nextHoliday.href });
  }

  return occasions;
}
