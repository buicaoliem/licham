import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MonthFaq } from "@/components/MonthFaq";
import { MonthSummaryCards } from "@/components/MonthSummaryCards";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { LichMonthCalendar } from "@/components/lich/LichMonthCalendar";
import { LcCard, LcDate, LcPager, LcRelated } from "@/components/lich/LichParts";
import { LichPicker } from "@/components/lich/LichPicker";
import { generateCalendarMonthMetadata } from "@/lib/calendar/metadata";
import { canPublishMonth } from "@/lib/calendar/policy";
import { getVietnamToday } from "@/lib/today";
import { prebuildMonthSlugs } from "@/lib/calendar/prebuild";
import { dayHref, monthHref, parseMonthSlug, yearHref } from "@/lib/calendar/urls";
import { getMonthCells } from "@/lib/calendar/calendar-month";
import { type DayBrief, dateKey, dayBrief, lichCells, notableDays, termsOfMonth } from "@/lib/calendar/lich-view";
import { SUPPORTED_RANGE } from "@/lib/calendar/config";
import { pad2 } from "@/lib/format";
import { getMonthSummary } from "@/lib/month-summary";

/** Chỉ dựng sẵn 36 tháng quanh hôm nay; các tháng khác dựng lúc có người truy cập đầu tiên. */
export function generateStaticParams() {
  return prebuildMonthSlugs(getVietnamToday().year).map((ym) => ({ ym }));
}

export const dynamicParams = true;
/** Ô "hôm nay" trên lưới tháng đổi theo ngày nên trang được dựng lại tối đa mỗi 24 giờ (phía trình duyệt đặt lại theo giờ Việt Nam). */
export const revalidate = 86400;

function parse(slug: string) {
  const p = parseMonthSlug(slug);
  return p && canPublishMonth(p.month, p.year) ? p : null;
}

export async function generateMetadata({ params }: { params: Promise<{ ym: string }> }): Promise<Metadata> {
  const p = parse((await params).ym);
  return p ? generateCalendarMonthMetadata(p.month, p.year) : {};
}

