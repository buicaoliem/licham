import {
  type CanChi,
  type SolarDate,
  MAX_YEAR,
  MIN_YEAR,
  canChiNamSinh,
  isValidSolarDate,
  jdFromDate,
  solarToLunar,
} from "@licham/core";
import { daysInMonth, pad2 } from "@/lib/format";
import { chiByIndex } from "@/lib/tuoi";

export { MIN_YEAR, MAX_YEAR };

export interface AgeResult {
  birth: SolarDate;
  asOf: SolarDate;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  daysToNextBirthday: number;
  nextBirthday: SolarDate;
  lunarBirthYear: number;
  lunarAsOfYear: number;
  canChi: CanChi;
  conGiap: string;
  tuoiMu: number;
}

export class AgeInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AgeInputError";
  }
}

function serial(d: SolarDate): number {
  return jdFromDate(d.day, d.month, d.year);
}

function clampLeapDay(year: number, month: number, day: number): number {
  if (month === 2 && day === 29) {
    return daysInMonth(2, year) === 29 ? 29 : 28;
  }
  return day;
}

/** Sinh nhật dương lịch kế tiếp (kể cả hôm nay). 29/2 rơi năm không nhuận thì lấy 28/2. */
export function nextBirthdayOn(birth: SolarDate, today: SolarDate): SolarDate {
  const dayThisYear = clampLeapDay(today.year, birth.month, birth.day);
  const candidate: SolarDate = { year: today.year, month: birth.month, day: dayThisYear };
  if (serial(candidate) >= serial(today)) return candidate;
  const nextYear = today.year + 1;
  return { year: nextYear, month: birth.month, day: clampLeapDay(nextYear, birth.month, birth.day) };
}

function addMonths(d: SolarDate, monthsToAdd: number): SolarDate {
  const total = d.month - 1 + monthsToAdd;
  const year = d.year + Math.floor(total / 12);
  const month = ((total % 12) + 12) % 12 + 1;
  const day = Math.min(d.day, daysInMonth(month, year));
  return { day, month, year };
}

export function calendarDiff(birth: SolarDate, today: SolarDate): { years: number; months: number; days: number } {
  let totalMonths = (today.year - birth.year) * 12 + (today.month - birth.month);
  let candidate = addMonths(birth, totalMonths);
  if (serial(candidate) > serial(today)) {
    totalMonths -= 1;
    candidate = addMonths(birth, totalMonths);
  }
  const days = serial(today) - serial(candidate);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths - years * 12;
  return { years, months, days };
}

export function formatSolar(d: SolarDate): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;
}

/**
 * Tuổi dương theo ngày sinh, tuổi mụ theo năm âm lịch (Tết là mốc đổi năm).
 * Can chi lấy từ `canChiNamSinh` — đúng cả khi sinh trước Tết.
 */
export function computeAge(birth: SolarDate, asOf: SolarDate): AgeResult {
  if (!isValidSolarDate(birth.day, birth.month, birth.year)) {
    throw new AgeInputError("Ngày sinh không hợp lệ.");
  }
  if (!isValidSolarDate(asOf.day, asOf.month, asOf.year)) {
    throw new AgeInputError("Ngày tính tuổi không hợp lệ.");
  }
  if (birth.year < MIN_YEAR || asOf.year > MAX_YEAR) {
    throw new AgeInputError(`Chỉ tính tuổi trong khoảng năm ${MIN_YEAR}–${MAX_YEAR}.`);
  }
  if (serial(birth) > serial(asOf)) {
    throw new AgeInputError("Ngày sinh không thể sau ngày đang tính.");
  }

  const cal = calendarDiff(birth, asOf);
  const totalDays = serial(asOf) - serial(birth);
  const nextBirthday = nextBirthdayOn(birth, asOf);
  const lunarBirth = solarToLunar(birth.day, birth.month, birth.year);
  const lunarAsOf = solarToLunar(asOf.day, asOf.month, asOf.year);
  const canChi = canChiNamSinh(birth.day, birth.month, birth.year);

  return {
    birth,
    asOf,
    years: cal.years,
    months: cal.months,
    days: cal.days,
    totalDays,
    daysToNextBirthday: serial(nextBirthday) - serial(asOf),
    nextBirthday,
    lunarBirthYear: lunarBirth.year,
    lunarAsOfYear: lunarAsOf.year,
    canChi,
    conGiap: chiByIndex(canChi.chiIndex).conVat,
    tuoiMu: lunarAsOf.year - lunarBirth.year + 1,
  };
}
