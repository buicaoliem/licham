/**
 * Khổng Minh Lục Diệu — 6 trạng thái ngày, lặp theo chu kỳ 6 ngày âm lịch.
 *
 * Nguồn: xonevn-ai/lunar-calendar (Dart)
 * Repo: https://github.com/xonevn-ai/lunar-calendar
 * Tệp nguồn: lib/core/models/luc_dieu.dart, lib/core/services/luc_dieu_calculator.dart
 * Giấy phép: MIT — Copyright (c) 2025 Thigio.com
 * Ngày lấy: 2026-09-16
 *
 * Ghi công theo yêu cầu giấy phép MIT: giữ nguyên thông báo bản quyền và giấy
 * phép gốc ở trên khi sử dụng lại dữ liệu này.
 *
 * Chỉ lấy tên trạng thái và tốt/xấu, không chép thơ và lời giải của nguồn.
 */

export interface KhongMinhEntry {
  name: string;
  isGood: boolean;
}

/** Thứ tự lặp lại theo (ngày âm lịch - 1) % 6, bắt đầu từ Đại An. */
export const KHONG_MINH_STATES: readonly KhongMinhEntry[] = [
  { name: "Đại An", isGood: true },
  { name: "Lưu Liên", isGood: false },
  { name: "Tốc Hỷ", isGood: true },
  { name: "Xích Khẩu", isGood: false },
  { name: "Tiểu Cát", isGood: true },
  { name: "Không Vong", isGood: false },
];

/** Trạng thái Khổng Minh lục diệu của một ngày âm lịch (1..30). */
export function khongMinhOfLunarDay(lunarDay: number): KhongMinhEntry {
  const index = (lunarDay - 1) % 6;
  return KHONG_MINH_STATES[index] as KhongMinhEntry;
}
