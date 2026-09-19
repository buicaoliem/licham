import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TenGoiY } from "@/components/TenGoiY";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { TEN_LIST } from "@/lib/ten";
import { getVietnamToday } from "@/lib/today";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Đặt tên con ${year}: nghĩa chữ Hán Việt, gợi ý theo năm | Lịch Âm`,
    description: `Từ điển tên có chữ Hán, nghĩa và nguồn. Gợi ý theo nạp âm năm sinh — không sinh mọi họ + tên.`,
    alternates: { canonical: "/ten/" },
  };
}

const HANH_ORDER = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"] as const;

export default function TenHubPage() {
  const year = getVietnamToday().year;

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="tuoiband">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › Đặt tên {year}
          </div>
          <h1>Đặt tên con theo nghĩa chữ và năm sinh</h1>
          <p className="sub">
            Chỉ những tên có chữ Hán, nghĩa và nguồn. Không ghép họ + tên, không trang rỗng. Hành của tên lấy từ nghĩa
            hoặc bộ chữ; mệnh năm lấy nạp âm can chi — hai lớp khác nhau.
          </p>
        </div>

        <div className="body">
          <TenGoiY />

          <div style={{ marginTop: 32 }}>
            <h2 className="hh">Câu hỏi thường gặp</h2>
            <div className="box faqs">
              <div className="faq">
                <b>Có sinh trang mọi họ + tên không?</b>
                <p>Không. Chỉ tên có chữ Hán, nghĩa và nguồn trong từ điển. Không ghép Nguyễn + Minh thành URL riêng.</p>
              </div>
              <div className="faq">
                <b>Hành của tên có phải mệnh năm sinh không?</b>
                <p>
                  Không. Hành tên lấy từ nghĩa hoặc bộ chữ. Mệnh năm là nạp âm can chi. Gợi ý chỉ ghép hai lớp theo tục
                  sinh/cùng hành.
                </p>
              </div>
              <div className="faq">
                <b>Sinh trước Tết chọn tên theo năm nào?</b>
                <p>
                  Can chi năm âm của ngày sinh. Nhập đủ ngày ở tính tuổi rồi lấy năm âm, không lấy năm dương nếu sinh
                  tháng 1–2.
                </p>
              </div>
            </div>
          </div>

          <TraditionalDisclaimer />

          {HANH_ORDER.map((hanh) => {
            const items = TEN_LIST.filter((t) => t.hanh === hanh);
            return (
              <div className="box" style={{ marginTop: 18 }} key={hanh}>
                <div className="box-h">
                  <span className="rule" />
                  <span className="t">Tên hành {hanh}</span>
                  <span className="rule" />
                </div>
                <div className="chips">
                  {items.map((t) => (
                    <Link className="chip" href={`/ten/${t.slug}`} key={t.slug}>
                      {t.ten}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Footer />
      </div>
    </div>
  );
}
