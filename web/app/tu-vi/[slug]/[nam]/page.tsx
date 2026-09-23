import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { ConGiapArt } from "@/components/heritage/ConGiapArt";
import { HkRow, TuSec } from "@/components/heritage/TuParts";
import { LcPager } from "@/components/lich/LichParts";
import { ShareButton } from "@/components/ShareButton";
import { buildShareUrl } from "@/lib/share";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { SINH_NAM_MAX, SINH_NAM_MIN } from "@/lib/sinh-nam";
import { goiYTenTheoNam } from "@/lib/ten";
import { CON_GIAP_LIST, QUAN_HE_LABEL, conGiapBySlug } from "@/lib/tu-vi";
import { TU_VI_NAM_END, TU_VI_NAM_START, tuViNamInfo, tuViNamParams, tuViNamTrongPhamVi } from "@/lib/tu-vi-nam";
import { canChiSlug } from "@/lib/tuoi";

export function generateStaticParams() {
  return tuViNamParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; nam: string }>;
}): Promise<Metadata> {
  const { slug, nam } = await params;
  const giap = conGiapBySlug(slug);
  const year = Number(nam);
  if (!giap || !tuViNamTrongPhamVi(year)) return { robots: { index: false, follow: false } };
  const info = tuViNamInfo(giap, year);
  return {
    title: `Tử vi tuổi ${giap.ten} năm ${year} (${info.canChiNam.name}) | Lịch Âm`,
    description: `Tuổi ${giap.ten} năm ${year}: ${info.canChiNam.name}, mệnh năm ${info.canChiNam.napAm.name}, ${QUAN_HE_LABEL[info.quanHe]}. Kim Lâu, Hoang Ốc theo từng năm sinh.`,
    alternates: { canonical: `/tu-vi/${slug}/${year}/` },
  };
}

