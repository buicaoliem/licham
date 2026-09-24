/**
 * Bản đồ sao chiêm tinh phương Tây (hoàng đạo nhiệt đới, địa tâm).
 *
 * Vị trí thiên thể: thư viện astronomy-engine 2.1 (Don Cross, MIT; mô hình VSOP87 rút gọn cho hành tinh,
 * lý thuyết Mặt Trăng của Chapront, độ chính xác cỡ ±1′ cung). Tọa độ là kinh độ hoàng đạo biểu kiến
 * (có quang sai) trên hoàng đạo thật của ngày — đúng hệ quy chiếu mà lá số nhiệt đới dùng.
 * Góc (Ascendant, MC) và cung nhà tính từ giờ sao biểu kiến Greenwich (GAST) và độ nghiêng hoàng đạo thật.
 */
import { AstroTime, Body, e_tilt, Ecliptic, GeoMoon, GeoVector, SiderealTime } from "astronomy-engine";

export const PLANETS = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"] as const;
export type PlanetId = (typeof PLANETS)[number];
export type PointId = PlanetId | "node" | "southNode" | "asc" | "mc";

const BODY: Record<PlanetId, Body> = {
  sun: Body.Sun,
  moon: Body.Moon,
  mercury: Body.Mercury,
  venus: Body.Venus,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
  uranus: Body.Uranus,
  neptune: Body.Neptune,
  pluto: Body.Pluto,
};

export type HouseSystem = "placidus" | "whole-sign" | "equal" | "porphyry";
export const HOUSE_SYSTEMS: readonly { id: HouseSystem; name: string; note: string }[] = [
  { id: "placidus", name: "Placidus", note: "Phổ biến nhất ở chiêm tinh hiện đại; chia cung bán nhật của từng điểm. Không xác định ở vùng cực (vĩ độ > 66°)." },
  { id: "whole-sign", name: "Whole Sign (cả cung)", note: "Mỗi nhà trùng trọn một cung hoàng đạo, nhà 1 là cung chứa Ascendant. Cổ nhất, dùng được ở mọi vĩ độ." },
  { id: "equal", name: "Equal (nhà đều)", note: "Mỗi nhà rộng đúng 30°, bắt đầu từ Ascendant." },
  { id: "porphyry", name: "Porphyry", note: "Chia ba mỗi góc phần tư giữa ASC, IC, DSC, MC theo kinh độ hoàng đạo." },
];

const DEG = Math.PI / 180;
const norm = (x: number): number => ((x % 360) + 360) % 360;
/** Hiệu góc có dấu trong (−180, 180]. */
export const angleDiff = (a: number, b: number): number => {
  const d = norm(a - b);
  return d > 180 ? d - 360 : d;
};

export interface ChartInput {
  /** Thời điểm sinh, UTC (mili giây). */
  utcMs: number;
  lat: number;
  lon: number;
  houseSystem: HouseSystem;
  /** false: không rõ giờ sinh — không tính góc và nhà, Mặt Trăng có sai số tới ±6–7°. */
  timeKnown: boolean;
}

export interface PointPosition {
  id: PointId;
  /** Kinh độ hoàng đạo nhiệt đới, độ [0, 360). */
  lon: number;
  /** Vĩ độ hoàng đạo, độ. */
  lat: number;
  /** Tốc độ biểu kiến, độ/ngày (âm = nghịch hành). */
  speed: number;
  retrograde: boolean;
  /** Nhà 1..12 (undefined khi không rõ giờ sinh). */
  house?: number;
}

export type AspectType = "conjunction" | "sextile" | "square" | "trine" | "opposition";

export interface AspectDef {
  type: AspectType;
  angle: number;
  orb: number;
  name: string;
  symbol: string;
  tone: "hop" | "cang" | "trung";
}

