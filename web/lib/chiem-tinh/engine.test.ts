/**
 * Kiểm chứng engine chiêm tinh:
 *  1. Giá trị chuẩn trong Jean Meeus, "Astronomical Algorithms" (2nd ed., 1998): ví dụ 12.a, 25.b, 33.a, 47.a.
 *  2. Đối chiếu ngẫu nhiên với circular-natal-horoscope-js 1.1.0 (Unlicense, lịch thiên văn Moshier) —
 *     một engine độc lập với astronomy-engine — cho 10 hành tinh, ASC, MC và Nút trung bình.
 *  3. Placidus kiểm bằng định nghĩa hình học (chia đôi) vì thư viện đối chiếu dừng vòng lặp ở sai số 0,01 rad.
 */
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { AstroTime, SiderealTime } from "astronomy-engine";
import { PLACES } from "@/lib/birth/places";
import { resolveBirthTime } from "@/lib/birth/time";
import { angleDiff, ascendant, computeChart, eclipticOfDate, findAspects, houseOf, meanNodeLongitude, midheaven, PLANETS, placidusCusps, signChangesBetween } from "./engine";

const require = createRequire(import.meta.url);
const { Origin, Horoscope } = require("circular-natal-horoscope-js");

const J2000 = 2451545.0;
const tt = (jde: number) => AstroTime.FromTerrestrialTime(jde - J2000);

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("giá trị chuẩn Meeus", () => {
  it("ví dụ 25.b — Mặt Trời 13/10/1992 0h TD: λ biểu kiến 199°54′21,8″", () => {
    const { lon } = eclipticOfDate("sun", tt(2448908.5));
    expect(Math.abs(angleDiff(lon, 199 + 54 / 60 + 21.818 / 3600))).toBeLessThan(0.001);
  });
  it("ví dụ 47.a — Mặt Trăng 12/4/1992 0h TD: λ biểu kiến 133,167265°, β −3,229126°", () => {
    const { lon, lat } = eclipticOfDate("moon", tt(2448724.5));
    expect(Math.abs(angleDiff(lon, 133.167265))).toBeLessThan(0.005);
    expect(Math.abs(lat + 3.229126)).toBeLessThan(0.005);
  });
  it("ví dụ 33.a — Sao Kim 20/12/1992 0h TD: λ 313,08102°, β −2,08474°", () => {
    const { lon, lat } = eclipticOfDate("venus", tt(2448976.5));
    expect(Math.abs(angleDiff(lon, 313.08102))).toBeLessThan(0.002);
    expect(Math.abs(lat + 2.08474)).toBeLessThan(0.002);
  });
  it("ví dụ 12.a — giờ sao biểu kiến Greenwich 10/4/1987 0h UT = 13h10m46,1351s", () => {
    const gast = SiderealTime(new Date(Date.UTC(1987, 3, 10))) * 15;
    expect(Math.abs(gast - (13 + 10 / 60 + 46.1351 / 3600) * 15)).toBeLessThan(0.0005);
  });
  it("Nút trung bình (công thức 47.7) tại J2000 = 125,0445°", () => {
    expect(meanNodeLongitude(tt(J2000))).toBeCloseTo(125.0445479, 6);
  });
});

