/**
 * Lý Thuần Phong — trạng thái tốt/xấu của 12 khung giờ trong ngày.
 *
 * Công thức lấy từ 5 nguồn độc lập trùng khớp, nhưng CHƯA đối chiếu được với
 * ngày thật. Xem bảng trong verify-ltp.md.
 *
 * Chỉ lưu tên trạng thái và tốt/xấu. Không chép thơ, không chép lời giải.
 */

export interface LyThuanPhongEntry {
  /** 0..11, 0 = giờ Tý. */
  chiIndex: number;
  name: string;
  isGood: boolean;
}

/** Trạng thái theo số dư của công thức, dư 0..5 (dư 0 = Tuyệt Lộ). */
const STATES_BY_REMAINDER: readonly { name: string; isGood: boolean }[] = [
  { name: "Tuyệt Lộ", isGood: false }, // dư 0
  { name: "Đại An", isGood: true }, // dư 1
  { name: "Tốc Hỷ", isGood: true }, // dư 2
  { name: "Lưu Niên", isGood: false }, // dư 3
  { name: "Xích Khẩu", isGood: false }, // dư 4
  { name: "Tiểu Cát", isGood: true }, // dư 5
];

const mod = (n: number, m: number): number => ((n % m) + m) % m;

/** Số khắc (1..6) của khung giờ có chi index đã cho (0 = Tý). */
function khacOfHour(chiIndex: number): number {
  return mod(chiIndex, 6) + 1;
}

/** Trạng thái Lý Thuần Phong của một khung giờ, theo ngày và tháng âm lịch. */
export function lyThuanPhongOfHour(lunarDay: number, lunarMonth: number, chiIndex: number): LyThuanPhongEntry {
  const khac = khacOfHour(chiIndex);
  const remainder = mod(lunarDay + lunarMonth + khac - 2, 6);
  const state = STATES_BY_REMAINDER[remainder]!;
  return { chiIndex, name: state.name, isGood: state.isGood };
}

/** Trạng thái Lý Thuần Phong của cả 12 khung giờ trong ngày, bắt đầu từ giờ Tý. */
export function lyThuanPhongOfDay(lunarDay: number, lunarMonth: number): LyThuanPhongEntry[] {
  return Array.from({ length: 12 }, (_, chiIndex) => lyThuanPhongOfHour(lunarDay, lunarMonth, chiIndex));
}
