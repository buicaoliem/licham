import { type DayInfo, type SolarDate, canChiNamSinh, getDayInfo, jdFromDate, jdToDate, namSinhCoXung } from "@licham/core";
import { HOP_TRIGGERS, KIENG_TRIGGERS, type ViecDef, matchingStarNames } from "@/lib/day-detail";
import { MONTH_WORD, WEEKDAY_LONG, pad2 } from "@/lib/format";

export type ViecSlug =
  | "cuoi-hoi"
  | "khai-truong"
  | "dong-tho"
  | "nhap-trach"
  | "ky-ket"
  | "mua-xe"
  | "xuat-hanh"
  | "cat-noc";

export interface ViecMeta extends ViecDef {
  slug: ViecSlug;
  /** Tên hiển thị trên chip và tiêu đề, ví dụ "cưới hỏi". */
  label: string;
  /** Mô tả một dòng dưới tiêu đề. */
  tagline: string;
  /** Nhãn từng người cần xem tuổi, ví dụ ["chú rể", "cô dâu"] cho cưới hỏi, ["người xem"] cho việc khác. */
  personLabels: readonly string[];
}

export const VIEC_LIST: readonly ViecMeta[] = [
  {
    slug: "cuoi-hoi",
    viec: "cưới hỏi",
    label: "cưới hỏi",
    tagline: "Chọn ngày hợp tuổi cô dâu chú rể, tránh ngày xung và các ngày đại kỵ",
    keywords: ["cưới hỏi", "giá thú", "ăn hỏi", "dạm ngõ"],
    personLabels: ["chú rể", "cô dâu"],
  },
  {
    slug: "khai-truong",
    viec: "khai trương",
    label: "khai trương",
    tagline: "Chọn ngày mở hàng, khai trương hợp tuổi gia chủ, tránh ngày đại kỵ",
    keywords: ["khai trương"],
    personLabels: ["người xem"],
  },
  {
    slug: "dong-tho",
    viec: "động thổ",
    label: "động thổ",
    tagline: "Chọn ngày động thổ, khởi công xây nhà hợp tuổi, tránh ngày đại kỵ",
    keywords: ["động thổ", "làm nhà", "xây cất", "khởi công xây cất"],
    personLabels: ["người xem"],
  },
  {
    slug: "nhap-trach",
    viec: "nhập trạch",
    label: "nhập trạch",
    tagline: "Chọn ngày về nhà mới hợp tuổi gia chủ, tránh ngày đại kỵ",
    keywords: ["nhập trạch", "về nhà mới"],
    personLabels: ["người xem"],
  },
  {
    slug: "ky-ket",
    viec: "ký kết",
    label: "ký kết hợp đồng",
    tagline: "Chọn ngày ký kết, giao ước hợp tuổi, tránh ngày đại kỵ",
    keywords: ["ký kết", "giao ước", "hợp đồng"],
    personLabels: ["người xem"],
  },
  {
    slug: "mua-xe",
    viec: "mua xe",
    label: "mua xe",
    tagline: "Chọn ngày mua xe, tậu xe hợp tuổi, tránh ngày đại kỵ",
    keywords: ["mua xe", "tậu xe", "sắm xe"],
    personLabels: ["người xem"],
  },
  {
    slug: "xuat-hanh",
    viec: "xuất hành",
    label: "xuất hành",
    tagline: "Chọn ngày xuất hành, đi xa hợp tuổi, tránh ngày đại kỵ",
    keywords: ["xuất hành"],
    personLabels: ["người xem"],
  },
  {
    slug: "cat-noc",
    viec: "cất nóc",
    label: "cất nóc",
    tagline: "Chọn ngày cất nóc, đổ mái hợp tuổi gia chủ, tránh ngày đại kỵ",
    keywords: ["cất nóc", "dựng cột"],
    personLabels: ["người xem"],
  },
] as const;

export function viecBySlug(slug: string): ViecMeta | undefined {
  return VIEC_LIST.find((v) => v.slug === slug);
}

const TAM_NUONG_DAYS = [3, 7, 13, 18, 22, 27];
const NGUYET_KY_DAYS = [5, 14, 23];

/** Ngày đại kỵ: Tam nương và Nguyệt kỵ. */
function daiKyReasons(lunarDay: number): string[] {
  const reasons: string[] = [];
  if (TAM_NUONG_DAYS.includes(lunarDay)) reasons.push("Tam nương");
  if (NGUYET_KY_DAYS.includes(lunarDay)) reasons.push("Nguyệt kỵ");
  return reasons;
}

export interface DayScore {
  score: number;
  scoreLabel: string | null;
  hoangDaoPoints: number;
  saoPoints: number;
  tuoiXungPoints: number;
  daiKyPoints: number;
  goodStars: string[];
  badStars: string[];
  daiKy: string[];
  tuoiXungReasons: string[];
  reason: string;
}

/** Điểm "không xung tuổi" theo mức xung nặng nhất trong những người xem — xem tables/tuoi-xung.ts. */
const TUOI_XUNG_POINTS: Record<ReturnType<typeof namSinhCoXung>, number> = {
  "khong-xung": 25,
  "xung-chi": 10,
  "thien-khac-dia-xung": 0,
};

function tuoiXungLabel(level: ReturnType<typeof namSinhCoXung>, personLabel: string): string | null {
  if (level === "thien-khac-dia-xung") return `thiên khắc địa xung tuổi ${personLabel}`;
  if (level === "xung-chi") return `xung tuổi ${personLabel}`;
  return null;
}

