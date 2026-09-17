/** Thiên can, địa chi, 60 hoa giáp and nạp âm ngũ hành. */

import { solarToLunar } from "./lunar";

export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"] as const;
export const CHI = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
] as const;

export type CanName = (typeof CAN)[number];
export type ChiName = (typeof CHI)[number];
export type NguHanh = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export interface NapAm {
  name: string;
  element: NguHanh;
}

export interface CanChi {
  /** 0..9 */
  canIndex: number;
  /** 0..11 */
  chiIndex: number;
  /** Position in the 60-cycle, 0 = Giáp Tý. */
  index: number;
  can: CanName;
  chi: ChiName;
  /** e.g. "Giáp Tý" */
  name: string;
  napAm: NapAm;
}

/** Nạp âm of the 30 pairs of the sexagenary cycle (Giáp Tý–Ất Sửu, Bính Dần–Đinh Mão, …). */
const NAP_AM: readonly NapAm[] = [
  { name: "Hải Trung Kim", element: "Kim" },
  { name: "Lư Trung Hỏa", element: "Hỏa" },
  { name: "Đại Lâm Mộc", element: "Mộc" },
  { name: "Lộ Bàng Thổ", element: "Thổ" },
  { name: "Kiếm Phong Kim", element: "Kim" },
  { name: "Sơn Đầu Hỏa", element: "Hỏa" },
  { name: "Giản Hạ Thủy", element: "Thủy" },
  { name: "Thành Đầu Thổ", element: "Thổ" },
  { name: "Bạch Lạp Kim", element: "Kim" },
  { name: "Dương Liễu Mộc", element: "Mộc" },
  { name: "Tuyền Trung Thủy", element: "Thủy" },
  { name: "Ốc Thượng Thổ", element: "Thổ" },
  { name: "Tích Lịch Hỏa", element: "Hỏa" },
  { name: "Tùng Bách Mộc", element: "Mộc" },
  { name: "Trường Lưu Thủy", element: "Thủy" },
  { name: "Sa Trung Kim", element: "Kim" },
  { name: "Sơn Hạ Hỏa", element: "Hỏa" },
  { name: "Bình Địa Mộc", element: "Mộc" },
  { name: "Bích Thượng Thổ", element: "Thổ" },
  { name: "Kim Bạch Kim", element: "Kim" },
  { name: "Phú Đăng Hỏa", element: "Hỏa" },
  { name: "Thiên Hà Thủy", element: "Thủy" },
  { name: "Đại Trạch Thổ", element: "Thổ" },
  { name: "Thoa Xuyến Kim", element: "Kim" },
  { name: "Tang Đố Mộc", element: "Mộc" },
  { name: "Đại Khê Thủy", element: "Thủy" },
  { name: "Sa Trung Thổ", element: "Thổ" },
  { name: "Thiên Thượng Hỏa", element: "Hỏa" },
  { name: "Thạch Lựu Mộc", element: "Mộc" },
  { name: "Đại Hải Thủy", element: "Thủy" },
];

const mod = (n: number, m: number): number => ((n % m) + m) % m;

/** Build a can chi from its position in the 60-cycle (0 = Giáp Tý). */
export function canChiFromIndex(index: number): CanChi {
  const i = mod(index, 60);
  const canIndex = i % 10;
  const chiIndex = i % 12;
  const can = CAN[canIndex] as CanName;
  const chi = CHI[chiIndex] as ChiName;
  return {
    canIndex,
    chiIndex,
    index: i,
    can,
    chi,
    name: `${can} ${chi}`,
    napAm: NAP_AM[Math.floor(i / 2)] as NapAm,
  };
}

/** Build a can chi from can and chi indices; they must have the same parity. */
export function canChiFromParts(canIndex: number, chiIndex: number): CanChi {
  const c = mod(canIndex, 10);
  const z = mod(chiIndex, 12);
  if (c % 2 !== z % 2) throw new RangeError("Can and chi must have the same parity");
  return canChiFromIndex(6 * c - 5 * z);
}

/** Can chi of a day from its Julian Day Number. */
export function canChiOfDay(jd: number): CanChi {
  return canChiFromIndex(jd + 49);
}

/** Can chi of a lunar year. */
export function canChiOfYear(lunarYear: number): CanChi {
  return canChiFromParts(lunarYear + 6, lunarYear + 8);
}

/**
 * Can chi năm sinh, coi năm dương lịch là năm âm lịch — CHỈ LÀ ƯỚC LƯỢNG, sai với người
 * sinh trong khoảng từ đầu năm dương tới trước Tết Nguyên đán (ví dụ 15/01/1995 ra Ất Hợi
 * thay vì Giáp Tuất thật). Chỉ dùng khi không biết ngày/tháng sinh đầy đủ; có ngày sinh thì
 * dùng `canChiNamSinh()`.
 */
export function canChiNamDuong(solarYear: number): CanChi {
  return canChiOfYear(solarYear);
}

/** Can chi năm sinh chính xác, tính từ ngày sinh dương lịch đầy đủ qua `solarToLunar()`. */
export function canChiNamSinh(day: number, month: number, year: number): CanChi {
  const lunar = solarToLunar(day, month, year);
  return canChiOfYear(lunar.year);
}

/**
 * Can chi of a lunar month (month 1 = Dần). A leap month carries the can chi
 * of the regular month it follows.
 */
export function canChiOfMonth(lunarMonth: number, lunarYear: number): CanChi {
  return canChiFromParts(lunarYear * 12 + lunarMonth + 3, lunarMonth + 1);
}

export interface CanChiHour {
  /** 0..11, 0 = giờ Tý. */
  chiIndex: number;
  /** Local start "HH:MM" (giờ Tý starts 23:00 of the previous evening). */
  start: string;
  /** Local end "HH:MM". */
  end: string;
  canChi: CanChi;
}

function hourLabel(h: number): string {
  return `${String(mod(h, 24)).padStart(2, "0")}:00`;
}

/** Can chi of the 12 two-hour periods of the day whose day can index is given. */
export function canChiOfHours(dayCanIndex: number): CanChiHour[] {
  const tyCan = mod(dayCanIndex * 2, 10);
  return CHI.map((_, chiIndex) => ({
    chiIndex,
    start: hourLabel(chiIndex * 2 - 1),
    end: hourLabel(chiIndex * 2 + 1),
    canChi: canChiFromParts(tyCan + chiIndex, chiIndex),
  }));
}
