import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { LcFaq } from "@/components/lich/LichParts";
import { ShareButton } from "@/components/ShareButton";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { XemNgayTotFinder } from "@/components/XemNgayTotFinder";
import { VIEC_ICON } from "@/components/heritage/viecIcon";
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

  const faqs = [
    {
      q: `Xem ngày tốt ${viec.label} dựa trên những yếu tố nào?`,
      a: `Dựa trên bốn yếu tố: ngày hoàng đạo hay hắc đạo, các sao tốt xấu hợp hay kỵ việc ${viec.label}, tuổi của người xem có xung với ngày hay không, và ngày có phạm các ngày đại kỵ như Tam nương, Nguyệt kỵ hay không. Mỗi yếu tố chấm theo thang điểm nêu ở trên, cộng lại thành điểm trên 100.`,
    },
    {
      q: `Ngày hoàng đạo có phải lúc nào cũng tốt để ${viec.label} không?`,
      a: `Không hẳn. Ngày hoàng đạo chỉ là một trong bốn yếu tố chấm điểm. Một ngày hoàng đạo vẫn có thể bị trừ điểm nếu có sao xấu kỵ việc ${viec.label}, hoặc rơi vào ngày Tam nương, Nguyệt kỵ.`,
    },
    {
      q: `Tháng nào trong năm hợp ${viec.label} nhất?`,
      a: `Theo tính toán trên dữ liệu ngày của năm ${year}, tháng ${MONTH_WORD[bestMonth.month - 1]} (tháng ${bestMonth.month}) có điểm trung bình cao nhất, khoảng ${Math.round(bestMonth.avgScore)} điểm, nên là tháng đáng cân nhắc nhất trong năm cho việc ${viec.label}.`,
    },
    {
      q: "Có nên kiêng ngày Tam nương và Nguyệt kỵ không?",
      a: "Nên tránh nếu có thể. Đây là hai loại ngày đại kỵ được dân gian lưu truyền lâu đời, áp dụng cho việc lớn nói chung. Trang này trừ 20 điểm cho những ngày rơi vào Tam nương (mùng 3, 7, 13, 18, 22, 27 âm lịch) hoặc Nguyệt kỵ (mùng 5, 14, 23 âm lịch).",
    },
    ...viec.extraFaqs,
  ];

  return (
    <ChShell activeMenu="Xem ngày tốt" className="ch-cc ch-xnt">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem ngày tốt", href: "/xem-ngay-tot/" }, { label: `${viec.label} ${year}` }]}
        crumbJsonLd={false}
        title={`Xem ngày tốt ${viec.label} năm ${year}`}
        lead={viec.tagline}
      >
        <ShareButton
          url={buildShareUrl(`/xem-ngay-tot/${viec.slug}/`)}
          title={`Xem ngày tốt ${viec.label} năm ${year}`}
          text={`Xem ngày tốt ${viec.label} năm ${year} – danh sách ngày đẹp tại Lịch Âm.`}
        />
      </ChHero>

      <div className="ch-wrap ch-main ch-stack">
        <div className="ch-layout xn-layout">
          <div className="ch-stack xn-main">
            <p className="xn-intro">
              <span className="ic" aria-hidden="true">
                <Icon name={VIEC_ICON[viec.slug] ?? "calendar"} size={22} />
              </span>
              {viec.intro}
            </p>
            <XemNgayTotFinder viec={viec} />
          </div>

          <aside className="ch-side xn-side">
            <section className="ch-sidebox">
              <h2 className="ch-sidebox-h jade">
                <Icon name="list" size={18} />
                Cách chấm điểm
              </h2>
              <div className="ch-sidebox-b">
                <dl className="ch-facts xn-rules">
                  <dt>Hoàng đạo hay hắc đạo</dt>
                  <dd>30 điểm</dd>
                  <dt>Sao tốt hợp việc {viec.label}</dt>
                  <dd>Mỗi sao 8 điểm, tối đa 25</dd>
                  <dt>Sao xấu kỵ việc {viec.label}</dt>
                  <dd>Mỗi sao trừ 8 điểm, tối đa trừ 25</dd>
                  <dt>Không xung tuổi</dt>
                  <dd>25 điểm</dd>
                  <dt>Không phạm ngày đại kỵ</dt>
                  <dd>20 điểm</dd>
                </dl>
              </div>
            </section>

            <section className="ch-sidebox">
              <h2 className="ch-sidebox-h gold">
                <Icon name="calendar" size={18} />
                Xem ngày cho việc khác
              </h2>
              <div className="ch-sidebox-b">
                <ul className="ch-linklist">
                  {VIEC_LIST.map((v) =>
                    v.slug === viec.slug ? (
                      <li className="on" key={v.slug}>
                        <span aria-current="page">Ngày tốt {v.label}</span>
                      </li>
                    ) : (
                      <li key={v.slug}>
                        <Link href={`/xem-ngay-tot/${v.slug}/`}>
                          Ngày tốt {v.label}
                          <Icon name="chevron" size={15} className="arr" />
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </section>
          </aside>
        </div>

        <LcFaq items={faqs} />
        <TraditionalDisclaimer />
      </div>
    </ChShell>
  );
}