describe("đối chiếu circular-natal-horoscope-js (ngẫu nhiên)", () => {
  // Ngưỡng: hành tinh 0,02°; Mặt Trăng sau 2050 0,05° (hai engine ngoại suy ΔT tương lai khác nhau vài phút,
  // Mặt Trăng đi 0,55°/giờ); ASC/MC 0,05° (ở vĩ độ cao ASC khuếch đại sai số giờ sao). Mốc giờ có giây lẻ
  // (giờ địa phương trung bình LMT trước khi có múi giờ) bị loại khỏi so sánh ASC/MC vì thư viện đối chiếu
  // bỏ phần giây khi tính giờ sao.
  it("300 bản đồ 1900–2100: hành tinh ≤ 0,02°, ASC/MC ≤ 0,05°, Nút trung bình ≤ 0,01°, nghịch hành trùng", () => {
    const r = rng(1234);
    const errs: string[] = [];
    for (let i = 0; i < 300; i++) {
      const year = 1900 + Math.floor(r() * 200);
      const lat = -60 + r() * 120;
      const lon = -180 + r() * 360;
      const o = new Origin({ year, month: Math.floor(r() * 12), date: 1 + Math.floor(r() * 28), hour: Math.floor(r() * 24), minute: Math.floor(r() * 60), latitude: lat, longitude: lon });
      const hz = new Horoscope({ origin: o, houseSystem: "whole-sign", zodiac: "tropical", aspectPoints: ["bodies"], aspectWithPoints: ["bodies"], aspectTypes: ["major"], customOrbs: {}, language: "en" });
      const c = computeChart({ utcMs: o.utcTime.valueOf(), lat, lon, houseSystem: "whole-sign", timeKnown: true });
      const tag = `${o.utcTime.format()} ${lat.toFixed(2)},${lon.toFixed(2)}`;
      for (const id of PLANETS) {
        const p = c.points.find((x) => x.id === id)!;
        const ref = hz.CelestialBodies[id];
        const d = Math.abs(angleDiff(p.lon, ref.ChartPosition.Ecliptic.DecimalDegrees));
        const tol = id === "moon" && year > 2050 ? 0.05 : 0.02;
        if (d > tol) errs.push(`${tag} ${id} lệch ${d.toFixed(4)}°`);
        // Bỏ qua lúc hành tinh gần như đứng yên (tốc độ < 0,002°/ngày) — hai engine có thể khác dấu.
        if (id !== "sun" && id !== "moon" && Math.abs(p.speed) > 0.002 && p.retrograde !== Boolean(ref.isRetrograde)) errs.push(`${tag} ${id} nghịch hành khác`);
      }
      const dAsc = Math.abs(angleDiff(c.asc!, hz.Ascendant.ChartPosition.Ecliptic.DecimalDegrees));
      const dMc = Math.abs(angleDiff(c.mc!, hz.Midheaven.ChartPosition.Ecliptic.DecimalDegrees));
      const lmtSeconds = o.utcTime.seconds() !== 0;
      if (!lmtSeconds && dAsc > 0.05) errs.push(`${tag} ASC lệch ${dAsc.toFixed(4)}`);
      if (!lmtSeconds && dMc > 0.05) errs.push(`${tag} MC lệch ${dMc.toFixed(4)}`);
      const dNode = Math.abs(angleDiff(c.meanNode, hz.CelestialPoints.northnode.ChartPosition.Ecliptic.DecimalDegrees));
      if (dNode > 0.01) errs.push(`${tag} Nút lệch ${dNode.toFixed(4)}`);
    }
    expect(errs).toEqual([]);
  });
});

