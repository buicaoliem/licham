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

function MoonDisc({ elongation }: { elongation: number }) {
  const { d, flip } = moonLitPath(elongation, 50, 50, 44);
  return (
    <svg viewBox="0 0 100 100" className={s.moonSvg} role="img" aria-label="Hình dạng mặt trăng tối nay">
      <circle cx="50" cy="50" r="44" fill="#3b3a44" />
      <path d={d} fill="#f7ecc8" transform={flip ? "translate(100 0) scale(-1 1)" : undefined} />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#d9cfa8" strokeWidth="1.2" />
    </svg>
  );
}

function MoonBlock({ moon, lunar }: { moon: MoonInfo; lunar: string }) {
  const t = (x: MoonInfo["moonrise"]) => (x ? `${x.hhmm}${x.nextDay ? " (ngày mai)" : ""}` : "không mọc/lặn trong ngày");
  return (
    <>
      <div className={s.moonRow}>
        <MoonDisc elongation={moon.elongation} />
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
              {o}
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={s.todayCard}>
      <h3 className={s.h3}>{title}</h3>
      {children}
    </section>
  );
}

export function HomNay() {
  const v = useVnNow();
  if (!v) {
    return (
      <div className={s.todayGrid} aria-busy="true">
        <Card title="Trăng tối nay">
          <p className={s.muted}>Đang tính…</p>
        </Card>
        <Card title="Ngày này năm xưa">
          <p className={s.muted}>Đang tải…</p>
        </Card>
        <Card title="Đố vui lịch sử hôm nay">
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
      <Card title="Trăng tối nay">
        <MoonBlock moon={moonInfo(day, now)} lunar={lunar} />
      </Card>
      <Card title="Ngày này năm xưa">
        <EventBlock events={eventsForLunar(l.day, l.month, EVENTS)} />
      </Card>
      <Card title="Đố vui lịch sử hôm nay">
        <QuizBlock quiz={quizForDay(dayNumber, QUIZZES)} dayKey={dayKey} />
      </Card>
    </div>
  );
}
