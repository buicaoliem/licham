import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { HeritageImage } from "@/components/heritage/HeritageImage";
import { Icon } from "@/components/heritage/Icon";
import { LeDateTile } from "@/components/heritage/LeParts";
import { COUNTDOWN_LIST, countdownBySlug, countdownState, formatCountdownSolar, lunarMonthWord } from "@/lib/countdown";
import { dayHref } from "@/lib/calendar/urls";
import { WEEKDAY_LONG } from "@/lib/format";
import { leArt, leRuleLabel } from "@/lib/le-hub";
import { dayOfWeek, jdFromDate } from "@licham/core";
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
  const others = COUNTDOWN_LIST.filter((c) => c.slug !== slug).map((c) => ({ def: c, state: countdownState(c, today) }));
  const art = leArt(state.le);
  const thu = WEEKDAY_LONG[dayOfWeek(jdFromDate(state.target.day, state.target.month, state.target.year))];
  const tuan = Math.floor(state.daysLeft / 7);
  const le = state.daysLeft % 7;

  return (
    <ChShell activeMenu="Ngày lễ" className="ch-le">
      <ChHero
        className="le-hero-sub"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Ngày lễ", href: "/le/" }, { label: `${def.h1} ${year}` }]}
        crumbJsonLd={false}
        eyebrow="Đếm ngược"
        title={`${def.h1} ${year}`}
        lead={def.intro(year)}
      />

      <div className="ch-wrap ch-main ch-layout le-cd-layout">
        <div className="ch-stack">
          <section className={art?.kind === "img" ? "ch-card le-count-card has-art" : "ch-card le-count-card"} aria-labelledby="le-cd-con">
            <div className="le-count-main">
              <div className="k" id="le-cd-con">
                Còn lại
              </div>
              <div className="le-count-n">
                {state.daysLeft === 0 ? (
                  <b className="today">Hôm nay</b>
                ) : (
                  <>
                    <b>{state.daysLeft}</b>
                    <span>ngày</span>
                  </>
                )}
              </div>
              {state.daysLeft >= 7 && (
                <p className="le-count-w">
                  Khoảng {tuan} tuần{le ? ` ${le} ngày` : ""} · tính từ hôm nay theo giờ Việt Nam
                </p>
              )}
              <dl className="le-when">
                <div>
                  <dt>Ngày dương</dt>
                  <dd>
                    <Link href={dayHref(state.target)}>{formatCountdownSolar(state.target)}</Link>
                  </dd>
                  <dd className="s">{thu}</dd>
                </div>
                <div>
                  <dt>Ngày âm</dt>
                  <dd>
                    {state.lunarDay} tháng {lunarMonthWord(state.lunarMonth, state.lunarIsLeap)}
                  </dd>
                  <dd className="s">Năm {state.lunarYear}</dd>
                </div>
              </dl>
              <Link className="ch-btn ghost le-count-go" href={`/le/${state.le.slug}/`}>
                {state.le.tieuDe} — ý nghĩa và văn khấn
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            {art?.kind === "img" && (
              <div className="le-count-art" aria-hidden="true">
                <HeritageImage src={art.src} alt="" />
              </div>
            )}
          </section>

          <section className="ch-card" aria-labelledby="le-cd-khac-h">
            <h2 className="kh-sec-h" id="le-cd-khac-h">
              Đếm ngược khác
            </h2>
            <ul className="le-cd-grid">
              {others.map(({ def: c, state: s }) => (
                <li key={c.slug}>
                  <Link href={`/countdown/${c.slug}/`}>
                    <LeDateTile day={s.target.day} month={s.target.month} tone={`n-${s.le.nhom}`} size="sm" />
                    <span className="t">
                      <b>{c.h1}</b>
                      <small>{leRuleLabel(s.le)}</small>
                    </span>
                    <span className="left">{s.daysLeft === 0 ? "Hôm nay" : `${s.daysLeft} ngày`}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href={`/lich-nghi-le/${today.year}/`}>
                  <span className="le-date sm n-nghi-le" aria-hidden="true">
                    <Icon name="list" size={20} />
                  </span>
                  <span className="t">
                    <b>Lịch nghỉ lễ {today.year}</b>
                    <small>Các ngày nghỉ theo luật</small>
                  </span>
                </Link>
              </li>
            </ul>
          </section>
          <TraditionalDisclaimer />
        </div>

        <aside className="ch-side">
          <div className="ch-sidebox">
            <h2 className="vk-sidebox-h jade">
              <span className="dot">
                <Icon name="note" size={18} />
              </span>
              Thông tin nhanh
            </h2>
            <div className="vk-sidebox-b">
              <ul className="vk-facts le-facts">
                <li>
                  <Icon name="calendar" size={18} />
                  <span className="k">Ngày lễ</span>
                  <span className="v">{leRuleLabel(state.le)}</span>
                </li>
                <li>
                  <Icon name="sun" size={18} />
                  <span className="k">Năm {year}</span>
                  <span className="v">
                    {thu}, {formatCountdownSolar(state.target)}
                  </span>
                </li>
                <li>
                  <Icon name="history" size={18} />
                  <span className="k">Trang lễ</span>
                  <span className="v">
                    <Link href={`/le/${state.le.slug}/`}>{state.le.tieuDe}</Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="ch-sidebox">
            <h2 className="vk-sidebox-h son">
              <Icon name="calendar" size={20} />
              Tất cả ngày lễ
            </h2>
            <div className="vk-sidebox-b">
              <p className="kh-side-lead">Lễ âm lịch, ngày nghỉ lễ, ngày giỗ anh hùng dân tộc và 24 tiết khí.</p>
              <Link className="le-box-more" href="/le/">
                Xem danh mục ngày lễ
                <Icon name="arrow" size={14} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </ChShell>
  );
}
