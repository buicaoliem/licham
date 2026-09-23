import type { Metadata } from "next";
import Link from "next/link";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { LcRelated } from "@/components/lich/LichParts";
import { VIEC_ICON } from "@/components/heritage/viecIcon";
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
    <ChShell activeMenu="Xem ngày tốt" className="ch-cc ch-xnt">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: `Xem ngày tốt ${year}` }]}
        crumbJsonLd={false}
        title={`Xem ngày tốt năm ${year}`}
        lead="Chọn đúng việc — cưới hỏi xem hai tuổi, động thổ xem gia chủ, an táng xem người đứng lễ."
      />

      <div className="ch-wrap ch-main ch-stack">
        <section className="ch-card" aria-labelledby="xn-hub-h">
          <div className="ch-card-h">
            <h2 className="ch-h2" id="xn-hub-h">
              Việc nào thì trang nào
            </h2>
            <p className="ch-sub">Mỗi việc một trang riêng, chấm ngày theo tuổi người đứng việc.</p>
          </div>
          <ul className="xn-hub">
            {VIEC_LIST.map((v) => (
              <li key={v.slug}>
                <Link className="xn-hub-card" href={`/xem-ngay-tot/${v.slug}/`}>
                  <span className="ic" aria-hidden="true">
                    <Icon name={VIEC_ICON[v.slug] ?? "calendar"} size={20} />
                  </span>
                  <span className="t">
                    <b>Ngày tốt {v.label}</b>
                    <small>{v.tagline}</small>
                  </span>
                  <Icon name="chevron" size={16} className="arr" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <TraditionalDisclaimer />

        <LcRelated
          title="Có thể anh cần"
          links={[
            { label: "Tính tuổi", href: "/tinh-tuoi/" },
            { label: "Văn khấn", href: "/van-khan/" },
            { label: "Đếm ngược Tết", href: "/countdown/tet/" },
          ]}
        />
      </div>
    </ChShell>
  );
}
