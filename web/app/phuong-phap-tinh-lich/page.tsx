import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { SourceTag } from "@/components/calendar/SourceTag";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SUPPORTED_RANGE } from "@/lib/calendar/config";

export const metadata: Metadata = {
  title: "Phương pháp tính lịch âm: múi giờ, sóc, tiết khí, tháng nhuận | Lịch Âm",
  description: "Licham.app tính lịch âm dương thế nào: múi giờ UTC+7, sóc và tháng âm, tháng nhuận, tiết khí, phạm vi hỗ trợ, giới hạn và phần nào là tính toán hay diễn giải truyền thống.",
  alternates: { canonical: "/phuong-phap-tinh-lich/" },
};

export default function PhuongPhapPage() {
  return (
    <div className="outer">
      <div className="site">
        <Header />
        <div className="band">
          <div className="bg bg-kim" />
          <div className="band-in">
            <h1>Phương pháp tính lịch</h1>
            <p>Cái gì được tính, cái gì được diễn giải, và giới hạn của cả hai</p>
          </div>
        </div>
        <div className="body">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Phương pháp tính lịch" }]} />
          <div className="prose">
            <h2>Ba loại nguồn dữ liệu</h2>
            <p>Mỗi khối thông tin trên trang lịch thuộc một trong ba loại, được đánh nhãn nhỏ:</p>
            <ul className="dotlist">
              <li>
                <SourceTag type="astronomical" /> Tính bằng thuật toán từ vị trí Mặt Trời, Mặt Trăng: ngày âm lịch, tháng nhuận, tiết khí, can chi ngày.
              </li>
              <li>
                <SourceTag type="traditional" /> Bảng và quy tắc của lịch truyền thống: giờ hoàng đạo, trực, nhị thập bát tú, sao tốt xấu, hướng xuất hành, ngũ hành.
              </li>
              <li>
                <SourceTag type="editorial" /> Nội dung do licham.app biên soạn: mô tả ý nghĩa, phong tục ngày lễ, gợi ý việc nên làm, không nên làm.
              </li>
            </ul>

            <h2>
              1. Múi giờ Việt Nam UTC+7 <SourceTag type="astronomical" />
            </h2>
            <p>
              Mọi ngày trong lịch được xác định theo giờ Việt Nam, kinh tuyến 105 độ Đông (UTC+7), bất kể máy chủ hay trình duyệt đang ở múi giờ nào. Lịch Trung Quốc dùng UTC+8 nên đôi khi ngày mùng một hai nước lệch nhau một ngày.
            </p>

            <h2>
              2. Sóc và ngày âm lịch <SourceTag type="astronomical" />
            </h2>
            <p>
              Sóc là thời điểm trăng mới. Ngày âm lịch được đếm từ ngày chứa sóc (mùng một) đến ngày trước sóc kế tiếp, nên mỗi tháng âm có 29 hoặc 30 ngày. Lõi tính lịch là bản chuyển sang TypeScript của thuật toán &ldquo;Âm lịch Việt Nam&rdquo; của Hồ Ngọc Đức (2004), dùng chuỗi xấp xỉ cho thời điểm trăng mới và kinh độ Mặt Trời, giữ nguyên để khớp với các bảng lịch Việt Nam đã công bố.
            </p>

            <h2>
              3. Tháng âm và tháng nhuận <SourceTag type="astronomical" />
            </h2>
            <p>
              Tháng 11 âm lịch là tháng chứa đông chí. Khi giữa hai đông chí liên tiếp có 13 tháng, tháng đầu tiên không chứa trung khí là tháng nhuận. Xem thêm{" "}
              <Link href="/kien-thuc/thang-nhuan-am-lich/">tháng nhuận âm lịch</Link>.
            </p>

            <h2>
              4. Tiết khí <SourceTag type="astronomical" />
            </h2>
            <p>
              Tiết khí tính từ kinh độ biểu kiến của Mặt Trời, theo chuỗi VSOP87 rút gọn trong &ldquo;Astronomical Algorithms&rdquo; của Jean Meeus (ấn bản 2), có hiệu chỉnh nutation, quang sai và ΔT theo đa thức Espenak–Meeus. Độ lệch thiết kế khoảng 25 giây thời gian. Xem thêm{" "}
              <Link href="/kien-thuc/tiet-khi/">24 tiết khí</Link>.
            </p>

            <h2>5. Phạm vi hỗ trợ</h2>
            <p>
              Lõi tính lịch chuyển đổi được các năm 1900 đến 2100. Các trang lịch ngày, tháng, năm hiện phục vụ từ năm {SUPPORTED_RANGE.start} đến năm {SUPPORTED_RANGE.end}; ngoài khoảng đó trang không được tạo.
            </p>

            <h2>6. Giới hạn</h2>
            <ul className="dotlist">
              <li>Chưa có bộ đối chiếu độc lập đủ rộng để tuyên bố độ chính xác tuyệt đối. Chúng tôi đối chiếu với các nguồn lịch Việt Nam đã công bố và có kiểm thử tự động cho cấu trúc tháng, tháng nhuận và chuyển đổi hai chiều.</li>
              <li>Thuật toán cho sóc là bản xấp xỉ. Với những ngày sóc rơi sát nửa đêm giờ Việt Nam, kết quả có thể khác một ngày so với lịch tính bằng lịch thiên văn chi tiết hơn.</li>
              <li>Bảng sao tốt xấu chưa phải bộ Ngọc hạp thông thư đầy đủ; nhị thập bát tú chỉ có tên sao và cát hung.</li>
            </ul>

            <h2>7. Phần diễn giải truyền thống</h2>
            <p>
              Giờ hoàng đạo, trực, sao tốt xấu và gợi ý việc nên làm là tri thức dân gian, gán theo quy tắc truyền thống lên kết quả tính toán. Chúng không suy ra từ thiên văn, không có cơ sở khoa học đo được, và chỉ để tham khảo. Xem các bài: <Link href="/kien-thuc/gio-hoang-dao/">giờ hoàng đạo</Link>, <Link href="/kien-thuc/truc-ngay/">trực</Link>, <Link href="/kien-thuc/sao-tot-xau/">sao tốt xấu</Link>, <Link href="/kien-thuc/nhi-thap-bat-tu/">nhị thập bát tú</Link>.
            </p>
          </div>
          <p className="srcnote">
            Phát hiện lịch sai? Gửi ngày cụ thể qua trang <Link href="/lien-he/">Liên hệ</Link>. Tất cả bài giải thích nằm ở <Link href="/kien-thuc/">Kiến thức</Link>.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
