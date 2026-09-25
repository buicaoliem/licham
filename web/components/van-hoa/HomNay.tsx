"use client";

import { useEffect, useState } from "react";
import { jdFromDate, solarToLunar, vietnamDateOf, type SolarDate } from "@licham/core";
import { EVENTS, QUIZZES, eventsForLunar, quizForDay, type HistoryEvent, type QuizItem } from "@/lib/van-hoa/content";
import { moonInfo, moonLitPath, type MoonInfo } from "@/lib/van-hoa/moon";
import s from "./van-hoa.module.css";

/** Thời điểm hiện tại + ngày theo giờ Việt Nam; null trước khi hydrate để không hiện số của bản dựng cũ. Tự sang ngày mới khi qua nửa đêm. */
function useVnNow(): { now: Date; day: SolarDate } | null {
  const [state, setState] = useState<{ now: Date; day: SolarDate } | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setState({ now, day: vietnamDateOf(now) });
    };
    tick();
    const id = setInterval(tick, 60_000);
    const onVisible = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return state;
}

const STARS: readonly (readonly [number, number, number])[] = [
  [14, 16, 0.9], [38, 40, 0.6], [26, 92, 0.7], [58, 14, 0.5], [128, 20, 0.9], [146, 52, 0.6],
  [118, 100, 0.7], [140, 88, 0.5], [22, 60, 0.5], [100, 12, 0.6], [70, 108, 0.5], [150, 22, 0.5],
];

/** Khung trời đêm với mặt trăng vẽ theo pha (không dùng ảnh chụp). */
function MoonDisc({ elongation, percent }: { elongation: number; percent: number }) {
  const { d, flip } = moonLitPath(elongation, 80, 60, 30);
  return (
    <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" className={s.moonSvg} role="img" aria-label="Hình dạng mặt trăng tối nay">
      <defs>
        <radialGradient id="vh-glow">
          <stop offset="0.35" stopColor="#f7ecc8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f7ecc8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="160" height="120" fill="#0f1b3a" />
      {STARS.map(([x, y, o]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill="#fff" opacity={o} />
      ))}
      <circle cx="80" cy="60" r="52" fill="url(#vh-glow)" opacity={0.15 + (percent / 100) * 0.85} />
      <circle cx="80" cy="60" r="30" fill="#2a3352" />
      <path d={d} fill="#f7ecc8" transform={flip ? "translate(160 0) scale(-1 1)" : undefined} />
      <circle cx="80" cy="60" r="30" fill="none" stroke="#8d93ad" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

function MoonBlock({ moon, lunar }: { moon: MoonInfo; lunar: string }) {
  const t = (x: MoonInfo["moonrise"]) => (x ? `${x.hhmm}${x.nextDay ? " (ngày mai)" : ""}` : "không mọc/lặn trong ngày");
  return (
    <>
      <div className={s.moonRow}>
        <MoonDisc elongation={moon.elongation} percent={moon.illuminatedPercent} />
        <div>
          <p className={s.moonPhase}>{moon.phase}</p>
          <p className={s.muted}>Độ sáng {moon.illuminatedPercent}%</p>
        </div>
      </div>
      <dl className={s.facts}>
        <div>
          <dt>Trăng mọc</dt>
          <dd>{t(moon.moonrise)}</dd>
        </div>
        <div>
          <dt>Trăng lặn</dt>
          <dd>{t(moon.moonset)}</dd>
        </div>
        <div>
          <dt>Âm lịch</dt>
          <dd>{lunar}</dd>
        </div>
      </dl>
      <p className={s.note}>Tính cho Hà Nội, giờ Việt Nam.</p>
    </>
  );
}

function EventBlock({ events }: { events: HistoryEvent[] }) {
  if (events.length === 0) {
    return <p className={s.muted}>Mỗi ngày âm lịch đều có thể gắn với một câu chuyện xưa. Nội dung mục này đang được biên soạn.</p>;
  }
  return (
    <ul className={s.eventList}>
      {events.map((e) => (
        <li key={`${e.year}-${e.title}`}>
          <span className={s.badge}>{e.tag}</span>
          <b>
            Năm {e.year}: {e.title}
          </b>
          <p>{e.summary}</p>
          {e.sources.length > 0 && <p className={s.note}>Nguồn: {e.sources.join("; ")}</p>}
        </li>
      ))}
    </ul>
  );
}

function QuizBlock({ quiz, dayKey }: { quiz: QuizItem | null; dayKey: string }) {
  const [picked, setPicked] = useState<number | null>(null);
  // Sang ngày mới thì câu đố khác: xoá lựa chọn cũ.
  useEffect(() => setPicked(null), [dayKey]);
  if (!quiz) {
    return <p className={s.muted}>Câu đố lịch sử mỗi ngày đang được biên soạn. Mời bạn quay lại sau.</p>;
  }
  const answered = picked !== null;
  return (
    <div>
      <p className={s.question}>{quiz.question}</p>
      <div className={s.options} role="group" aria-label="Các đáp án">
        {quiz.options.map((o, i) => {
          const state = !answered ? "" : i === quiz.answerIndex ? s.right : i === picked ? s.wrong : "";
          return (
            <button key={o} type="button" className={`${s.option} ${state}`} disabled={answered} onClick={() => setPicked(i)}>
              <span className={s.optKey}>{"ABCD"[i]}</span>
              <span className={s.optText}>{o}</span>
              {answered && i === quiz.answerIndex && <span aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={s.answer} role="status">
          <b>{picked === quiz.answerIndex ? "Đúng!" : "Sai rồi."}</b> {quiz.explanation}
          {quiz.sources.length > 0 && <p className={s.note}>Nguồn: {quiz.sources.join("; ")}</p>}
        </div>
      )}
    </div>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  event: <path d="M7 2v3M17 2v3M4 8h16M5 4h14a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />,
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  quiz: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />,
};

function Card({ title, icon, children }: { title: string; icon: keyof typeof ICONS; children: React.ReactNode }) {
  return (
    <section className={s.todayCard}>
      <div className={s.cardHead}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {ICONS[icon]}
        </svg>
        <h3 className={s.h3}>{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function HomNay() {
  const v = useVnNow();
  if (!v) {
    return (
      <div className={s.todayGrid} aria-busy="true">
        <Card title="Ngày này năm xưa" icon="event">
          <p className={s.muted}>Đang tải…</p>
        </Card>
        <Card title="Trăng tối nay" icon="moon">
          <p className={s.muted}>Đang tính…</p>
        </Card>
        <Card title="Đố vui lịch sử hôm nay" icon="quiz">
          <p className={s.muted}>Đang tải…</p>
        </Card>
      </div>
    );
  }
  const { now, day } = v;
  const l = solarToLunar(day.day, day.month, day.year);
  const lunar = `Ngày ${l.day}/${l.month}${l.isLeapMonth ? " nhuận" : ""}`;
  const dayNumber = jdFromDate(day.day, day.month, day.year);
  const dayKey = `${day.year}-${day.month}-${day.day}`;
  return (
    <div className={s.todayGrid}>
      <Card title="Ngày này năm xưa" icon="event">
        <EventBlock events={eventsForLunar(l.day, l.month, EVENTS)} />
      </Card>
      <Card title="Trăng tối nay" icon="moon">
        <MoonBlock moon={moonInfo(day, now)} lunar={lunar} />
      </Card>
      <Card title="Đố vui lịch sử hôm nay" icon="quiz">
        <QuizBlock quiz={quizForDay(dayNumber, QUIZZES)} dayKey={dayKey} />
      </Card>
    </div>
  );
}
