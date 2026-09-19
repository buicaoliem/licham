import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
  const year = getVietnamToday().year;
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
    <div className="outer">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="tuoiband">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <Link href="/tuoi">Xem tuổi</Link> › Tính tuổi {year}
          </div>
          <h1>Tính tuổi dương và tuổi mụ</h1>
          <p className="sub">
            Tuổi dương theo ngày sinh nhật. Tuổi mụ cộng 1 từ lúc sinh và tăng thêm 1 vào mỗi Tết. Can chi lấy đúng năm âm
            của ngày sinh, kể cả khi sinh trước Nguyên đán.
          </p>
        </div>

        <div className="body">
          <TinhTuoiForm />
          <TraditionalDisclaimer />

          <div style={{ marginTop: 32 }}>
            <h2 className="hh">Câu hỏi thường gặp</h2>
            <div className="box faqs">
              <div className="faq">
                <b>Tuổi mụ khác tuổi dương thế nào?</b>
                <p>
                  Tuổi dương đếm theo ngày sinh thật. Tuổi mụ = năm âm hiện tại trừ năm âm lúc sinh, cộng 1. Vì Tết dao
                  động từ cuối tháng 1 đến giữa tháng 2 dương lịch, hai cách tính có thể lệch 1–2 tuổi.
                </p>
              </div>
              <div className="faq">
                <b>Mệnh ngũ hành lấy theo con giáp hay theo năm?</b>
                <p>
                  Theo năm can chi (nạp âm), không theo con giáp. Tuổi Tý năm Giáp Tý khác mệnh tuổi Tý năm Canh Tý. Trang
                  sinh năm và trang 60 hoa giáp ghi đúng từng năm.
                </p>
              </div>
              <div className="faq">
                <b>Sinh ngày 29/2 thì sinh nhật năm không nhuận tính ra sao?</b>
                <p>Lấy 28/2 năm không nhuận; năm nhuận kế tiếp lại là 29/2.</p>
              </div>
            </div>
          </div>

          <h2 className="hh" style={{ marginTop: 32 }}>
            Có thể anh cần
          </h2>
          <div className="chips">
            <Link className="chip" href="/sinh-nam/1990">
              Sinh năm 1990
            </Link>
            <Link className="chip" href="/xem-ngay-tot/cuoi-hoi">
              Xem ngày tốt cưới hỏi
            </Link>
            <Link className="chip" href="/phong-thuy/xung-tuoi">
              Xung tuổi
            </Link>
            <Link className="chip" href="/phong-thuy/xem-tuoi-xay-nha">
              Tuổi xây nhà
            </Link>
            <Link className="chip" href="/tuoi">
              12 con giáp
            </Link>
            <Link className="chip" href="/ten">
              Đặt tên con
            </Link>
            <Link className="chip" href="/tu-vi">
              Tử vi
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
