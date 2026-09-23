import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDayInfo } from "@licham/core";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { ConGiapArt } from "@/components/heritage/ConGiapArt";
import { TuSec, TuoiFact } from "@/components/heritage/TuParts";
import { ShareButton } from "@/components/ShareButton";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { pad2 } from "@/lib/format";
import {
  CON_GIAP_LIST,
  QUAN_HE_LABEL,
  birthYearsForChi,
  conGiapBySlug,
  getTuViData,
  hasAiContent,
  parseDateStr,
  quanHeVoiNgay,
} from "@/lib/tu-vi";
import { YEAR_END } from "@/lib/site-years";
import { buildShareUrl } from "@/lib/share";
import { getVietnamToday } from "@/lib/today";

const today = getVietnamToday();
const data = getTuViData(today);
const displayDate = parseDateStr(data.date);
const info = getDayInfo(displayDate);
const dateLabel = `${pad2(displayDate.day)}/${pad2(displayDate.month)}/${displayDate.year}`;
const coNoiDung = hasAiContent(data);

export function generateStaticParams() {
  return CON_GIAP_LIST.map((cg) => ({ slug: cg.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cg = conGiapBySlug(slug);
  if (!cg) return {};
  return {
    title: `Tử vi tuổi ${cg.ten} hôm nay ${dateLabel} | Lịch Âm`,
    description: `Tử vi tuổi ${cg.ten} ngày ${info.canChi.day.name}: mức đánh giá, giờ tốt nhất và quan hệ với chi ngày hôm nay.`,
    alternates: { canonical: `/tu-vi/${slug}/` },
  };
}

export default async function TuViConGiapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cg = conGiapBySlug(slug);
  if (!cg) notFound();

  const entry = data.tuoi[cg.slug];
  const years = birthYearsForChi(cg.chiIndex, today.year);
  const quanHe = quanHeVoiNgay(info.canChi.day.chiIndex, cg.chiIndex);
  const khac = CON_GIAP_LIST.filter((c) => c.slug !== cg.slug);

  return (
    <ChShell activeMenu="Tử vi" className="ch-tu ch-tv">
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tử vi", href: "/tu-vi/" }, { label: `Tuổi ${cg.ten}` }]}
        crumbJsonLd={false}
        eyebrow={`Ngày ${info.canChi.day.name}`}
        title={`Tử vi tuổi ${cg.ten} hôm nay ${dateLabel}`}
        lead={`Ngày ${info.canChi.day.name} — ${QUAN_HE_LABEL[quanHe]}`}
      >
        <ShareButton
          url={buildShareUrl(`/tu-vi/${slug}/`)}
          title={`Tử vi tuổi ${cg.ten} hôm nay`}
          text={`Tử vi tuổi ${cg.ten} hôm nay ${dateLabel} – xem đầy đủ tại Lịch Âm.`}
        />
      </ChHero>

      <div className="ch-wrap ch-main ch-stack">
        <section className="ch-card tu-profile" aria-labelledby="tv-info-h">
          <div className="tuoi-medal">
            <ConGiapArt chiSlug={cg.slug} ten={cg.ten} so={cg.chiIndex + 1} className="tuoi-medal-art" />
            <b>Tuổi {cg.ten}</b>
            {coNoiDung && (
              <span className="tv-stars lg" aria-label={`${entry?.diem ?? 0} trên 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <i className={n <= (entry?.diem ?? 0) ? "on" : undefined} key={n} />
                ))}
              </span>
            )}
          </div>
          <div className="tuoi-facts">
            <h2 className="tu-sec-h" id="tv-info-h">
              Thông tin tuổi {cg.ten}
            </h2>
            {coNoiDung && (
              <>
                <p className="tv-ai">Phần luận do máy viết riêng cho ngày này, mang tính tham khảo</p>
                <p className="tv-luan">{entry?.luan}</p>
              </>
            )}
            <TuoiFact k="Năm sinh" v={years.join(" · ")} />
            <TuoiFact k="Quan hệ với ngày" v={QUAN_HE_LABEL[quanHe]} />
            <TuoiFact k="Can chi ngày" v={info.canChi.day.name} />
          </div>
        </section>

        {coNoiDung && (
          <TuSec title="Giờ tốt nhất trong ngày">
            <ul className="tu-hk">
              <li>
                <span className="k">Khung giờ</span>
                <span className="v">{entry?.gioTot}</span>
              </li>
              <li>
                <span className="k">Can chi ngày</span>
                <span className="v">{info.canChi.day.name}</span>
              </li>
            </ul>
          </TuSec>
        )}

        <section className="lc-related" aria-labelledby="tv-nam-h">
          <h2 className="ch-h2" id="tv-nam-h">
            Tử vi tuổi {cg.ten} theo năm
          </h2>
          <div className="chips">
            <Link className="chip hot" href={`/tu-vi/${cg.slug}/${today.year}/`}>
              Năm {today.year}
            </Link>
            {today.year + 1 <= YEAR_END && (
              <Link className="chip" href={`/tu-vi/${cg.slug}/${today.year + 1}/`}>
                Năm {today.year + 1}
              </Link>
            )}
            <Link className="chip" href={`/tuoi/${cg.slug}/`}>
              Tuổi {cg.ten}
            </Link>
          </div>
        </section>

        <section className="lc-related" aria-labelledby="tv-khac-h">
          <h2 className="ch-h2" id="tv-khac-h">
            Tử vi các tuổi khác hôm nay
          </h2>
          <div className="chips">
            {khac.map((c) => (
              <Link className="chip" href={`/tu-vi/${c.slug}/`} key={c.slug}>
                {c.ten}
              </Link>
            ))}
          </div>
        </section>
        <TraditionalDisclaimer />
      </div>
    </ChShell>
  );
}
