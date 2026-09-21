import { describe, expect, it } from "vitest";
import {
  getHoliday,
  getHolidayOccurrence,
  getHolidayOccurrences,
  getRelatedHolidays,
  getUpcomingHolidays,
  googleCalendarUrl,
  icsDataUri,
  listHolidays,
} from "./holiday";

const TODAY = { day: 21, month: 9, year: 2026 };

describe("holiday service", () => {
  it("maps every le page to an event with a rule", () => {
    for (const e of listHolidays()) expect(e.lunarRule ?? e.solarRule, e.slug).toBeDefined();
    expect(getHoliday("khong-co")).toBeUndefined();
  });

  it("computes lunar holidays from the rule, not a hard-coded date", () => {
    const list = getHolidayOccurrences("tet-trung-thu", 2025, 2027);
    expect(list.map((o) => o.year)).toEqual([2025, 2026, 2027]);
    const trungThu2026 = getHolidayOccurrence("tet-trung-thu", 2026, TODAY);
    expect(trungThu2026.lunarLabel).toBe("15/8");
    expect(trungThu2026.solar).toEqual({ day: 25, month: 9, year: 2026 });
    expect(trungThu2026.daysLeft).toBe(4);
  });

  it("upcoming holidays are sorted, excluded slug omitted, deterministic", () => {
    const a = getUpcomingHolidays(TODAY, 6, { exclude: "tet-trung-thu" });
    expect(a.length).toBe(6);
    expect(a.some((x) => x.event.slug === "tet-trung-thu")).toBe(false);
    const days = a.map((x) => x.occurrence.daysLeft);
    expect(days).toEqual([...days].sort((x, y) => x - y));
    expect(days[0]).toBeGreaterThanOrEqual(0);
    expect(getRelatedHolidays("tet-trung-thu", TODAY)).toEqual(getRelatedHolidays("tet-trung-thu", TODAY));
  });

  it("builds calendar links", () => {
    const g = googleCalendarUrl("Trung thu 2026", { day: 25, month: 9, year: 2026 }, "x");
    expect(g).toContain("dates=20260925%2F20260926");
    const ics = decodeURIComponent(icsDataUri("Trung thu", { day: 31, month: 12, year: 2026 }, "s", "d"));
    expect(ics).toContain("DTSTART;VALUE=DATE:20261231");
    expect(ics).toContain("DTEND;VALUE=DATE:20270101");
  });
});
