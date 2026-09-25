import { monthHref } from "@/lib/calendar/urls";
import { getVietnamToday } from "@/lib/today";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";

const BASE_MENU = ["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Đổi ngày", "Ngày lễ", "Xem tuổi"] as const;

export type MenuItem = (typeof BASE_MENU)[number] | "Văn hoá";

/**
 * Menu chính của site (đầu trang Contemporary Heritage), theo đúng thứ tự hiển thị.
 * VAN_HOA_PUBLIC bật: bỏ "Đổi ngày" (chuyển xuống chân trang), thêm "Văn hoá" ở cuối.
 */
export function menuItems(vanHoaPublic: boolean = VAN_HOA_PUBLIC): readonly MenuItem[] {
  return vanHoaPublic ? [...BASE_MENU.filter((m) => m !== "Đổi ngày"), "Văn hoá"] : BASE_MENU;
}

export const MENU: readonly MenuItem[] = menuItems();

export function menuHref(item: MenuItem): string {
  switch (item) {
    case "Hôm nay":
      return "/";
    case "Lịch tháng": {
      const today = getVietnamToday();
      return monthHref(today.month, today.year);
    }
    case "Xem ngày tốt":
      return "/xem-ngay-tot/";
    case "Văn khấn":
      return "/van-khan/";
    case "Tử vi":
      return "/tu-vi/";
    case "Đổi ngày":
      return "/doi-ngay-am-duong/";
    case "Ngày lễ":
      return "/le/";
    case "Xem tuổi":
      return "/tuoi/";
    case "Văn hoá":
      return "/van-hoa/";
    default:
      return "/";
  }
}

const BUILD_TIME_FORMATTER = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

// Tính một lần khi trang được dựng — cùng thời điểm cho mọi trang trong một lần build.
export const buildTimeLabel = `${BUILD_TIME_FORMATTER.format(new Date())} (giờ Việt Nam)`;

/** Liên kết chân trang: nhóm giới thiệu/pháp lý và nhóm khám phá được tách trong ChShell. */
const BASE_FOOTER_LINKS: readonly { href: string; label: string }[] = [
  { href: "/gioi-thieu/", label: "Giới thiệu" },
  { href: "/lien-he/", label: "Liên hệ" },
  { href: "/le/", label: "Ngày lễ" },
  { href: "/anh-hung-dan-toc/", label: "Anh hùng dân tộc" },
  { href: "/cong-cu/", label: "Công cụ ngày tháng" },
  { href: "/tinh-tuoi/", label: "Tính tuổi" },
  { href: "/countdown/tet/", label: "Đếm ngược Tết" },
  { href: "/tuoi/", label: "Xem tuổi" },
  { href: "/ten/", label: "Đặt tên" },
  { href: "/tu-vi/", label: "Tử vi" },
  { href: "/la-so-tu-vi/", label: "Lá số Tử Vi" },
  { href: "/chiem-tinh/", label: "Bản đồ sao" },
  { href: "/dieu-khoan/", label: "Điều khoản" },
  { href: "/chinh-sach-bao-mat/", label: "Chính sách bảo mật" },
];

/** VAN_HOA_PUBLIC bật: "Đổi ngày" rời menu chính nên có liên kết ở chân trang (sau "Công cụ ngày tháng"). */
export function footerLinks(vanHoaPublic: boolean = VAN_HOA_PUBLIC): readonly { href: string; label: string }[] {
  if (!vanHoaPublic) return BASE_FOOTER_LINKS;
  const i = BASE_FOOTER_LINKS.findIndex((l) => l.href === "/cong-cu/");
  return [...BASE_FOOTER_LINKS.slice(0, i + 1), { href: "/doi-ngay-am-duong/", label: "Đổi ngày" }, ...BASE_FOOTER_LINKS.slice(i + 1)];
}

export const FOOTER_LINKS = footerLinks();
