/** Regression: múi giờ lịch sử Việt Nam (tzdata, chú thích dẫn Trần Tiến Bình 2005) và múi giờ tự chọn. */
import { describe, expect, it } from "vitest";
import { placeById } from "./places";
import { resolveBirthTime } from "./time";

const HN = placeById("ha-noi")!;
const SG = placeById("tp-hcm")!;
const HUE = placeById("hue")!;
const at = (y: number, m: number, d: number, h = 12, mi = 0) => ({ year: y, month: m, day: d, hour: h, minute: mi });

describe("lịch sử múi giờ Việt Nam", () => {
  it("các mốc chuyển giờ 1942–1975", () => {
    const off = (t: ReturnType<typeof at>, p = SG) => resolveBirthTime(t, p).offsetMinutes;
    expect(off(at(1942, 12, 31, 12))).toBe(420);
    expect(off(at(1943, 1, 1, 12))).toBe(480);
    expect(off(at(1945, 3, 20))).toBe(540); // Nhật chiếm đóng
    expect(off(at(1945, 9, 5))).toBe(420); // 2/9/1945 về +7
    expect(off(at(1947, 3, 31))).toBe(420);
    expect(off(at(1947, 4, 2))).toBe(480);
    expect(off(at(1955, 6, 30))).toBe(480);
    expect(off(at(1955, 7, 2))).toBe(420);
    expect(off(at(1960, 1, 2))).toBe(480);
    expect(off(at(1975, 6, 14))).toBe(420);
  });

  it("1/4/1947–1/7/1955: báo hai múi giờ (Pháp +8, kháng chiến +7) ở mọi miền, không âm thầm chọn", () => {
    for (const p of [HN, HUE, SG]) {
      const r = resolveBirthTime(at(1950, 6, 1, 9, 30), p);
      expect(r.offsetMinutes).toBe(480);
      expect(r.historical?.alternatives.map((a) => a.offsetMinutes)).toEqual([480, 420]);
      expect(r.historical?.note).toMatch(/kháng chiến/);
    }
    expect(resolveBirthTime(at(1947, 3, 31, 12), HN).historical).toBeUndefined();
    expect(resolveBirthTime(at(1955, 7, 2, 12), SG).historical).toBeUndefined();
    expect(resolveBirthTime(at(1965, 6, 1, 12), HN).historical).toBeUndefined();
  });

  it("múi giờ tự chọn thay dữ liệu tự động, vẫn giữ cảnh báo lịch sử để hiển thị", () => {
    const r = resolveBirthTime(at(1950, 6, 1, 9, 30), HN, { overrideOffsetMinutes: 420 });
    expect(r.manualOffset).toBe(true);
    expect(r.utcMs).toBe(Date.UTC(1950, 5, 1, 2, 30));
    expect(r.dstMinutes).toBe(0);
    expect(r.historical).toBeDefined();
  });

  it("miền Bắc 1960–1975 dùng +7, Huế (dưới vĩ tuyến 17) dùng +8", () => {
    expect(resolveBirthTime(at(1968, 1, 30), HN).offsetMinutes).toBe(420);
    expect(resolveBirthTime(at(1968, 1, 30), HUE).offsetMinutes).toBe(480);
  });
});