export default async function MonthPage({ params }: { params: Promise<{ ym: string }> }) {
  const p = parse((await params).ym);
  if (!p) notFound();
  const { month, year } = p;

  const today = getVietnamToday();
  const summary = getMonthSummary(getMonthCells(month, year, today));
  const cells = lichCells(month, year, today);
  const inMonth = cells.filter((c) => c.inMonth);
  const briefs: Record<string, DayBrief> = {};
  for (const c of inMonth) briefs[c.key] = dayBrief(c);
  const first = briefs[inMonth[0]!.key]!;
  const last = briefs[inMonth[inMonth.length - 1]!.key]!;
  const notable = notableDays(cells);
  const terms = termsOfMonth(month, year);

  const prev = month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year };
  const next = month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year };
  const hasPrev = canPublishMonth(prev.month, prev.year);
  const hasNext = canPublishMonth(next.month, next.year);
  const lunarYears = first.canChiYear === last.canChiYear ? `năm ${first.canChiYear}` : `năm ${first.canChiYear} – ${last.canChiYear}`;

  const header = (
    <div className="lc-bar">
      <div className="lc-bar-nav">
        {hasPrev ? (
          <Link className="lc-arrow" href={monthHref(prev.month, prev.year)} aria-label={`Tháng ${prev.month}/${prev.year}`}>
            <Icon name="chevron" size={18} className="flip" />
          </Link>
        ) : (
          <span className="lc-arrow off" />
        )}
        <p className="lc-bar-t">
          Tháng {month} <span>năm {year}</span>
        </p>
        {hasNext ? (
          <Link className="lc-arrow" href={monthHref(next.month, next.year)} aria-label={`Tháng ${next.month}/${next.year}`}>
            <Icon name="chevron" size={18} />
          </Link>
        ) : (
          <span className="lc-arrow off" />
        )}
      </div>
      <LichPicker mode="month" month={month} year={year} range={SUPPORTED_RANGE} />
    </div>
  );

  return (
    <ChShell activeMenu="Lịch tháng" className="ch-lich">
      <ChHero
        className="lc-hero"
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Lịch âm", href: yearHref(year) },
          { label: `Tháng ${month} năm ${year}` },
        ]}
        title={
          <>
            Lịch âm tháng {month} năm {year}
          </>
        }
        lead="Tra cứu ngày âm dương, can chi, ngày hoàng đạo, ngày lễ và tiết khí trong tháng. Chọn một ngày để xem tóm tắt nhanh."
      >
        <ul className="lc-hero-facts">
          <li>
            <Icon name="yinyang" size={16} />
            Âm lịch từ {inMonth[0]!.lunarLabel.replace("N", " nhuận")} đến {inMonth[inMonth.length - 1]!.lunarLabel.replace("N", " nhuận")}, {lunarYears}
          </li>
          <li>
            <Icon name="clover" size={16} />
            {summary.goodDaysCount} ngày hoàng đạo / {summary.totalDays} ngày
          </li>
          {terms.length > 0 && (
            <li>
              <Icon name="sun" size={16} />
              Tiết {terms.map((t) => t.name).join(", ")}
            </li>
          )}
        </ul>
      </ChHero>

      <div className="ch-wrap ch-main lc-main">
        <LichMonthCalendar cells={cells} briefs={briefs} todayKey={dateKey(today)} header={header} />

        <div className="lc-trio">
          <LcCard icon="calendar" title="Ngày đáng chú ý trong tháng" sub="Mùng một, rằm và ngày lễ" id="lc-notable-h">
            {notable.length > 0 ? (
              <ul className="lc-rows">
                {notable.map((n) => (
                  <li key={n.key}>
                    <Link href={n.leHref ?? n.href} className="lc-row">
                      <LcDate day={n.day} sub={`${n.lunarLabel.replace("N", "")} ÂL`} tone={n.kind === "le" ? "son" : "gold"} />
                      <span className="b">
                        <b>{n.title}</b>
                        <small>
                          {pad2(n.day)}/{pad2(n.month)}/{year} dương lịch
                        </small>
                      </span>
                      <Icon name="chevron" size={16} className="arr" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="lc-empty">Tháng này không có mùng một, rằm hay ngày lễ trong dữ liệu.</p>
            )}
          </LcCard>

          <div className="lc-trio-side">
          <LcCard icon="sun" tone="jade" title="Tiết khí trong tháng" sub="Giờ bắt đầu theo giờ Việt Nam (UTC+7)" id="lc-terms-h">
            {terms.length > 0 ? (
              <ul className="lc-rows">
                {terms.map((t) => (
                  <li key={t.name}>
                    <Link href={dayHref(t.date)} className="lc-row">
                      <LcDate day={t.date.day} sub={`${pad2(t.date.month)}/${t.date.year}`} tone="jade" />
                      <span className="b">
                        <b>{t.name}</b>
                        <small>
                          Bắt đầu {t.time} ngày {pad2(t.date.day)}/{pad2(t.date.month)} · kinh độ Mặt Trời {t.longitude}°
                        </small>
                      </span>
                      <Icon name="chevron" size={16} className="arr" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="lc-empty">Không có tiết khí bắt đầu trong tháng này.</p>
            )}
            <Link className="ch-more lc-card-more" href="/kien-thuc/tiet-khi/">
              24 tiết khí là gì? <Icon name="arrow" size={14} />
            </Link>
          </LcCard>

          <LcCard icon="book" tone="gold" title="Lịch các tháng khác" sub={`Năm ${year}`} id="lc-months-h">
            <ul className="lc-months">
              {Array.from({ length: 12 }, (_, i) => (
                <li key={i}>
                  {i + 1 === month ? (
                    <span className="on" aria-current="page">
                      Tháng {i + 1}
                    </span>
                  ) : (
                    <Link href={monthHref(i + 1, year)}>Tháng {i + 1}</Link>
                  )}
                </li>
              ))}
            </ul>
            <Link className="ch-more lc-card-more" href={yearHref(year)}>
              Xem lịch cả năm {year} <Icon name="arrow" size={14} />
            </Link>
          </LcCard>
          </div>
        </div>

        <MonthSummaryCards month={month} year={year} summary={summary} />

        <LcPager
          label="Điều hướng tháng"
          prev={hasPrev ? { href: monthHref(prev.month, prev.year), text: `Tháng ${prev.month}/${prev.year}`, sub: "Tháng trước" } : null}
          mid={{ href: yearHref(year), text: `Lịch năm ${year}` }}
          next={hasNext ? { href: monthHref(next.month, next.year), text: `Tháng ${next.month}/${next.year}`, sub: "Tháng sau" } : null}
        />

        <MonthFaq month={month} year={year} summary={summary} />
        <LcRelated
          links={[
            { label: `Lịch năm ${year}`, href: yearHref(year) },
            { label: "Ngày tốt cưới hỏi", href: "/xem-ngay-tot/cuoi-hoi/" },
            { label: "Ngày tốt khai trương", href: "/xem-ngay-tot/khai-truong/" },
            { label: "Ngày tốt động thổ", href: "/xem-ngay-tot/dong-tho/" },
            { label: "Văn khấn mùng một, rằm", href: "/van-khan/mung-mot-ngay-ram/" },
            { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/" },
            { label: "Đếm ngược Tết", href: "/countdown/tet/" },
          ]}
        />
        <TraditionalDisclaimer compact />
      </div>
    </ChShell>
  );
}
