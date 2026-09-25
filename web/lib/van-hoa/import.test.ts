import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { canChiOfYear } from "@licham/core";
import { footerLinks, menuItems } from "../site-nav";
import { canChiBySlug } from "../tuoi";
import { namEventsOfLunarDay } from "./blocks";
import { EVENTS } from "./content";
import { NAM_SU_KIEN } from "./data/nam-su-kien";
import { NAM_SU_KIEN_IMPORTED } from "./data/nam-su-kien.generated";
import { NHAN_VAT_IMPORTED } from "./data/nhan-vat.generated";
import { BAI_VIET_IMPORTED } from "./data/bai-viet.generated";
import { parseFestivals, parseLunarDate, parseSolarYear, placeLine, toHistoryEvents } from "./import-logic";
import { eventsOfCanChi } from "./logic";
import type { NamSuKien } from "./types";

const base: NamSuKien = { year: 1945, lunarYear: 1945, dynasty: "hien-dai", title: "X", summary: "Y", label: "chinh-su", updatedAt: "2026-09-26" };

describe("năm âm lịch ≠ năm dương lịch", () => {
  it("Rạch Gầm – Xoài Mút (dương lịch 1785) thuộc trang Giáp Thìn 1784, không thuộc Ất Tỵ 1785", () => {
    const e = NAM_SU_KIEN_IMPORTED.find((x) => x.title.startsWith("Đại thắng Rạch Gầm"))!;
    expect(e.year).toBe(1785);
    expect(e.lunarYear).toBe(1784);
    expect(eventsOfCanChi(canChiBySlug("giap-thin")!, NAM_SU_KIEN)).toContain(e);
    expect(eventsOfCanChi(canChiOfYear(1785), NAM_SU_KIEN)).not.toContain(e);
  });

  it("gắn theo lunarYear, không suy từ year; lunarYear null thì không gắn trang năm nào", () => {
    const tet = { ...base, year: 1785, lunarYear: 1784 };
    const none = { ...base, year: -700, lunarYear: null };
    expect(eventsOfCanChi(canChiOfYear(1784), [tet, none])).toEqual([tet]);
    expect(eventsOfCanChi(canChiOfYear(1785), [tet, none])).toEqual([]);
    expect(eventsOfCanChi(canChiOfYear(-700), [tet, none])).toEqual([]);
  });

  it("Tuyên ngôn Độc lập ở trang Ất Dậu, ngày 26/7 âm lịch = 02/09/1945", () => {
    const e = eventsOfCanChi(canChiBySlug("at-dau")!, NAM_SU_KIEN).find((x) => x.title.startsWith("Tuyên ngôn Độc lập"))!;
    expect(e.lunarDate).toBe("26/7");
    expect(e.solar).toEqual({ day: 2, month: 9, year: 1945 });
  });
});

