#!/usr/bin/env node
/**
 * Sinh web/lib/van-hoa/data/eclipses.generated.ts: nhật thực + nguyệt thực 2020–2035 tính bằng astronomy-engine
 * (không gõ tay số liệu). Chạy: pnpm generate:eclipses
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as A from "astronomy-engine";
import { solarToLunar } from "@licham/core";

const START = new Date(Date.UTC(2020, 0, 1));
const END = new Date(Date.UTC(2036, 0, 1));

const CITIES = [
  { id: "ha-noi", name: "Hà Nội", lat: 21.0285, lon: 105.8542 },
  { id: "hue", name: "Huế", lat: 16.4637, lon: 107.5909 },
  { id: "da-nang", name: "Đà Nẵng", lat: 16.0544, lon: 108.2022 },
  { id: "tp-hcm", name: "TP.HCM", lat: 10.8231, lon: 106.6297 },
  { id: "can-tho", name: "Cần Thơ", lat: 10.0452, lon: 105.7469 },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");
/** ISO giờ Việt Nam (+07:00) từ Date UTC. */
function vn(d: Date): string {
  const l = new Date(d.getTime() + 7 * 3600_000);
  return `${l.getUTCFullYear()}-${pad(l.getUTCMonth() + 1)}-${pad(l.getUTCDate())}T${pad(l.getUTCHours())}:${pad(l.getUTCMinutes())}:${pad(l.getUTCSeconds())}+07:00`;
}
const round = (x: number, n = 4) => Number(x.toFixed(n));
const minutes = (a: Date, b: Date) => (a.getTime() - b.getTime()) / 60000;

