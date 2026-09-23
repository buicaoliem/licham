import { describe, expect, it } from "vitest";
import { jdFromDate, jdToDate } from "@licham/core";
import { holidaysOnDate } from "@/lib/le-date-engine";
import { dateKey, dayBrief, holidaysOn, lichCells, notableDays, termsOfMonth, yearMonths } from "./lich-view";
import { getCalendarDay } from "./calendar-day";
import { parseKey, vnTodayKey } from "./vn-today";

const today = { day: 23, month: 9, year: 2026 };

describe("lich-view — chỉ đọc lại dữ liệu nguồn", () => {
  it("chỉ mục ngày lễ theo năm khớp holidaysOnDate() từng ngày của năm 2026", () => {
    for (let jd = jdFromDate(1, 1, 2026); jd <= jdFromDate(31, 12, 2026); jd++) {
      const d = jdToDate(jd);
      const a = holidaysOn(d).map((h) => h.slug).sort();
      const b = holidaysOnDate(d).map((h) => h.slug).sort();
      expect(a, dateKey(d)).toEqual(b);
    }
  }, 30_000);

  it("lưới tháng: tháng 2/2024 (năm nhuận dương) có 29 ngày trong tháng, bắt đầu từ thứ Hai", () => {
    const cells = lichCells(2, 2024, today);
    expect(cells.length % 7).toBe(0);
    expect(cells.filter((c) => c.inMonth).map((c) => c.day).at(-1)).toBe(29);
    expect(cells[0]!.weekday).toBe(1);
  });

  it("tháng nhuận âm lịch được đánh dấu N (tháng 6 nhuận năm Ất Tỵ, 2025)", () => {
    const cells = lichCells(8, 2025, today).filter((c) => c.inMonth);
    expect(cells.some((c) => c.isLeapMonth && c.lunarLabel.endsWith("N"))).toBe(true);
    const leap = cells.find((c) => c.isLeapMonth)!;
    expect(getCalendarDay(leap).lunarDate.isLeapMonth).toBe(true);
  });

  it("ô lịch khớp getCalendarDay (âm lịch, can chi, hoàng đạo)", () => {
    for (const c of lichCells(9, 2026, today).filter((x) => x.inMonth)) {
      const day = getCalendarDay(c);
      expect(c.lunarDay).toBe(day.lunarDate.day);
      expect(c.lunarMonth).toBe(day.lunarDate.month);
      expect(c.canChi).toBe(day.canChiDay.name);
      expect(c.isHoangDao).toBe(day.isHoangDaoDay);
    }
  });

  it("tóm tắt ngày tách việc thuận / nửa thuận / không thuận mà không mất việc nào", () => {
    for (let d = 1; d <= 30; d++) {
      const date = { day: d, month: 9, year: 2026 };
      const b = dayBrief(date);
      const day = getCalendarDay(date);
      expect(new Set([...b.good, ...b.mixed])).toEqual(new Set(day.goodActivities.map((a) => a.label)));
      expect(new Set([...b.bad, ...b.mixed])).toEqual(new Set(day.badActivities.map((a) => a.label)));
    }
  });

  it("tiết khí trong tháng 9/2026: Bạch lộ và Thu phân", () => {
    expect(termsOfMonth(9, 2026).map((t) => t.name)).toEqual(["Bạch lộ", "Thu phân"]);
  });

  it("ngày đáng chú ý gồm mùng một, rằm và Tết Trung thu (25/9/2026)", () => {
    const n = notableDays(lichCells(9, 2026, today));
    expect(n.some((x) => x.kind === "mung-mot" && x.day === 11)).toBe(true);
    expect(n.some((x) => x.kind === "ram" && x.day === 25)).toBe(true);
    expect(n.some((x) => x.leHref === "/le/tet-trung-thu/" && x.day === 25)).toBe(true);
  });

  it("lịch năm đủ 12 tháng, đủ số ngày (365/366)", () => {
    const count = (y: number) => yearMonths(y, today).reduce((s, m) => s + m.cells.filter(Boolean).length, 0);
    expect(yearMonths(2026, today)).toHaveLength(12);
    expect(count(2026)).toBe(365);
    expect(count(2024)).toBe(366);
  });
});

describe("vnTodayKey — ngày theo giờ Việt Nam", () => {
  it("đổi ngày đúng lúc 00:00 giờ Việt Nam (17:00 UTC)", () => {
    expect(vnTodayKey(new Date("2026-09-23T16:59:59Z"))).toBe("2026-09-23");
    expect(vnTodayKey(new Date("2026-09-23T17:00:00Z"))).toBe("2026-09-24");
  });
  it("qua năm mới và 29/2", () => {
    expect(vnTodayKey(new Date("2025-12-31T17:00:00Z"))).toBe("2026-01-01");
    expect(vnTodayKey(new Date("2024-02-28T17:30:00Z"))).toBe("2024-02-29");
  });
  it("parseKey đảo lại dateKey", () => {
    expect(parseKey(dateKey({ day: 5, month: 1, year: 2027 }))).toEqual({ day: 5, month: 1, year: 2027 });
  });
});