describe("góc và cung nhà", () => {
  const DEG = Math.PI / 180;
  /** Kiểm định nghĩa Placidus: điểm hoàng đạo có (RA − RAMC) = k/3 cung bán nhật (trên chân trời) hoặc tương ứng dưới chân trời. */
  function placidusBisect(ramc: number, eps: number, phi: number, frac: number, below: boolean, lo: number, hi: number): number {
    const f = (lon: number) => {
      const dec = Math.asin(Math.sin(eps * DEG) * Math.sin(lon * DEG));
      const ra = Math.atan2(Math.sin(lon * DEG) * Math.cos(eps * DEG), Math.cos(lon * DEG)) / DEG;
      const ad = Math.asin(Math.tan(phi * DEG) * Math.tan(dec)) / DEG;
      const md = ((ra - ramc) % 360 + 360) % 360; // khoảng xích kinh từ MC đi về phía đông
      return below ? md - (180 - frac * (90 - ad)) : md - frac * (90 + ad);
    };
    let a = lo;
    let b = hi;
    for (let i = 0; i < 200; i++) {
      const m = (a + b) / 2;
      if (Math.sign(f(m)) === Math.sign(f(a))) a = m;
      else b = m;
    }
    return (a + b) / 2;
  }

  it("Placidus khớp định nghĩa hình học tới 0,0001° ở nhiều vĩ độ", () => {
    const r = rng(99);
    for (let i = 0; i < 200; i++) {
      const ramc = r() * 360;
      const phi = -60 + r() * 120;
      const eps = 23.44;
      const asc = ascendant(ramc, eps, phi);
      const mc = midheaven(ramc, eps);
      const cusps = placidusCusps(ramc, eps, phi, asc, mc);
      const within = (start: number, end: number) => [start, start + (((end - start) % 360) + 360) % 360] as const;
      const [a11, b11] = within(mc, asc);
      expect(Math.abs(angleDiff(cusps[10], placidusBisect(ramc, eps, phi, 1 / 3, false, a11 + 1e-6, b11 - 1e-6)))).toBeLessThan(1e-4);
      expect(Math.abs(angleDiff(cusps[11], placidusBisect(ramc, eps, phi, 2 / 3, false, a11 + 1e-6, b11 - 1e-6)))).toBeLessThan(1e-4);
      const [a2, b2] = within(asc, mc + 180);
      expect(Math.abs(angleDiff(cusps[1], placidusBisect(ramc, eps, phi, 2 / 3, true, a2 + 1e-6, b2 - 1e-6)))).toBeLessThan(1e-4);
      expect(Math.abs(angleDiff(cusps[2], placidusBisect(ramc, eps, phi, 1 / 3, true, a2 + 1e-6, b2 - 1e-6)))).toBeLessThan(1e-4);
    }
  });

  it("đỉnh nhà tăng dần đúng thứ tự, nhà 1 = ASC, nhà 10 = MC (Placidus, Porphyry, Equal)", () => {
    for (const hs of ["placidus", "porphyry", "equal"] as const) {
      const c = computeChart({ utcMs: Date.UTC(1990, 4, 17, 4, 30), lat: 21.03, lon: 105.85, houseSystem: hs, timeKnown: true });
      expect(c.cusps![0]).toBeCloseTo(c.asc!, 9);
      if (hs !== "equal") expect(c.cusps![9]).toBeCloseTo(c.mc!, 9);
      let total = 0;
      for (let i = 0; i < 12; i++) total += (((c.cusps![(i + 1) % 12] - c.cusps![i]) % 360) + 360) % 360;
      expect(total).toBeCloseTo(360, 6);
    }
  });

  it("Whole Sign: nhà 1 bắt đầu từ 0° của cung chứa ASC", () => {
    const c = computeChart({ utcMs: Date.UTC(1990, 4, 17, 4, 30), lat: 21.03, lon: 105.85, houseSystem: "whole-sign", timeKnown: true });
    expect(c.cusps![0]).toBe(Math.floor(c.asc! / 30) * 30);
    for (const p of c.points) expect(p.house).toBe(houseOf(p.lon, c.cusps!));
  });

  it("vùng cực (Tromsø 69,65°B): Placidus không xác định → chuyển Porphyry và báo lý do", () => {
    const c = computeChart({ utcMs: Date.UTC(2000, 11, 21, 12), lat: 69.65, lon: 18.96, houseSystem: "placidus", timeKnown: true });
    expect(c.houseSystemUsed).toBe("porphyry");
    expect(c.houseFallback).toMatch(/Placidus không xác định/);
  });

  it("ASC ở phía đông của MC (ASC − MC trong 0°–180°) ở vĩ độ thường, cả Bắc và Nam bán cầu", () => {
    const r = rng(5);
    for (let i = 0; i < 500; i++) {
      const ramc = r() * 360;
      const phi = -60 + r() * 120;
      const d = (((ascendant(ramc, 23.44, phi) - midheaven(ramc, 23.44)) % 360) + 360) % 360;
      expect(d).toBeGreaterThan(0);
      expect(d).toBeLessThan(180);
    }
  });

  it("không rõ giờ sinh: không tính ASC, MC, nhà; vẫn có góc hợp giữa hành tinh", () => {
    const c = computeChart({ utcMs: Date.UTC(1990, 4, 17, 5), lat: 21.03, lon: 105.85, houseSystem: "placidus", timeKnown: false });
    expect(c.asc).toBeUndefined();
    expect(c.cusps).toBeUndefined();
    expect(c.points.every((p) => p.house === undefined)).toBe(true);
    expect(c.aspects.every((a) => a.a !== "asc" && a.b !== "mc")).toBe(true);
  });

  it("báo lỗi tọa độ hoặc năm ngoài phạm vi", () => {
    expect(() => computeChart({ utcMs: Date.UTC(1990, 0, 1), lat: 95, lon: 0, houseSystem: "equal", timeKnown: true })).toThrow(/Tọa độ/);
    expect(() => computeChart({ utcMs: Date.UTC(1700, 0, 1), lat: 0, lon: 0, houseSystem: "equal", timeKnown: true })).toThrow(/1800/);
  });
});

describe("góc hợp", () => {
  it("nhận đúng loại góc và orb; Mặt Trời/Mặt Trăng được cộng 2°", () => {
    const asp = findAspects([
      { id: "sun", lon: 10, speed: 1 },
      { id: "moon", lon: 129, speed: 13 },
      { id: "mars", lon: 190, speed: 0.5 },
      { id: "venus", lon: 100.5, speed: 1.2 },
    ]);
    const find = (a: string, b: string) => asp.find((x) => (x.a === a && x.b === b) || (x.a === b && x.b === a));
    expect(find("sun", "moon")?.type).toBe("trine"); // 119°, orb 1
    expect(find("sun", "mars")?.type).toBe("opposition"); // 180°
    expect(find("sun", "venus")?.type).toBe("square"); // 90,5°
    expect(find("mars", "venus")?.type).toBe("square"); // 89,5°
    expect(find("moon", "venus")).toBeUndefined(); // 28,5°: không có góc chính
  });

  it("Mặt Trăng tiến lại gần góc chuẩn thì applying = true", () => {
    const [a] = findAspects([
      { id: "sun", lon: 10, speed: 1 },
      { id: "moon", lon: 125, speed: 13 },
    ]);
    expect(a.type).toBe("trine");
    expect(a.applying).toBe(true);
  });
});

