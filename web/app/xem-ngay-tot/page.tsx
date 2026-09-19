import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { getVietnamToday } from "@/lib/today";
import { VIEC_LIST } from "@/lib/xem-ngay-tot";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Xem ngày tốt năm ${year} — Cưới hỏi, khai trương, động thổ | Lịch Âm`,
    description: `Chọn việc rồi chấm ngày hoàng đạo, sao tốt xấu và tuổi cho năm ${year}. Mỗi việc một trang riêng, không dùng chung một đoạn rồi đổi nhãn.`,
    alternates: { canonical: "/xem-ngay-tot/" },
  };
}

export default function XemNgayTotHubPage() {
  const year = getVietnamToday().year;

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem ngày tốt" />

        <div className="band">
          <div className="bg bg-luc" />
          <div className="band-in">
            <div className="crumb" style={{ marginBottom: 10 }}>
              <Link href="/">Trang chủ</Link> › Xem ngày tốt {year}
            </div>
            <h1>Xem ngày tốt năm {year}</h1>
            <p>Chọn đúng việc — cưới hỏi xem hai tuổi, động thổ xem gia chủ, an táng xem người đứng lễ.</p>
          </div>
        </div>

        <div className="body">
          <div className="chips">
            {VIEC_LIST.map((v) => (
              <Link className="chip" href={`/xem-ngay-tot/${v.slug}`} key={v.slug}>
                Ngày tốt {v.label}
              </Link>
            ))}
          </div>

          <div className="box" style={{ marginTop: 22 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Việc nào thì trang nào</span>
              <span className="rule" />
            </div>
            {VIEC_LIST.map((v) => (
              <div className="row" key={v.slug}>
                <span>
                  <Link href={`/xem-ngay-tot/${v.slug}`}>{v.label}</Link>
                </span>
                <span>{v.tagline}</span>
              </div>
            ))}
          </div>

          <TraditionalDisclaimer />

          <h2 className="hh" style={{ marginTop: 32 }}>
            Có thể anh cần
          </h2>
          <div className="chips">
            <Link className="chip" href="/tinh-tuoi">
              Tính tuổi
            </Link>
            <Link className="chip" href="/van-khan">
              Văn khấn
            </Link>
            <Link className="chip" href="/countdown/tet">
              Đếm ngược Tết
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