/** Orb chuẩn (độ). Có Mặt Trời hoặc Mặt Trăng thì cộng 2°; Nút, ASC, MC tối đa 5°. */
export const ASPECTS: readonly AspectDef[] = [
  { type: "conjunction", angle: 0, orb: 8, name: "Trùng tụ", symbol: "☌", tone: "trung" },
  { type: "sextile", angle: 60, orb: 5, name: "Lục hợp", symbol: "⚹", tone: "hop" },
  { type: "square", angle: 90, orb: 7, name: "Vuông góc", symbol: "□", tone: "cang" },
  { type: "trine", angle: 120, orb: 7, name: "Tam hợp", symbol: "△", tone: "hop" },
  { type: "opposition", angle: 180, orb: 8, name: "Đối đỉnh", symbol: "☍", tone: "cang" },
];

export interface Aspect {
  a: PointId;
  b: PointId;
  type: AspectType;
  /** Góc thực tế giữa hai điểm (0–180). */
  separation: number;
  /** Độ lệch so với góc chuẩn. */
  orb: number;
  maxOrb: number;
  /** Đang tiến lại gần góc chuẩn (applying) hay đã tách (separating); undefined khi có điểm cố định. */
  applying?: boolean;
}

export interface Chart {
  input: ChartInput;
  julianDayUT: number;
  /** Giờ sao địa phương biểu kiến, độ (RAMC). */
  ramc: number;
  obliquity: number;
  points: PointPosition[];
  asc?: number;
  mc?: number;
  /** 12 đỉnh nhà (độ), cusp[0] = nhà 1. */
  cusps?: number[];
  houseSystemUsed?: HouseSystem;
  /** Lý do đổi hệ nhà (vd Placidus không xác định ở vùng cực). */
  houseFallback?: string;
  aspects: Aspect[];
  /** Nút Bắc trung bình (so sánh với nút thực hiển thị trên bản đồ). */
  meanNode: number;
}

export class ChartInputError extends Error {
  name = "ChartInputError";
}

/** Kinh độ, vĩ độ hoàng đạo biểu kiến của thiên thể, hệ hoàng đạo thật của ngày. */
export function eclipticOfDate(id: PlanetId, time: AstroTime): { lon: number; lat: number } {
  const vec = id === "moon" ? GeoMoon(time) : GeoVector(BODY[id], time, true);
  const ecl = Ecliptic(vec);
  return { lon: norm(ecl.elon), lat: ecl.elat };
}

/** Nút Bắc trung bình của quỹ đạo Mặt Trăng (Meeus, công thức 47.7). */
export function meanNodeLongitude(time: AstroTime): number {
  const T = time.tt / 36525;
  return norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + (T * T * T) / 467441 - (T * T * T * T) / 60616000);
}

/**
 * Nút Bắc thực (nút mọc của quỹ đạo tức thời): giao tuyến mặt phẳng chứa vị trí và vận tốc Mặt Trăng
 * với hoàng đạo thật của ngày.
 */
export function trueNodeLongitude(time: AstroTime): number {
  const dt = 1 / 24;
  const toVec = (t: AstroTime) => {
    const e = Ecliptic(GeoMoon(t));
    const r = e.vec;
    return [r.x, r.y, r.z];
  };
  const p0 = toVec(time.AddDays(-dt));
  const p1 = toVec(time.AddDays(dt));
  const p = toVec(time);
  const v = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]];
  const h = [p[1] * v[2] - p[2] * v[1], p[2] * v[0] - p[0] * v[2], p[0] * v[1] - p[1] * v[0]];
  return norm(Math.atan2(h[0], -h[1]) / DEG);
}

/** Ascendant từ RAMC, độ nghiêng ε và vĩ độ φ (độ). */
export function ascendant(ramc: number, eps: number, phi: number): number {
  const r = ramc * DEG;
  const e = eps * DEG;
  const asc = Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(e) + Math.tan(phi * DEG) * Math.sin(e))) / DEG;
  return norm(asc);
}

export function midheaven(ramc: number, eps: number): number {
  const r = ramc * DEG;
  return norm(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(eps * DEG)) / DEG);
}

