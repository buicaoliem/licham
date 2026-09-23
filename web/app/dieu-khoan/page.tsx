import type { Metadata } from "next";
import { ChHero, ChShell } from "@/components/heritage/ChShell";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | Lịch Âm",
  description: "Điều khoản sử dụng nội dung trên licham.app.",
  alternates: { canonical: "/dieu-khoan/" },
};

export default function DieuKhoanPage() {
  return (
    <ChShell activeMenu={null} className="ch-page">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Điều khoản sử dụng" }]}
        crumbJsonLd={false}
        title="Điều khoản sử dụng"
        lead="Những điều cần biết khi dùng nội dung của licham.app"
      />

      <div className="ch-wrap ch-main ch-stack ch-page-body">
        <article className="ch-card ch-prose">
          <ul className="dotlist">
            <li>Nội dung trên trang được cung cấp miễn phí cho mục đích tham khảo cá nhân.</li>
            <li>
              Các thông tin về phong thủy, ngày tốt xấu, tử vi mang tính tín ngưỡng dân gian, chỉ để tham khảo. Người
              dùng tự chịu trách nhiệm với các quyết định của mình; licham.app không chịu trách nhiệm cho bất kỳ thiệt
              hại nào phát sinh từ việc sử dụng thông tin trên trang.
            </li>
            <li>
              Không sao chép hàng loạt nội dung của trang để đăng lại trên trang khác. Khi trích dẫn, vui lòng ghi rõ
              nguồn licham.app.
            </li>
          </ul>

          <p>
            Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ{" "}
            <a href="mailto:lienhe@licham.app">Lienhe@licham.app</a>.
          </p>
        </article>
      </div>
    </ChShell>
  );
}
