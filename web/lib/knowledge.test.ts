import { describe, expect, it } from "vitest";
import { getCalendarDay } from "./calendar/calendar-day";
import { getRelatedKnowledgeLinks } from "./calendar/related";
import { KNOWLEDGE, knowledgeBySlug } from "./knowledge";
import { getVietnamToday, getVietnamTomorrow } from "./today";

describe("knowledge", () => {
  it("covers the required articles with unique slugs", () => {
    const slugs = KNOWLEDGE.map((k) => k.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of ["am-lich-la-gi", "can-chi", "ngu-hanh", "tiet-khi", "gio-hoang-dao", "nhi-thap-bat-tu", "truc-ngay", "sao-tot-xau", "thang-nhuan-am-lich"]) {
      expect(slugs).toContain(s);
    }
  });

  it("only relates to existing articles and has unique titles", () => {
    for (const k of KNOWLEDGE) for (const r of k.related) expect(knowledgeBySlug(r), `${k.slug} -> ${r}`).toBeDefined();
    expect(new Set(KNOWLEDGE.map((k) => k.title)).size).toBe(KNOWLEDGE.length);
  });

  it("day pages link to knowledge deterministically, plus leap-month article in a leap month", () => {
    const normal = getRelatedKnowledgeLinks(getCalendarDay({ day: 21, month: 9, year: 2026 }));
    expect(normal.map((l) => l.href)).toContain("/kien-thuc/truc-ngay/");
    expect(normal.map((l) => l.href)).not.toContain("/kien-thuc/thang-nhuan-am-lich/");
    const leap = getRelatedKnowledgeLinks(getCalendarDay({ day: 1, month: 4, year: 2023 }));
    expect(leap.map((l) => l.href)).toContain("/kien-thuc/thang-nhuan-am-lich/");
  });
});

describe("today / tomorrow", () => {
  it("tomorrow is exactly one day after today", () => {
    const t = getVietnamToday();
    const n = getVietnamTomorrow();
    const diff = Date.UTC(n.year, n.month - 1, n.day) - Date.UTC(t.year, t.month - 1, t.day);
    expect(diff).toBe(86400000);
  });
});