/** Điểm trên hoàng đạo có xích kinh RA. */
function lonFromRa(ra: number, eps: number): number {
  const r = ra * DEG;
  return norm(Math.atan2(Math.sin(r), Math.cos(r) * Math.cos(eps * DEG)) / DEG);
}

export class PlacidusUndefinedError extends Error {}

/** Placidus: nghiệm lặp cho đỉnh nhà 11, 12, 2, 3; các nhà còn lại đối xứng. */
export function placidusCusps(ramc: number, eps: number, phi: number, asc: number, mc: number): number[] {
  const tanPhi = Math.tan(phi * DEG);
  const solve = (fraction: number, below: boolean): number => {
    let lon = below ? norm(mc + 180 - fraction * 90) : norm(mc + fraction * 90);
    for (let i = 0; i < 60; i++) {
      const dec = Math.asin(Math.sin(eps * DEG) * Math.sin(lon * DEG));
      const x = tanPhi * Math.tan(dec);
      if (Math.abs(x) >= 1) throw new PlacidusUndefinedError("Placidus không xác định ở vĩ độ này.");
      const ad = Math.asin(x) / DEG;
      const ra = below ? ramc + 180 - fraction * (90 - ad) : ramc + fraction * (90 + ad);
      const next = lonFromRa(ra, eps);
      if (Math.abs(angleDiff(next, lon)) < 1e-9) return next;
      lon = next;
    }
    return lon;
  };
  const c11 = solve(1 / 3, false);
  const c12 = solve(2 / 3, false);
  const c2 = solve(2 / 3, true);
  const c3 = solve(1 / 3, true);
  const cusps = [asc, c2, c3, norm(mc + 180), norm(c11 + 180), norm(c12 + 180), norm(asc + 180), norm(c2 + 180), norm(c3 + 180), mc, c11, c12];
  return cusps;
}

export function porphyryCusps(asc: number, mc: number): number[] {
  const ic = norm(mc + 180);
  const dsc = norm(asc + 180);
  const q1 = norm(ic - asc) / 3; // ASC → IC (nhà 1–3)
  const q2 = norm(dsc - ic) / 3; // IC → DSC (nhà 4–6)
  return [asc, asc + q1, asc + 2 * q1, ic, ic + q2, ic + 2 * q2, dsc, dsc + q1, dsc + 2 * q1, mc, mc + q2, mc + 2 * q2].map(norm);
}

export function houseOf(lon: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const end = cusps[(i + 1) % 12];
    const span = norm(end - start);
    if (norm(lon - start) < span || span === 0) return i + 1;
  }
  return 12;
}

function aspectOrb(def: AspectDef, a: PointId, b: PointId): number {
  let orb = def.orb;
  if (a === "sun" || a === "moon" || b === "sun" || b === "moon") orb += 2;
  const minor = (p: PointId) => p === "node" || p === "southNode" || p === "asc" || p === "mc";
  if (minor(a) || minor(b)) orb = Math.min(orb, 5);
  return orb;
}

export function findAspects(points: { id: PointId; lon: number; speed: number; fixed?: boolean }[]): Aspect[] {
  const out: Aspect[] = [];
  for (let i = 0; i < points.length; i++)
    for (let j = i + 1; j < points.length; j++) {
      const p = points[i];
      const q = points[j];
      if ((p.id === "node" && q.id === "southNode") || (p.id === "asc" && q.id === "mc")) continue;
      const sep = Math.abs(angleDiff(p.lon, q.lon));
      for (const def of ASPECTS) {
        const maxOrb = aspectOrb(def, p.id, q.id);
        const orb = Math.abs(sep - def.angle);
        if (orb <= maxOrb) {
          let applying: boolean | undefined;
          if (!p.fixed || !q.fixed) {
            // Sau một khoảng nhỏ, độ lệch so với góc chuẩn giảm → đang tiến lại gần.
            const dt = 0.01;
            const sep2 = Math.abs(angleDiff(p.lon + p.speed * dt, q.lon + q.speed * dt));
            applying = Math.abs(sep2 - def.angle) < orb;
          }
          out.push({ a: p.id, b: q.id, type: def.type, separation: sep, orb, maxOrb, applying });
        }
      }
    }
  return out.sort((x, y) => x.orb - y.orb);
}

