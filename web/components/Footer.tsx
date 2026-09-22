import Link from "next/link";

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

export function Footer() {
  return (
    <footer className="foot">
      <Link href="/" className="foot-brand">
        <img src="/logo.svg" alt="" width={60} height={60} className="mk" aria-hidden="true" />
        <span>
          <span className="logo-ink">Lịch</span> <span className="logo-son">Âm</span>
        </span>
      </Link>
      <div className="footlinks">
        {FOOTER_LINKS.map((l) => (
          <Link href={l.href} key={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="foot-line">Miễn phí, không quảng cáo · Thông tin phong thủy mang tính tham khảo</div>
      <div className="foot-line">
        <a href="mailto:lienhe@licham.app">Lienhe@licham.app</a> · Cập nhật {buildTimeLabel}
      </div>
    </footer>
  );
}
