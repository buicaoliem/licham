import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDayInfo } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MonthFaq } from "@/components/MonthFaq";
import { MonthGrid } from "@/components/MonthGrid";
import { MonthSummaryCards } from "@/components/MonthSummaryCards";
import { dateToSlug } from "@/lib/date-slug";
import { getMonthCells } from "@/lib/month-grid";
import { monthToSlug, slugToMonth } from "@/lib/month-slug";
import { getMonthSummary } from "@/lib/month-summary";
import { getVietnamToday } from "@/lib/today";

const YEAR = 2026;

export function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({ monthSlug: monthToSlug(i + 1, YEAR) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ monthSlug: string }> }): Promise<Metadata> {
  const { monthSlug } = await params;
  return { alternates: { canonical: `/${monthSlug}/` } };
}

export default async function MonthPage({ params }: { params: Promise<{ monthSlug: string }> }) {
  const { monthSlug } = await params;
  const parsed = slugToMonth(monthSlug);
  if (!parsed || parsed.year !== YEAR) notFound();
  const { month, year } = parsed;

  const today = getVietnamToday();
  const info = getDayInfo(today);

  const cells = getMonthCells(month, year, today);
  const summary = getMonthSummary(cells);
  const hasPrev = month > 1;
  const hasNext = month < 12;

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Lịch tháng" />

        <div className="dhead">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <b>Lịch tháng {month} năm {year}</b>
          </div>
          <h1 className="dh1">Lịch tháng {month} năm {year}</h1>
        </div>

        <div className="body">
          <MonthSummaryCards month={month} year={year} summary={summary} />

          <div style={{ marginTop: 30 }} />

          <MonthGrid
            month={month}
            year={year}
            cells={cells}
            hrefForCell={(cell) => `/ngay/${dateToSlug({ day: cell.solarDay, month: cell.solarMonth, year: cell.solarYear })}`}
            showHeading={false}
          />

          <div className="pn">
            {hasPrev ? (
              <Link href={`/${monthToSlug(month - 1, year)}`}>‹ Tháng {month - 1}/{year}</Link>
            ) : (
              <span />
            )}
            {hasNext ? (
              <Link href={`/${monthToSlug(month + 1, year)}`}>Tháng {month + 1}/{year} ›</Link>
            ) : (
              <span />
            )}
          </div>

          <MonthFaq month={month} year={year} summary={summary} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
