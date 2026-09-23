import { monthHref } from "@/lib/calendar/urls";
import { getVietnamToday } from "@/lib/today";

/** Menu chính của site (đầu trang Contemporary Heritage), theo đúng thứ tự hiển thị. */
export const MENU = ["Hôm nay", "Lịch tháng", "Xem ngày tốt", "Văn khấn", "Tử vi", "Đổi ngày", "Ngày lễ", "Xem tuổi"] as const;

export type MenuItem = (typeof MENU)[number];

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
export const FOOTER_LINKS: readonly { href: string; label: string }[] = [
  { href: "/gioi-thieu/", label: "Giới thiệu" },
  { href: "/lien-he/", label: "Liên hệ" },
  { href: "/le/", label: "Ngày lễ" },
  { href: "/cong-cu/", label: "Công cụ ngày tháng" },
  { href: "/tinh-tuoi/", label: "Tính tuổi" },
  { href: "/countdown/tet/", label: "Đếm ngược Tết" },
  { href: "/tuoi/", label: "Xem tuổi" },
  { href: "/ten/", label: "Đặt tên" },
  { href: "/tu-vi/", label: "Tử vi" },
  { href: "/dieu-khoan/", label: "Điều khoản" },
  { href: "/chinh-sach-bao-mat/", label: "Chính sách bảo mật" },
];
