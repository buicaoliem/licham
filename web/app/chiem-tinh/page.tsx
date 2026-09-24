import type { Metadata } from "next";
import { BanDoSaoApp } from "@/components/chiem-tinh/BanDoSaoApp";
import { ChHero, ChSectionHead, ChShell } from "@/components/heritage/ChShell";
import { LcFaq, LcRelated } from "@/components/lich/LichParts";
import "../la-so.css";

export const metadata: Metadata = {
  title: "Bản đồ sao chiêm tinh (natal chart) — cung Mọc, 12 nhà, góc hợp | Lịch Âm",
  description:
    "Lập bản đồ sao cá nhân theo chiêm tinh phương Tây: vị trí Mặt Trời, Mặt Trăng và 8 hành tinh, Ascendant, MC, 12 nhà (Placidus, Whole Sign, Equal, Porphyry), góc hợp. Tự tính múi giờ và giờ mùa hè.",
  alternates: { canonical: "/chiem-tinh/" },
};

const FAQ = [
  {
    q: "Vị trí hành tinh lấy từ đâu?",
    a: "Tính trực tiếp trên máy bạn bằng thư viện thiên văn astronomy-engine (mô hình VSOP87 cho hành tinh, lý thuyết Mặt Trăng của Chapront), độ chính xác khoảng 1 phút cung — không dùng bảng ước lượng. Kết quả được đối chiếu với ví dụ chuẩn trong sách Astronomical Algorithms (Jean Meeus) và với một engine độc lập khác.",
  },
  {
    q: "Cung hoàng đạo ở đây là nhiệt đới hay thiên văn?",
    a: "Nhiệt đới (tropical) như chiêm tinh phương Tây phổ thông: 0° Bạch Dương là điểm Xuân phân. Cung nhiệt đới hiện lệch khoảng 24° so với chòm sao cùng tên trên bầu trời do tuế sai.",
  },
  {
    q: "Tại sao cần giờ và nơi sinh?",
    a: "Ascendant đổi khoảng 1° mỗi 4 phút và phụ thuộc vĩ độ; 12 nhà xoay theo Ascendant và MC. Không có giờ sinh, trang vẫn tính vị trí hành tinh (Mặt Trăng có sai số tới ±6–7°) nhưng bỏ Ascendant, MC và nhà.",
  },
  {
    q: "Chọn hệ thống nhà nào?",
    a: "Placidus phổ biến nhất nhưng không xác định ở vùng cực (trên khoảng 66° vĩ) — khi đó trang tự chuyển Porphyry và báo rõ. Whole Sign đơn giản, cổ điển và dùng được mọi nơi.",
  },
];

export default function ChiemTinhPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <ChShell activeMenu="Tử vi" className="ch-tu ch-ls ch-ct">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tử vi", href: "/tu-vi/" }, { label: "Bản đồ sao chiêm tinh" }]}
        crumbJsonLd={false}
        eyebrow="Chiêm tinh phương Tây · hoàng đạo nhiệt đới"
        title="Bản đồ sao cá nhân"
        lead="Vị trí thật của Mặt Trời, Mặt Trăng và 8 hành tinh lúc bạn sinh, cung Mọc (Ascendant), Thiên đỉnh, 12 nhà và các góc hợp. Số liệu là thiên văn; phần ý nghĩa là quan niệm chiêm tinh để tham khảo."
      />
      <div className="ch-wrap ch-main ch-stack">
        <BanDoSaoApp />

        <section className="ch-card ls-method" aria-labelledby="ct-method-h">
          <ChSectionHead id="ct-method-h" title="Cách tính và giới hạn" sub="Số liệu thiên văn tách riêng khỏi phần diễn giải." />
          <div className="ls-method-grid">
            <div>
              <h3>Thiên văn</h3>
              <ul>
                <li>Kinh độ hoàng đạo biểu kiến (có quang sai, chương động) trên hoàng đạo thật của ngày, địa tâm.</li>
                <li>Ascendant, MC từ giờ sao biểu kiến Greenwich và độ nghiêng hoàng đạo thật; Placidus giải lặp tới 10⁻⁹ độ.</li>
                <li>Nút Bắc thực (quỹ đạo tức thời); giá trị Nút trung bình ghi trong phần chi tiết.</li>
                <li>Nghịch hành xác định theo tốc độ biểu kiến trong ±12 giờ.</li>
              </ul>
            </div>
            <div>
              <h3>Thời gian, địa điểm</h3>
              <ul>
                <li>Múi giờ và giờ mùa hè theo cơ sở dữ liệu IANA của trình duyệt, gồm lịch sử múi giờ Việt Nam; miền Bắc 1960–1975 dùng UTC+7. Giờ mùa hè được giữ vì bản đồ sao cần đúng thời điểm thực.</li>
                <li>Giai đoạn 1947–1955 ở Việt Nam có hai múi giờ (UTC+8 vùng Pháp, UTC+7 vùng kháng chiến): trang báo rõ và cho tính lại; cũng có thể tự chọn múi giờ.</li>
                <li>Không rõ giờ sinh: báo mọi thiên thể đổi cung trong ngày sinh.</li>
                <li>Giờ không tồn tại hoặc lặp lại lúc đổi giờ mùa hè được báo rõ.</li>
                <li>Danh sách nơi sinh gồm 63 tỉnh thành Việt Nam và các thành phố có đông người Việt; vùng cực có cảnh báo, sát cực (trên 89,9°) không lập được nhà.</li>
              </ul>
            </div>
            <div>
              <h3>Kiểm chứng và giới hạn</h3>
              <ul>
                <li>Khớp ví dụ chuẩn của Meeus (Mặt Trời, Mặt Trăng, Sao Kim, giờ sao) và lệch ≤ 0,02° so với engine Moshier độc lập trên 300 bản đồ ngẫu nhiên.</li>
                <li>Chưa có: Chiron, Lilith, tiểu hành tinh, điểm Fortune; góc hợp phụ; hệ nhà Koch, Regiomontanus; chiêm tinh Vệ Đà (sidereal).</li>
                <li>Diễn giải được ghép từ ý nghĩa phổ thông của hành tinh, cung, nhà — không phải luận giải cá nhân.</li>
              </ul>
            </div>
          </div>
        </section>

        <p className="disclaimer">Chiêm tinh là quan niệm văn hóa, không có cơ sở khoa học. Phần ý nghĩa chỉ để tham khảo, giải trí; không phải tư vấn tâm lý, y khoa, pháp lý hay tài chính.</p>
        <LcFaq items={FAQ} />
        <LcRelated
          title="Có thể bạn quan tâm"
          links={[
            { label: "Lập lá số Tử Vi", href: "/la-so-tu-vi/" },
            { label: "Tử vi hôm nay", href: "/tu-vi/" },
            { label: "24 tiết khí", href: "/kien-thuc/tiet-khi/" },
            { label: "Tính tuổi", href: "/tinh-tuoi/" },
          ]}
        />
      </div>
    </ChShell>
  );
}
