import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CHI, getDayInfo, jdFromDate, jdToDate } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { bestHours, joinVi, ltpPairs, viecFaqs } from "@/lib/day-detail";
import { dateToSlug, slugToDate } from "@/lib/date-slug";
import { holidaysOnDate } from "@/lib/le-date-engine";
import { monthToSlug } from "@/lib/month-slug";
import { MONTH_WORD, WEEKDAY_LONG, pad2 } from "@/lib/format";
import { YEAR_END, YEAR_START } from "@/lib/site-years";

export function generateStaticParams() {
  const start = jdFromDate(1, 1, YEAR_START);
  const end = jdFromDate(31, 12, YEAR_END);
  const params: { slug: string }[] = [];
  for (let jd = start; jd <= end; jd++) {
    params.push({ slug: dateToSlug(jdToDate(jd)) });
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { alternates: { canonical: `/ngay/${slug}/` } };
}

function capitalizeEachWord(s: string): string {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function DayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const date = slugToDate(slug);
  if (!date || date.year < YEAR_START || date.year > YEAR_END) notFound();

  const info = getDayInfo(date);
  const { day, month, year } = date;

  const prevDate = jdToDate(jdFromDate(day, month, year) - 1);
  const nextDate = jdToDate(jdFromDate(day, month, year) + 1);
  const hasPrev = prevDate.year >= YEAR_START;
  const hasNext = nextDate.year <= YEAR_END;

  const hoangDaoHours = info.hours.filter((h) => h.isHoangDao);
  const hacDaoHours = info.hours.filter((h) => !h.isHoangDao);

  const saoTot = info.saoTot ?? [];
  const saoXau = info.saoXau ?? [];

  const ngayLabel = `${pad2(day)}/${pad2(month)}/${year}`;
  const isHoangDaoNgay = info.thanSatNgay.isHoangDao;
  const lunarMonthWord = `${MONTH_WORD[info.lunar.month - 1]}${info.lunar.isLeapMonth ? " nhuận" : ""}`;

  const pairs = ltpPairs(info);
  const best = bestHours(info, CHI);
  const viec = viecFaqs(info);
  const holidaysToday = holidaysOnDate(date);

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Lịch tháng" />

        <div className="dhead">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <b>Lịch tháng {month} năm {year}</b> › Ngày {ngayLabel}
          </div>
          <h1 className="dh1">Ngày {ngayLabel} là ngày gì? Tốt hay xấu?</h1>
          <p className="dsub">
            {capitalizeEachWord(WEEKDAY_LONG[info.solar.dayOfWeek]!)}, ngày {day} tháng {month} năm {year} dương lịch, nhằm
            ngày {info.lunar.day} tháng {lunarMonthWord} năm {info.canChi.year.name} âm lịch
          </p>
          <div className="pills">
            <span className={isHoangDaoNgay ? "pill k" : "pill r"}>{isHoangDaoNgay ? "Ngày hoàng đạo" : "Ngày hắc đạo"}</span>
            <span className="pill k">Trực {info.truc.name}</span>
            <span className="pill k">Tiết {info.solarTerm.name}</span>
          </div>
          {holidaysToday.length > 0 && (
            <p className="dsub" style={{ marginTop: 10 }}>
              Hôm nay là:{" "}
              {holidaysToday.map((h, i) => (
                <span key={h.slug}>
                  {i > 0 && ", "}
                  <Link href={`/le/${h.slug}`}>{h.ten}</Link>
                </span>
              ))}
            </p>
          )}
        </div>

        <div className="body">
          <div className="cols2">
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Thông tin ngày</span>
                <span className="rule" />
              </div>
              <div className="row">
                <span>Can chi ngày</span>
                <span>{info.canChi.day.name}</span>
              </div>
              <div className="row">
                <span>Can chi tháng</span>
                <span>{info.canChi.month.name}</span>
              </div>
              <div className="row">
                <span>Can chi năm</span>
                <span>{info.canChi.year.name}</span>
              </div>
            </div>

            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Giờ hoàng đạo</span>
                <span className="rule" />
              </div>
              <div className="hours">
                {hoangDaoHours.map((h) => (
                  <div key={h.chiIndex} className="hc">
                    <b>{CHI[h.chiIndex]}</b>
                    <i>
                      {Number.parseInt(h.start, 10)}h – {Number.parseInt(h.end, 10)}h
                    </i>
                  </div>
                ))}
              </div>
              <div className="box-h" style={{ margin: "16px 0 13px" }}>
                <span className="rule" />
                <span className="t">Giờ hắc đạo</span>
                <span className="rule" />
              </div>
              <div className="hours">
                {hacDaoHours.map((h) => (
                  <div key={h.chiIndex} className="hc bad">
                    <b>{CHI[h.chiIndex]}</b>
                    <i>
                      {Number.parseInt(h.start, 10)}h – {Number.parseInt(h.end, 10)}h
                    </i>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {(saoTot.length > 0 || saoXau.length > 0) && (
            <div className="cols2" style={{ marginTop: 16 }}>
              {saoTot.length > 0 && (
                <div className="box" style={saoXau.length === 0 ? { gridColumn: "1 / -1" } : undefined}>
                  <div className="box-h">
                    <span className="rule" />
                    <span className="t">Sao tốt · việc nên làm</span>
                    <span className="rule" />
                  </div>
                  {saoTot.map((s) => (
                    <div key={s.name} className="star g">
                      <b>{s.name}</b>
                      <p>{s.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {saoXau.length > 0 && (
                <div className="box" style={saoTot.length === 0 ? { gridColumn: "1 / -1" } : undefined}>
                  <div className="box-h">
                    <span className="rule" />
                    <span className="t">Sao xấu · việc nên kiêng</span>
                    <span className="rule" />
                  </div>
                  {saoXau.map((s) => (
                    <div key={s.name} className="star x">
                      <b>{s.name}</b>
                      <p>{s.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="cols2" style={{ marginTop: 16 }}>
            <div className="box" style={pairs.length === 0 ? { gridColumn: "1 / -1" } : undefined}>
              <div className="box-h">
                <span className="rule" />
                <span className="t">Hướng xuất hành và thông tin ngày</span>
                <span className="rule" />
              </div>
              {info.hyThan && (
                <div className="row">
                  <span>Hỷ thần</span>
                  <span>Hướng {info.hyThan.direction.toLowerCase()}</span>
                </div>
              )}
              {info.taiThan && (
                <div className="row">
                  <span>Tài thần</span>
                  <span>Hướng {info.taiThan.direction.toLowerCase()}</span>
                </div>
              )}
              {info.khongMinh && (
                <div className="row">
                  <span>Khổng Minh lục diệu</span>
                  <span>
                    {info.khongMinh.name} — {info.khongMinh.isGood ? "tốt" : "xấu"}
                  </span>
                </div>
              )}
              {info.nhiThapBatTu && (
                <div className="row">
                  <span>Nhị thập bát tú</span>
                  <span>
                    Sao {info.nhiThapBatTu.name} — {info.nhiThapBatTu.isGood ? "tốt" : "xấu"}
                  </span>
                </div>
              )}
              <div className="row">
                <span>Ngũ hành ngày</span>
                <span>{info.canChi.day.napAm.name}</span>
              </div>
              <div className="row">
                <span>Tiết khí</span>
                <span>{info.solarTerm.name}</span>
              </div>
              <div className="row">
                <span>Trực</span>
                <span>{info.truc.name}</span>
              </div>
            </div>
            {pairs.length > 0 && (
              <div className="box">
                <div className="box-h">
                  <span className="rule" />
                  <span className="t">Giờ xuất hành theo Lý Thuần Phong</span>
                  <span className="rule" />
                </div>
                {pairs.map((p, i) => (
                  <div key={p.name + i} className="row" style={i > 0 ? { borderTop: "1px solid var(--line-2)", paddingTop: 11 } : undefined}>
                    <span>
                      {p.aLabel} · {p.bLabel}
                    </span>
                    <span style={{ color: p.isGood ? "var(--luc)" : "var(--son)" }}>
                      {p.name} — {p.isGood ? "tốt" : "xấu"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 32 }}>
            <h2 className="hh">Câu hỏi thường gặp</h2>
            <div className="box faqs">
            <div className="faq">
              <b>Ngày {ngayLabel} là ngày bao nhiêu âm lịch?</b>
              <p>
                Là ngày {info.lunar.day} tháng {lunarMonthWord} năm {info.canChi.year.name}, tức ngày {info.canChi.day.name}{" "}
                tháng {info.canChi.month.name}.
              </p>
            </div>
            <div className="faq">
              <b>Ngày này là hoàng đạo hay hắc đạo?</b>
              <p>
                {isHoangDaoNgay ? "Hoàng đạo" : "Hắc đạo"}, gặp {info.thanSatNgay.star}. Trực ngày là {info.truc.name}.
              </p>
            </div>
            {best.length > 0 && (
              <div className="faq">
                <b>Giờ nào tốt nhất trong ngày?</b>
                <p>
                  {(() => {
                    const list = joinVi(
                      best.map((b) => `giờ ${b.chiName} từ ${Number.parseInt(b.start, 10)}h đến ${Number.parseInt(b.end, 10)}h`),
                    );
                    const sentence = `${list}, vừa là giờ hoàng đạo vừa trùng khung ${joinVi(Array.from(new Set(best.map((b) => b.ltpName))))}.`;
                    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
                  })()}
                </p>
              </div>
            )}
            {viec.map((f) => (
              <div className="faq" key={f.viec}>
                <b>Ngày {ngayLabel} có hợp {f.viec} không?</b>
                <p
                  style={{
                    color:
                      f.verdict === "thuan" ? "var(--luc)" : f.verdict === "khong-thuan" ? "var(--son)" : "var(--ink-2)",
                  }}
                >
                  {f.verdictLabel}
                </p>
              </div>
            ))}
            </div>

            <div className="pn">
              {hasPrev ? (
                <Link href={`/ngay/${dateToSlug(prevDate)}`}>
                  ‹ Ngày {pad2(prevDate.day)}/{pad2(prevDate.month)}/{prevDate.year}
                </Link>
              ) : (
                <span />
              )}
              {hasNext ? (
                <Link href={`/ngay/${dateToSlug(nextDate)}`}>
                  Ngày {pad2(nextDate.day)}/{pad2(nextDate.month)}/{nextDate.year} ›
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>

          <h2 className="hh" style={{ marginTop: 32 }}>
            Có thể anh cần
          </h2>
          <div className="chips">
            <Link className="chip" href={`/${monthToSlug(month, year)}`}>
              Lịch tháng {month} năm {year}
            </Link>
            <span className="chip">
              Ngày tốt cưới hỏi tháng {month}/{year}
            </span>
            <span className="chip">
              Ngày tốt khai trương tháng {month}/{year}
            </span>
            <span className="chip">
              Rằm tháng {MONTH_WORD[info.lunar.month - 1]} năm {year}
            </span>
            <span className="chip">Tiết {info.solarTerm.name} là gì</span>
            <span className="chip">Tuổi {info.canChi.day.name}</span>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
