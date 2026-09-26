import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { jdFromDate, jdToDate, lunarToSolar, solarToLunar } from "@licham/core";
import { HERITAGE_FILES } from "../heritage-assets.generated";
import { LE_HOI } from "./data/le-hoi";
import { LE_HOI_IMPORTED } from "./data/le-hoi.generated";
import { NHAN_VAT } from "./data/nhan-vat";
import { leHoiEventJsonLd } from "./jsonld";
import { MONTHS, figuresOfLeHoi, hasFixedLunarDate, leHoiFloating, leHoiOfFigure, leHoiOfLunarDay, leHoiOfMonth, leHoiPath, lunarSpanShort, lunarSpanText, matchesLunarDay, nextOccurrence } from "./le-hoi";
import { vanHoaSubPaths } from "./paths";

const fest = (slug: string) => LE_HOI.find((f) => f.slug === slug)!;
const solar = (d: number, m: number, y: number) => {
  const s = lunarToSolar(d, m, y, false);
  return { day: s.day, month: s.month, year: s.year };
};

describe("nhập lễ hội", () => {
  it("số lượng và phân nhóm", () => {
    const n = LE_HOI.length;
    expect(new Set(LE_HOI.map((f) => f.slug)).size).toBe(n);
    expect(LE_HOI.filter(hasFixedLunarDate).length).toBe(80);
    expect(LE_HOI.filter((f) => f.calendar === "cham")).toHaveLength(1);
    // Mỗi lễ hội nằm đúng một nơi: một trang tháng hoặc nhóm "Không cố định ngày".
    expect(MONTHS.reduce((sum, m) => sum + leHoiOfMonth(m).length, 0) + leHoiFloating().length).toBe(n);
  });

  it("dữ liệu sinh ra không chứa ghi chú nội bộ needsCheck", () => {
    const text = readFileSync(join(__dirname, "data", "le-hoi.generated.ts"), "utf8");
    expect(text).not.toMatch(/needsCheck/i);
    const notes = JSON.parse(readFileSync(join(__dirname, "..", "..", "content", "van-hoa", "needs-check.json"), "utf8")) as { festivals: Record<string, string> };
    for (const note of Object.values(notes.festivals)) expect(text).not.toContain(note);
  });

  it("Katê theo lịch Chăm: chỉ có dateText, không có ngày âm", () => {
    const kate = fest("le-hoi-kate-cua-nguoi-cham");
    expect(kate.calendar).toBe("cham");
    expect(kate.lunarMonth).toBeUndefined();
    expect(kate.startDay).toBeUndefined();
    expect(kate.dateText).toContain("lịch Chăm");
    expect(nextOccurrence(kate, { day: 1, month: 1, year: 2027 })).toBeNull();
    expect(leHoiFloating().map((f) => f.slug)).toContain(kate.slug);
  });
});

describe("ảnh lễ hội", () => {
  const keys = [...new Set(LE_HOI.map((f) => f.imageKey).filter((k): k is string => Boolean(k)))];
  it("có ảnh cho ít nhất một lễ hội", () => expect(keys.length).toBeGreaterThan(0));
  it.each(keys)("imageKey %s có cả ảnh trang (hero) lẫn ảnh vuông (the)", (key) => {
    for (const kind of ["hero", "the"]) {
      const rel = `/heritage/van-hoa/le-hoi/${key}-${kind}.webp`;
      expect(existsSync(join(__dirname, "..", "..", "public", rel)), rel).toBe(true);
      expect(HERITAGE_FILES, rel).toContain(rel);
    }
  });
  it("image/cardImage khớp imageKey; không có key thì không có ảnh", () => {
    for (const f of LE_HOI) {
      if (f.imageKey) {
        expect(f.image).toBe(`/heritage/van-hoa/le-hoi/${f.imageKey}-hero.webp`);
        expect(f.cardImage).toBe(`/heritage/van-hoa/le-hoi/${f.imageKey}-the.webp`);
      } else {
        expect(f.image).toBeUndefined();
        expect(f.cardImage).toBeUndefined();
      }
    }
  });
});

