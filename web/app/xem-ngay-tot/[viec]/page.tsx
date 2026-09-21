import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShareButton } from "@/components/ShareButton";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { XemNgayTotFinder } from "@/components/XemNgayTotFinder";
import { MONTH_WORD } from "@/lib/format";
import { buildShareUrl } from "@/lib/share";
import { getVietnamToday } from "@/lib/today";
import { VIEC_LIST, bestMonthOfYear, viecBySlug } from "@/lib/xem-ngay-tot";

export function generateStaticParams() {
  return VIEC_LIST.map((v) => ({ viec: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ viec: string }> }): Promise<Metadata> {
  const { viec: slug } = await params;
  const viec = viecBySlug(slug);
  if (!viec) return {};
  const year = getVietnamToday().year;
  return {
    title: `Xem ngày tốt ${viec.label} năm ${year} — Chọn ngày hợp tuổi | Lịch Âm`,
    description: `Chấm điểm và xếp hạng ngày tốt xấu cho việc ${viec.label} năm ${year}, dựa trên hoàng đạo, sao tốt xấu và ngày đại kỵ.`,
    alternates: { canonical: `/xem-ngay-tot/${slug}/` },
  };
}

export default async function XemNgayTotPage({ params }: { params: Promise<{ viec: string }> }) {
  const { viec: slug } = await params;
  const viec = viecBySlug(slug);
  if (!viec) notFound();

  const year = getVietnamToday().year;
  const bestMonth = bestMonthOfYear(viec, year);

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem ngày tốt" />

        <div className="band">
          <div className="bg bg-luc" />
          <div className="band-in">
            <div className="crumb" style={{ color: "inherit", marginBottom: 10 }}>
              <Link href="/">Trang chủ</Link> › <Link href="/xem-ngay-tot/">Xem ngày tốt</Link> › {viec.label} {year}
            </div>
            <h1>Xem ngày tốt {viec.label} năm {year}</h1>
            <p>{viec.tagline}</p>
            <div className="share-row">
              <ShareButton
                variant="onband"
                url={buildShareUrl(`/xem-ngay-tot/${viec.slug}/`)}
                title={`Xem ngày tốt ${viec.label} năm ${year}`}
                text={`Xem ngày tốt ${viec.label} năm ${year} – danh sách ngày đẹp tại Lịch Âm.`}
              />
            </div>
          </div>
        </div>

        <div className="body">
          <p style={{ maxWidth: 720, margin: "0 auto 22px", textAlign: "center", color: "var(--ink-2)", fontSize: 14.5 }}>
            {viec.intro}
          </p>

          <h2 className="hh">Xem ngày cho việc khác</h2>
          <div className="chips">
            {VIEC_LIST.map((v) =>
              v.slug === viec.slug ? (
                <span className="chip hot" key={v.slug}>
                  Ngày tốt {v.label}
                </span>
              ) : (
                <Link className="chip" href={`/xem-ngay-tot/${v.slug}/`} key={v.slug}>
                  Ngày tốt {v.label}
                </Link>
              ),
            )}
          </div>

          <div style={{ marginTop: 22 }} />

          <XemNgayTotFinder viec={viec} />

          <div className="box" style={{ marginTop: 16 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t">Cách chấm điểm</span>
              <span className="rule" />
            </div>
            <div className="row">
              <span>Hoàng đạo hay hắc đạo</span>
              <span>30 điểm</span>
            </div>
            <div className="row">
              <span>Sao tốt hợp việc {viec.label}</span>
              <span>Mỗi sao 8 điểm, tối đa 25</span>
            </div>
            <div className="row">
              <span>Sao xấu kỵ việc {viec.label}</span>
              <span>Mỗi sao trừ 8 điểm, tối đa trừ 25</span>
            </div>
            <div className="row">
              <span>Không xung tuổi</span>
              <span>25 điểm</span>
            </div>
            <div className="row">
              <span>Không phạm ngày đại kỵ</span>
              <span>20 điểm</span>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <h2 className="hh">Câu hỏi thường gặp</h2>
            <div className="box faqs">
              <div className="faq">
                <b>Xem ngày tốt {viec.label} dựa trên những yếu tố nào?</b>
                <p>
                  Dựa trên bốn yếu tố: ngày hoàng đạo hay hắc đạo, các sao tốt xấu hợp hay kỵ việc {viec.label}, tuổi của
                  người xem có xung với ngày hay không, và ngày có phạm các ngày đại kỵ như Tam nương, Nguyệt kỵ hay
                  không. Mỗi yếu tố chấm theo thang điểm nêu ở trên, cộng lại thành điểm trên 100.
                </p>
              </div>
              <div className="faq">
                <b>Ngày hoàng đạo có phải lúc nào cũng tốt để {viec.label} không?</b>
                <p>
                  Không hẳn. Ngày hoàng đạo chỉ là một trong bốn yếu tố chấm điểm. Một ngày hoàng đạo vẫn có thể bị trừ
                  điểm nếu có sao xấu kỵ việc {viec.label}, hoặc rơi vào ngày Tam nương, Nguyệt kỵ.
                </p>
              </div>
              <div className="faq">
                <b>Tháng nào trong năm hợp {viec.label} nhất?</b>
                <p>
                  Theo tính toán trên dữ liệu ngày của năm {year}, tháng {MONTH_WORD[bestMonth.month - 1]} (tháng{" "}
                  {bestMonth.month}) có điểm trung bình cao nhất, khoảng {Math.round(bestMonth.avgScore)} điểm, nên là
                  tháng đáng cân nhắc nhất trong năm cho việc {viec.label}.
                </p>
              </div>
              <div className="faq">
                <b>Có nên kiêng ngày Tam nương và Nguyệt kỵ không?</b>
                <p>
                  Nên tránh nếu có thể. Đây là hai loại ngày đại kỵ được dân gian lưu truyền lâu đời, áp dụng cho việc
                  lớn nói chung. Trang này trừ 20 điểm cho những ngày rơi vào Tam nương (mùng 3, 7, 13, 18, 22, 27 âm
                  lịch) hoặc Nguyệt kỵ (mùng 5, 14, 23 âm lịch).
                </p>
              </div>
              {viec.extraFaqs.map((f) => (
                <div className="faq" key={f.q}>
                  <b>{f.q}</b>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <TraditionalDisclaimer />
        </div>

        <Footer />
      </div>
    </div>
  );
}
