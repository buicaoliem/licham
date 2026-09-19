import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { COUNTDOWN_LIST, countdownBySlug, countdownState, formatCountdownSolar, lunarMonthWord } from "@/lib/countdown";
import { dateToSlug } from "@/lib/date-slug";
import { getVietnamToday } from "@/lib/today";

export function generateStaticParams() {
  return COUNTDOWN_LIST.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const def = countdownBySlug(slug);
  if (!def) return {};
  const today = getVietnamToday();
  const state = countdownState(def, today);
  const year = state.target.year;
  return {
    title: def.titleYear(year),
    description: def.description(year),
    alternates: { canonical: `/countdown/${slug}/` },
  };
}

export default async function CountdownPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const def = countdownBySlug(slug);
  if (!def) notFound();

  const today = getVietnamToday();
  const state = countdownState(def, today);
  const year = state.target.year;
  const others = COUNTDOWN_LIST.filter((c) => c.slug !== slug);

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Ngày lễ" />

        <div className="dhead">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <Link href="/le">Ngày lễ</Link> › {def.h1} {year}
          </div>
          <h1 className="dh1">{def.h1} {year}</h1>
          <p className="dsub">{def.intro(year)}</p>
        </div>

        <div className="body">
          <div className="box">
            <div className="box-h">
              <span className="rule" />
              <span className="t">Còn lại</span>
              <span className="rule" />
            </div>
            <div className="diresrow">
              <span>Số ngày</span>
              <span>{state.daysLeft === 0 ? "Hôm nay" : `${state.daysLeft} ngày`}</span>
            </div>
            <div className="diresrow">
              <span>Ngày dương</span>
              <span>
                <Link href={`/ngay/${dateToSlug(state.target)}`}>{formatCountdownSolar(state.target)}</Link>
              </span>
            </div>
            <div className="diresrow">
              <span>Ngày âm</span>
              <span>
                {state.lunarDay} tháng {lunarMonthWord(state.lunarMonth, state.lunarIsLeap)} năm {state.lunarYear}
              </span>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: 16 }}>
            <Link href={`/le/${state.le.slug}`}>{state.le.tieuDe} — ý nghĩa và văn khấn</Link>
          </p>

          <h2 className="hh" style={{ marginTop: 32 }}>
            Đếm ngược khác
          </h2>
          <div className="chips">
            {others.map((c) => (
              <Link className="chip" href={`/countdown/${c.slug}`} key={c.slug}>
                {c.h1}
              </Link>
            ))}
            <Link className="chip" href={`/lich-nghi-le/${today.year}`}>
              Lịch nghỉ lễ {today.year}
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
