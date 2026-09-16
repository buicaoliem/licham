import {
  type SolarDate,
  SOLAR_TERM_NAMES,
  getSolarTerm,
  jdFromDate,
  jdToDate,
  solarToLunar,
  vietnamDateOf,
} from "@licham/core";

export interface UpcomingOccasion {
  label: string;
  solarDate: string;
}

const LUNAR_HOLIDAYS = [
  { name: "Tết Nguyên đán", month: 1, day: 1 },
  { name: "Rằm tháng Giêng", month: 1, day: 15 },
  { name: "Giỗ Tổ Hùng Vương", month: 3, day: 10 },
  { name: "Tết Đoan ngọ", month: 5, day: 5 },
  { name: "Vu lan", month: 7, day: 15 },
  { name: "Trung thu", month: 8, day: 15 },
  { name: "Ông Công ông Táo", month: 12, day: 23 },
] as const;

function formatSolar({ day, month, year }: SolarDate): string {
  return `${day}/${month}/${year}`;
}

/** "dd/mm", no year — the date format used in the "Ngày quan trọng sắp tới" list. */
export function formatSolarShort(solarDate: string): string {
  const [day, month] = solarDate.split("/");
  return `${day!.padStart(2, "0")}/${month!.padStart(2, "0")}`;
}

/** The next four calendar milestones after `today`, computed directly from the lunar/solar-term engine. */
export function getUpcomingOccasions(today: SolarDate): UpcomingOccasion[] {
  const todayJd = jdFromDate(today.day, today.month, today.year);

  let nextMungMot: string | undefined;
  let nextRam: string | undefined;
  let nextHoliday: { name: string; date: string } | undefined;

  for (let offset = 1; offset <= 400; offset++) {
    const solar = jdToDate(todayJd + offset);
    const lunar = solarToLunar(solar.day, solar.month, solar.year);

    if (!nextMungMot && lunar.day === 1) {
      nextMungMot = formatSolar(solar);
    }
    if (!nextRam && lunar.day === 15) {
      nextRam = formatSolar(solar);
    }
    if (!nextHoliday && !lunar.isLeapMonth) {
      const match = LUNAR_HOLIDAYS.find((h) => h.month === lunar.month && h.day === lunar.day);
      if (match) {
        nextHoliday = { name: match.name, date: formatSolar(solar) };
      }
    }
    if (nextMungMot && nextRam && nextHoliday) break;
  }

  const currentTerm = getSolarTerm(new Date());
  const nextTermName = SOLAR_TERM_NAMES[(currentTerm.index + 1) % 24]!;
  const nextTermDate = formatSolar(vietnamDateOf(currentTerm.end));

  const occasions: UpcomingOccasion[] = [];
  if (nextMungMot) occasions.push({ label: "Mùng một âm lịch", solarDate: nextMungMot });
  if (nextRam) occasions.push({ label: "Ngày rằm", solarDate: nextRam });
  occasions.push({ label: nextTermName, solarDate: nextTermDate });
  if (nextHoliday) occasions.push({ label: nextHoliday.name, solarDate: nextHoliday.date });

  return occasions;
}
