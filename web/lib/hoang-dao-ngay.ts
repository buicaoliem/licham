/**
 * Ngày hoàng đạo/hắc đạo theo phân loại 12 trực, dựa trên bảng trực trong
 * nguồn xonevn-ai/lunar-calendar (lib/core/constants.dart, MIT — Copyright
 * (c) 2025 Thigio.com), cùng bảng đã dùng trong core/scripts/compare.ts:
 * Trừ, Định, Chấp, Thành, Khai, Bế là hoàng đạo; Kiến, Mãn, Bình, Phá, Nguy,
 * Thu là hắc đạo.
 */
const TRUC_HOANG_DAO = new Set(["Trừ", "Định", "Chấp", "Thành", "Khai", "Bế"]);

export function isTrucHoangDao(trucName: string): boolean {
  return TRUC_HOANG_DAO.has(trucName);
}
