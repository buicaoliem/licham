import type { Metadata } from "next";
import Link from "next/link";
import { getDayInfo } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pad2 } from "@/lib/format";
import { CON_GIAP_LIST, birthYearsForChi, getTuViData, parseDateStr } from "@/lib/tu-vi";
import { getVietnamToday } from "@/lib/today";

const today = getVietnamToday();
const data = getTuViData(today);
const displayDate = parseDateStr(data.date);
const info = getDayInfo(displayDate);
const dateLabel = `${pad2(displayDate.day)}/${pad2(displayDate.month)}/${displayDate.year}`;

export const metadata: Metadata = {
  title: `Tử vi hôm nay ${dateLabel} của 12 con giáp | LịchÂm`,
  description: `Tử vi ngày ${info.canChi.day.name} cho cả 12 con giáp: mức đánh giá, giờ tốt nhất và lời luận riêng cho ngày này.`,
  alternates: { canonical: "/tu-vi/" },
};

export default function TuViIndexPage() {
  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Tử vi" />

        <div className="band">
          <div className="bg bg-kim" />
          <div className="band-in">
            <h1>Tử vi hôm nay {dateLabel} của 12 con giáp</h1>
            <p>
              Ngày {info.canChi.day.name}, tháng {info.canChi.month.name}, năm {info.canChi.year.name} — luận theo
              can chi ngày và quan hệ với từng tuổi
            </p>
          </div>
        </div>

        <div className="body">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="aihint">Phần luận do máy viết riêng cho ngày này, mang tính tham khảo</span>
          </div>

          <div className="giap">
            {CON_GIAP_LIST.map((cg) => {
              const entry = data.tuoi[cg.slug];
              const years = birthYearsForChi(cg.chiIndex, today.year);
              return (
                <Link className="gcard" href={`/tu-vi/${cg.slug}/`} key={cg.slug}>
                  <div className="nm">{cg.ten}</div>
                  <div className="yr">{years.join(" · ")}</div>
                  <div className="st">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <i className={n <= (entry?.diem ?? 0) ? "on" : undefined} key={n} />
                    ))}
                  </div>
                  <div className="tx">{entry?.luan}</div>
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: 32 }}>
            <h2 className="hh">Câu hỏi thường gặp</h2>
            <div className="box faqs">
              <div className="faq">
                <b>Tử vi hôm nay dựa trên điều gì?</b>
                <p>
                  Dựa trên can chi của ngày hôm nay và quan hệ giữa chi ngày với chi của từng tuổi — hợp, xung, hình,
                  hại, tam hợp hay lục hợp — không dựa trên giờ sinh hay lá số riêng của từng người.
                </p>
              </div>
              <div className="faq">
                <b>Vì sao mỗi ngày một khác?</b>
                <p>Can chi của ngày đổi theo chu kỳ 60 ngày, nên quan hệ với từng tuổi và lời luận cũng đổi theo.</p>
              </div>
              <div className="faq">
                <b>Có nên tin tuyệt đối không?</b>
                <p>Không. Đây là tham khảo theo phong thủy dân gian, không thay thế cho quyết định thực tế của bạn.</p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
