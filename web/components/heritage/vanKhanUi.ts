import type { VanKhanNhom } from "@/lib/van-khan";
import type { IconName } from "./Icon";

/** Icon đại diện cho từng nhóm văn khấn (dùng chung server/client). */
export const NHOM_ICON: Record<VanKhanNhom, IconName> = {
  "Trong nhà": "home",
  "Lễ tết": "lotus",
  "Việc lớn": "calendar",
  "Cầu an": "heart",
  "Đi lễ": "temple",
};

export function khongDau(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();
}

/** id neo của khối nhóm trên trang danh mục, ví dụ "nhom-trong-nha". */
export function nhomAnchor(nhom: string): string {
  return `nhom-${khongDau(nhom).replace(/\s+/g, "-")}`;
}
