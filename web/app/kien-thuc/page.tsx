import type { Metadata } from "next";
import Link from "next/link";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { KNOWLEDGE, knowledgeHref } from "@/lib/knowledge";

export const metadata: Metadata = {
  title: "Kiến thức lịch âm: âm lịch, can chi, tiết khí, giờ hoàng đạo | Lịch Âm",
  description:
    "Giải thích các thuật ngữ trên lịch âm dương: âm lịch, can chi, ngũ hành, tiết khí, giờ hoàng đạo, nhị thập bát tú, trực, sao tốt xấu và tháng nhuận.",
  alternates: { canonical: "/kien-thuc/" },
};

export default function KienThucHub() {
  return (
    <ChShell activeMenu={null} className="ch-page">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Kiến thức" }]}
        title="Kiến thức lịch âm"
        lead="Hiểu các thuật ngữ bạn gặp trên trang lịch"
      />
      <div className="ch-wrap ch-main ch-stack ch-page-body">
        <ul className="kt-grid">
          {KNOWLEDGE.map((k) => (
            <li key={k.slug}>
              <Link className="kt-card" href={knowledgeHref(k.slug)}>
                <b>{k.h1}</b>
                <span>{k.description}</span>
                <Icon name="arrow" size={16} className="go" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="ch-note">
          Muốn biết lịch được tính thế nào? Xem <Link href="/phuong-phap-tinh-lich/">phương pháp tính lịch</Link>.
        </p>
      </div>
    </ChShell>
  );
}
