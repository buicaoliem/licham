import { describe, expect, it } from "vitest";
import { type TuViDayData, hasAiContent } from "./tu-vi";

const entry = (luan: string) => ({ luan, diem: luan ? 4 : 0, gioTot: luan ? "Tý (23h–1h)" : "" });
const data = (model: string, luan: string): TuViDayData => ({
  date: "2026-09-23",
  generatedAt: "2026-09-22T23:10:43.814Z",
  model,
  tuoi: { ty: entry(luan), suu: entry("") },
});

describe("hasAiContent", () => {
  it("placeholder không có nội dung", () => {
    expect(hasAiContent(data("placeholder", ""))).toBe(false);
  });
  it("bản fallback-cu chép từ placeholder (luận rỗng) không được coi là có nội dung", () => {
    expect(hasAiContent(data("fallback-cu", ""))).toBe(false);
  });
  it("có ít nhất một đoạn luận thật thì có nội dung", () => {
    expect(hasAiContent(data("fallback-cu", "Ngày hợp, nên gặp gỡ."))).toBe(true);
    expect(hasAiContent(data("gemini-2.5-flash", "Ngày hợp, nên gặp gỡ."))).toBe(true);
  });
});
