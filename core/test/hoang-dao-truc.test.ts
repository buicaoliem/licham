import { describe, expect, it } from "vitest";
import { getDayInfo, getHourStars, getSolarTermsOfYear, jdFromDate, jdToDate } from "../src";

describe("giờ hoàng đạo", () => {
  /**
   * Hoàng đạo hours for day chi Tý…Tỵ (repeating for Ngọ…Hợi), one character per hour
   * from Tý to Hợi, as encoded in Hồ Ngọc Đức's public-domain amlich source.
   *
   * Bảng đối chiếu giờ hoàng đạo, Liêm xác nhận tháng 9/2026. 4/6 dòng đã kiểm bằng ngày
   * thật từ nguồn lịch Việt: Tý/Ngọ (ngày Ngọ 31/08/1995), Sửu/Mùi (ngày Ất Mùi 01/09/1995),
   * Thìn/Tuất (ngày Nhâm Thìn 15/09/2026), Tỵ/Hợi (ngày Đinh Hợi 24/08/1995 và ngày Quý Tỵ
   * 16/09/2026). Hai dòng còn lại suy từ cùng một bảng quy tắc.
   */
  const HND_GIO_HD = ["110100101100", "001101001011", "110011010010", "101100110100", "001011001101", "010010110011"];

  it("matches the reference pattern for all 12 day chi", () => {
    for (let chi = 0; chi < 12; chi++) {
      const pattern = getHourStars(chi)
        .map((h) => (h.isHoangDao ? "1" : "0"))
        .join("");
      expect(pattern, `chi ${chi}`).toBe(HND_GIO_HD[chi % 6]);
    }
  });

  const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

  it("prints hoàng đạo hours for all 12 day chi for manual cross-check", () => {
    console.log("\nBảng giờ hoàng đạo theo chi ngày (theo code hiện tại):");
    console.log("| Chi ngày | Giờ hoàng đạo |");
    console.log("|---|---|");
    for (let chi = 0; chi < 12; chi++) {
      const hours = getHourStars(chi)
        .filter((h) => h.isHoangDao)
        .map((h) => CHI_NAMES[h.chiIndex])
        .join(", ");
      console.log(`| ${CHI_NAMES[chi]} | ${hours} |`);
      expect(getHourStars(chi).filter((h) => h.isHoangDao)).toHaveLength(6);
    }
  });

  it("Thanh Long hour by day chi", () => {
    const thanhLong = (chi: number) => getHourStars(chi).find((h) => h.star === "Thanh Long")!.chiIndex;
    expect(thanhLong(0)).toBe(8); // Tý → Thân
    expect(thanhLong(1)).toBe(10); // Sửu → Tuất
    expect(thanhLong(2)).toBe(0); // Dần → Tý
    expect(thanhLong(3)).toBe(2); // Mão → Dần
    expect(thanhLong(4)).toBe(4); // Thìn → Thìn
    expect(thanhLong(5)).toBe(6); // Tỵ → Ngọ
  });

  it("six hoàng đạo hours per day", () => {
    for (let chi = 0; chi < 12; chi++) {
      expect(getHourStars(chi).filter((h) => h.isHoangDao)).toHaveLength(6);
    }
  });
});

describe("trực", () => {
  it("Kiến falls on the day whose chi equals the solar month chi", () => {
    for (let jd = jdFromDate(1, 1, 2026); jd <= jdFromDate(31, 12, 2026); jd++) {
      const info = getDayInfo(jdToDate(jd));
      if (info.truc.name === "Kiến") {
        // Solar month chi, by construction the day chi on a Kiến day, must be consistent
        // with the term: Dần month spans Lập xuân–Kinh trập, etc.
        const jieIndex = Math.floor((((info.solarTerm.longitude - 315) % 360) + 360) % 360 / 30);
        expect(info.canChi.day.chiIndex).toBe((jieIndex + 2) % 12);
      }
    }
  });

  it("advances one per day and repeats on each of the 12 tiết days of 2026", () => {
    const VN = 7 * 3600_000;
    const jieDays = new Set(
      getSolarTermsOfYear(2026)
        .filter((t) => (t.longitude - 315 + 360) % 30 === 0)
        .map((t) => new Date(t.start.getTime() + VN).toISOString().slice(0, 10)),
    );
    expect(jieDays.size).toBe(12);

    let prev = getDayInfo({ day: 31, month: 12, year: 2025 }).truc.index;
    let repeats = 0;
    for (let jd = jdFromDate(1, 1, 2026); jd <= jdFromDate(31, 12, 2026); jd++) {
      const d = jdToDate(jd);
      const key = `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
      const cur = getDayInfo(d).truc.index;
      if (jieDays.has(key)) {
        expect(cur, key).toBe(prev);
        repeats++;
      } else {
        expect(cur, key).toBe((prev + 1) % 12);
      }
      prev = cur;
    }
    expect(repeats).toBe(12);
  });

  // Lập xuân 2026 begins 04/02/2026 in Vietnam; that day opens month Dần.
  it("Lập xuân 2026 opens month Dần", () => {
    const before = getDayInfo({ day: 3, month: 2, year: 2026 });
    const on = getDayInfo({ day: 4, month: 2, year: 2026 });
    expect(before.solarTerm.name).toBe("Đại hàn");
    expect(on.solarTerm.name).toBe("Lập xuân");
    expect(on.truc.index).toBe(before.truc.index);
    expect(on.truc.index).toBe((on.canChi.day.chiIndex - 2 + 12) % 12);
  });
});

describe("getDayInfo", () => {
  it("aggregates a day and leaves external-data fields empty", () => {
    const info = getDayInfo({ day: 17, month: 2, year: 2026 });
    expect(info.lunar).toMatchObject({ day: 1, month: 1, year: 2026, isLeapMonth: false });
    expect(info.canChi.year.name).toBe("Bính Ngọ");
    expect(info.canChi.month.name).toBe("Canh Dần");
    expect(info.hours).toHaveLength(12);
    expect(info.hours.filter((h) => h.isHoangDao)).toHaveLength(6);
    expect(info.solar.dayOfWeek).toBe(2); // Tuesday
    for (const key of ["nhiThapBatTu", "hyThan", "taiThan", "lyThuanPhong", "tuoiXung"] as const) {
      expect(info[key]).toBeNull();
    }
    expect(info.khongMinh).not.toBeNull();
  });

  it("maps a Date instant to its Vietnam calendar day", () => {
    // 2026-02-16T17:30Z is 00:30 on 17/02/2026 in Vietnam.
    expect(getDayInfo(new Date("2026-02-16T17:30:00Z")).solar).toMatchObject({ day: 17, month: 2, year: 2026 });
    expect(getDayInfo(new Date("2026-02-16T16:30:00Z")).solar).toMatchObject({ day: 16, month: 2, year: 2026 });
  });
});
