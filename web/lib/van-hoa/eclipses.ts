import { canChiOfYear } from "@licham/core";
import { ECLIPSES_RAW, ECLIPSES_UPDATED } from "./data/eclipses.generated";
import type { EclipseBody, EclipseKind, EclipseRaw, LunarEclipseRaw, SolarCity, SolarEclipseRaw } from "./eclipse-types";

export const ECLIPSE_LIST_PATH = "/van-hoa/thien-van/nhat-nguyet-thuc/";
export const ECLIPSE_UPDATED = ECLIPSES_UPDATED;

const TITLES: Record<EclipseBody, Partial<Record<EclipseKind, string>>> = {
  solar: { "toan-phan": "Nhật thực toàn phần", "hinh-khuyen": "Nhật thực hình khuyên", "mot-phan": "Nhật thực một phần" },
  lunar: { "toan-phan": "Nguyệt thực toàn phần", "mot-phan": "Nguyệt thực một phần", "nua-toi": "Nguyệt thực nửa tối" },
};

export type Eclipse = EclipseRaw & {
  slug: string;
  title: string;
  /** Ngày dương (giờ Việt Nam) của đỉnh. */
  date: { day: number; month: number; year: number };
};

function build(raw: EclipseRaw): Eclipse {
  const [y, m, d] = raw.peak.slice(0, 10).split("-").map(Number) as [number, number, number];
  const pad = (n: number) => String(n).padStart(2, "0");
  const title = TITLES[raw.body][raw.kind] ?? "Nhật/nguyệt thực";
  const slug = `${raw.body === "solar" ? "nhat" : "nguyet"}-thuc-${raw.kind}-${y}-${pad(m)}-${pad(d)}`;
  return { ...raw, slug, title, date: { day: d, month: m, year: y } };
}

export const ECLIPSES: readonly Eclipse[] = ECLIPSES_RAW.map(build).sort((a, b) => (a.peak < b.peak ? -1 : 1));
export const eclipseBySlug = (slug: string) => ECLIPSES.find((e) => e.slug === slug);
export const ECLIPSE_YEARS: readonly number[] = [...new Set(ECLIPSES.map((e) => e.date.year))];

export function eclipseNeighbours(e: Eclipse): { prev: Eclipse | null; next: Eclipse | null } {
  const i = ECLIPSES.findIndex((x) => x.slug === e.slug);
  return { prev: ECLIPSES[i - 1] ?? null, next: ECLIPSES[i + 1] ?? null };
}

export const eclipsePath = (e: Eclipse) => `${ECLIPSE_LIST_PATH}${e.slug}/`;

/** "hh:mm" giờ Việt Nam từ ISO có +07:00. */
export const hhmm = (iso: string) => iso.slice(11, 16);
export const dmy = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;
/** Kèm ngày khi khác ngày đỉnh, để khỏi nhầm khi pha kéo sang ngày kế/ngày trước. */
export function hhmmOn(iso: string, peakIso: string): string {
  return iso.slice(0, 10) === peakIso.slice(0, 10) ? hhmm(iso) : `${hhmm(iso)} (${iso.slice(8, 10)}/${iso.slice(5, 7)})`;
}

/** Số ngày lịch (giờ VN) từ hôm nay tới ngày đỉnh: >0 sắp tới, 0 hôm nay, <0 đã qua. */
export function daysUntil(e: Eclipse, todayVn: { day: number; month: number; year: number }): number {
  const a = Date.UTC(e.date.year, e.date.month - 1, e.date.day);
  const b = Date.UTC(todayVn.year, todayVn.month - 1, todayVn.day);
  return Math.round((a - b) / 86400_000);
}

/** Thành phố thấy nhật thực rõ nhất (che nhiều nhất). */
export function bestSolarCity(e: SolarEclipseRaw): SolarCity | null {
  const vis = e.cities.filter((c) => c.visible);
  return vis.sort((a, b) => (b.obscuration ?? 0) - (a.obscuration ?? 0))[0] ?? null;
}

export const isSolar = (e: Eclipse): e is Eclipse & SolarEclipseRaw => e.body === "solar";
export const isLunar = (e: Eclipse): e is Eclipse & LunarEclipseRaw => e.body === "lunar";

export function lunarText(e: Eclipse): string {
  const { day, month, year, leap } = e.lunar;
  return `Ngày ${day} tháng ${month}${leap ? " nhuận" : ""} năm ${canChiOfYear(year).name}`;
}

/** Hướng dẫn quan sát an toàn, riêng cho từng loại. */
export function safetyTips(e: Eclipse): string[] {
  if (e.body === "lunar") {
    return [
      "Nguyệt thực có thể xem bằng mắt thường, không cần kính lọc.",
      "Chọn nơi thoáng, ít ánh đèn và nhìn về phía Trăng đang ở trên bầu trời.",
      "Ống nhòm hoặc kính thiên văn nhỏ giúp thấy rõ màu sắc và bề mặt Trăng.",
      ...(e.kind === "nua-toi" ? ["Nguyệt thực nửa tối rất mờ, mắt thường thường khó nhận ra sự thay đổi."] : []),
    ];
  }
  return [
    "Không nhìn trực tiếp Mặt Trời bằng mắt thường, kể cả khi Mặt Trời đã bị che phần lớn.",
    "Chỉ dùng kính lọc chuyên dụng đạt chuẩn ISO 12312-2, hoặc quan sát gián tiếp bằng hộp lỗ kim, chiếu ảnh lên giấy.",
    "Không dùng kính râm thông thường, phim chụp ảnh cũ hay kính lọc tự chế.",
    "Không nhìn Mặt Trời qua ống nhòm, kính thiên văn hay máy ảnh khi chưa gắn kính lọc Mặt Trời phía trước ống kính.",
    ...(e.kind === "toan-phan" ? ["Chỉ trong lúc toàn phần (nếu đứng trong dải toàn phần) mới được bỏ kính lọc; Mặt Trời vừa ló lại phải đeo kính ngay."] : []),
  ];
}

/** "Dân gian nói gì": nội dung biên soạn, để trống thì ẩn khối. Khoá theo loại thiên thể. */
export interface Folk {
  title: string;
  paras: string[];
}
export const ECLIPSE_FOLK: Partial<Record<EclipseBody, Folk>> =
  process.env.NODE_ENV !== "production" ? { lunar: { title: "“[…] (mẫu, chỉ dev)”", paras: ["[…]", "[…]"] } } : {};
