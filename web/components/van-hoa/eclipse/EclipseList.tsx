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
  href: string;
  thumb: ReactNode;
}

type Today = { day: number; month: number; year: number };
type Sort = "gan-nhat" | "cu-moi" | "moi-cu";

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

export function EclipseList({ cards, years }: { cards: EclipseCard[]; years: number[] }) {
  const [year, setYear] = useState<number | "all">("all");
  const [sort, setSort] = useState<Sort>("gan-nhat");
  // Ngày hôm nay của người xem (giờ VN), chỉ có sau khi tải xong để không lệch với bản dựng sẵn.
  const [today, setToday] = useState<Today | null>(null);
  useEffect(() => {
    const tick = () => setToday(vietnamDateOf(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const shown = useMemo(() => {
    const list = cards.filter((c) => year === "all" || c.year === year);
    const asc = [...list].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    if (sort === "moi-cu") return asc.reverse();
    if (sort === "gan-nhat" && today) {
      const up = asc.filter((c) => dayDiff(c.date, today) >= 0);
      const past = asc.filter((c) => dayDiff(c.date, today) < 0).reverse();
      return [...up, ...past];
    }
    return asc;
  }, [cards, year, sort, today]);

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
        <p>Hiển thị: {shown.length} sự kiện</p>
        <label>
          Sắp xếp:{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="gan-nhat">Gần nhất</option>
            <option value="cu-moi">Cũ đến mới</option>
            <option value="moi-cu">Mới đến cũ</option>
          </select>
        </label>
      </div>
      <ul className={v.cards}>
        {shown.map((c) => {
          const diff = today ? dayDiff(c.date, today) : null;
          return (
            <li key={c.slug}>
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
                  {diff === null ? "Xem chi tiết" : diff > 0 ? `Còn ${diff} ngày` : diff === 0 ? "Hôm nay" : "Đã diễn ra"}
                  <span className={v.go} aria-hidden="true">
                    <Icon name="chevron" size={16} />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {shown.length === 0 && <p className={s.muted}>Không có sự kiện trong năm này.</p>}
    </>
  );
}
