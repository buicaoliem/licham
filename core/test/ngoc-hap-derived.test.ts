import { describe, expect, it } from "vitest";
import { DERIVED_SAO, getDayInfo } from "../src/index";

/** Mọi ngày dương của một năm. */
function daysOfYear(year: number) {
  const days = [];
  for (let t = Date.UTC(year, 0, 1); t < Date.UTC(year + 1, 0, 1); t += 86400000) {
    const d = new Date(t);
    days.push(getDayInfo({ day: d.getUTCDate(), month: d.getUTCMonth() + 1, year }));
  }
  return days;
}

function fmt(info: ReturnType<typeof getDayInfo>): string {
  return `${info.solar.day}/${info.solar.month}/${info.solar.year}`;
}

describe("bảng sao suy ngược", () => {
  const days2026 = daysOfYear(2026);

  it("phủ đủ 365 ngày của năm 2026", () => {
    expect(days2026).toHaveLength(365);
  });

  it("không ngày nào trống cả sao tốt lẫn sao xấu", () => {
    const empty = days2026
      .filter((d) => (d.saoTot?.length ?? 0) === 0 && (d.saoXau?.length ?? 0) === 0)
      .map(fmt);
    expect(empty).toEqual([]);
  });

  it("trung bình sao tốt mỗi ngày nằm trong khoảng 4,0–5,5", () => {
    const avg = days2026.reduce((s, d) => s + (d.saoTot?.length ?? 0), 0) / days2026.length;
    expect(avg).toBeGreaterThanOrEqual(4.0);
    expect(avg).toBeLessThanOrEqual(5.5);
  });

  it("trung bình sao xấu mỗi ngày nằm trong khoảng 4,0–5,5", () => {
    const avg = days2026.reduce((s, d) => s + (d.saoXau?.length ?? 0), 0) / days2026.length;
    expect(avg).toBeGreaterThanOrEqual(4.0);
    expect(avg).toBeLessThanOrEqual(5.5);
  });

  it("không có tên sao nào trùng nhau trong bảng", () => {
    const names = DERIVED_SAO.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("mỗi sao có mô tả thì mô tả phải khác rỗng", () => {
    for (const s of DERIVED_SAO) {
      if (s.description !== "") {
        expect(s.description.trim()).not.toBe("");
      }
    }
  });

  it("không sao nào có mô tả trùng tên sao", () => {
    for (const s of DERIVED_SAO) {
      expect(s.description).not.toBe(s.name);
    }
  });

  it("một sao chỉ xuất hiện ở đúng một bên, tốt hoặc xấu", () => {
    for (const d of days2026) {
      const tot = new Set(d.saoTot?.map((s) => s.name));
      const overlap = d.saoXau?.filter((s) => tot.has(s.name)) ?? [];
      expect(overlap, `trùng ở ngày ${fmt(d)}`).toEqual([]);
    }
  });

  // Hai ngày đối chiếu tay với nguồn: danh sách trùng khít, chỉ khác thứ tự.
  // Riêng 16/09/2026 nguồn còn có "Sát cống" — một trong các sao chưa ra luật.
  it("ngày 10/09/2026 ra đúng danh sách đã đối chiếu tay", () => {
    const d = getDayInfo({ day: 10, month: 9, year: 2026 });
    expect(d.saoTot?.map((s) => s.name)).toEqual([
      "Hoạt điệu",
      "Nguyệt đức hợp",
      "Nguyệt giải",
      "Phổ hộ (Hội hộ)",
    ]);
    expect(d.saoXau?.map((s) => s.name)).toEqual([
      "Băng tiêu ngoạ hãm",
      "Câu Trận",
      "Độc Hỏa",
      "Hoang vu",
      "Ngũ hư",
      "Nguyệt Hỏa",
      "Thiên Cương (hay Diệt Môn)",
      "Tiểu Hao",
    ]);
  });

  it("ngày 16/09/2026 ra đúng danh sách đã đối chiếu tay", () => {
    const d = getDayInfo({ day: 16, month: 9, year: 2026 });
    expect(d.saoTot?.map((s) => s.name)).toEqual([
      "Nguyệt Ân",
      "Nguyệt Tài",
      "Phổ hộ (Hội hộ)",
      "Tam Hợp",
      "Thiên hỷ",
    ]);
    expect(d.saoXau?.map((s) => s.name)).toEqual([
      "Chu tước hắc đạo",
      "Cô thần",
      "Ngũ Quỹ",
      "Thổ cẩm",
    ]);
  });
});