describe("Ngày này năm xưa", () => {
  it("mốc chỉ ghi tháng không vào, mốc có ngày cụ thể thì vào", () => {
    const lunar = (t: string) => ({ lunarDate: t, lunarDay: parseLunarDate(t).day, lunarMonth: parseLunarDate(t).month });
    const monthOnly = { ...base, id: "m", ...lunar("tháng 8") };
    const dated = { ...base, id: "d", ...lunar("26/7") };
    expect(monthOnly.lunarDay).toBeUndefined();
    expect(toHistoryEvents([monthOnly, dated]).map((h) => h.title)).toHaveLength(1);
    expect(namEventsOfLunarDay(26, 7, 3, [monthOnly, dated])).toEqual([dated]);
    expect(namEventsOfLunarDay(1, 8, 3, [monthOnly, dated])).toEqual([]);
  });

  it("dữ liệu thật: 94 mốc có ngày âm cụ thể, không mốc chỉ-tháng nào lọt vào", () => {
    expect(EVENTS).toHaveLength(94);
    const monthOnlyTitles = new Set(NAM_SU_KIEN_IMPORTED.filter((e) => e.lunarDay === undefined).map((e) => e.title));
    expect(EVENTS.filter((h) => monthOnlyTitles.has(h.title) && !NAM_SU_KIEN_IMPORTED.some((e) => e.title === h.title && e.lunarDay))).toEqual([]);
    expect(EVENTS.find((h) => h.lunarDay === 26 && h.lunarMonth === 7)?.href).toMatch(/^\/van-hoa\/nam\/at-dau\/#1945-/);
  });
});

describe("nơi thờ", () => {
  it("hiển thị dạng {nơi thờ} – {địa chỉ mới} (trước đây: {địa chỉ cũ})", () => {
    expect(placeLine({ name: "Đền Sóc", address: "xã Sóc Sơn, TP Hà Nội", oldAddress: "xã Phù Linh, huyện Sóc Sơn, Hà Nội" })).toBe(
      "Đền Sóc – xã Sóc Sơn, TP Hà Nội (trước đây: xã Phù Linh, huyện Sóc Sơn, Hà Nội)",
    );
    expect(placeLine({ name: "Đền A", address: "xã B, tỉnh C" })).toBe("Đền A – xã B, tỉnh C");
  });

  it("Thánh Gióng có 2 nơi thờ từ noi-tho.csv; thần trong nhà dùng chữ worshipPlaces", () => {
    const g = NHAN_VAT_IMPORTED.find((n) => n.slug === "thanh-giong")!;
    expect(g.places?.map((p) => p.name)).toEqual(["Đền Phù Đổng", "Đền Sóc"]);
    expect(g.places?.every((p) => p.oldAddress)).toBe(true);
    for (const slug of ["thuy-tinh", "tao-quan", "tho-cong"]) {
      const n = NHAN_VAT_IMPORTED.find((x) => x.slug === slug)!;
      expect(n.places).toBeUndefined();
      expect(n.worshipPlacesText).toBeTruthy();
    }
    expect(NHAN_VAT_IMPORTED.reduce((k, n) => k + (n.places?.length ?? 0), 0)).toBe(30);
  });
});

describe("phân tích dữ liệu nguồn", () => {
  it("năm dương lịch, ngày âm, lễ hội", () => {
    expect(parseSolarYear("2879 TCN")).toBe(-2879);
    expect(parseSolarYear("2 SCN")).toBe(2);
    expect(parseSolarYear("Thời Hùng Vương")).toBeNull();
    expect(parseLunarDate("5/10 - 7/10")).toEqual({ day: 5, month: 10 });
    expect(parseLunarDate("mùa xuân")).toEqual({});
    expect(parseFestivals("Hội Gióng đền Phù Đổng 7–9/4 âm; Hội Gióng đền Sóc 6–8/1 âm")).toEqual([
      { name: "Hội Gióng đền Phù Đổng", lunarDay: 7, lunarMonth: 4 },
      { name: "Hội Gióng đền Sóc", lunarDay: 6, lunarMonth: 1 },
    ]);
  });

  it("số lượng: 235 mốc / 20 nhân vật / 6 bài; mọi mục có updatedAt", () => {
    expect(NAM_SU_KIEN_IMPORTED).toHaveLength(235);
    expect(NAM_SU_KIEN_IMPORTED.filter((e) => e.lunarDay !== undefined)).toHaveLength(94);
    expect(NHAN_VAT_IMPORTED).toHaveLength(20);
    expect(BAI_VIET_IMPORTED).toHaveLength(6);
    for (const x of [...NAM_SU_KIEN_IMPORTED, ...NHAN_VAT_IMPORTED, ...BAI_VIET_IMPORTED]) expect(x.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("ghi chú needsCheck không nằm trong dữ liệu trang dùng", () => {
    for (const f of ["nam-su-kien", "nhan-vat", "bai-viet", "ngay-nay-nam-xua"]) {
      expect(readFileSync(new URL(`./data/${f}.generated.ts`, import.meta.url), "utf8")).not.toMatch(/needsCheck/);
    }
  });
});

describe("menu khi bật Văn hoá", () => {
  it("tắt: giữ nguyên menu có Đổi ngày; bật: bỏ Đổi ngày, Văn hoá ở cuối, Đổi ngày xuống chân trang", () => {
    expect(menuItems(false)).toEqual(["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Đổi ngày", "Ngày lễ", "Xem tuổi"]);
    expect(menuItems(true)).toEqual(["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Ngày lễ", "Xem tuổi", "Văn hoá"]);
    expect(footerLinks(false).some((l) => l.href === "/doi-ngay-am-duong/")).toBe(false);
    expect(footerLinks(true).some((l) => l.href === "/doi-ngay-am-duong/" && l.label === "Đổi ngày")).toBe(true);
  });
});