/** Lập bản đồ sao. */
export function computeChart(input: ChartInput): Chart {
  const { utcMs, lat, lon, houseSystem, timeKnown } = input;
  if (!Number.isFinite(utcMs)) throw new ChartInputError("Thời điểm sinh không hợp lệ.");
  if (!(lat >= -90 && lat <= 90) || !(lon >= -180 && lon <= 180)) throw new ChartInputError("Tọa độ không hợp lệ (vĩ độ −90…90, kinh độ −180…180).");
  const year = new Date(utcMs).getUTCFullYear();
  if (year < 1800 || year > 2200) throw new ChartInputError("Hỗ trợ năm sinh từ 1800 đến 2200.");

  const time = new AstroTime(new Date(utcMs));
  const tilt = e_tilt(time);
  const eps = tilt.tobl;
  const gast = SiderealTime(time) * 15;
  const ramc = norm(gast + lon);

  const points: PointPosition[] = PLANETS.map((id) => {
    const now = eclipticOfDate(id, time);
    const before = eclipticOfDate(id, time.AddDays(-0.5));
    const after = eclipticOfDate(id, time.AddDays(0.5));
    const speed = angleDiff(after.lon, before.lon);
    return { id, lon: now.lon, lat: now.lat, speed, retrograde: speed < 0 };
  });
  const node = trueNodeLongitude(time);
  const nodeSpeed = angleDiff(trueNodeLongitude(time.AddDays(0.5)), trueNodeLongitude(time.AddDays(-0.5)));
  points.push({ id: "node", lon: node, lat: 0, speed: nodeSpeed, retrograde: nodeSpeed < 0 });
  points.push({ id: "southNode", lon: norm(node + 180), lat: 0, speed: nodeSpeed, retrograde: nodeSpeed < 0 });

  const chart: Chart = {
    input,
    julianDayUT: time.ut + 2451545.0,
    ramc,
    obliquity: eps,
    points,
    aspects: [],
    meanNode: meanNodeLongitude(time),
  };

  const aspectPoints: { id: PointId; lon: number; speed: number; fixed?: boolean }[] = points
    .filter((p) => p.id !== "southNode")
    .map((p) => ({ id: p.id, lon: p.lon, speed: p.speed }));

  if (timeKnown) {
    const asc = ascendant(ramc, eps, lat);
    const mc = midheaven(ramc, eps);
    chart.asc = asc;
    chart.mc = mc;
    let used: HouseSystem = houseSystem;
    let cusps: number[];
    if (houseSystem === "placidus") {
      try {
        cusps = placidusCusps(ramc, eps, lat, asc, mc);
      } catch (err) {
        if (!(err instanceof PlacidusUndefinedError)) throw err;
        used = "porphyry";
        cusps = porphyryCusps(asc, mc);
        chart.houseFallback = `Placidus không xác định ở vĩ độ ${Math.abs(lat).toFixed(2)}° (một số điểm hoàng đạo không mọc hoặc không lặn); đã dùng hệ Porphyry.`;
      }
    } else if (houseSystem === "porphyry") {
      cusps = porphyryCusps(asc, mc);
    } else if (houseSystem === "equal") {
      cusps = Array.from({ length: 12 }, (_, i) => norm(asc + 30 * i));
    } else {
      const start = Math.floor(asc / 30) * 30;
      cusps = Array.from({ length: 12 }, (_, i) => norm(start + 30 * i));
    }
    chart.cusps = cusps;
    chart.houseSystemUsed = used;
    for (const p of points) p.house = houseOf(p.lon, cusps);
    aspectPoints.push({ id: "asc", lon: asc, speed: 0, fixed: true }, { id: "mc", lon: mc, speed: 0, fixed: true });
  }
  chart.aspects = findAspects(aspectPoints);
  return chart;
}