/** Diện tích giao của hai đường tròn bán kính r1, r2, tâm cách nhau d. */
function overlap(r1: number, r2: number, d: number): number {
  if (d >= r1 + r2) return 0;
  if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) ** 2;
  const a = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1));
  const b = r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
  const c = 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
  return a + b - c;
}
/** Tìm khoảng cách tâm d để phần bị che của đĩa bán kính 1 đạt `frac`. */
function dForCover(r: number, frac: number): number {
  let lo = 0;
  let hi = r + 1;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (overlap(1, r, mid) / Math.PI > frac) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Bán kính bóng tối / bóng nửa tối tại khoảng cách Mặt Trăng, tính theo bán kính Mặt Trăng (giá trị điển hình). */
export const R_UMBRA = 2.65;
export const R_PENUMBRA = 4.6;

const MOON_LEVEL = (t: A.AstroTime, obs: A.Observer) => {
  const eq = A.Equator(A.Body.Moon, t, obs, true, true);
  return A.Horizon(t, obs, eq.ra, eq.dec, "normal").altitude;
};

function lunarEvents() {
  const out: object[] = [];
  let e = A.SearchLunarEclipse(START);
  while (e.peak.date < END) {
    const peak = e.peak.date;
    const kind = e.kind === A.EclipseKind.Total ? "toan-phan" : e.kind === A.EclipseKind.Partial ? "mot-phan" : "nua-toi";
    const p1 = new Date(peak.getTime() - e.sd_penum * 60000);
    const p4 = new Date(peak.getTime() + e.sd_penum * 60000);
    const phases: Record<string, string> = { nuaToiBatDau: vn(p1), nuaToiKetThuc: vn(p4) };
    if (e.sd_partial > 0) {
      phases.motPhanBatDau = vn(new Date(peak.getTime() - e.sd_partial * 60000));
      phases.motPhanKetThuc = vn(new Date(peak.getTime() + e.sd_partial * 60000));
    }
    if (e.sd_total > 0) {
      phases.toanPhanBatDau = vn(new Date(peak.getTime() - e.sd_total * 60000));
      phases.toanPhanKetThuc = vn(new Date(peak.getTime() + e.sd_total * 60000));
    }
    // Hình học bóng (đơn vị: bán kính Mặt Trăng): d = khoảng cách gần nhất từ tâm bóng tới tâm Trăng, v = tốc độ (bán kính/phút).
    let d: number;
    let v: number;
    if (kind === "toan-phan") {
      const k = e.sd_partial / e.sd_total;
      d = Math.sqrt(Math.max(0, (k * k * (R_UMBRA - 1) ** 2 - (R_UMBRA + 1) ** 2) / (k * k - 1)));
      v = Math.sqrt((R_UMBRA + 1) ** 2 - d * d) / e.sd_partial;
    } else if (kind === "mot-phan") {
      d = dForCover(R_UMBRA, e.obscuration);
      v = Math.sqrt((R_UMBRA + 1) ** 2 - d * d) / e.sd_partial;
    } else {
      d = (R_PENUMBRA + 1) / 2;
      v = Math.sqrt((R_PENUMBRA + 1) ** 2 - d * d) / e.sd_penum;
    }
    const cities = CITIES.map((c) => {
      const obs = new A.Observer(c.lat, c.lon, 0);
      const alt = MOON_LEVEL(e.peak, obs);
      let above = 0;
      let n = 0;
      for (let t = p1.getTime(); t <= p4.getTime(); t += 300_000) {
        n++;
        if (MOON_LEVEL(A.MakeTime(new Date(t)), obs) > 0) above++;
      }
      const from = A.MakeTime(new Date(peak.getTime() - 12 * 3600_000));
      const rise = A.SearchRiseSet(A.Body.Moon, obs, +1, from, 1);
      const set = A.SearchRiseSet(A.Body.Moon, obs, -1, from, 1);
      return {
        id: c.id,
        peakAlt: round(alt, 1),
        sharePct: Math.round((above / n) * 100),
        visible: alt > 0,
        moonrise: rise ? vn(rise.date) : null,
        moonset: set ? vn(set.date) : null,
      };
    });
    const local = new Date(peak.getTime() + 7 * 3600_000);
    const lunar = solarToLunar(local.getUTCDate(), local.getUTCMonth() + 1, local.getUTCFullYear());
    out.push({
      body: "lunar",
      kind,
      peak: vn(peak),
      obscuration: round(e.obscuration),
      lunar: { day: lunar.day, month: lunar.month, year: lunar.year, leap: lunar.isLeapMonth },
      phases,
      geo: { d: round(d), v: round(v, 5), sdPenum: round(e.sd_penum, 1), sdPartial: round(e.sd_partial, 1), sdTotal: round(e.sd_total, 1) },
      cities,
      visibleVn: cities.some((c) => c.visible),
    });
    e = A.NextLunarEclipse(e.peak);
  }
  return out;
}

function solarEvents() {
  const out: object[] = [];
  let g = A.SearchGlobalSolarEclipse(START);
  while (g.peak.date < END) {
    const peak = g.peak.date;
    const search = A.MakeTime(new Date(peak.getTime() - 5 * 86400_000));
    const localAt = (obs: A.Observer) => {
      const l = A.SearchLocalSolarEclipse(search, obs);
      return Math.abs(l.peak.time.date.getTime() - peak.getTime()) < 86400_000 ? l : null;
    };
    const cities = CITIES.map((c) => {
      const l = localAt(new A.Observer(c.lat, c.lon, 0));
      if (!l) return { id: c.id, visible: false };
      const visible = l.peak.altitude > 0;
      return {
        id: c.id,
        visible,
        kind: l.kind === A.EclipseKind.Total ? "toan-phan" : l.kind === A.EclipseKind.Annular ? "hinh-khuyen" : "mot-phan",
        obscuration: round(l.obscuration),
        peakAlt: round(l.peak.altitude, 1),
        begin: vn(l.partial_begin.time.date),
        peak: vn(l.peak.time.date),
        end: vn(l.partial_end.time.date),
      };
    });
    // Hình học vẽ: lấy theo điểm cực đại toàn cầu.
    const gObs = new A.Observer(g.latitude ?? 0, g.longitude ?? 0, 0);
    let gl = g.latitude !== undefined ? localAt(gObs) : null;
    if (!gl || gl.peak.altitude <= 0) {
      // Nhật thực một phần: thư viện không cho vị trí cực đại → quét lưới tìm nơi che nhiều nhất (chỉ để vẽ hình học).
      let best: A.LocalSolarEclipseInfo | null = null;
      for (let lat = -80; lat <= 80; lat += 10) {
        for (let lon = -180; lon < 180; lon += 20) {
          const l = localAt(new A.Observer(lat, lon, 0));
          if (l && l.peak.altitude > 0 && (!best || l.obscuration > best.obscuration)) best = l;
        }
      }
      gl = best ?? gl;
    }
    const kind = g.kind === A.EclipseKind.Total ? "toan-phan" : g.kind === A.EclipseKind.Annular ? "hinh-khuyen" : "mot-phan";
    const rho = kind === "toan-phan" ? 1.04 : kind === "hinh-khuyen" ? 0.94 : 1.0;
    let geo: object | null = null;
    if (gl) {
      const tP = minutes(gl.peak.time.date, gl.partial_begin.time.date);
      let d: number;
      if (kind !== "mot-phan" && gl.total_begin) {
        const tT = minutes(gl.peak.time.date, gl.total_begin.time.date);
        const k = tP / tT;
        const m = Math.abs(rho - 1);
        d = Math.sqrt(Math.max(0, (k * k * m * m - (rho + 1) ** 2) / (k * k - 1)));
      } else d = dForCover(rho, gl.obscuration);
      const v = Math.sqrt((rho + 1) ** 2 - d * d) / tP;
      geo = { rho, d: round(d), v: round(v, 5), obscuration: round(gl.obscuration), halfMin: round(tP, 1), alt: round(gl.peak.altitude, 1) };
    }
    const local = new Date(peak.getTime() + 7 * 3600_000);
    const lunar = solarToLunar(local.getUTCDate(), local.getUTCMonth() + 1, local.getUTCFullYear());
    out.push({
      body: "solar",
      kind,
      peak: vn(peak),
      obscuration: gl ? round(gl.obscuration) : null,
      lunar: { day: lunar.day, month: lunar.month, year: lunar.year, leap: lunar.isLeapMonth },
      geo,
      cities,
      visibleVn: cities.some((c) => c.visible),
    });
    g = A.NextGlobalSolarEclipse(g.peak);
  }
  return out;
}

const all = [...lunarEvents(), ...solarEvents()].sort((a, b) => ((a as { peak: string }).peak < (b as { peak: string }).peak ? -1 : 1));
const here = dirname(fileURLToPath(import.meta.url));
const file = join(here, "..", "lib", "van-hoa", "data", "eclipses.generated.ts");
writeFileSync(
  file,
  `// TỰ SINH bởi scripts/generate-eclipses.ts (astronomy-engine). KHÔNG sửa tay.\nimport type { EclipseRaw } from "../eclipse-types";\n\nexport const ECLIPSES_RAW: readonly EclipseRaw[] = ${JSON.stringify(all)} as unknown as readonly EclipseRaw[];\n\n/** Ngày sinh dữ liệu (ISO): dùng làm updatedAt / dateModified. */\nexport const ECLIPSES_UPDATED = "${new Date().toISOString().slice(0, 10)}";\n`,
);
console.log(`Đã ghi ${all.length} sự kiện → ${file}`);
