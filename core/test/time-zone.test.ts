/**
 * Múi giờ lập lịch: trước 1968 lịch âm Việt Nam tính theo UTC+8, từ 1968 theo UTC+7.
 *  - 26/7 Ất Dậu = 02/09/1945 (ngày đọc Tuyên ngôn Độc lập, sử sách ghi cả hai ngày).
 *  - Tết Mậu Thân: 29/01/1968 theo UTC+7 (miền Bắc), 30/01/1968 theo UTC+8 (miền Nam) — trường hợp lệch nổi tiếng.
 */
import { describe, expect, it } from "vitest";
import { lunarToSolar, solarToLunar, vnTimeZoneOfYear } from "../src";

describe("time zone parameter", () => {
  it("picks UTC+8 before 1968 and UTC+7 from 1968", () => {
    expect(vnTimeZoneOfYear(1945)).toBe(8);
    expect(vnTimeZoneOfYear(1967)).toBe(8);
    expect(vnTimeZoneOfYear(1968)).toBe(7);
  });

  it("converts 26/7 Ất Dậu (1945) to 02/09/1945 with the pre-1968 time zone", () => {
    expect(lunarToSolar(26, 7, 1945, false, vnTimeZoneOfYear(1945))).toEqual({ day: 2, month: 9, year: 1945 });
    expect(solarToLunar(2, 9, 1945, 8)).toMatchObject({ day: 26, month: 7, year: 1945, isLeapMonth: false });
  });

  it("changes the result where UTC+7 and UTC+8 calendars differ (Tết 1968)", () => {
    expect(lunarToSolar(1, 1, 1968, false, 7)).toEqual({ day: 29, month: 1, year: 1968 });
    expect(lunarToSolar(1, 1, 1968, false, 8)).toEqual({ day: 30, month: 1, year: 1968 });
    expect(lunarToSolar(1, 1, 1968, false)).toEqual({ day: 29, month: 1, year: 1968 });
  });
});
