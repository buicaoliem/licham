import type { Metadata } from "next";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { LcFaq, LcRelated } from "@/components/lich/LichParts";
import { TinhTuoiForm } from "@/components/TinhTuoiForm";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { getVietnamToday } from "@/lib/today";

export async function generateMetadata(): Promise<Metadata> {
  const year = getVietnamToday().year;
  return {
    title: `Tính tuổi dương và tuổi mụ ${year} | Lịch Âm`,
    description:
      "Tính tuổi dương chính xác theo ngày sinh, tuổi mụ theo Tết, can chi, con giáp và ngày sinh nhật tới. Mệnh nạp âm theo năm can chi, không gán một mệnh cho cả con giáp.",
    alternates: { canonical: "/tinh-tuoi/" },
  };
}

const FAQ = [
  {
    q: "Tuổi mụ khác tuổi dương thế nào?",
    a: "Tuổi dương đếm theo ngày sinh thật. Tuổi mụ = năm âm hiện tại trừ năm âm lúc sinh, cộng 1. Vì Tết dao động từ cuối tháng 1 đến giữa tháng 2 dương lịch, hai cách tính có thể lệch 1–2 tuổi.",
  },
  {
    q: "Mệnh ngũ hành lấy theo con giáp hay theo năm?",
    a: "Theo năm can chi (nạp âm), không theo con giáp. Tuổi Tý năm Giáp Tý khác mệnh tuổi Tý năm Canh Tý.",
  },
  {
    q: "Sinh ngày 29/2 thì sinh nhật năm không nhuận tính ra sao?",
    a: "Lấy 28/2 năm không nhuận; năm nhuận kế tiếp lại là 29/2.",
  },
] as const;

export default function TinhTuoiPage() {
  const today = getVietnamToday();
  const year = today.year;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu ch-tt">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem tuổi", href: "/tuoi/" }, { label: `Tính tuổi ${year}` }]}
        crumbJsonLd={false}
        title="Tính tuổi dương và tuổi mụ"
        lead="Tuổi dương theo ngày sinh nhật. Tuổi mụ cộng 1 từ lúc sinh và tăng thêm 1 vào mỗi Tết. Can chi lấy đúng năm âm của ngày sinh, kể cả khi sinh trước Nguyên đán."
      />

      <div className="ch-wrap ch-main ch-stack">
        <TinhTuoiForm initial={today} />
        <TraditionalDisclaimer />

        <LcFaq
          items={[
            {
              q: "Tuổi mụ khác tuổi dương thế nào?",
              a: "Tuổi dương đếm theo ngày sinh thật. Tuổi mụ = năm âm hiện tại trừ năm âm lúc sinh, cộng 1. Vì Tết dao động từ cuối tháng 1 đến giữa tháng 2 dương lịch, hai cách tính có thể lệch 1–2 tuổi.",
            },
            {
              q: "Mệnh ngũ hành lấy theo con giáp hay theo năm?",
              a: "Theo năm can chi (nạp âm), không theo con giáp. Tuổi Tý năm Giáp Tý khác mệnh tuổi Tý năm Canh Tý. Trang sinh năm và trang 60 hoa giáp ghi đúng từng năm.",
            },
            { q: "Sinh ngày 29/2 thì sinh nhật năm không nhuận tính ra sao?", a: "Lấy 28/2 năm không nhuận; năm nhuận kế tiếp lại là 29/2." },
          ]}
        />

        <LcRelated
          title="Có thể anh cần"
          links={[
            { label: "Sinh năm 1990", href: "/sinh-nam/1990/" },
            { label: "Xem ngày tốt cưới hỏi", href: "/xem-ngay-tot/cuoi-hoi/" },
            { label: "Xung tuổi", href: "/phong-thuy/xung-tuoi/" },
            { label: "Tuổi xây nhà", href: "/phong-thuy/xem-tuoi-xay-nha/" },
            { label: "12 con giáp", href: "/tuoi/" },
            { label: "Đặt tên con", href: "/ten/" },
            { label: "Tử vi", href: "/tu-vi/" },
          ]}
        />
      </div>
    </ChShell>
  );
}
