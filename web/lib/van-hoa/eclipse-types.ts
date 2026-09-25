/** Kiểu dữ liệu nhật/nguyệt thực. Số liệu do scripts/generate-eclipses.ts tính bằng astronomy-engine, không gõ tay. */

export type EclipseBody = "solar" | "lunar";
export type EclipseKind = "toan-phan" | "hinh-khuyen" | "mot-phan" | "nua-toi";

export interface EclipseLunarDate {
  day: number;
  month: number;
  year: number;
  leap: boolean;
}

export interface LunarCity {
  id: string;
  peakAlt: number;
  sharePct: number;
  visible: boolean;
  moonrise: string | null;
  moonset: string | null;
}

export interface SolarCity {
  id: string;
  visible: boolean;
  kind?: EclipseKind;
  obscuration?: number;
  peakAlt?: number;
  begin?: string;
  peak?: string;
  end?: string;
}

export interface LunarGeo {
  d: number;
  v: number;
  sdPenum: number;
  sdPartial: number;
  sdTotal: number;
}

export interface SolarGeo {
  rho: number;
  d: number;
  v: number;
  obscuration: number;
  halfMin: number;
  alt: number;
}

interface Base {
  kind: EclipseKind;
  /** Đỉnh (cực đại), ISO có +07:00. */
  peak: string;
  lunar: EclipseLunarDate;
  visibleVn: boolean;
}

export interface LunarEclipseRaw extends Base {
  body: "lunar";
  obscuration: number;
  phases: {
    nuaToiBatDau: string;
    nuaToiKetThuc: string;
    motPhanBatDau?: string;
    motPhanKetThuc?: string;
    toanPhanBatDau?: string;
    toanPhanKetThuc?: string;
  };
  geo: LunarGeo;
  cities: LunarCity[];
}

export interface SolarEclipseRaw extends Base {
  body: "solar";
  obscuration: number | null;
  geo: SolarGeo | null;
  cities: SolarCity[];
}

export type EclipseRaw = LunarEclipseRaw | SolarEclipseRaw;

export const CITY_NAMES: Record<string, string> = {
  "ha-noi": "Hà Nội",
  hue: "Huế",
  "da-nang": "Đà Nẵng",
  "tp-hcm": "TP.HCM",
  "can-tho": "Cần Thơ",
};

/** Bán kính bóng tối / nửa tối của Trái Đất tại khoảng cách Mặt Trăng, tính theo bán kính Mặt Trăng (giá trị điển hình; chỉ để vẽ). Trùng với scripts/generate-eclipses.ts. */
export const R_UMBRA = 2.65;
export const R_PENUMBRA = 4.6;
