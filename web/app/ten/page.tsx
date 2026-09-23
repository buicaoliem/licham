import type { Metadata } from "next";
import Link from "next/link";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { TuSec } from "@/components/heritage/TuParts";
import { LcFaq } from "@/components/lich/LichParts";
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
    <ChShell activeMenu="Xem tuổi" className="ch-tu ch-ten">
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: `Đặt tên ${year}` }]}
        crumbJsonLd={false}
        title="Đặt tên con theo nghĩa chữ và năm sinh"
        lead="Chỉ những tên có chữ Hán, nghĩa và nguồn. Không ghép họ + tên, không trang rỗng. Hành của tên lấy từ nghĩa hoặc bộ chữ; mệnh năm lấy nạp âm can chi — hai lớp khác nhau."
      />

      <div className="ch-wrap ch-main ch-stack">
        <TenGoiY initialYear={year} />

        <LcFaq
          items={[
            {
              q: "Có sinh trang mọi họ + tên không?",
              a: "Không. Chỉ tên có chữ Hán, nghĩa và nguồn trong từ điển. Không ghép Nguyễn + Minh thành URL riêng.",
            },
            {
              q: "Hành của tên có phải mệnh năm sinh không?",
              a: "Không. Hành tên lấy từ nghĩa hoặc bộ chữ. Mệnh năm là nạp âm can chi. Gợi ý chỉ ghép hai lớp theo tục sinh/cùng hành.",
            },
            {
              q: "Sinh trước Tết chọn tên theo năm nào?",
              a: "Can chi năm âm của ngày sinh. Nhập đủ ngày ở tính tuổi rồi lấy năm âm, không lấy năm dương nếu sinh tháng 1–2.",
            },
          ]}
        />

        <TraditionalDisclaimer />

        <div className="ten-hanh">
          {HANH_ORDER.map((hanh) => {
            const items = TEN_LIST.filter((t) => t.hanh === hanh);
            return (
              <TuSec title={`Tên hành ${hanh}`} className="ten-h" key={hanh}>
                <div className="chips">
                  {items.map((t) => (
                    <Link className="chip" href={`/ten/${t.slug}/`} key={t.slug}>
                      {t.ten}
                    </Link>
                  ))}
                </div>
              </TuSec>
            );
          })}
        </div>
      </div>
    </ChShell>
  );
}
