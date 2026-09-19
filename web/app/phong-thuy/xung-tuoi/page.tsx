import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { XungTuoiForm } from "@/components/XungTuoiForm";
import { getVietnamToday } from "@/lib/today";

export async function generateMetadata(): Promise<Metadata> {
  const year = getVietnamToday().year;
  return {
    title: `Xem xung tuổi, hợp tuổi ${year} | Lịch Âm`,
    description:
      "Xem hai năm sinh có xung chi hay thiên khắc địa xung theo lục xung và tứ xung can. Tham khảo dân gian, không bảo đảm.",
    alternates: { canonical: "/phong-thuy/xung-tuoi/" },
  };
}

export default function XungTuoiPage() {
  const year = getVietnamToday().year;

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="tuoiband">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <Link href="/tuoi">Xem tuổi</Link> › Xung tuổi {year}
          </div>
          <h1>Xem xung tuổi và hợp tuổi</h1>
          <p className="sub">
            Luật cứng: lục xung địa chi (Tý–Ngọ, Sửu–Mùi, Dần–Thân, Mão–Dậu, Thìn–Tuất, Tỵ–Hợi) và tứ xung thiên can (Giáp–Canh,
            Ất–Tân, Bính–Nhâm, Đinh–Quý). Xung cả can lẫn chi gọi là thiên khắc địa xung.
          </p>
        </div>

        <div className="body">
          <XungTuoiForm />
          <TraditionalDisclaimer />

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Không dùng làm bảo đảm</span>
              <span className="rule" />
            </div>
            <p>
              Kết quả chỉ nói hai năm can chi có đứng đối trong bảng xung hay không. Không chẩn bệnh, không kết luận hôn nhân,
              không schema y khoa. Muốn đủ ngày sinh (kể cả trước Tết) thì dùng{" "}
              <Link href="/tinh-tuoi">tính tuổi</Link>.
            </p>
          </div>

          <h2 className="hh" style={{ marginTop: 32 }}>
            Có thể anh cần
          </h2>
          <div className="chips">
            <Link className="chip" href="/xem-tuoi-ket-hon">
              Xem tuổi kết hôn
            </Link>
            <Link className="chip" href="/tinh-tuoi">
              Tính tuổi
            </Link>
            <Link className="chip" href="/tuoi">
              12 con giáp
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
