import { type SolarDate, isValidSolarDate } from "@licham/core";
import { isIndexableYear, isSupportedYear } from "./config";

/** Cổng xuất bản: quyết định trang nào được render và được index, để đổi chính sách không phải sửa UI. */
export function canPublishDay(d: SolarDate): boolean {
  return isValidSolarDate(d.day, d.month, d.year) && isSupportedYear(d.year);
}

export function canPublishMonth(month: number, year: number): boolean {
  return Number.isInteger(month) && month >= 1 && month <= 12 && isSupportedYear(year);
}

export function canPublishYear(year: number): boolean {
  return isSupportedYear(year);
}

export type PageRef =
  | { kind: "day"; date: SolarDate }
  | { kind: "month"; month: number; year: number }
  | { kind: "year"; year: number };

export function canIndexPage(page: PageRef): boolean {
  switch (page.kind) {
    case "day":
      return canPublishDay(page.date) && isIndexableYear(page.date.year);
    case "month":
      return canPublishMonth(page.month, page.year) && isIndexableYear(page.year);
    case "year":
      return canPublishYear(page.year) && isIndexableYear(page.year);
  }
}
