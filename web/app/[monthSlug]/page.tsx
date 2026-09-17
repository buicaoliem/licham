import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import { YEAR_END, YEAR_START } from "@/lib/site-years";

export function generateStaticParams() {
  const params: { monthSlug: string }[] = [];
  for (let year = YEAR_START; year <= YEAR_END; year++) {
    for (let month = 1; month <= 12; month++) {
      params.push({ monthSlug: monthToSlug(month, year) });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ monthSlug: string }> }): Promise<Metadata> {
  const { monthSlug } = await params;
  const parsed = slugToMonth(monthSlug);
  if (!parsed) return { alternates: { canonical: `/${monthSlug}/` } };
  const { month, year } = parsed;
  return {
    title: `Lịch tháng ${month} năm ${year} — Âm lịch, ngày tốt xấu | LịchÂm`,
    description: `Lịch tháng ${month} năm ${year} đầy đủ dương lịch và âm lịch, ngày hoàng đạo hắc đạo, ngày mùng một rằm.`,
    alternates: { canonical: `/${monthSlug}/` },
  };
}

export default async function MonthPage({ params }: { params: Promise<{ monthSlug: string }> }) {
  const { monthSlug } = await params;
  const parsed = slugToMonth(monthSlug);
  if (!parsed || parsed.year < YEAR_START || parsed.year > YEAR_END) notFound();
  const { month, year } = parsed;

  const today = getVietnamToday();

  const cells = getMonthCells(month, year, today);
  const summary = getMonthSummary(cells);
  const hasPrev = !(month === 1 && year === YEAR_START);
  const hasNext = !(month === 12 && year === YEAR_END);
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

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
              <Link href={`/${monthToSlug(prevMonth, prevYear)}`}>‹ Tháng {prevMonth}/{prevYear}</Link>
            ) : (
              <span />
            )}
            {hasNext ? (
              <Link href={`/${monthToSlug(nextMonth, nextYear)}`}>Tháng {nextMonth}/{nextYear} ›</Link>
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
