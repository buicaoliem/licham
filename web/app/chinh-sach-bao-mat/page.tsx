import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | Lịch Âm",
  description: "Chính sách bảo mật của licham.app: không thu thập thông tin cá nhân, không dùng cookie theo dõi.",
  alternates: { canonical: "/chinh-sach-bao-mat/" },
};

const BUILD_DATE_FORMATTER = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const buildDateLabel = BUILD_DATE_FORMATTER.format(new Date());

export default function ChinhSachBaoMatPage() {
  return (
    <div className="outer">
      <div className="site">
        <Header />

        <div className="band">
          <div className="bg bg-lam" />
          <div className="band-in">
            <h1>Chính sách bảo mật</h1>
            <p>Cách licham.app xử lý dữ liệu người xem</p>
          </div>
        </div>

        <div className="body">
          <div className="prose">
            <ul className="dotlist">
              <li>Trang không yêu cầu đăng ký, không thu thập tên, email hay số điện thoại của người xem.</li>
              <li>Trang không cài công cụ thống kê hay mã quảng cáo của bên thứ ba.</li>
              <li>
                Máy chủ lưu trữ (Vercel) có thể ghi nhật ký kỹ thuật thông thường như địa chỉ IP và loại trình duyệt
                để vận hành và chống tấn công.
              </li>
              <li>
                Trang không đặt cookie theo dõi. Nếu sau này có thay đổi, chính sách này sẽ được cập nhật và ghi rõ
                ngày thay đổi.
              </li>
            </ul>

            <p style={{ marginTop: 18 }}>
              Nếu có thắc mắc về dữ liệu, vui lòng liên hệ <a href="mailto:lienhe@licham.app">lienhe@licham.app</a>.
            </p>

            <p style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 24, textAlign: "center" }}>
              Cập nhật lần cuối: {buildDateLabel}
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
