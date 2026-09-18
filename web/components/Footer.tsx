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
const buildTimeLabel = `${BUILD_TIME_FORMATTER.format(new Date())} (giờ Việt Nam)`;

export function Footer() {
  return (
    <footer className="foot">
      <Link href="/" className="foot-brand">
        <img src="/logo.svg" alt="" width={26} height={26} className="mk" aria-hidden="true" />
        <span>
          <span className="logo-ink">Lịch</span> <span className="logo-son">Âm</span>
        </span>
      </Link>
      <div className="footlinks">
        <Link href="/gioi-thieu">Giới thiệu</Link>
        <Link href="/lien-he">Liên hệ</Link>
        <Link href="/le">Ngày lễ</Link>
        <Link href="/tuoi">Xem tuổi</Link>
        <Link href="/dieu-khoan">Điều khoản</Link>
        <Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
      </div>
      <div className="foot-line">Miễn phí, không quảng cáo · Thông tin phong thủy mang tính tham khảo</div>
      <div className="foot-line">
        <a href="mailto:lienhe@licham.app">lienhe@licham.app</a> · Cập nhật {buildTimeLabel}
      </div>
    </footer>
  );
}
