import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MonthFaq } from "@/components/MonthFaq";
import { MonthGrid } from "@/components/MonthGrid";
import { MonthSummaryCards } from "@/components/MonthSummaryCards";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { RelatedLinks } from "@/components/calendar/RelatedLinks";
import { generateCalendarMonthMetadata } from "@/lib/calendar/metadata";
import { canPublishMonth } from "@/lib/calendar/policy";
import { getVietnamToday } from "@/lib/today";
import { prebuildMonthSlugs } from "@/lib/calendar/prebuild";
import { dayHref, monthHref, parseMonthSlug, yearHref } from "@/lib/calendar/urls";
import { getMonthCells } from "@/lib/calendar/calendar-month";
import { getMonthSummary } from "@/lib/month-summary";

/** Chỉ dựng sẵn 36 tháng quanh hôm nay; các tháng khác dựng lúc có người truy cập đầu tiên. */
export function generateStaticParams() {
  return prebuildMonthSlugs(getVietnamToday().year).map((ym) => ({ ym }));
}

export const dynamicParams = true;
/** Ô "hôm nay" trên lưới tháng đổi theo ngày nên trang được dựng lại tối đa mỗi 24 giờ. */
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

  const cells = getMonthCells(month, year, getVietnamToday());
  const summary = getMonthSummary(cells);
  const prev = month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year };
  const next = month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year };
  const hasPrev = canPublishMonth(prev.month, prev.year);
  const hasNext = canPublishMonth(next.month, next.year);

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Lịch tháng" />
        <div className="dhead">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Lịch âm", href: yearHref(year) },
              { label: `Tháng ${month} năm ${year}` },
            ]}
          />
          <h1 className="dh1">Lịch âm tháng {month} năm {year}</h1>
        </div>

        <div className="body">
          <MonthSummaryCards month={month} year={year} summary={summary} />
          <div style={{ marginTop: 30 }} />
          <MonthGrid
            month={month}
            year={year}
            cells={cells}
            hrefForCell={(c) => dayHref({ day: c.solarDay, month: c.solarMonth, year: c.solarYear })}
            showHeading={false}
          />

          <nav className="pn" aria-label="Điều hướng tháng">
            {hasPrev ? <Link href={monthHref(prev.month, prev.year)}>← Tháng {prev.month}/{prev.year}</Link> : <span />}
            <Link href={yearHref(year)}>Lịch năm {year}</Link>
            {hasNext ? <Link href={monthHref(next.month, next.year)}>Tháng {next.month}/{next.year} →</Link> : <span />}
          </nav>

          <MonthFaq month={month} year={year} summary={summary} />
          <RelatedLinks
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
        <Footer />
      </div>
    </div>
  );
}