describe("khoảng ngày âm", () => {
  it("startDay–endDay: Hội Lim 12–13 tháng Giêng", () => {
    const lim = fest("hoi-lim");
    expect([11, 12, 13, 14].map((d) => matchesLunarDay(lim, d, 1))).toEqual([false, true, true, false]);
    expect(matchesLunarDay(lim, 12, 2)).toBe(false);
    expect(lunarSpanText(lim)).toBe("ngày 12 – ngày 13 tháng Giêng");
    expect(lunarSpanShort(lim)).toBe("12–13/1");
  });

  it("không có endDay: chỉ đúng ngày chính hội (Chùa Hương khai hội mùng 6)", () => {
    const huong = fest("le-hoi-chua-huong");
    expect(huong.endDay).toBeUndefined();
    expect([5, 6, 7].map((d) => matchesLunarDay(huong, d, 1))).toEqual([false, true, false]);
  });

  it("Đình Trà Cổ kéo sang tháng sau: 30 tháng Năm và mùng 1 tháng Sáu, không lọt ngày khác", () => {
    const tc = fest("le-hoi-dinh-tra-co");
    expect(matchesLunarDay(tc, 30, 5)).toBe(true);
    expect(matchesLunarDay(tc, 1, 6)).toBe(true);
    expect(matchesLunarDay(tc, 29, 5)).toBe(false);
    expect(matchesLunarDay(tc, 2, 6)).toBe(false);
    expect(matchesLunarDay(tc, 1, 5)).toBe(false);
    expect(matchesLunarDay(tc, 30, 6)).toBe(false);
    expect(leHoiOfLunarDay(1, 6).map((f) => f.slug)).toContain(tc.slug);
    expect(lunarSpanShort(tc)).toBe("30/5–1/6");
    expect(lunarSpanText(tc)).toBe("ngày 30 tháng Năm – mùng 1 tháng Sáu");
  });

  it("khoảng kéo qua tháng cuối năm quay về tháng Giêng", () => {
    const wrap = { ...fest("le-hoi-dinh-tra-co"), lunarMonth: 12, startDay: 29, mainDay: 2 };
    expect(matchesLunarDay(wrap, 29, 12)).toBe(true);
    expect(matchesLunarDay(wrap, 2, 1)).toBe(true);
    expect(matchesLunarDay(wrap, 3, 1)).toBe(false);
  });

  it("Katê và tục lệ không cố định ngày không bao giờ khớp ngày âm nào", () => {
    const never = LE_HOI.filter((f) => !hasFixedLunarDate(f));
    expect(never.length).toBeGreaterThan(0);
    for (const f of never) for (const m of MONTHS) for (let d = 1; d <= 30; d++) expect(matchesLunarDay(f, d, m), `${f.slug} ${d}/${m}`).toBe(false);
  });

  it("tối đa 5 lễ hội, chính hội đứng trước, tháng nhuận không có", () => {
    for (const m of MONTHS) for (let d = 1; d <= 30; d++) expect(leHoiOfLunarDay(d, m).length).toBeLessThanOrEqual(5);
    const day = leHoiOfLunarDay(15, 1, false, 100);
    expect(day.length).toBeGreaterThan(0);
    const firstNonMain = day.findIndex((f) => f.mainDay !== 15);
    if (firstNonMain >= 0) expect(day.slice(firstNonMain).every((f) => f.mainDay !== 15)).toBe(true);
    expect(leHoiOfLunarDay(15, 1, true)).toEqual([]);
  });
});

describe("lần tổ chức kế tiếp và JSON-LD Event", () => {
  const today = { day: 26, month: 9, year: 2026 };
  const lim = fest("hoi-lim");

  it("Hội Lim: bắt đầu 12/1, kết thúc 13/1 (chính hội) của lần kế tiếp", () => {
    const occ = nextOccurrence(lim, today)!;
    // 12–13/1 âm lịch năm 2026 đã qua từ tháng 2/2026 → lần kế tiếp là năm 2027.
    expect(occ.start.solar).toEqual(solar(12, 1, 2027));
    expect(occ.end.solar).toEqual(solar(13, 1, 2027));
    const back = solarToLunar(occ.end.solar.day, occ.end.solar.month, occ.end.solar.year);
    expect([back.day, back.month]).toEqual([13, 1]);
  });

  it("đang diễn ra thì vẫn là lần hiện tại; ngay sau ngày cuối thì sang năm sau", () => {
    const end = nextOccurrence(lim, today)!.end.solar;
    expect(nextOccurrence(lim, end)!.end.solar).toEqual(end);
    const after = nextOccurrence(lim, jdToDate(jdFromDate(end.day, end.month, end.year) + 1))!;
    expect(after.start.solar.year).toBeGreaterThan(end.year);
  });

  it("Event: startDate/endDate là ngày dương lần kế tiếp; location là Place với địa chỉ mới", () => {
    const occ = nextOccurrence(lim, today)!;
    const ld = leHoiEventJsonLd(lim, leHoiPath(lim.slug), occ);
    const iso = (d: { day: number; month: number; year: number }) => `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
    expect(ld["@type"]).toBe("Event");
    expect(ld.startDate).toBe(iso(solar(12, 1, 2027)));
    expect(ld.endDate).toBe(iso(solar(13, 1, 2027)));
    expect(ld.location).toEqual({ "@type": "Place", name: lim.site, address: lim.newAddress });
  });

  it("chỉ lễ hội có ngày âm cố định mới có lần kế tiếp (không Event cho Katê, tục lệ không cố định ngày)", () => {
    for (const f of LE_HOI) expect(nextOccurrence(f, today) !== null, f.slug).toBe(hasFixedLunarDate(f));
  });

  it("Đình Trà Cổ: kết thúc ở mùng 1 tháng Sáu, sau ngày bắt đầu 30 tháng Năm", () => {
    const occ = nextOccurrence(fest("le-hoi-dinh-tra-co"), today)!;
    const end = solarToLunar(occ.end.solar.day, occ.end.solar.month, occ.end.solar.year);
    expect([end.day, end.month]).toEqual([1, 6]);
  });
});

describe("liên kết với nhân vật và sitemap", () => {
  it("Hội Gióng đền Sóc và đền Phù Đồng liên kết với Thánh Gióng", () => {
    const giong = NHAN_VAT.find((n) => n.slug === "thanh-giong")!;
    const slugs = leHoiOfFigure(giong).map((f) => f.slug);
    expect(slugs).toContain("hoi-giong-den-soc");
    expect(slugs).toContain("hoi-giong-den-phu-dong");
  });
  it("chỉ nêu thời đại (\"thời Hùng Vương\") không tính là thờ Hùng Vương", () => {
    expect(figuresOfLeHoi(fest("le-hoi-lang-dong-ky")).map((n) => n.slug)).not.toContain("hung-vuong");
    expect(figuresOfLeHoi(fest("gio-to-hung-vuong")).map((n) => n.slug)).toContain("hung-vuong");
  });
  it("sitemap có trang tổng, các trang tháng và mọi lễ hội", () => {
    const paths = vanHoaSubPaths();
    expect(paths).toContain("/van-hoa/le-hoi/");
    for (const m of MONTHS) if (leHoiOfMonth(m).length) expect(paths).toContain(`/van-hoa/le-hoi/thang-${m}/`);
    for (const f of LE_HOI_IMPORTED) expect(paths).toContain(leHoiPath(f.slug));
  });
});
