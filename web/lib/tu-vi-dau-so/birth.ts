/**
 * Chuẩn hóa ngày giờ sinh cho lá số Tử Vi.
 *
 * Quy ước (ghi rõ trên trang):
 *  1. Giờ đồng hồ tại nơi sinh được đổi ra UTC theo dữ liệu múi giờ IANA (xem lib/birth/time.ts).
 *  2. Sinh ở Việt Nam: quy về giờ chuẩn UTC+7 — múi giờ mà lịch âm Việt Nam dùng. Vì vậy người sinh ở miền Nam
 *     1960–13/6/1975 (đồng hồ UTC+8) được lùi 1 giờ; sinh ở miền Bắc cùng thời kỳ giữ nguyên.
 *     Sinh ở nước ngoài: dùng giờ chuẩn địa phương (bỏ giờ mùa hè), ngày âm lịch vẫn tra theo lịch Việt Nam.
 *  3. Canh giờ: Tý 23:00–00:59, Sửu 01:00–02:59 … Hợi 21:00–22:59.
 *     Sinh từ 23:00 trở đi thuộc giờ Tý của NGÀY HÔM SAU (ngày âm lịch cũng sang ngày mới).
 *  4. Năm tính từ Tết Nguyên đán (không lấy tiết Lập Xuân).
 *  5. Tháng nhuận an như tháng chính (vd sinh tháng 4 nhuận an như tháng 4).
 *  Không hiệu chỉnh giờ mặt trời thực (kinh độ, phương trình thời gian).
 */
import { type SolarDate, isValidSolarDate, lunarToSolar, MAX_YEAR, MIN_YEAR, solarToLunar } from "@licham/core";
import { type BirthPlaceTz, type ResolvedBirthTime, formatOffset, resolveBirthTime, utcToOffset } from "@/lib/birth/time";
import { type GioiTinh, LaSoInputError, type LunarBirth } from "./engine";

export interface TuViBirthInput {
  lich: "duong" | "am";
  year: number;
  month: number;
  day: number;
  /** Chỉ dùng khi lich = "am". */
  isLeapMonth?: boolean;
  hour: number;
  minute: number;
  place: BirthPlaceTz;
  gioiTinh: GioiTinh;
}

export interface NgaySinhChuanHoa {
  lunar: LunarBirth;
  /** Ngày dương lịch theo lịch dân sự tại nơi sinh (ngày ghi trên giấy tờ). */
  solarCivil: SolarDate;
  /** Ngày giờ dùng để an sao (sau khi quy giờ chuẩn), trước khi xét giờ Tý muộn. */
  gioTuVi: { year: number; month: number; day: number; hour: number; minute: number; offsetMinutes: number };
  /** Ngày dương lịch ứng với ngày âm dùng để an sao (khác solarCivil khi sinh sau 23:00 hoặc khi quy giờ làm đổi ngày). */
  solarTuVi: SolarDate;
  resolved: ResolvedBirthTime;
  /** Các điều chỉnh đã áp dụng, để hiển thị cho người dùng. */
  ghiChu: string[];
}

function addDays(d: SolarDate, n: number): SolarDate {
  const t = new Date(0);
  t.setUTCFullYear(d.year, d.month - 1, d.day + n);
  return { year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() };
}

const fmt = (d: SolarDate) => `${String(d.day).padStart(2, "0")}/${String(d.month).padStart(2, "0")}/${d.year}`;

/** Canh giờ (0 = Tý) của giờ đồng hồ 0..23. */
export function hourToChi(hour: number): number {
  return Math.floor((hour + 1) / 2) % 12;
}

