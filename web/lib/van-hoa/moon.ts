import { Body, Illumination, MoonPhase, Observer, SearchRiseSet } from "astronomy-engine";
import type { SolarDate } from "@licham/core";

/** Mặc định: Hà Nội. */
export const HANOI = { lat: 21.0285, lon: 105.8542, elevation: 0 } as const;
const VN_OFFSET_MS = 7 * 3600 * 1000;

/** Tên pha theo góc lệch Mặt Trăng–Mặt Trời (độ), mỗi pha rộng 45°. */
const PHASE_NAMES = [
  "Trăng non",
  "Trăng lưỡi liềm đầu tháng",
  "Thượng huyền",
  "Trăng gần tròn",
  "Trăng tròn",
  "Trăng khuyết dần",
  "Hạ huyền",
  "Trăng lưỡi liềm cuối tháng",
] as const;

export function phaseName(elongationDeg: number): string {
  const norm = (((elongationDeg + 22.5) % 360) + 360) % 360;
  return PHASE_NAMES[Math.floor(norm / 45) % 8]!;
}

export interface MoonTime {
  hhmm: string;
  /** Rơi vào ngày Việt Nam kế tiếp. */
  nextDay: boolean;
}

export interface MoonInfo {
  phase: string;
  /** 0–360°, 0 = trăng non, 180 = trăng tròn. */
  elongation: number;
  /** 0–100 */
  illuminatedPercent: number;
  moonrise: MoonTime | null;
  moonset: MoonTime | null;
}

/** 00:00 giờ Việt Nam của ngày đó, tính bằng UTC. */
function vnMidnight(d: SolarDate): Date {
  return new Date(Date.UTC(d.year, d.month - 1, d.day) - VN_OFFSET_MS);
}

function fmt(t: Date | null, day: SolarDate): MoonTime | null {
  if (!t) return null;
  const local = new Date(t.getTime() + VN_OFFSET_MS);
  const hh = String(local.getUTCHours()).padStart(2, "0");
  const mm = String(local.getUTCMinutes()).padStart(2, "0");
  const sameDay = local.getUTCDate() === day.day && local.getUTCMonth() + 1 === day.month;
  return { hhmm: `${hh}:${mm}`, nextDay: !sameDay };
}

/**
 * Trăng của ngày `day` (giờ VN) tại Hà Nội. Pha lấy tại `at` (mặc định 12:00 trưa ngày đó;
 * màn hình "tối nay" truyền thời điểm hiện tại). Giờ mọc/lặn là lần đầu tiên tính từ 00:00 ngày đó.
 */
export function moonInfo(day: SolarDate, at?: Date, place: { lat: number; lon: number; elevation: number } = HANOI): MoonInfo {
  const start = vnMidnight(day);
  const when = at ?? new Date(start.getTime() + 12 * 3600 * 1000);
  const elongation = MoonPhase(when);
  const illum = Illumination(Body.Moon, when);
  const obs = new Observer(place.lat, place.lon, place.elevation);
  const rise = SearchRiseSet(Body.Moon, obs, +1, start, 2);
  const set = SearchRiseSet(Body.Moon, obs, -1, start, 2);
  return {
    phase: phaseName(elongation),
    elongation,
    illuminatedPercent: Math.round(illum.phase_fraction * 100),
    moonrise: fmt(rise?.date ?? null, day),
    moonset: fmt(set?.date ?? null, day),
  };
}

/**
 * Đường SVG phần được chiếu sáng của đĩa trăng bán kính r tại (cx,cy).
 * Trăng đầu tháng (0–180°) sáng bên phải; cuối tháng lật ngược (flip).
 */
export function moonLitPath(elongationDeg: number, cx: number, cy: number, r: number): { d: string; flip: boolean } {
  const waxing = elongationDeg <= 180;
  const e = waxing ? elongationDeg : 360 - elongationDeg;
  const rx = Math.abs(Math.cos((e * Math.PI) / 180)) * r;
  const sweep = e < 90 ? 0 : 1;
  const d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${rx.toFixed(3)} ${r} 0 0 ${sweep} ${cx} ${cy - r} Z`;
  return { d, flip: !waxing };
}