describe("thời điểm sinh theo nơi sinh", () => {
  it("mọi nơi sinh chọn sẵn có múi giờ IANA hợp lệ và tọa độ hợp lệ", () => {
    for (const p of PLACES) {
      expect(() => resolveBirthTime({ year: 2000, month: 6, day: 1, hour: 12, minute: 0 }, p)).not.toThrow();
      expect(Math.abs(p.lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(p.lon)).toBeLessThanOrEqual(180);
    }
    expect(new Set(PLACES.map((p) => p.id)).size).toBe(PLACES.length);
  });

  it("Mặt Trời ở 0° Bạch Dương đúng thời điểm Xuân phân 2024 (20/3/2024 03:06 UTC)", () => {
    const c = computeChart({ utcMs: Date.UTC(2024, 2, 20, 3, 6), lat: 0, lon: 0, houseSystem: "equal", timeKnown: true });
    const sun = c.points.find((p) => p.id === "sun")!;
    expect(Math.abs(angleDiff(sun.lon, 0))).toBeLessThan(0.01);
  });
});

describe("regression Phase 9 rà soát", () => {
  const DEG = Math.PI / 180;
  it("Ascendant luôn là giao điểm phía ĐÔNG (đang mọc), kể cả trong vòng cực", () => {
    const bad: string[] = [];
    for (const phi of [-89.9, -80, -70, -66.6, -45, 0, 45, 66.6, 70, 80, 89.9])
      for (let ramc = 0; ramc < 360; ramc += 2.5) {
        const eps = 23.44;
        const a = ascendant(ramc, eps, phi);
        const dec = Math.asin(Math.sin(eps * DEG) * Math.sin(a * DEG));
        const ra = Math.atan2(Math.sin(a * DEG) * Math.cos(eps * DEG), Math.cos(a * DEG));
        const H = ramc * DEG - ra;
        const alt = Math.asin(Math.sin(phi * DEG) * Math.sin(dec) + Math.cos(phi * DEG) * Math.cos(dec) * Math.cos(H)) / DEG;
        if (Math.abs(alt) > 1e-6 || Math.sin(H) >= 0) bad.push(`${phi} ${ramc}`);
      }
    expect(bad).toEqual([]);
  });

  it("vĩ độ sát cực (> 89,9°) báo lỗi khi có giờ sinh; vòng cực có cảnh báo", () => {
    expect(() => computeChart({ utcMs: Date.UTC(2000, 5, 1, 12), lat: 90, lon: 0, houseSystem: "whole-sign", timeKnown: true })).toThrow(/sát cực/);
    expect(() => computeChart({ utcMs: Date.UTC(2000, 5, 1, 12), lat: 90, lon: 0, houseSystem: "whole-sign", timeKnown: false })).not.toThrow();
    const c = computeChart({ utcMs: Date.UTC(2000, 5, 1, 12), lat: 78.2, lon: 15.6, houseSystem: "whole-sign", timeKnown: true });
    expect(c.polarNote).toMatch(/vòng cực/);
    expect(computeChart({ utcMs: Date.UTC(2000, 5, 1, 12), lat: 60, lon: 0, houseSystem: "whole-sign", timeKnown: true }).polarNote).toBeUndefined();
  });

  it("xích đạo và Nam bán cầu: Placidus xác định, nhà 1 = ASC", () => {
    for (const lat of [0, -33.87, -55]) {
      const c = computeChart({ utcMs: Date.UTC(1999, 8, 9, 9, 9), lat, lon: 151.2, houseSystem: "placidus", timeKnown: true });
      expect(c.houseSystemUsed).toBe("placidus");
      expect(c.cusps![0]).toBeCloseTo(c.asc!, 9);
    }
  });

  it("không rõ giờ sinh: báo Mặt Trời đổi cung trong ngày Xuân phân 20/3/2024 (giờ Hà Nội)", () => {
    const start = Date.UTC(2024, 2, 19, 17, 0); // 00:00 20/3 giờ +7
    const end = Date.UTC(2024, 2, 20, 16, 59);
    const ch = signChangesBetween(start, end);
    expect(ch.find((c) => c.id === "sun")).toEqual({ id: "sun", from: 11, to: 0 });
    // Ngày bình thường giữa cung: Mặt Trời không đổi.
    expect(signChangesBetween(Date.UTC(2024, 4, 9, 17), Date.UTC(2024, 4, 10, 16, 59)).find((c) => c.id === "sun")).toBeUndefined();
  });
});
