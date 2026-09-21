import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { Box } from "@/components/calendar/Box";
import { RelatedLinks } from "@/components/calendar/RelatedLinks";
import { YearCalendar } from "@/components/calendar/YearCalendar";
import { getCalendarYear } from "@/lib/calendar/calendar-year";
import { generateCalendarYearMetadata } from "@/lib/calendar/metadata";
import { canPublishYear } from "@/lib/calendar/policy";
import { SUPPORTED_RANGE } from "@/lib/calendar/config";
import { dayHref, parseYearSlug, yearHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
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

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Lịch tháng" />
        <div className="dhead">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: `Lịch âm năm ${year}` }]} />
          <h1 className="dh1">Lịch âm năm {year}</h1>
          <p className="dsub">
            Năm {cal.canChiYear.name} · Tết Nguyên đán rơi vào <Link href={dayHref(cal.tet)}>{fmt(cal.tet)}</Link>
            {cal.leapMonth ? ` · năm nhuận, nhuận tháng ${cal.leapMonth} âm lịch` : " · không có tháng nhuận"}
          </p>
        </div>

        <div className="body">
          <h2 className="hh">12 tháng dương lịch</h2>
          <YearCalendar year={year} canChi={cal.canChiYear.name} />

          <div className="stack two">
            <Box title="Ngày lễ chính">
              {cal.holidays.map((h) => (
                <div className="row" key={h.slug}>
                  <span>
                    <Link href={`/le/${h.slug}/`}>{h.name}</Link>
                  </span>
                  <span>
                    <Link href={dayHref(h.date)}>{fmt(h.date)}</Link>
                  </span>
                </div>
              ))}
            </Box>
            <Box title="Các mốc tiết khí">
              {cal.solarTerms.map((t) => (
                <div className="row" key={t.name}>
                  <span>{t.name}</span>
                  <span>
                    <Link href={dayHref(t.date)}>{fmt(t.date)}</Link>
                  </span>
                </div>
              ))}
              <p className="src-note">Tiết khí tính theo thiên văn, giờ Việt Nam (UTC+7).</p>
            </Box>
          </div>

          <nav className="pn" aria-label="Điều hướng năm">
            {hasPrev ? <Link href={yearHref(year - 1)}>← Năm {year - 1}</Link> : <span />}
            {hasNext ? <Link href={yearHref(year + 1)}>Năm {year + 1} →</Link> : <span />}
          </nav>
          <RelatedLinks
            links={[
              { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/" },
              { label: "Xem ngày tốt", href: "/xem-ngay-tot/" },
              { label: "Ngày lễ", href: "/le/" },
            ]}
          />
          <TraditionalDisclaimer compact />
        </div>
        <Footer />
      </div>
    </div>
  );
}
