import { describe, expect, it } from "vitest";
import { jdFromDate, lunarToSolar } from "@licham/core";
import { BAI_VIET } from "./data/bai-viet";
import { lunarToSolarSafe } from "./logic";

/** Cây nêu: dựng trước Tết (23 tháng Chạp, năm âm trước) và hạ sau Tết (mùng 7 tháng Giêng, năm âm mới)
 * phải nằm trong cùng một mùa Tết khi hiển thị cho một `year` (năm dương/mùa Tết đang xem). */
describe("cây nêu — yearOffset giữ đúng mùa Tết", () => {
  const post = BAI_VIET.find((p) => p.slug === "cay-neu-ngay-tet")!;
  const dungNeu = post.lunarDates!.find((d) => d.label.startsWith("Dựng nêu"))!;
  const haNeu = post.lunarDates!.find((d) => d.label === "Hạ nêu")!;

  it("dữ liệu bài có yearOffset cho cả hai mốc", () => {
    expect(dungNeu.yearOffset).toBe(-1);
    expect(haNeu.yearOffset).toBe(0);
  });

  it.each([2024, 2025, 2026, 2027, 2028, 2030])("mùa Tết %i: dựng nêu (năm âm trước) đứng trước Tết, hạ nêu (năm âm mới) đứng sau Tết", (year) => {
    const dungSolar = lunarToSolarSafe(dungNeu.day, dungNeu.month, year + (dungNeu.yearOffset ?? 0))!;
    const haSolar = lunarToSolarSafe(haNeu.day, haNeu.month, year + (haNeu.yearOffset ?? 0))!;
    const tet = lunarToSolar(1, 1, year, false);
    const tetJd = jdFromDate(tet.day, tet.month, tet.year);
    const dungJd = jdFromDate(dungSolar.solar.day, dungSolar.solar.month, dungSolar.solar.year);
    const haJd = jdFromDate(haSolar.solar.day, haSolar.solar.month, haSolar.solar.year);

    // Dựng nêu luôn trước giao thừa; hạ nêu luôn sau Tết — cùng một mùa Tết `year`.
    expect(dungJd).toBeLessThan(tetJd);
    expect(haJd).toBeGreaterThan(tetJd);
    // Thứ tự: dựng trước, hạ sau (không quá hai tháng cách nhau).
    expect(dungJd).toBeLessThan(haJd);
    expect(haJd - dungJd).toBeLessThan(60);
  });

  it("không lệch mùa nếu bỏ yearOffset (kiểm chứng ngược: cùng year mà không trừ 1 thì dựng nêu sẽ rơi SAU Tết, sai mùa)", () => {
    const year = 2026;
    const dungSaiSolar = lunarToSolarSafe(dungNeu.day, dungNeu.month, year)!; // cố tình không áp yearOffset
    const tet = lunarToSolar(1, 1, year, false);
    const tetJd = jdFromDate(tet.day, tet.month, tet.year);
    const dungSaiJd = jdFromDate(dungSaiSolar.solar.day, dungSaiSolar.solar.month, dungSaiSolar.solar.year);
    expect(dungSaiJd).toBeGreaterThan(tetJd);
  });

  it("tháng Chạp 29 hay 30 ngày không làm vỡ ngày dựng nêu 23 tháng Chạp", () => {
    // 23 luôn hợp lệ bất kể tháng đủ (30) hay thiếu (29).
    for (let y = 2022; y <= 2032; y++) {
      expect(lunarToSolarSafe(23, 12, y)).toBeTruthy();
    }
  });
});
