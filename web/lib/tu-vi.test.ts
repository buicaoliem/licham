import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CON_GIAP_LIST, getTuViData, loadTuViDay, validateTuViDayData, validateTuViEntry } from "./tu-vi";

const LUAN = "Ngày hợp với tuổi này, nên chủ động gặp gỡ và bàn việc chung.";
const good = { luan: LUAN, diem: 4, gioTot: "7h–9h" };
const empty = { luan: "", diem: 0, gioTot: "" };

function day(date: string, model: string, entry: unknown = good, overrides: Record<string, unknown> = {}) {
  return {
    date,
    generatedAt: "2026-09-22T17:12:00.000Z",
    model,
    tuoi: Object.fromEntries(CON_GIAP_LIST.map((cg) => [cg.slug, overrides[cg.slug] ?? entry])),
  };
}

describe("validateTuViEntry — kiểm trường nội dung thật", () => {
  it("nhận entry đủ luận, điểm nguyên 1-5, giờ đúng dạng", () => {
    expect(validateTuViEntry(good)).toEqual({ entry: good });
  });
  it.each([
    ["luận rỗng", { ...good, luan: "" }],
    ["luận chỉ có khoảng trắng", { ...good, luan: "      " }],
    ["luận quá ngắn", { ...good, luan: "Tốt." }],
    ["điểm 0 (giữ chỗ)", { ...good, diem: 0 }],
    ["điểm lẻ", { ...good, diem: 3.5 }],
    ["điểm là chuỗi", { ...good, diem: "4" }],
    ["giờ rỗng", { ...good, gioTot: "" }],
    ["giờ sai dạng", { ...good, gioTot: "Tý (23h–1h)" }],
    ["không phải object", null],
  ])("loại %s", (_label, raw) => {
    expect("error" in validateTuViEntry(raw)).toBe(true);
  });
});

describe("validateTuViDayData — không tin metadata/model", () => {
  it("file đủ 12 tuổi hợp lệ, đúng ngày thì nhận", () => {
    const v = validateTuViDayData(day("2026-09-23", "gemini-2.5-flash"), "2026-09-23");
    expect(v.ok).toBe(true);
  });
  it("model trông hợp lệ nhưng luận rỗng vẫn bị loại", () => {
    const v = validateTuViDayData(day("2026-09-23", "gemini-2.5-flash", empty), "2026-09-23");
    expect(v.ok).toBe(false);
  });
  it("placeholder bị loại", () => {
    expect(validateTuViDayData(day("2026-09-23", "placeholder", empty), "2026-09-23").ok).toBe(false);
  });
  it("bản fallback-cu bị loại kể cả khi có luận (đó là luận chép từ ngày khác)", () => {
    expect(validateTuViDayData(day("2026-09-23", "fallback-cu", good), "2026-09-23").ok).toBe(false);
  });
  it("chỉ một tuổi thiếu luận là loại cả file", () => {
    const v = validateTuViDayData(day("2026-09-23", "gemini-2.5-flash", good, { hoi: empty }), "2026-09-23");
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.errors.join(" ")).toContain("Hợi");
  });
  it("thiếu hẳn một tuổi là loại", () => {
    const raw = day("2026-09-23", "gemini-2.5-flash");
    delete (raw.tuoi as Record<string, unknown>).ty;
    expect(validateTuViDayData(raw, "2026-09-23").ok).toBe(false);
  });
  it("nội dung của ngày khác không được nhận cho hôm nay", () => {
    const v = validateTuViDayData(day("2026-09-22", "gemini-2.5-flash"), "2026-09-23");
    expect(v.ok).toBe(false);
  });
});

describe("loadTuViDay / getTuViData — chỉ đọc đúng file của hôm nay", () => {
  let dir: string;
  const today = { day: 23, month: 9, year: 2026 };
  const write = (name: string, content: unknown) =>
    writeFileSync(join(dir, name), typeof content === "string" ? content : JSON.stringify(content));

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "tu-vi-read-"));
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("chưa có file → null (trang dự phòng)", () => {
    expect(loadTuViDay("2026-09-23", dir)).toEqual({ status: "missing" });
    expect(getTuViData(today, dir)).toBeNull();
  });
  it("file hôm nay hợp lệ → trả dữ liệu", () => {
    write("2026-09-23.json", day("2026-09-23", "gemini-2.5-flash"));
    expect(getTuViData(today, dir)?.tuoi.ty?.luan).toBe(LUAN);
  });
  it("chỉ có file hợp lệ của hôm qua → null, không mượn lời luận ngày khác", () => {
    write("2026-09-22.json", day("2026-09-22", "gemini-2.5-flash"));
    expect(getTuViData(today, dir)).toBeNull();
  });
  it("file hôm nay là placeholder → null", () => {
    write("2026-09-23.json", day("2026-09-23", "placeholder", empty));
    expect(loadTuViDay("2026-09-23", dir).status).toBe("invalid");
    expect(getTuViData(today, dir)).toBeNull();
  });
  it("file hôm nay mang nội dung ngày khác (date lệch) → null", () => {
    write("2026-09-23.json", day("2026-09-22", "gemini-2.5-flash"));
    expect(getTuViData(today, dir)).toBeNull();
  });
  it("file ghi dở (JSON hỏng) → invalid, không ném lỗi làm vỡ build", () => {
    write("2026-09-23.json", '{"date": "2026-09-23", "tuoi": {');
    const r = loadTuViDay("2026-09-23", dir);
    expect(r.status).toBe("invalid");
    expect(getTuViData(today, dir)).toBeNull();
  });
});