export default async function TuViNamPage({ params }: { params: Promise<{ slug: string; nam: string }> }) {
  const { slug, nam } = await params;
  const giap = conGiapBySlug(slug);
  const year = Number(nam);
  if (!giap || !tuViNamTrongPhamVi(year)) notFound();

  const info = tuViNamInfo(giap, year);
  const tenGoiY = goiYTenTheoNam(year).slice(0, 8);
  const prev = year > TU_VI_NAM_START ? year - 1 : null;
  const next = year < TU_VI_NAM_END ? year + 1 : null;

  return (
    <ChShell activeMenu="Tử vi" className="ch-tu ch-tv">
      <ChHero
        className="tu-hero"
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tử vi", href: "/tu-vi/" },
          { label: giap.ten, href: `/tu-vi/${giap.slug}/` },
          { label: `Năm ${year}` },
        ]}
        crumbJsonLd={false}
        eyebrow={`Năm ${info.canChiNam.name}`}
        title={`Tử vi tuổi ${giap.ten} năm ${year} — ${info.canChiNam.name}`}
        lead={`Mệnh năm ${info.canChiNam.napAm.name} (hành ${info.canChiNam.napAm.element}) — nạp âm của năm ${year}, không phải một hành cho mọi người tuổi ${giap.ten}.`}
      >
        <ShareButton
          url={buildShareUrl(`/tu-vi/${giap.slug}/${year}/`)}
          title={`Tử vi tuổi ${giap.ten} năm ${year}`}
          text={`Tử vi tuổi ${giap.ten} năm ${year} (${info.canChiNam.name}) – xem đầy đủ tại Lịch Âm.`}
        />
      </ChHero>

      <div className="ch-wrap ch-main ch-stack">
        <section className="ch-card tu-profile" aria-label={`Tổng quan tuổi ${giap.ten} năm ${year}`}>
          <div className="tuoi-medal">
            <ConGiapArt chiSlug={giap.slug} ten={giap.ten} so={giap.chiIndex + 1} className="tuoi-medal-art" />
            <b>Tuổi {giap.ten}</b>
            <span>Năm {year}</span>
          </div>
          <div className="tu-prose tv-luan-y">
            <p>{info.luan}</p>
            {info.napAmMoTa && <p>{info.napAmMoTa}</p>}
          </div>
        </section>

        <div className="tu-cols">
          <TuSec title={`Năm ${year} với tuổi ${giap.ten}`}>
            <ul className="tu-hk">
              <HkRow k="Can chi năm" v={<Link href={`/tuoi/${canChiSlug(info.canChiNam)}/`}>{info.canChiNam.name}</Link>} />
              <HkRow k="Quan hệ chi" v={QUAN_HE_LABEL[info.quanHe]} />
              <HkRow k="Năm tuổi" v={info.namTuoi ? "Có" : "Không"} />
              <HkRow
                k="Tam tai"
                v={info.tamTai ? `Phạm (tuổi ${giap.ten} kỵ năm ${info.tamTaiNam})` : `Không — kỵ ${info.tamTaiNam}`}
              />
            </ul>
          </TuSec>
          <TuSec title="Khác tử vi hôm nay">
            <div className="tu-prose">
              <p>
                Trang này luận theo <b>năm</b> {year}.{" "}
                <Link href={`/tu-vi/${giap.slug}/`}>Tử vi tuổi {giap.ten} hôm nay</Link> luận theo can chi <b>ngày</b>. Hai
                trang không copy một đoạn.
              </p>
            </div>
          </TuSec>
        </div>

        <TuSec
          title={`Từng năm sinh tuổi ${giap.ten} — hạn năm ${year}`}
          note="Kim Lâu / Hoang Ốc theo tuổi mụ từng người. Sinh trước Tết nhập ngày đủ ở tính tuổi."
        >
          <table className="tuoitable">
            <thead>
              <tr>
                <th>Năm sinh</th>
                <th>Can chi</th>
                <th>Tuổi mụ {year}</th>
                <th>Kim Lâu</th>
                <th>Hoang Ốc</th>
              </tr>
            </thead>
            <tbody>
              {info.birthRows.map((r) => (
                <tr key={r.namSinh}>
                  <td data-k="Năm sinh">
                    {r.namSinh >= SINH_NAM_MIN && r.namSinh <= SINH_NAM_MAX ? (
                      <Link href={`/sinh-nam/${r.namSinh}/`}>{r.namSinh}</Link>
                    ) : (
                      r.namSinh
                    )}
                  </td>
                  <td data-k="Can chi">{r.canChi}</td>
                  <td data-k="Tuổi mụ">{r.tuoiMu}</td>
                  <td data-k="Kim Lâu">{r.kimLau}</td>
                  <td data-k="Hoang Ốc">{r.hoangOc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TuSec>

        {tenGoiY.length > 0 && (
          <TuSec title={`Đặt tên năm ${year}`}>
            <p className="tu-lead">Gợi ý chữ theo nạp âm năm {year} ({info.canChiNam.napAm.name}), không ghép họ.</p>
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
          label="Năm trước, năm sau"
          prev={prev ? { href: `/tu-vi/${giap.slug}/${prev}/`, text: `Năm ${prev}`, sub: "Năm trước" } : null}
          mid={{ href: `/tu-vi/${giap.slug}/`, text: `Tử vi tuổi ${giap.ten} hôm nay` }}
          next={next ? { href: `/tu-vi/${giap.slug}/${next}/`, text: `Năm ${next}`, sub: "Năm sau" } : null}
        />

        <section className="lc-related" aria-labelledby="tv-khac-h">
          <h2 className="ch-h2" id="tv-khac-h">
            Tuổi khác năm {year}
          </h2>
          <div className="chips">
            {CON_GIAP_LIST.filter((c) => c.slug !== giap.slug).map((c) => (
              <Link className="chip" href={`/tu-vi/${c.slug}/${year}/`} key={c.slug}>
                {c.ten}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ChShell>
  );
}
