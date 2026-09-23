import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { TuSec, TuoiFact } from "@/components/heritage/TuParts";
import { LcRelated } from "@/components/lich/LichParts";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { TEN_LIST, namKhopTen, tenBySlug, tenCungHanh } from "@/lib/ten";
import { getVietnamToday } from "@/lib/today";

export function generateStaticParams() {
  return TEN_LIST.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = tenBySlug(slug);
  if (!t) return { robots: { index: false, follow: false } };
  const year = getVietnamToday().year;
  return {
    title: `Tên ${t.ten} (${t.chuHan}) nghĩa là gì? Gợi ý năm ${year} | Lịch Âm`,
    description: `${t.ten} (${t.chuHan}): ${t.nghia}. ${t.nguon}. Hành chữ ${t.hanh}, gợi ý theo nạp âm năm sinh.`,
    alternates: { canonical: `/ten/${slug}/` },
  };
}

export default async function TenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tenBySlug(slug);
  if (!t) notFound();

  const year = getVietnamToday().year;
  const cungHanh = tenCungHanh(t.hanh, t.slug).slice(0, 8);
  const namKhop = namKhopTen(t);
  const gioiLabel = t.gioi === "nam" ? "thường đặt cho nam" : t.gioi === "nu" ? "thường đặt cho nữ" : "dùng được cho cả hai giới";

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu ch-ten">
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Đặt tên", href: "/ten/" }, { label: t.ten }]}
        crumbJsonLd={false}
        title={`Tên ${t.ten} (${t.chuHan}): ${t.nghia}`}
        lead={t.luan}
      />

      <div className="ch-wrap ch-main ch-stack">
        <section className="ch-card tu-profile" aria-labelledby="ten-chu-h">
          <div className="tuoi-medal ten-medal">
            <span className="ten-han" lang="zh-Hant">
              {t.chuHan}
            </span>
            <b>{t.ten}</b>
            <span>Hành {t.hanh}</span>
          </div>
          <div className="tuoi-facts">
            <h2 className="tu-sec-h" id="ten-chu-h">
              Chữ và nguồn
            </h2>
            <TuoiFact k="Chữ Hán" v={t.chuHan} />
            <TuoiFact k="Nghĩa" v={t.nghia} />
            <TuoiFact k="Nguồn" v={t.nguon} />
            <TuoiFact k="Hành theo chữ" v={t.hanh} />
            <TuoiFact k="Giới theo tục" v={gioiLabel} />
          </div>
        </section>

        <TuSec title={`Năm sinh hay được gợi ý ${t.ten}`}>
          <div className="tu-prose">
            <p>
              Theo tục hành chữ sinh mệnh năm hoặc cùng hành nạp âm năm (không phải mệnh con giáp). Trong 2024–2031, tên {t.ten}{" "}
              khớp: {namKhop.length > 0 ? namKhop.join(", ") : "không năm nào trong dải — vẫn dùng được nếu thích nghĩa chữ"}. Năm
              hiện tại trên trang: {year}.
            </p>
          </div>
        </TuSec>

        <TraditionalDisclaimer />

        <LcRelated
          title={`Tên cùng hành ${t.hanh}`}
          links={[
            ...cungHanh.map((x) => ({ label: x.ten, href: `/ten/${x.slug}/` })),
            { label: "Tất cả tên", href: "/ten/" },
            { label: "Tính tuổi", href: "/tinh-tuoi/" },
          ]}
        />
      </div>
    </ChShell>
  );
}
