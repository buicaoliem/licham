/**
 * Giờ sinh → thời điểm UTC, theo cơ sở dữ liệu múi giờ IANA có sẵn trong trình duyệt/Node (Intl).
 * Dùng chung cho lá số Tử Vi và bản đồ sao chiêm tinh.
 *
 * Việt Nam có lịch sử múi giờ phức tạp (tzdata "Asia/Ho_Chi_Minh"):
 *   LMT +7:06:30 đến 1906, PLMT đến 1911, +07 đến cuối 1942, +08 (1943–3/1945), +09 (3–9/1945),
 *   +07 (9/1945–4/1947), +08 (4/1947–7/1955), +07 (7/1955–12/1959), +08 (1/1960–13/6/1975), +07 từ đó.
 * tzdata theo đồng hồ Sài Gòn. Giai đoạn 31/12/1959–13/6/1975 miền Bắc (Việt Nam Dân chủ Cộng hòa)
 * vẫn dùng +07, nên nơi sinh ở vĩ độ ≥ 17° Bắc được hiệu chỉnh về +07 trong đúng giai đoạn này.
 */

export interface BirthPlaceTz {
  lat: number;
  lon: number;
  /** Tên múi giờ IANA, vd "Asia/Ho_Chi_Minh". */
  tz: string;
  /** "VN" bật hiệu chỉnh miền Bắc 1960–1975 nêu trên. */
  country?: string;
}

export interface LocalDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export type LocalTimeStatus =
  /** Giờ địa phương hợp lệ, duy nhất. */
  | "ok"
  /** Giờ rơi vào khoảng bị nhảy qua khi chuyển sang giờ mùa hè (không tồn tại); đã dời theo độ lệch trước khi chuyển. */
  | "gap"
  /** Giờ lặp hai lần khi lùi đồng hồ; đã chọn lần thứ nhất (còn giờ mùa hè). */
  | "ambiguous";

export interface ResolvedBirthTime {
  /** Thời điểm UTC (mili giây Unix). */
  utcMs: number;
  /** Độ lệch so với UTC của giờ đồng hồ tại nơi sinh (phút, có thể lẻ giây với giờ địa phương trung bình LMT). */
  offsetMinutes: number;
  /** Độ lệch giờ chuẩn (không tính giờ mùa hè) của năm đó (phút). */
  standardOffsetMinutes: number;
  /** Phần giờ mùa hè đang áp dụng (phút, 0 nếu không). */
  dstMinutes: number;
  status: LocalTimeStatus;
  /** Có áp dụng hiệu chỉnh miền Bắc 1960–1975 hay không. */
  northVietnamAdjusted: boolean;
}

const MINUTE = 60_000;
const NORTH_FROM = Date.UTC(1959, 11, 31, 16, 0); // 00:00 1/1/1960 giờ +08
const NORTH_TO = Date.UTC(1975, 5, 12, 16, 0); // 00:00 13/6/1975 giờ +08

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function formatter(tz: string): Intl.DateTimeFormat {
  let f = formatterCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      era: "short",
    });
    formatterCache.set(tz, f);
  }
  return f;
}

/** Múi giờ IANA có hợp lệ trong môi trường hiện tại không. */
export function isValidTimeZone(tz: string): boolean {
  try {
    formatter(tz);
    return true;
  } catch {
    return false;
  }
}

/** Độ lệch (phút) của múi giờ IANA tại thời điểm UTC cho trước, theo dữ liệu Intl. */
export function ianaOffsetMinutes(tz: string, utcMs: number): number {
  const parts = formatter(tz).formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const bc = parts.find((p) => p.type === "era")?.value === "BC";
  const y = bc ? 1 - get("year") : get("year");
  const d = new Date(0);
  d.setUTCFullYear(y, get("month") - 1, get("day"));
  d.setUTCHours(get("hour"), get("minute"), get("second"), 0);
  // Intl làm tròn tới giây; mili giây của utcMs bị bỏ khi so sánh.
  return (d.getTime() - Math.floor(utcMs / 1000) * 1000) / MINUTE;
}

/** Độ lệch của nơi sinh tại một thời điểm UTC, kể cả hiệu chỉnh miền Bắc Việt Nam 1960–1975. */
export function placeOffsetMinutes(place: BirthPlaceTz, utcMs: number): { offset: number; northAdjusted: boolean } {
  if (place.country === "VN" && place.lat >= 17 && utcMs >= NORTH_FROM && utcMs < NORTH_TO) {
    return { offset: 420, northAdjusted: true };
  }
  return { offset: ianaOffsetMinutes(place.tz, utcMs), northAdjusted: false };
}

