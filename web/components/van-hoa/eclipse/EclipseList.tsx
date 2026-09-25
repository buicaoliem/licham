"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { vietnamDateOf } from "@licham/core";
import { Icon } from "@/components/heritage/Icon";
import s from "../van-hoa.module.css";
import v from "./eclipse.module.css";

export interface EclipseCard {
  slug: string;
  title: string;
  year: number;
  /** ISO yyyy-mm-dd của ngày đỉnh (giờ Việt Nam). */
  date: string;
  dateText: string;
  lunarText: string;
  visibleVn: boolean;
  /** Số ngày còn lại tính lúc dựng trang (server): >0 sắp tới, 0 hôm nay, <0 đã qua. Quyết định cách chia nhóm, không đổi sau khi tải. */
  days: number;
  href: string;
  thumb: ReactNode;
}

type Today = { day: number; month: number; year: number };

function dayDiff(dateIso: string, t: Today): number {
  const [y, m, d] = dateIso.split("-").map(Number) as [number, number, number];
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(t.year, t.month - 1, t.day)) / 86400_000);
}

function MoonGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}
function EyeGlyph({ off }: { off?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M4 4l16 16" />}
    </svg>
  );
}

/** 24 tháng ≈ 730 ngày, tính từ ngày dựng trang (server, giờ VN). */
const NEAR_DAYS = 730;

const byDateAsc = (a: EclipseCard, b: EclipseCard) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0);

function Card({ c, today }: { c: EclipseCard; today: Today | null }) {
  // Đếm ngược chính xác theo ngày của người xem, chỉ đổi chữ (không đổi thứ tự hay bố cục).
  const diff = today ? dayDiff(c.date, today) : c.days;
  return (
    <li>
      <Link href={c.href} className={v.card}>
        <span className={v.cardTop}>
          {c.thumb}
          <span className={v.cardInfo}>
            <b className={v.cardTitle}>{c.title}</b>
            <span className={v.cardRow}>
              <Icon name="calendar" size={18} />
              Dương lịch: {c.dateText}
            </span>
            <span className={v.cardRow}>
              <MoonGlyph />
              Âm lịch: {c.lunarText}
            </span>
            <span className={`${v.vis} ${c.visibleVn ? v.visOn : v.visOff}`}>
              <EyeGlyph off={!c.visibleVn} />
              {c.visibleVn ? "Thấy được ở Việt Nam" : "Không thấy ở Việt Nam"}
            </span>
          </span>
        </span>
        <span className={v.cardFoot}>
          <Icon name="clock" size={18} />
          {diff > 0 ? `Còn ${diff} ngày` : diff === 0 ? "Hôm nay" : "Đã diễn ra"}
          <span className={v.go} aria-hidden="true">
            <Icon name="chevron" size={16} />
          </span>
        </span>
      </Link>
    </li>
  );
}

function Grid({ items, today }: { items: EclipseCard[]; today: Today | null }) {
  return (
    <ul className={v.cards}>
      {items.map((c) => (
        <Card key={c.slug} c={c} today={today} />
      ))}
    </ul>
  );
}

export function EclipseList({ cards, years }: { cards: EclipseCard[]; years: number[] }) {
  const [year, setYear] = useState<number | "all">("all");
  const [today, setToday] = useState<Today | null>(null);
  useEffect(() => {
    const tick = () => setToday(vietnamDateOf(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const { upcoming, pastByYear } = useMemo(() => {
    const up = cards.filter((c) => c.days >= 0).sort(byDateAsc);
    const past = cards.filter((c) => c.days < 0).sort((a, b) => byDateAsc(b, a));
    const groups = new Map<number, EclipseCard[]>();
    for (const c of past) groups.set(c.year, [...(groups.get(c.year) ?? []), c]);
    return { upcoming: up, pastByYear: [...groups.entries()].sort((a, b) => b[0] - a[0]) };
  }, [cards]);

  const single = year === "all" ? null : cards.filter((c) => c.year === year).sort(byDateAsc);

  return (
    <>
      <ul className={v.chips} aria-label="Lọc theo năm">
        {(["all", ...years] as const).map((y) => (
          <li key={y}>
            <button type="button" className={`${v.chip} ${year === y ? v.chipOn : ""}`} aria-pressed={year === y} onClick={() => setYear(y)}>
              {y === "all" ? "Tất cả" : y}
            </button>
          </li>
        ))}
      </ul>
      <div className={v.bar}>
        <p>Hiển thị: {single ? single.length : cards.length} sự kiện</p>
      </div>
      {single ? (
        <>
          <Grid items={single} today={today} />
          {single.length === 0 && <p className={s.muted}>Không có sự kiện trong năm này.</p>}
        </>
      ) : (
        <>
          {upcoming.length > 0 && (
            <section aria-labelledby="sap-dien-ra">
              <h2 className={v.secTitle} id="sap-dien-ra">
                Sắp diễn ra
              </h2>
              <Grid items={upcoming.filter((c) => c.days <= NEAR_DAYS)} today={today} />
              {upcoming.some((c) => c.days > NEAR_DAYS) && (
                <details className={v.moreBox}>
                  <summary className={v.moreSum}>
                    Xem thêm {upcoming.filter((c) => c.days > NEAR_DAYS).length} lần nhật, nguyệt thực đến {upcoming[upcoming.length - 1]!.year}
                    <Icon name="chevron" size={18} className={v.yearChev} />
                  </summary>
                  <Grid items={upcoming.filter((c) => c.days > NEAR_DAYS)} today={today} />
                </details>
              )}
            </section>
          )}
          {pastByYear.length > 0 && (
            <section aria-labelledby="da-dien-ra">
              <h2 className={v.secTitle} id="da-dien-ra">
                Đã diễn ra
              </h2>
              {pastByYear.map(([y, items]) => (
                <details key={y} className={v.yearBox}>
                  <summary className={v.yearSum}>
                    Năm {y} <small>({items.length} sự kiện)</small>
                    <Icon name="chevron" size={18} className={v.yearChev} />
                  </summary>
                  <Grid items={items} today={today} />
                </details>
              ))}
            </section>
          )}
        </>
      )}
    </>
  );
}
