import Link from "next/link";
import type { ReactNode } from "react";
import type { CalendarDay } from "@/lib/calendar/calendar-day";
import { ShareButton } from "@/components/ShareButton";
import { Icon } from "@/components/heritage/Icon";
import { dayHref, monthHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import { buildShareUrl } from "@/lib/share";
import { termStartLabel } from "./SolarTerm";

/**
 * Khối đầu trang ngày: tờ lịch (ngày dương), ngày âm + can chi, ba nhãn (hoàng/hắc đạo, trực, tiết khí),
 * và thẻ "Ngày này" (ngày lễ, chia sẻ, ngày trước/sau). Tiêu đề h1 do trang truyền vào.
 */
export function CalendarDayHero({
  day,
  title,
  prev,
  next,
  extra,
}: {
  day: CalendarDay;
  title: ReactNode;
  prev: { href: string; label: string } | null;
  next: { href: string; label: string } | null;
  extra?: ReactNode;
}) {
  const { day: d, month: m, year: y } = day.solarDate;
  const l = day.lunarDate;
  const t = day.solarTerm;
  return (
    <section className="ld-hero" aria-labelledby="ld-h1">
      <h1 className="ch-h1 ld-h1" id="ld-h1">
        {title}
      </h1>
      <div className="ld-hero-grid">
        <div className="ld-hero-card">
          <div className="ld-leaf">
            <span className="wd">{day.weekday.name}</span>
            <b>{d}</b>
            <span className="my">
              Tháng {m} năm {y}
            </span>
            <span className="dl">Dương lịch: {`${pad2(d)}/${pad2(m)}/${y}`}</span>
          </div>
          <div className="ld-hero-body">
            <p className="ld-eyebrow">Âm lịch</p>
            <p className="ld-lunar">
              Ngày {l.day} tháng {day.lunarMonthName} năm {day.lunarYearName}
            </p>
            <p className="ld-canchi">
              <span>Ngày {day.canChiDay.name}</span>
              <span>Tháng {day.canChiMonth.name}</span>
              <span>Năm {day.canChiYear.name}</span>
            </p>
            <p className="ld-menh">Mệnh ngày: {day.dayNapAm}</p>
            <ul className="ld-badges">
              <li className={day.isHoangDaoDay ? "good" : "bad"}>
                <Icon name={day.isHoangDaoDay ? "clover" : "bolt"} size={20} />
                <span>
                  <b>{day.isHoangDaoDay ? "Ngày hoàng đạo" : "Ngày hắc đạo"}</b>
                  <small>Sao {day.dayStarName}</small>
                </span>
              </li>
              <li className="gold">
                <Icon name="temple" size={20} />
                <span>
                  <b>Trực {day.truc.name}</b>
                  <small>Thập nhị trực</small>
                </span>
              </li>
              <li className="blue">
                <Icon name="sun" size={20} />
                <span>
                  <b>{t.name}</b>
                  <small>{t.startsToday ? `Bắt đầu ${termStartLabel(t.start, true)}` : "Tiết khí trong ngày"}</small>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <aside className="ld-hero-side" aria-label="Ngày này">
          <p className="ld-side-h">
            <Icon name="list" size={17} />
            Ngày này
          </p>
          {day.holidayEvents.length > 0 ? (
            <ul className="ld-events">
              {day.holidayEvents.map((h) => (
                <li key={h.slug}>
                  <Link href={`/le/${h.slug}/`}>{h.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="ld-noev">Không trùng ngày lễ nào trong dữ liệu của licham.app.</p>
          )}
          {extra}
          <div className="ld-hero-actions">
            <ShareButton
              url={buildShareUrl(dayHref(day.solarDate))}
              title={`Lịch âm ngày ${d}/${m}/${y}`}
              text={`Xem lịch âm ngày ${pad2(d)}/${pad2(m)}/${y} – ngày âm, giờ hoàng đạo và thông tin ngày.`}
            />
            <Link className="btn" href={monthHref(m, y)}>
              <Icon name="calendar" size={16} />
              Tháng {m}/{y}
            </Link>
          </div>
          <nav className="ld-mini-nav" aria-label="Ngày trước, ngày sau">
            {prev ? (
              <Link href={prev.href}>
                <Icon name="chevron" size={15} className="flip" />
                {prev.label}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={next.href}>
                {next.label}
                <Icon name="chevron" size={15} />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </aside>
      </div>
    </section>
  );
}
