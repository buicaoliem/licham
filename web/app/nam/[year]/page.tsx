import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { YearCalendar } from "@/components/calendar/YearCalendar";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { HERITAGE_SLOTS } from "@/lib/heritage-assets";
import { Icon } from "@/components/heritage/Icon";
import { LcCard, LcDate, LcPager, LcRelated } from "@/components/lich/LichParts";
import { LichPicker } from "@/components/lich/LichPicker";
import { LichTodayMarker } from "@/components/lich/LichTodayMarker";
import { getCalendarYear } from "@/lib/calendar/calendar-year";
import { yearMonths } from "@/lib/calendar/lich-view";
import { generateCalendarYearMetadata } from "@/lib/calendar/metadata";
import { canPublishYear } from "@/lib/calendar/policy";
import { SUPPORTED_RANGE } from "@/lib/calendar/config";
import { dayHref, monthHref, parseYearSlug, yearHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import { getVietnamToday } from "@/lib/today";
import type { SolarDate } from "@licham/core";

export function generateStaticParams() {
  return Array.from({ length: SUPPORTED_RANGE.end - SUPPORTED_RANGE.start + 1 }, (_, i) => ({ year: String(SUPPORTED_RANGE.start + i) }));
}

export const dynamicParams = true;

function load(slug: string) {
  const year = parseYearSlug(slug);
  return year !== null && canPublishYear(year) ? getCalendarYear(year) : null;
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const cal = load((await params).year);
  return cal ? generateCalendarYearMetadata(cal.year, cal.canChiYear.name) : {};
}

const fmt = (d: SolarDate) => `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const cal = load((await params).year);
  if (!cal) notFound();
  const { year } = cal;
  const hasPrev = canPublishYear(year - 1);
  const hasNext = canPublishYear(year + 1);
  const months = yearMonths(year, getVietnamToday());
  const leapSolar = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  return (
    <ChShell activeMenu="Lịch tháng" className="ch-lich">
      <ChHero
        className="lc-hero"
        art={{ src: HERITAGE_SLOTS.heroLichNam.path, label: HERITAGE_SLOTS.heroLichNam.spec }}
        extraFullWidth
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: `Lịch âm năm ${year}` }]}
        title={<>Lịch âm năm {year}</>}
        lead={
          <>
            Năm {cal.canChiYear.name} · Tết Nguyên đán rơi vào <Link href={dayHref(cal.tet)}>{fmt(cal.tet)}</Link>
            {cal.leapMonth ? ` · năm nhuận, nhuận tháng ${cal.leapMonth} âm lịch` : " · không có tháng nhuận"}
          </>
        }
      >
        <ul className="lc-hero-facts">
          <li>
            <Icon name="yinyang" size={16} />
            Năm âm lịch {cal.canChiYear.name}
          </li>
          <li>
            <Icon name="calendar" size={16} />
            {leapSolar ? "Năm nhuận dương lịch, 366 ngày (tháng 2 có 29 ngày)" : "Năm dương lịch 365 ngày"}
          </li>
          <li>
            <Icon name="sun" size={16} />
            {cal.solarTerms.length} tiết khí · {cal.holidays.length} ngày nghỉ lễ
          </li>
        </ul>
      </ChHero>

      <div className="ch-wrap ch-main lc-main">
        <section className="lc-cal ly-wrap" aria-labelledby="ly-h">
          <div className="lc-bar">
            <div className="lc-bar-nav">
              {hasPrev ? (
                <Link className="lc-arrow" href={yearHref(year - 1)} aria-label={`Năm ${year - 1}`}>
                  <Icon name="chevron" size={18} className="flip" />
                </Link>
              ) : (
                <span className="lc-arrow off" />
              )}
              <h2 className="lc-bar-t" id="ly-h">
                12 tháng <span>năm {year}</span>
              </h2>
              {hasNext ? (
                <Link className="lc-arrow" href={yearHref(year + 1)} aria-label={`Năm ${year + 1}`}>
                  <Icon name="chevron" size={18} />
                </Link>
              ) : (
                <span className="lc-arrow off" />
              )}
            </div>
            <LichPicker mode="year" year={year} range={SUPPORTED_RANGE} />
          </div>
          <nav className="ly-jump" aria-label="Chuyển nhanh tới tháng">
            {months.map((m) => (
              <a key={m.month} href={`#thang-${m.month}`}>
                T{m.month}
              </a>
            ))}
          </nav>
          <YearCalendar year={year} canChi={cal.canChiYear.name} months={months} />
          <ul className="lc-legend" aria-label="Chú thích">
            <li>
              <i className="k-today" />
              Hôm nay
            </li>
            <li>
              <i className="m-hd" />
              Hoàng đạo
            </li>
            <li>
              <i className="m-m1" />
              Mùng một (ghi ngày/tháng âm)
            </li>
            <li>
              <i className="m-ram" />
              Rằm
            </li>
            <li>
              <i className="m-le" />
              Ngày lễ
            </li>
            <li>
              <i className="m-tk" />
              Tiết khí
            </li>
          </ul>
          <LichTodayMarker scope=".ly-grid" />
        </section>

        <div className="lc-duo">
          <LcCard icon="flame" title="Ngày lễ chính" sub="Ngày nghỉ lễ theo quy định" id="ly-le-h">
            <ul className="lc-rows">
              {cal.holidays.map((h) => (
                <li key={h.slug} className="lc-row two">
                  <LcDate day={h.date.day} sub={`${pad2(h.date.month)}/${h.date.year}`} />
                  <span className="b">
                    <Link href={`/le/${h.slug}/`}>
                      <b>{h.name}</b>
                    </Link>
                    <small>
                      <Link href={dayHref(h.date)}>{fmt(h.date)}</Link>
                    </small>
                  </span>
                </li>
              ))}
            </ul>
          </LcCard>
          <LcCard icon="sun" tone="jade" title="Các mốc tiết khí" sub="Ngày bắt đầu mỗi tiết" id="ly-tk-h">
            <ul className="lc-terms">
              {cal.solarTerms.map((t) => (
                <li key={t.name}>
                  <span>{t.name}</span>
                  <Link href={dayHref(t.date)}>{fmt(t.date)}</Link>
                </li>
              ))}
            </ul>
            <p className="lc-note">Tiết khí tính theo thiên văn, giờ Việt Nam (UTC+7).</p>
          </LcCard>
        </div>

        <LcPager
          label="Điều hướng năm"
          prev={hasPrev ? { href: yearHref(year - 1), text: `Năm ${year - 1}`, sub: "Năm trước" } : null}
          mid={{ href: monthHref(1, year), text: `Tháng 1/${year}` }}
          next={hasNext ? { href: yearHref(year + 1), text: `Năm ${year + 1}`, sub: "Năm sau" } : null}
        />
        <LcRelated
          links={[
            { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/" },
            { label: "Xem ngày tốt", href: "/xem-ngay-tot/" },
            { label: "Ngày lễ", href: "/le/" },
          ]}
        />
        <TraditionalDisclaimer compact />
      </div>
    </ChShell>
  );
}