/**
 * Chấm điểm một ngày cho một việc, thang 100 — xem "Cách chấm điểm" trên trang.
 * `birthDates` là ngày sinh dương lịch đầy đủ của từng người xem (theo `viec.personLabels`) —
 * cần đủ ngày/tháng/năm để tính đúng can chi năm sinh cho người sinh trước Tết Nguyên đán.
 * Nếu nhiều người, điểm "không xung tuổi" lấy theo mức xung nặng nhất trong số họ. Bỏ trống
 * khi chỉ cần điểm không phụ thuộc người xem (ví dụ thống kê tháng tốt nhất trong năm) — khi
 * đó coi như không xung.
 */
export function scoreDay(
  info: DayInfo,
  viec: ViecDef,
  birthDates: readonly SolarDate[] = [],
  personLabels: readonly string[] = [],
): DayScore {
  const isHoangDao = info.thanSatNgay.isHoangDao;
  const hoangDaoPoints = isHoangDao ? 30 : 0;

  const goodStars = matchingStarNames(info.saoTot ?? [], viec, HOP_TRIGGERS);
  const badStars = matchingStarNames(info.saoXau ?? [], viec, KIENG_TRIGGERS);
  const saoPoints = Math.min(goodStars.length * 8, 25) - Math.min(badStars.length * 8, 25);

  const levels = birthDates.map((d) => namSinhCoXung(d, info.canChi.day));
  const tuoiXungPoints = levels.length > 0 ? Math.min(...levels.map((l) => TUOI_XUNG_POINTS[l])) : 25;
  const tuoiXungReasons = levels
    .map((level, i) => tuoiXungLabel(level, personLabels[i] ?? "người xem"))
    .filter((s): s is string => s !== null);

  const daiKy = daiKyReasons(info.lunar.day);
  const daiKyPoints = daiKy.length > 0 ? 0 : 20;

  const score = Math.max(0, Math.min(100, hoangDaoPoints + saoPoints + tuoiXungPoints + daiKyPoints));
  const scoreLabel = score >= 85 ? "Rất tốt" : score >= 70 ? "Khá" : null;

  const daiKyText = daiKy.length > 0 ? `phạm ${daiKy.join(", ")}` : "không phạm ngày đại kỵ nào";
  const reasonParts = [`${isHoangDao ? "Hoàng đạo" : "Hắc đạo"} ${info.thanSatNgay.star}`, `trực ${info.truc.name}`, daiKyText, ...tuoiXungReasons];
  const reason = reasonParts.join(", ");

  return {
    score,
    scoreLabel,
    hoangDaoPoints,
    saoPoints,
    tuoiXungPoints,
    daiKyPoints,
    goodStars,
    badStars,
    daiKy,
    tuoiXungReasons,
    reason,
  };
}

export interface DayResult {
  solar: SolarDate;
  weekday: string;
  monthWord: string;
  lunarLabel: string;
  canChiName: string;
  score: DayScore;
}

function lunarLabel(info: DayInfo): string {
  return `${info.lunar.day} tháng ${MONTH_WORD[info.lunar.month - 1]}${info.lunar.isLeapMonth ? " nhuận" : ""} âm lịch`;
}

/** Xếp hạng các ngày trong khoảng [from, to] (bao gồm hai đầu) theo điểm giảm dần, lấy tối đa `limit` ngày. */
export function bestDaysInRange(
  viec: ViecMeta,
  from: SolarDate,
  to: SolarDate,
  birthDates: readonly SolarDate[] = [],
  limit = 7,
): DayResult[] {
  const startJd = jdFromDate(from.day, from.month, from.year);
  const endJd = jdFromDate(to.day, to.month, to.year);
  const results: DayResult[] = [];
  for (let jd = startJd; jd <= endJd; jd++) {
    const solar = jdToDate(jd);
    const info = getDayInfo(solar);
    results.push({
      solar,
      weekday: WEEKDAY_LONG[info.solar.dayOfWeek]!,
      monthWord: `Tháng ${solar.month}`,
      lunarLabel: lunarLabel(info),
      canChiName: info.canChi.day.name,
      score: scoreDay(info, viec, birthDates, viec.personLabels),
    });
  }
  results.sort((a, b) => b.score.score - a.score.score);
  return results.slice(0, limit);
}

export interface YearMonthScore {
  month: number;
  avgScore: number;
}

/** Điểm trung bình mỗi tháng trong một năm cho một việc — dùng để trả lời câu hỏi "tháng nào hợp nhất". */
export function monthlyAverageScores(viec: ViecDef, year: number): YearMonthScore[] {
  const sums = new Array(12).fill(0) as number[];
  const counts = new Array(12).fill(0) as number[];
  const startJd = jdFromDate(1, 1, year);
  const endJd = jdFromDate(31, 12, year);
  for (let jd = startJd; jd <= endJd; jd++) {
    const solar = jdToDate(jd);
    if (solar.year !== year) continue;
    const info = getDayInfo(solar);
    const idx = solar.month - 1;
    sums[idx] += scoreDay(info, viec).score;
    counts[idx] += 1;
  }
  return sums.map((sum, i) => ({ month: i + 1, avgScore: counts[i] ? sum / counts[i] : 0 }));
}

export function bestMonthOfYear(viec: ViecDef, year: number): YearMonthScore {
  const scores = monthlyAverageScores(viec, year);
  return scores.reduce((best, cur) => (cur.avgScore > best.avgScore ? cur : best));
}

/** "Ất Hợi · mệnh Sơn Đầu Hỏa" — nhãn can chi năm sinh hiển thị cạnh ô nhập ngày sinh, để người dùng tự kiểm. */
export function birthDateLabel(d: SolarDate): string {
  const cc = canChiNamSinh(d.day, d.month, d.year);
  return `${cc.name} · mệnh ${cc.napAm.name}`;
}

export function formatSolarDate(d: SolarDate): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;
}
