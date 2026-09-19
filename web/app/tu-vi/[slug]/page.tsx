import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDayInfo } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
    <div className="outer">
      <div className="site">
        <Header activeMenu="Tử vi" />

        <div className="band">
          <div className="bg bg-kim" />
          <div className="band-in">
            <h1>Tử vi tuổi {cg.ten} hôm nay {dateLabel}</h1>
            <p>
              Ngày {info.canChi.day.name} — {QUAN_HE_LABEL[quanHe]}
            </p>
          </div>
        </div>

        <div className="body">
          {coNoiDung && (
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span className="aihint">Phần luận do máy viết riêng cho ngày này, mang tính tham khảo</span>
            </div>
          )}

          {coNoiDung && (
            <div className="box" style={{ marginBottom: 20 }}>
              <div className="st" style={{ justifyContent: "center", marginBottom: 12 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <i className={n <= (entry?.diem ?? 0) ? "on" : undefined} key={n} />
                ))}
              </div>
              <p style={{ textAlign: "center", fontSize: 14.5, color: "var(--ink)", margin: 0 }}>{entry?.luan}</p>
            </div>
          )}

          <div className={coNoiDung ? "tuvi-detail" : undefined}>
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Thông tin tuổi {cg.ten}</span>
                <span className="rule" />
              </div>
              <div className="row">
                <span>Năm sinh</span>
                <span>{years.join(" · ")}</span>
              </div>
              <div className="row">
                <span>Quan hệ với ngày</span>
                <span>{QUAN_HE_LABEL[quanHe]}</span>
              </div>
              <div className="row">
                <span>Can chi ngày</span>
                <span>{info.canChi.day.name}</span>
              </div>
            </div>
            {coNoiDung && (
              <div className="box">
                <div className="box-h">
                  <span className="rule" />
                  <span className="t">Giờ tốt nhất trong ngày</span>
                  <span className="rule" />
                </div>
                <div className="row">
                  <span>Khung giờ</span>
                  <span>{entry?.gioTot}</span>
                </div>
                <div className="row">
                  <span>Can chi ngày</span>
                  <span>{info.canChi.day.name}</span>
                </div>
              </div>
            )}
          </div>

          <h2 className="hh" style={{ marginTop: 28 }}>
            Tử vi tuổi {cg.ten} theo năm
          </h2>
          <div className="chips">
            <Link className="chip hot" href={`/tu-vi/${cg.slug}/${today.year}`}>
              Năm {today.year}
            </Link>
            {today.year + 1 <= YEAR_END && (
              <Link className="chip" href={`/tu-vi/${cg.slug}/${today.year + 1}`}>
                Năm {today.year + 1}
              </Link>
            )}
            <Link className="chip" href={`/tuoi/${cg.slug}`}>
              Tuổi {cg.ten}
            </Link>
          </div>

          <h2 className="hh" style={{ marginTop: 28 }}>
            Tử vi các tuổi khác hôm nay
          </h2>
          <div className="chips">
            {khac.map((c) => (
              <Link className="chip" href={`/tu-vi/${c.slug}/`} key={c.slug}>
                {c.ten}
              </Link>
            ))}
          </div>
          <TraditionalDisclaimer />
        </div>

        <Footer />
      </div>
    </div>
  );
}
