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
      <Link href="/">LịchÂm</Link> — licham.app — miễn phí, không quảng cáo · Thông tin phong thủy mang tính tham khảo
      <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>Cập nhật lần cuối: {buildTimeLabel}</div>
    </footer>
  );
}
