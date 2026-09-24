import type { Metadata } from "next";
import { ChHero, ChSectionHead, ChShell } from "@/components/heritage/ChShell";
import { LcFaq, LcRelated } from "@/components/lich/LichParts";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { LaSoApp } from "@/components/tu-vi-dau-so/LaSoApp";
import { getVietnamToday } from "@/lib/today";
import "../la-so.css";

export const metadata: Metadata = {
  title: "Lập lá số Tử Vi Đẩu Số online — sa bàn 12 cung, vận hạn | Lịch Âm",
  description:
    "Lập lá số Tử Vi theo Nam phái: an 14 chính tinh, phụ tinh, Tứ Hóa, vòng Tràng Sinh, Bác Sĩ, Thái Tuế, đại hạn, tiểu hạn và sao lưu. Tự quy giờ sinh theo múi giờ lịch sử Việt Nam, giờ Tý, tháng nhuận.",
  alternates: { canonical: "/la-so-tu-vi/" },
};

const FAQ = [
  {
    q: "Lá số ở đây an sao theo trường phái nào?",
    a: "Nam phái — hệ thống phổ biến ở Việt Nam, theo sách Tử Vi Đẩu Số Tân Biên của Thái Thứ Lang. Những chỗ Nam phái khác sách Trung Hoa (Hỏa Tinh, Linh Tinh; Khôi Việt năm Canh; Tứ Hóa năm Nhâm; Thiên Quý) được ghi rõ, không trộn hai cách.",
  },
  {
    q: "Sinh sau 23 giờ thì tính ngày nào?",
    a: "Từ 23:00 là giờ Tý của ngày hôm sau, nên cả ngày âm lịch cũng sang ngày mới. Ví dụ sinh 23:30 đêm giao thừa là giờ Tý mùng 1 Tết, tuổi năm mới.",
  },
  {
    q: "Sinh ở miền Nam trước năm 1975 có phải trừ giờ không?",
    a: "Có. Từ 1/1/1960 đến 13/6/1975 đồng hồ ở miền Nam chạy theo UTC+8, nhanh hơn giờ chuẩn Việt Nam 1 tiếng. Lá số tự quy về UTC+7 khi bạn chọn nơi sinh ở miền Nam; miền Bắc cùng thời kỳ giữ nguyên.",
  },
  {
    q: "Sinh tháng nhuận an sao thế nào?",
    a: "An như tháng chính (sinh tháng 4 nhuận an như tháng 4). Đây là cách phổ biến; một số sách chia đôi tháng nhuận ở ngày 15 — trang không trộn cách này.",
  },
  {
    q: "Vì sao cần giờ sinh chính xác?",
    a: "Cung Mệnh, Thân, cục và phần lớn phụ tinh phụ thuộc canh giờ. Sinh sát ranh hai canh giờ (vd 12:55) nên lập cả hai lá số để so sánh.",
  },
];

export default function LaSoTuViPage() {
  const nam = getVietnamToday().year;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <ChShell activeMenu="Tử vi" className="ch-tu ch-ls">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tử vi", href: "/tu-vi/" }, { label: "Lập lá số Tử Vi" }]}
        crumbJsonLd={false}
        eyebrow="Tử Vi Đẩu Số · Nam phái"
        title="Lập lá số Tử Vi"
        lead="Sa bàn 12 cung với chính tinh, phụ tinh, Tứ Hóa và các vòng sao; đại hạn, tiểu hạn, sao lưu theo năm. Vị trí sao được kiểm chứng tự động với một thư viện độc lập; phần giải nghĩa là tri thức truyền thống để tham khảo."
      />

      <div className="ch-wrap ch-main ch-stack">
        <LaSoApp namHienTai={nam} />

        <section className="ch-card ls-method" aria-labelledby="ls-method-h">
          <ChSectionHead id="ls-method-h" title="Cách tính và quy ước" sub="Những lựa chọn khi có nhiều cách an sao — được áp dụng nhất quán cho mọi lá số." />
          <div className="ls-method-grid">
            <div>
              <h3>Ngày giờ sinh</h3>
              <ul>
                <li>Giờ đồng hồ tại nơi sinh được đổi theo dữ liệu múi giờ IANA (gồm lịch sử múi giờ Việt Nam 1906–1975 và giờ mùa hè ở nước ngoài).</li>
                <li>Sinh ở Việt Nam: quy về giờ chuẩn UTC+7. Sinh ở nước ngoài: giờ chuẩn địa phương, bỏ giờ mùa hè.</li>
                <li>Canh giờ: Tý 23:00–00:59 … Hợi 21:00–22:59. Từ 23:00 tính sang ngày hôm sau.</li>
                <li>Ngày âm lịch theo lịch Việt Nam (thuật toán Hồ Ngọc Đức, UTC+7). Năm tính từ Tết, không từ Lập Xuân.</li>
                <li>Tháng nhuận an như tháng chính. Không hiệu chỉnh giờ mặt trời thực.</li>
              </ul>
            </div>
            <div>
              <h3>An sao (Nam phái)</h3>
              <ul>
                <li>Mệnh, Thân từ Dần theo tháng và giờ; can cung theo Ngũ Hổ Độn; cục theo nạp âm can chi cung Mệnh.</li>
                <li>14 chính tinh theo cục và ngày; Tứ Hóa theo can năm (Nhâm: Thiên Phủ hóa Khoa).</li>
                <li>Hỏa, Linh: Dương Nam, Âm Nữ an Hỏa thuận, Linh nghịch; ngược lại với Âm Nam, Dương Nữ.</li>
                <li>Khôi Việt: Canh, Tân đều Khôi Ngọ, Việt Dần. Thiên Quý đếm nghịch từ Văn Khúc.</li>
                <li>Vòng Thái Tuế 12 sao (Thái Tuế … Trực Phù), Thiên Không đứng trước Thái Tuế.</li>
                <li>Đại hạn khởi tại Mệnh bằng số cục, Dương Nam/Âm Nữ đi thuận; tiểu hạn theo tam hợp chi năm, nam thuận nữ nghịch.</li>
              </ul>
            </div>
            <div>
              <h3>Kiểm chứng</h3>
              <ul>
                <li>Vị trí sao được so tự động với iztro (thư viện mã nguồn mở, theo sách Trung Hoa) trên hàng nghìn lá số ngẫu nhiên năm 1901–2099: khớp toàn bộ ở mọi sao cùng quy tắc.</li>
                <li>Các quy tắc Nam phái khác biệt được kiểm bằng bảng tay trong bộ test.</li>
                <li>Chưa có: độ sáng miếu, vượng, đắc, hãm của sao (các bảng Nam phái và Trung Hoa khác nhau nhiều); lưu nguyệt, lưu nhật; các sao ít dùng (Lưu Hà, Thiên Trù, Quốc Ấn, Đường Phù, Đẩu Quân).</li>
              </ul>
            </div>
          </div>
        </section>

        <TraditionalDisclaimer />
        <LcFaq items={FAQ} />
        <LcRelated
          title="Có thể bạn quan tâm"
          links={[
            { label: "Bản đồ sao chiêm tinh", href: "/chiem-tinh/" },
            { label: "Tử vi hôm nay", href: "/tu-vi/" },
            { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/" },
            { label: "Tính tuổi", href: "/tinh-tuoi/" },
            { label: "12 con giáp", href: "/tuoi/" },
          ]}
        />
      </div>
    </ChShell>
  );
}
