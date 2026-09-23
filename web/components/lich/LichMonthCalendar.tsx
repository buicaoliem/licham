"use client";

import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";
import { Icon } from "@/components/heritage/Icon";
import type { DayBrief, LichCell } from "@/lib/calendar/lich-view";
import { vnTodayKey } from "@/lib/calendar/vn-today";
import { WEEKDAY_FULL_MON_FIRST } from "@/lib/format";

const WD_SHORT = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function cellLabel(c: LichCell, isToday: boolean): string {
  const parts = [`Ngày ${c.day}/${c.month}/${c.year}`, `âm lịch ${c.lunarLabel.replace("N", " nhuận")}`, c.canChi];
  if (isToday) parts.unshift("Hôm nay");
  parts.push(c.isHoangDao ? "hoàng đạo" : "hắc đạo");
  if (c.term) parts.push(`tiết ${c.term}`);
  for (const h of c.holidays) parts.push(h.name);
  return parts.join(", ");
}

function DayPanel({ b, isToday, onPrev, onNext }: { b: DayBrief; isToday: boolean; onPrev?: () => void; onNext?: () => void }) {
  return (
    <aside className="lc-panel" aria-live="polite" aria-label={`Chi tiết ngày ${b.day}/${b.month}/${b.year}`}>
      <div className="lc-panel-h">
        <h2>Chi tiết ngày</h2>
        <div className="lc-panel-nav">
          <button type="button" onClick={onPrev} disabled={!onPrev} aria-label="Ngày trước trong tháng">
            <Icon name="chevron" size={16} className="flip" />
          </button>
          <button type="button" onClick={onNext} disabled={!onNext} aria-label="Ngày sau trong tháng">
            <Icon name="chevron" size={16} />
          </button>
        </div>
      </div>
      <div className="lc-panel-top">
        <div className="lc-leaf">
          <span className="wd">{b.weekday}</span>
          <b>{b.day}</b>
          <span className="my">
            Tháng {b.month} năm {b.year}
          </span>
        </div>
        <div className="lc-panel-sum">
          {isToday && <span className="lc-badge today">Hôm nay</span>}
          <span className={b.isHoangDao ? "lc-badge good" : "lc-badge bad"}>{b.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}</span>
          <p className="lu">{b.lunar} âm lịch</p>
          <p className="star">
            Sao {b.dayStar} · Trực {b.truc}
          </p>
        </div>
      </div>
      <dl className="lc-facts">
        <dt>Can chi</dt>
        <dd>
          Ngày {b.canChiDay} · Tháng {b.canChiMonth} · Năm {b.canChiYear}
        </dd>
        <dt>Ngũ hành</dt>
        <dd>
          {b.napAm} (hành {b.element})
        </dd>
        <dt>Tiết khí</dt>
        <dd>{b.term}</dd>
        {b.joy && (
          <>
            <dt>Hỷ thần</dt>
            <dd className="cap">Hướng {b.joy}</dd>
          </>
        )}
        {b.wealth && (
          <>
            <dt>Tài thần</dt>
            <dd className="cap">Hướng {b.wealth}</dd>
          </>
        )}
        <dt>Tuổi xung</dt>
        <dd>{b.conflictAges.join(", ")}</dd>
      </dl>
      {(b.good.length > 0 || b.mixed.length > 0 || b.bad.length > 0) && (
        <div className="lc-viec">
          {b.good.length > 0 && (
            <div className="g">
              <span className="ic" aria-hidden="true">
                ✓
              </span>
              <div>
                <b>Việc nên làm</b>
                <p>{b.good.join(", ")}</p>
              </div>
            </div>
          )}
          {b.mixed.length > 0 && (
            <div className="h">
              <span className="ic" aria-hidden="true">
                ~
              </span>
              <div>
                <b>Nửa thuận</b>
                <p>{b.mixed.join(", ")}</p>
              </div>
            </div>
          )}
          {b.bad.length > 0 && (
            <div className="x">
              <span className="ic" aria-hidden="true">
                ✕
              </span>
              <div>
                <b>Việc nên tránh</b>
                <p>{b.bad.join(", ")}</p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="lc-events">
        <b>
          <Icon name="list" size={16} />
          Sự kiện trong ngày
        </b>
        {b.holidays.length > 0 ? (
          <ul>
            {b.holidays.map((h) => (
              <li key={h.slug}>
                <Link href={`/le/${h.slug}/`}>{h.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có ngày lễ trong dữ liệu của licham.app.</p>
        )}
      </div>
      <Link className="btn pri lc-panel-cta" href={b.href}>
        Xem chi tiết ngày {String(b.day).padStart(2, "0")}/{String(b.month).padStart(2, "0")}
        <Icon name="arrow" size={16} />
      </Link>
    </aside>
  );
}

/**
 * Lưới lịch tháng + khối "Chi tiết ngày". Ô ngày là liên kết thật tới trang ngày; bấm lần đầu chỉ chọn ngày
 * để xem tóm tắt, bấm lại ngày đang chọn (hoặc nút ở khối chi tiết) mới mở trang ngày. Ctrl/Cmd/Shift-click giữ
 * hành vi mặc định của trình duyệt.
 */
export function LichMonthCalendar({
  cells,
  briefs,
  todayKey: serverToday,
  header,
  legendExtra,
}: {
  cells: LichCell[];
  briefs: Record<string, DayBrief>;
  todayKey: string;
  header: React.ReactNode;
  legendExtra?: React.ReactNode;
}) {
  const inMonth = cells.filter((c) => c.inMonth).map((c) => c.key);
  const pick = (t: string) => (briefs[t] ? t : inMonth[0]!);
  const [todayKey, setTodayKey] = useState(serverToday);
  const [selected, setSelected] = useState(() => pick(serverToday));
  const [touched, setTouched] = useState(false);

  // Trang dựng sẵn/ISR có thể cũ hơn ngày thật: đặt lại "hôm nay" theo giờ Việt Nam trên máy người xem.
  useEffect(() => {
    const t = vnTodayKey();
    if (t === serverToday) return;
    setTodayKey(t);
    if (!touched) setSelected(pick(t));
    // chỉ chạy một lần khi gắn trang
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onCell(e: MouseEvent<HTMLAnchorElement>, key: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (key === selected) return; // bấm lại: mở trang ngày
    e.preventDefault();
    setTouched(true);
    setSelected(key);
  }

  const idx = inMonth.indexOf(selected);
  const move = (d: number) => () => {
    setTouched(true);
    setSelected(inMonth[idx + d]!);
  };
  const brief = briefs[selected]!;

  return (
    <div className="lc-month">
      <section className="lc-cal" aria-label="Lưới lịch tháng">
        {header}
        <div className="lc-grid" role="presentation">
          {WEEKDAY_FULL_MON_FIRST.map((w, i) => (
            <div key={w} className={i === 6 ? "lc-dw sun" : "lc-dw"}>
              <span className="full">{w}</span>
              <span className="short" aria-hidden="true">
                {WD_SHORT[i]}
              </span>
            </div>
          ))}
          {cells.map((c) => {
            const isToday = c.key === todayKey;
            const cls = [
              "lc-cell",
              c.inMonth ? "" : "out",
              c.weekday === 0 ? "sun" : "",
              isToday ? "today" : "",
              c.inMonth && c.key === selected ? "sel" : "",
              c.isHoangDao ? "hd" : "",
              c.holidays.length > 0 ? "le" : "",
            ]
              .filter(Boolean)
              .join(" ");
            const body = (
              <>
                <span className="sd">{c.day}</span>
                <span className="ld">{c.lunarLabel}</span>
                <span className="cc">{c.canChi}</span>
                <span className="mk" aria-hidden="true">
                  {c.isHoangDao && <i className="m-hd" />}
                  {c.isMungMot && <i className="m-m1" />}
                  {c.isRam && <i className="m-ram" />}
                  {c.term && <i className="m-tk" />}
                  {c.holidays.length > 0 && <i className="m-le" />}
                </span>
                {c.inMonth && (c.holidays[0] || c.term) && (
                  <span className="ev" aria-hidden="true">
                    {c.holidays[0]?.name ?? `Tiết ${c.term}`}
                  </span>
                )}
                {isToday && <span className="tag">Hôm nay</span>}
              </>
            );
            return c.inMonth ? (
              <Link
                key={c.key}
                href={c.href}
                className={cls}
                aria-label={cellLabel(c, isToday)}
                aria-current={isToday ? "date" : undefined}
                onClick={(e) => onCell(e, c.key)}
              >
                {body}
              </Link>
            ) : (
              <div key={c.key} className={cls} aria-hidden="true">
                {body}
              </div>
            );
          })}
        </div>
        <ul className="lc-legend" aria-label="Chú thích">
          <li>
            <i className="k-today" />
            Hôm nay
          </li>
          <li>
            <i className="k-sel" />
            Đang chọn
          </li>
          <li>
            <i className="m-hd" />
            Hoàng đạo
          </li>
          <li>
            <i className="m-m1" />
            Mùng một
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
          {legendExtra}
        </ul>
      </section>
      <DayPanel
        b={brief}
        isToday={selected === todayKey}
        onPrev={idx > 0 ? move(-1) : undefined}
        onNext={idx < inMonth.length - 1 ? move(1) : undefined}
      />
    </div>
  );
}
