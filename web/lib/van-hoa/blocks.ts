import { VAN_HOA_PUBLIC } from "./config";
import { NAM_SU_KIEN } from "./data/nam-su-kien";
import { NHAN_VAT } from "./data/nhan-vat";
import { SU_KIEN } from "./data/su-kien";
import { canChiYearOfEvent, eventsOfCanChi } from "./logic";
import type { NamSuKien, NhanVat, SuKien } from "./types";
import type { CanChi } from "@licham/core";

/**
 * Ba khối Văn hoá gắn vào trang ngày âm, trang tuổi, trang lễ chỉ hiện khi VAN_HOA_PUBLIC = true.
 * `VAN_HOA_FORCE_BLOCKS=1` chỉ có tác dụng khi chạy dev (không bao giờ ở bản production) — để chụp ảnh kiểm tra.
 */
export function vanHoaBlocksOn(): boolean {
  return VAN_HOA_PUBLIC || (process.env.NODE_ENV !== "production" && process.env.VAN_HOA_FORCE_BLOCKS === "1");
}

/** Sự kiện có ngày-tháng âm lịch trùng ngày này, tối đa `max` mục, xếp theo năm. */
export function suKienOfLunarDay(day: number, month: number, max = 3, list: readonly SuKien[] = SU_KIEN): SuKien[] {
  return list
    .filter((e) => e.lunar.day === day && e.lunar.month === month && !e.lunar.leap)
    .sort((a, b) => a.lunar.year - b.lunar.year)
    .slice(0, max);
}

/** Mốc lịch sử có ngày âm cụ thể trùng ngày này (mốc chỉ ghi tháng không vào), tối đa `max` mục, xếp theo năm. */
export function namEventsOfLunarDay(day: number, month: number, max = 3, list: readonly NamSuKien[] = NAM_SU_KIEN): NamSuKien[] {
  return list
    .filter((e) => e.lunarDay === day && e.lunarMonth === month && canChiYearOfEvent(e) !== null)
    .sort((a, b) => a.year - b.year)
    .slice(0, max);
}

/** Tối đa `max` mốc của các năm mang can chi này. */
export function namEventsOfCanChi(canChi: CanChi, max = 3, list: readonly NamSuKien[] = NAM_SU_KIEN): NamSuKien[] {
  return eventsOfCanChi(canChi, list).slice(0, max);
}

/** Nhân vật có lễ hội gắn với ngày lễ này; luôn lấy từ danh sách nhân vật thật nên trang đích đều tồn tại. */
export function nhanVatOfHoliday(leSlug: string, max = 3, list: readonly NhanVat[] = NHAN_VAT): NhanVat[] {
  return list.filter((n) => n.relatedHolidays?.includes(leSlug)).slice(0, max);
}