function localAsUtcMs(t: LocalDateTime): number {
  const d = new Date(0);
  d.setUTCFullYear(t.year, t.month - 1, t.day);
  d.setUTCHours(t.hour, t.minute, 0, 0);
  return d.getTime();
}

/**
 * Độ lệch giờ chuẩn (bỏ giờ mùa hè). Lấy mẫu độ lệch hằng tháng trong 12 tháng trước và 12 tháng sau:
 * nếu độ lệch nhỏ nhất xuất hiện ở CẢ hai phía (quy tắc lặp theo mùa) và nhỏ hơn độ lệch hiện hành thì đó là
 * giờ chuẩn. Việc đổi hẳn múi giờ (vd Việt Nam 13/6/1975) chỉ xuất hiện một phía nên không bị tính là giờ mùa hè.
 */
function standardOffset(place: BirthPlaceTz, utcMs: number, current: number): number {
  const month = 30.4 * 86_400_000;
  const before: number[] = [];
  const after: number[] = [];
  for (let i = 1; i <= 12; i++) {
    before.push(placeOffsetMinutes(place, utcMs - i * month).offset);
    after.push(placeOffsetMinutes(place, utcMs + i * month).offset);
  }
  const lo = Math.min(...before, ...after);
  const both = before.some((o) => Math.abs(o - lo) < 1 / 60) && after.some((o) => Math.abs(o - lo) < 1 / 60);
  if (both && lo < current && current - lo <= 120) return lo;
  return current;
}

/**
 * Giờ đồng hồ tại nơi sinh → thời điểm UTC.
 * Xử lý khoảng trống khi chuyển sang giờ mùa hè ("gap") và giờ lặp khi lùi đồng hồ ("ambiguous").
 */
export function resolveBirthTime(local: LocalDateTime, place: BirthPlaceTz): ResolvedBirthTime {
  const wall = localAsUtcMs(local);
  // Thử các độ lệch xung quanh thời điểm đó (±1 ngày) để tìm mọi nghiệm.
  const candidates = new Set<number>();
  for (const probe of [wall - 86_400_000, wall, wall + 86_400_000]) {
    candidates.add(placeOffsetMinutes(place, probe).offset);
    candidates.add(placeOffsetMinutes(place, probe - 12 * 3_600_000).offset);
  }
  const solutions: { utc: number; offset: number; north: boolean }[] = [];
  for (const off of candidates) {
    const utc = wall - off * MINUTE;
    const actual = placeOffsetMinutes(place, utc);
    if (Math.abs(actual.offset - off) < 1 / 60) solutions.push({ utc, offset: actual.offset, north: actual.northAdjusted });
  }
  solutions.sort((a, b) => a.utc - b.utc);
  let status: LocalTimeStatus = "ok";
  let chosen = solutions[0];
  if (solutions.length > 1) {
    status = "ambiguous";
  } else if (!chosen) {
    // Giờ không tồn tại: dùng độ lệch trước khi chuyển (giờ đồng hồ "chạy tiếp" theo giờ cũ).
    status = "gap";
    const before = placeOffsetMinutes(place, wall - 86_400_000);
    chosen = { utc: wall - before.offset * MINUTE, offset: before.offset, north: before.northAdjusted };
  }
  const std = standardOffset(place, chosen.utc, chosen.offset);
  return {
    utcMs: chosen.utc,
    offsetMinutes: chosen.offset,
    standardOffsetMinutes: std,
    dstMinutes: chosen.offset - std,
    status,
    northVietnamAdjusted: chosen.north,
  };
}

/** Thời điểm UTC → ngày giờ tại một độ lệch cố định (phút). */
export function utcToOffset(utcMs: number, offsetMinutes: number): LocalDateTime & { second: number } {
  const d = new Date(utcMs + offsetMinutes * MINUTE);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
  };
}

/** "+07:00", "−04:00", "+07:06:30". */
export function formatOffset(offsetMinutes: number): string {
  const sign = offsetMinutes < 0 ? "−" : "+";
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = Math.floor(abs % 60);
  const s = Math.round((abs * 60) % 60);
  const base = `${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  return s ? `${base}:${String(s).padStart(2, "0")}` : base;
}