export function chuanHoaNgaySinh(input: TuViBirthInput): NgaySinhChuanHoa {
  const { hour, minute } = input;
  if (!Number.isInteger(hour) || hour < 0 || hour > 23 || !Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new LaSoInputError("Giờ sinh không hợp lệ (00:00–23:59).");
  }
  if (!Number.isInteger(input.year) || input.year < MIN_YEAR || input.year > MAX_YEAR) {
    throw new LaSoInputError(`Năm sinh cần trong khoảng ${MIN_YEAR}–${MAX_YEAR}.`);
  }
  const ghiChu: string[] = [];
  let civil: SolarDate;
  if (input.lich === "am") {
    try {
      civil = lunarToSolar(input.day, input.month, input.year, input.isLeapMonth ?? false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (/no leap month/.test(msg)) throw new LaSoInputError(`Năm âm lịch ${input.year} không có tháng ${input.month} nhuận.`);
      if (/has only/.test(msg)) throw new LaSoInputError(`Tháng ${input.month}${input.isLeapMonth ? " nhuận" : ""} âm lịch năm ${input.year} chỉ có 29 ngày.`);
      throw new LaSoInputError("Ngày âm lịch không hợp lệ hoặc nằm ngoài khoảng 1900–2100.");
    }
  } else {
    if (!isValidSolarDate(input.day, input.month, input.year)) throw new LaSoInputError("Ngày dương lịch không hợp lệ.");
    civil = { year: input.year, month: input.month, day: input.day };
  }

  const resolved = resolveBirthTime({ ...civil, hour, minute }, input.place);
  if (resolved.status === "gap") ghiChu.push("Giờ đã nhập không tồn tại ở nơi sinh (đúng lúc chuyển sang giờ mùa hè); đã tính theo độ lệch trước khi chuyển.");
  if (resolved.status === "ambiguous") ghiChu.push("Giờ đã nhập lặp hai lần ở nơi sinh (lúc lùi đồng hồ); đã chọn lần thứ nhất, còn giờ mùa hè.");

  const inVietnam = input.place.country === "VN";
  const offset = inVietnam ? 420 : resolved.standardOffsetMinutes;
  if (inVietnam && Math.abs(resolved.offsetMinutes - 420) > 1 / 60) {
    ghiChu.push(`Đồng hồ ở nơi sinh khi đó theo UTC${formatOffset(resolved.offsetMinutes)}; đã quy về giờ chuẩn Việt Nam UTC+07:00 để an sao.`);
  }
  if (resolved.northVietnamAdjusted) ghiChu.push("Sinh ở miền Bắc giai đoạn 1960–1975: dùng UTC+07:00 (miền Nam khi đó dùng UTC+08:00).");
  if (!inVietnam && resolved.dstMinutes !== 0) {
    ghiChu.push(`Đã bỏ ${resolved.dstMinutes} phút giờ mùa hè, dùng giờ chuẩn địa phương UTC${formatOffset(offset)}.`);
  }

  const t = utcToOffset(resolved.utcMs, offset);
  const tDate: SolarDate = { year: t.year, month: t.month, day: t.day };
  const hourChi = hourToChi(t.hour);
  const solarTuVi = t.hour === 23 ? addDays(tDate, 1) : tDate;
  if (t.hour === 23) ghiChu.push(`Sinh sau 23:00 là giờ Tý của ngày hôm sau: an sao theo ngày ${fmt(solarTuVi)} dương lịch.`);
  else if (fmt(tDate) !== fmt(civil)) ghiChu.push(`Sau khi quy giờ, ngày dùng để an sao là ${fmt(tDate)} dương lịch.`);

  let l;
  try {
    l = solarToLunar(solarTuVi.day, solarTuVi.month, solarTuVi.year);
  } catch {
    throw new LaSoInputError("Ngày sinh nằm ngoài khoảng lịch hỗ trợ (1900–2100).");
  }
  if (l.isLeapMonth) ghiChu.push(`Sinh tháng ${l.month} nhuận: an sao như tháng ${l.month} (quy ước Nam phái phổ biến).`);

  return {
    lunar: { year: l.year, month: l.month, day: l.day, isLeapMonth: l.isLeapMonth, hourChi },
    solarCivil: civil,
    gioTuVi: { year: t.year, month: t.month, day: t.day, hour: t.hour, minute: t.minute, offsetMinutes: offset },
    solarTuVi,
    resolved,
    ghiChu,
  };
}
