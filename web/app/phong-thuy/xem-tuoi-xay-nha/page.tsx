import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { XayNhaForm } from "@/components/XayNhaForm";
import { getVietnamToday } from "@/lib/today";

export async function generateMetadata(): Promise<Metadata> {
  const year = getVietnamToday().year;
  return {
    title: `Xem tuổi xây nhà ${year}: Kim Lâu, Hoang Ốc, Tam tai | Lịch Âm`,
    description: `Xem tuổi làm nhà năm ${year} theo Kim Lâu, Hoang Ốc và Tam tai — tục dân gian, chỉ tham khảo.`,
    alternates: { canonical: "/phong-thuy/xem-tuoi-xay-nha/" },
  };
}

export default function XemTuoiXayNhaPage() {
  const year = getVietnamToday().year;

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="tuoiband">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <Link href="/tuoi/">Xem tuổi</Link> › Tuổi xây nhà {year}
          </div>
          <h1>Xem tuổi xây nhà: Kim Lâu, Hoang Ốc, Tam tai</h1>
          <p className="sub">
            Ba phép dân gian hay dùng khi chọn năm động thổ. Mệnh nạp âm lấy theo năm can chi của gia chủ, không gán một hành
            cho cả con giáp. Không phải khảo sát hướng nhà thu phí.
          </p>
        </div>

        <div className="body">
          <XayNhaForm />
          <TraditionalDisclaimer />

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Cách đếm đang dùng</span>
              <span className="rule" />
            </div>
            <p>
              Kim Lâu: tuổi mụ chia 9, dư 1–3–6–8 thì phạm. Hoang Ốc: (tuổi mụ − 1) chia 6 lấy dư, vòng Nhất Cát → Lục Hoang
              Ốc — có bản đếm khác cho nam/nữ, trang này ghi rõ một vòng. Tam tai: bốn nhóm tam hợp, mỗi nhóm kỵ ba năm chi
              kế tiếp. Ngày động thổ cụ thể xem{" "}
              <Link href="/xem-ngay-tot/dong-tho/">ngày tốt động thổ</Link>.
            </p>
          </div>

          <h2 className="hh" style={{ marginTop: 32 }}>
            Có thể anh cần
          </h2>
          <div className="chips">
            <Link className="chip" href="/xem-ngay-tot/dong-tho/">
              Ngày tốt động thổ
            </Link>
            <Link className="chip" href="/xem-ngay-tot/cat-noc/">
              Ngày tốt cất nóc
            </Link>
            <Link className="chip" href="/tinh-tuoi/">
              Tính tuổi
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
