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
      <div>
        <Link href="/">LịchÂm</Link> — licham.app — miễn phí, không quảng cáo · Thông tin phong thủy mang tính tham khảo
      </div>
      <div className="footlinks">
        <Link href="/gioi-thieu">Giới thiệu</Link>
        <span>·</span>
        <Link href="/lien-he">Liên hệ</Link>
        <span>·</span>
        <Link href="/le">Ngày lễ</Link>
        <span>·</span>
        <Link href="/dieu-khoan">Điều khoản</Link>
        <span>·</span>
        <Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
      </div>
      <div style={{ marginTop: 6 }}>
        <a href="mailto:lienhe@licham.app">Liên hệ: lienhe@licham.app</a>
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>Cập nhật lần cuối: {buildTimeLabel}</div>
    </footer>
  );
}
