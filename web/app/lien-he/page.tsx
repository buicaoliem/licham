import type { Metadata } from "next";
import { ChHero, ChShell } from "@/components/heritage/ChShell";

export const metadata: Metadata = {
  title: "Liên hệ | Lịch Âm",
  description: "Liên hệ với licham.app để báo lỗi, góp ý nội dung hoặc hợp tác.",
  alternates: { canonical: "/lien-he/" },
};

export default function LienHePage() {
  return (
    <ChShell activeMenu={null} className="ch-page">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
        crumbJsonLd={false}
        title="Liên hệ"
        lead="Góp ý, báo lỗi hoặc đề nghị bổ sung nội dung cho licham.app"
      />

      <div className="ch-wrap ch-main ch-stack ch-page-body">
        <article className="ch-card ch-prose">
          <h2>Gửi cho chúng tôi</h2>
          <ul className="dotlist">
            <li>Báo sai ngày tháng hoặc thông tin trên trang</li>
            <li>Đề nghị thêm bài văn khấn hoặc ngày lễ còn thiếu</li>
            <li>Báo lỗi hiển thị</li>
            <li>Hợp tác nội dung</li>
          </ul>
          <p>
            Mọi góp ý xin gửi về <a href="mailto:lienhe@licham.app">Lienhe@licham.app</a>
          </p>
          <p className="ch-prose-meta">Chúng tôi phản hồi trong vòng vài ngày làm việc.</p>
        </article>
      </div>
    </ChShell>
  );
}
