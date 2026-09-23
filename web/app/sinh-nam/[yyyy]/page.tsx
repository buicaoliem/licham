import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { ConGiapArt } from "@/components/heritage/ConGiapArt";
import { TuSec, TuoiFact } from "@/components/heritage/TuParts";
import { LcPager, LcRelated } from "@/components/lich/LichParts";
import { ShareButton } from "@/components/ShareButton";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { YEAR_END, YEAR_START } from "@/lib/site-years";
import { SINH_NAM_MAX, SINH_NAM_MIN, sinhNamInfo, sinhNamTrongPhamVi, sinhNamYears } from "@/lib/sinh-nam";
import { goiYTenTheoNam } from "@/lib/ten";
import { buildShareUrl } from "@/lib/share";
import { getVietnamToday } from "@/lib/today";
import { canChiSlug } from "@/lib/tuoi";

export function generateStaticParams() {
  return sinhNamYears().map((yyyy) => ({ yyyy: String(yyyy) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ yyyy: string }> }): Promise<Metadata> {
  const { yyyy } = await params;
  const year = Number(yyyy);
  if (!sinhNamTrongPhamVi(year)) return { robots: { index: false, follow: false } };
  const today = getVietnamToday();
  const info = sinhNamInfo(year, today.year);
  return {
    title: `Sinh năm ${year} tuổi gì, mệnh gì? ${info.canChi.name} | Lịch Âm`,
    description: `Sinh năm ${year}: can chi ${info.canChi.name}, con giáp ${info.canChi.chi}, mệnh nạp âm ${info.canChi.napAm.name}, tuổi mụ năm ${today.year}.`,
    alternates: { canonical: `/sinh-nam/${year}/` },
  };
}

export default async function SinhNamPage({ params }: { params: Promise<{ yyyy: string }> }) {
  const { yyyy } = await params;
  const year = Number(yyyy);
  if (!sinhNamTrongPhamVi(year)) notFound();

  const today = getVietnamToday();
  const info = sinhNamInfo(year, today.year);
  const prev = year > SINH_NAM_MIN ? year - 1 : null;
  const next = year < SINH_NAM_MAX ? year + 1 : null;
  const tenGoiY = goiYTenTheoNam(year).slice(0, 10);
  const tuViNamHref =
    today.year >= YEAR_START && today.year <= YEAR_END ? `/tu-vi/${info.chiSlug}/${today.year}/` : "/tu-vi/";

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu">
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem tuổi", href: "/tuoi/" }, { label: `Sinh năm ${year}` }]}
        crumbJsonLd={false}
        eyebrow={`Sinh năm ${year}`}
        title={`Sinh năm ${year}: tuổi ${info.canChi.name}, mệnh ${info.canChi.napAm.name}`}
        lead={info.uniqueIntro}
      >
        <ShareButton
          url={buildShareUrl(`/sinh-nam/${year}/`)}
          title={`Sinh năm ${year}`}
          text={`Sinh năm ${year}: tuổi ${info.canChi.name}, mệnh ${info.canChi.napAm.name} – xem đầy đủ tại Lịch Âm.`}
        />
      </ChHero>

      <div className="ch-wrap ch-main ch-stack">
        <section className="ch-card tu-profile" aria-labelledby="sn-facts-h">
          <div className="tuoi-medal">
            <ConGiapArt chiSlug={info.chiSlug} ten={info.canChi.chi} so={info.canChi.chiIndex + 1} className="tuoi-medal-art" />
            <b>Tuổi {info.canChi.name}</b>
            <span>{info.conGiap}</span>
          </div>
          <div className="tuoi-facts">
            <h2 className="le-sr" id="sn-facts-h">
              Số liệu năm {year}
            </h2>
            <TuoiFact k="Can chi" v={<Link href={info.canChiPath}>{info.canChi.name}</Link>} />
            <TuoiFact
              k="Con giáp"
              v={
                <Link href={info.chiPath}>
                  {info.canChi.chi} ({info.conGiap})
                </Link>
              }
            />
            <TuoiFact k="Nạp âm" v={`${info.canChi.napAm.name} — hành ${info.canChi.napAm.element}`} />
            <TuoiFact k={`Tuổi mụ năm ${today.year}`} v={`${info.tuoiMuHienTai} (nếu đúng năm âm ${year})`} />
          </div>
        </section>

        {tenGoiY.length > 0 && (
          <TuSec title={`Gợi ý tên theo mệnh năm ${year}`}>
            <p className="tu-lead">
              Theo tục hành chữ sinh mệnh {info.canChi.napAm.element} hoặc cùng hành — không ghép họ. Xem nghĩa từng chữ ở
              trang tên.
            </p>
            <div className="chips">
              {tenGoiY.map((t) => (
                <Link className="chip" href={`/ten/${t.slug}/`} key={t.slug}>
                  {t.ten}
                </Link>
              ))}
              <Link className="chip" href="/ten/">
                Từ điển tên
              </Link>
            </div>
          </TuSec>
        )}

        <TraditionalDisclaimer />

        <LcPager
          label="Năm sinh trước, sau"
          prev={prev ? { href: `/sinh-nam/${prev}/`, text: `Năm ${prev}`, sub: "Năm trước" } : null}
          mid={{ href: "/tuoi/", text: "12 con giáp" }}
          next={next ? { href: `/sinh-nam/${next}/`, text: `Năm ${next}`, sub: "Năm sau" } : null}
        />

        <LcRelated
          title="Có thể anh cần"
          links={[
            { label: "Tính tuổi theo ngày sinh", href: "/tinh-tuoi/" },
            { label: `Tuổi ${info.canChi.name}`, href: `/tuoi/${canChiSlug(info.canChi)}/` },
            { label: `Tử vi tuổi ${info.canChi.chi} năm ${today.year}`, href: tuViNamHref },
            { label: `Tử vi tuổi ${info.canChi.chi} hôm nay`, href: `/tu-vi/${info.chiSlug}/` },
            { label: "Ngày tốt cưới hỏi", href: "/xem-ngay-tot/cuoi-hoi/" },
          ]}
        />
      </div>
    </ChShell>
  );
}
