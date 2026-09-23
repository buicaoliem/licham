"use client";

import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";
import { Icon } from "@/components/heritage/Icon";
import type { DayBrief, LichCell } from "@/lib/calendar/lich-view";
import { vnTodayKey } from "@/lib/calendar/vn-today";
import { LichGrid, LichLegend } from "./LichGrid";

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
}: {
  cells: LichCell[];
  briefs: Record<string, DayBrief>;
  todayKey: string;
  header: React.ReactNode;
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
        <LichGrid cells={cells} todayKey={todayKey} selectedKey={selected} onCellClick={onCell} />
        <LichLegend selected />
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
