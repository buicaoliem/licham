/**
 * Hỷ Thần và Tài Thần — hướng xuất hành tốt theo can ngày.
 *
 * Liêm xác nhận tháng 9/2026. Các nguồn mâu thuẫn ở 2 dòng Ất/Canh và Bính/Tân;
 * phân xử bằng ngày thật: mùng 1 Tết Bính Thân 08/02/2016 là ngày Canh Thân,
 * nguồn lịch Việt ghi Hỷ thần Tây Bắc và Tài thần Tây Nam.
 *
 * Không làm Hạc thần.
 */
import type { CanName } from "../canChi";

const HY_THAN_BY_CAN: Record<CanName, string> = {
  Giáp: "Đông Bắc",
  Kỷ: "Đông Bắc",
  Ất: "Tây Bắc",
  Canh: "Tây Bắc",
  Bính: "Tây Nam",
  Tân: "Tây Nam",
  Đinh: "Chính Nam",
  Nhâm: "Chính Nam",
  Mậu: "Đông Nam",
  Quý: "Đông Nam",
};

const TAI_THAN_BY_CAN: Record<CanName, string> = {
  Giáp: "Đông Nam",
  Ất: "Đông Nam",
  Bính: "Chính Đông",
  Đinh: "Chính Đông",
  Mậu: "Chính Bắc",
  Kỷ: "Chính Nam",
  Canh: "Tây Nam",
  Tân: "Tây Nam",
  Nhâm: "Chính Tây",
  Quý: "Tây Bắc",
};

/** Hướng Hỷ Thần của ngày, theo can ngày. */
export function hyThanOfCan(can: CanName): { direction: string } {
  return { direction: HY_THAN_BY_CAN[can] };
}

/** Hướng Tài Thần của ngày, theo can ngày. */
export function taiThanOfCan(can: CanName): { direction: string } {
  return { direction: TAI_THAN_BY_CAN[can] };
}
