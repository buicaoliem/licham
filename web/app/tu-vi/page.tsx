import type { Metadata } from "next";
import Link from "next/link";
import { getDayInfo } from "@licham/core";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { ConGiapArt } from "@/components/heritage/ConGiapArt";
import { LcFaq } from "@/components/lich/LichParts";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { pad2 } from "@/lib/format";
import { CON_GIAP_LIST, QUAN_HE_LABEL, birthYearsForChi, getTuViData, hasAiContent, parseDateStr, quanHeVoiNgay } from "@/lib/tu-vi";
import { getVietnamToday } from "@/lib/today";

const today = getVietnamToday();
const data = getTuViData(today);
const displayDate = parseDateStr(data.date);
const info = getDayInfo(displayDate);
const dateLabel = `${pad2(displayDate.day)}/${pad2(displayDate.month)}/${displayDate.year}`;
const coNoiDung = hasAiContent(data);

export const metadata: Metadata = {
  title: `Tử vi hôm nay ${dateLabel} của 12 con giáp | Lịch Âm`,
  description: `Tử vi ngày ${info.canChi.day.name} cho cả 12 con giáp: mức đánh giá, giờ tốt nhất và lời luận riêng cho ngày này.`,
  alternates: { canonical: "/tu-vi/" },
};

/** Màu theo quan hệ chi đã có trong dữ liệu: hợp (tam hợp, lục hợp), khắc (xung, hình, hại), còn lại trung tính. */
const TONE: Record<string, string> = { "tam-hop": "g", "luc-hop": "g", xung: "r", hinh: "r", hai: "r" };

export default function TuViIndexPage() {
  return (
    <ChShell activeMenu="Tử vi" className="ch-tu ch-tv">
      <ChHero
        className="tu-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tử vi hôm nay" }]}
        crumbJsonLd={false}
        eyebrow={`Ngày ${info.canChi.day.name}`}
        title={`Tử vi hôm nay ${dateLabel} của 12 con giáp`}
        lead={`Ngày ${info.canChi.day.name}, tháng ${info.canChi.month.name}, năm ${info.canChi.year.name} — luận theo can chi ngày và quan hệ với từng tuổi`}
      >
        {coNoiDung && <p className="tv-ai">Phần luận do máy viết riêng cho ngày này, mang tính tham khảo</p>}
      </ChHero>

      <div className="ch-wrap ch-main ch-stack">
        <ul className="tv-grid">
          {CON_GIAP_LIST.map((cg) => {
            const entry = data.tuoi[cg.slug];
            const years = birthYearsForChi(cg.chiIndex, today.year);
            const quanHe = quanHeVoiNgay(info.canChi.day.chiIndex, cg.chiIndex);
            return (
              <li key={cg.slug}>
                <Link className="tv-card" href={`/tu-vi/${cg.slug}/`}>
                  <ConGiapArt chiSlug={cg.slug} ten={cg.ten} so={cg.chiIndex + 1} className="tv-art" />
                  <span className="tv-b">
                    <b>{cg.ten}</b>
                    <span className="yr">{years.join(" · ")}</span>
                    {coNoiDung ? (
                      <>
                        <span className="tv-stars" aria-label={`${entry?.diem ?? 0} trên 5`}>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <i className={n <= (entry?.diem ?? 0) ? "on" : undefined} key={n} />
                          ))}
                        </span>
                        <span className="tx">{entry?.luan}</span>
                      </>
                    ) : (
                      <span className={`tv-qh ${TONE[quanHe] ?? ""}`}>{QUAN_HE_LABEL[quanHe]}</span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <LcFaq
          items={[
            {
              q: "Tử vi hôm nay dựa trên điều gì?",
              a: "Dựa trên can chi của ngày hôm nay và quan hệ giữa chi ngày với chi của từng tuổi — hợp, xung, hình, hại, tam hợp hay lục hợp — không dựa trên giờ sinh hay lá số riêng của từng người.",
            },
            { q: "Vì sao mỗi ngày một khác?", a: "Can chi của ngày đổi theo chu kỳ 60 ngày, nên quan hệ với từng tuổi và lời luận cũng đổi theo." },
            { q: "Có nên tin tuyệt đối không?", a: "Không. Đây là tham khảo theo phong thủy dân gian, không thay thế cho quyết định thực tế của bạn." },
          ]}
        />

        <section className="lc-related" aria-labelledby="tv-nam-h">
          <h2 className="ch-h2" id="tv-nam-h">
            Tử vi theo năm {today.year}
          </h2>
          <div className="chips">
            {CON_GIAP_LIST.map((cg) => (
              <Link className="chip" href={`/tu-vi/${cg.slug}/${today.year}/`} key={cg.slug}>
                Tuổi {cg.ten} {today.year}
              </Link>
            ))}
          </div>
        </section>
        <TraditionalDisclaimer />
      </div>
    </ChShell>
  );
}
