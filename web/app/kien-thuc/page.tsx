import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KNOWLEDGE, knowledgeHref } from "@/lib/knowledge";

export const metadata: Metadata = {
  title: "Kiến thức lịch âm: âm lịch, can chi, tiết khí, giờ hoàng đạo | Lịch Âm",
  description: "Giải thích các thuật ngữ trên lịch âm dương: âm lịch, can chi, ngũ hành, tiết khí, giờ hoàng đạo, nhị thập bát tú, trực, sao tốt xấu và tháng nhuận.",
  alternates: { canonical: "/kien-thuc/" },
};

export default function KienThucHub() {
  return (
    <div className="outer">
      <div className="site">
        <Header />
        <div className="band">
          <div className="bg bg-kim" />
          <div className="band-in">
            <h1>Kiến thức lịch âm</h1>
            <p>Hiểu các thuật ngữ bạn gặp trên trang lịch</p>
          </div>
        </div>
        <div className="body">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Kiến thức" }]} />
          <ul className="kt-list">
            {KNOWLEDGE.map((k) => (
              <li key={k.slug}>
                <Link href={knowledgeHref(k.slug)}>
                  <b>{k.h1}</b>
                  <span>{k.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="srcnote">
            Muốn biết lịch được tính thế nào? Xem <Link href="/phuong-phap-tinh-lich/">phương pháp tính lịch</Link>.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
