import type { Metadata } from "next";
import { ChHero, ChShell } from "@/components/heritage/ChShell";

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
    <ChShell activeMenu={null} className="ch-page">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Chính sách bảo mật" }]}
        crumbJsonLd={false}
        title="Chính sách bảo mật"
        lead="Cách licham.app xử lý dữ liệu người xem"
      />

      <div className="ch-wrap ch-main ch-stack ch-page-body">
        <article className="ch-card ch-prose">
          <ul className="dotlist">
            <li>Trang không yêu cầu đăng ký, không thu thập tên, email hay số điện thoại của người xem.</li>
            <li>Trang không cài công cụ thống kê hay mã quảng cáo của bên thứ ba.</li>
            <li>
              Máy chủ lưu trữ (Vercel) có thể ghi nhật ký kỹ thuật thông thường như địa chỉ IP và loại trình duyệt để
              vận hành và chống tấn công.
            </li>
            <li>
              Trang không đặt cookie theo dõi. Nếu sau này có thay đổi, chính sách này sẽ được cập nhật và ghi rõ ngày
              thay đổi.
            </li>
          </ul>

          <p>
            Nếu có thắc mắc về dữ liệu, vui lòng liên hệ <a href="mailto:lienhe@licham.app">Lienhe@licham.app</a>.
          </p>

          <p className="ch-prose-meta">Cập nhật lần cuối: {buildDateLabel}</p>
        </article>
      </div>
    </ChShell>
  );
}
