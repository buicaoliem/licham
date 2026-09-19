"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SolarDate } from "@licham/core";
import { dateToSlug } from "@/lib/date-slug";
import { pad2 } from "@/lib/format";
import { YEAR_END, YEAR_START } from "@/lib/site-years";
import { getVietnamToday } from "@/lib/today";
import { type DayResult, type ViecMeta, bestDaysInRange, birthDateLabel, formatSolarDate } from "@/lib/xem-ngay-tot";

type RangeOption = "3-thang" | "6-thang" | "den-het-nam" | "ca-nam";

function rangeLabels(year: number): Record<RangeOption, string> {
  return {
    "3-thang": "3 tháng tới",
    "6-thang": "6 tháng tới",
    "den-het-nam": `Từ nay đến hết năm ${year}`,
    "ca-nam": `Cả năm ${year}`,
  };
}

function addMonths(d: SolarDate, months: number): SolarDate {
  const total = (d.month - 1) + months;
  const year = d.year + Math.floor(total / 12);
  const month = (total % 12) + 1;
  const daysInTarget = new Date(year, month, 0).getDate();
  return { day: Math.min(d.day, daysInTarget), month, year };
}

function rangeFor(option: RangeOption, today: SolarDate): { from: SolarDate; to: SolarDate } {
  switch (option) {
    case "3-thang":
      return { from: today, to: addMonths(today, 3) };
    case "6-thang":
      return { from: today, to: addMonths(today, 6) };
    case "den-het-nam":
      return { from: today, to: { day: 31, month: 12, year: today.year } };
    case "ca-nam":
      return { from: { day: 1, month: 1, year: today.year }, to: { day: 31, month: 12, year: today.year } };
  }
}

function toISO(d: SolarDate): string {
  return `${d.year}-${pad2(d.month)}-${pad2(d.day)}`;
}

/** Ngày sinh dùng mùng 15 tháng 6 làm mặc định — an toàn, không rơi vào khoảng quanh Tết. */
function defaultBirthDate(yearsAgo: number): SolarDate {
  return { day: 15, month: 6, year: getVietnamToday().year - yearsAgo };
}

function parseISODate(s: string): SolarDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
}

interface Params {
  dateA: string;
  dateB: string;
  range: RangeOption;
}

function defaultParams(): Params {
  return { dateA: toISO(defaultBirthDate(28)), dateB: toISO(defaultBirthDate(26)), range: "3-thang" };
}

export function XemNgayTotFinder({ viec }: { viec: ViecMeta }) {
  const [applied, setApplied] = useState<Params>(() => defaultParams());
  const [draft, setDraft] = useState<Params>(() => defaultParams());

  const today = getVietnamToday();
  const labels = rangeLabels(today.year);
  const { from, to } = rangeFor(applied.range, today);
  const rangeLabel = `${labels[applied.range]} (${formatSolarDate(from)} – ${formatSolarDate(to)})`;
  const dateMax = `${today.year}-12-31`;

  const twoPersons = viec.personLabels.length > 1;
  const dateA = parseISODate(applied.dateA) ?? defaultBirthDate(28);
  const dateB = parseISODate(applied.dateB) ?? defaultBirthDate(26);
  const birthDates = twoPersons ? [dateA, dateB] : [dateA];

  const results = useMemo<DayResult[]>(
    () => bestDaysInRange(viec, from, to, birthDates, 7),
    [viec, from.day, from.month, from.year, to.day, to.month, to.year, dateA.day, dateA.month, dateA.year, dateB.day, dateB.month, dateB.year, twoPersons],
  );

  function handleReset() {
    const d = defaultParams();
    setDraft(d);
    setApplied(d);
  }

  function handleFind() {
    setApplied(draft);
  }

  const draftDateA = parseISODate(draft.dateA);
  const draftDateB = parseISODate(draft.dateB);

  return (
    <>
      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Thông tin người xem</span>
          <span className="rule" />
        </div>
        {twoPersons ? (
          <>
            <div className="difld">
              <label htmlFor="date-a">Ngày sinh chú rể</label>
              <input
                id="date-a"
                type="date"
                min="1900-01-01"
                max={dateMax}
                value={draft.dateA}
                onChange={(e) => setDraft((p) => ({ ...p, dateA: e.target.value }))}
              />
              {draftDateA && <div className="fldhint">{birthDateLabel(draftDateA)}</div>}
            </div>
            <div className="difld">
              <label htmlFor="date-b">Ngày sinh cô dâu</label>
              <input
                id="date-b"
                type="date"
                min="1900-01-01"
                max={dateMax}
                value={draft.dateB}
                onChange={(e) => setDraft((p) => ({ ...p, dateB: e.target.value }))}
              />
              {draftDateB && <div className="fldhint">{birthDateLabel(draftDateB)}</div>}
            </div>
          </>
        ) : (
          <div className="difld">
            <label htmlFor="date-a">Ngày sinh</label>
            <input
              id="date-a"
              type="date"
              min="1900-01-01"
              max={dateMax}
              value={draft.dateA}
              onChange={(e) => setDraft((p) => ({ ...p, dateA: e.target.value }))}
            />
            {draftDateA && <div className="fldhint">{birthDateLabel(draftDateA)}</div>}
          </div>
        )}
        <div className="difld" style={{ marginBottom: 0 }}>
          <label htmlFor="range">Khoảng thời gian</label>
          <select
            id="range"
            value={draft.range}
            onChange={(e) => setDraft((p) => ({ ...p, range: e.target.value as RangeOption }))}
          >
            {(Object.keys(labels) as RangeOption[]).map((opt) => (
              <option key={opt} value={opt}>
                {labels[opt]}
              </option>
            ))}
          </select>
        </div>
        <div className="right">
          <button type="button" className="btn" onClick={handleReset}>
            Đặt lại
          </button>
          <button type="button" className="btn pri" onClick={handleFind}>
            Tìm ngày tốt
          </button>
        </div>
      </div>

      <h2 className="hh" style={{ marginTop: 28 }}>
        Bảy ngày tốt nhất trong {rangeLabel}
      </h2>
      <div className="box" style={{ padding: 14 }}>
        {results.length === 0 && <p style={{ textAlign: "center", color: "var(--ink-3)", margin: 0 }}>Không có ngày nào trong khoảng đã chọn.</p>}
        {results.map((r) => {
          const hasDetailPage = r.solar.year >= YEAR_START && r.solar.year <= YEAR_END;
          const badgeClass = r.score.score >= 85 ? "n" : r.score.score >= 70 ? "n mid" : "n low";
          const barClass = r.score.score >= 85 ? "" : r.score.score >= 70 ? "mid" : "low";
          const dateSlug = dateToSlug(r.solar);
          return (
            <div className="res" key={dateSlug}>
              <div className="dt">
                <div className="d">{r.solar.day}</div>
                <div className="m">{r.monthWord}</div>
                <div className="w">{r.weekday}</div>
              </div>
              <div className="mid">
                <div className="a">
                  {hasDetailPage ? (
                    <Link href={`/ngay/${dateSlug}`}>
                      Ngày {r.canChiName} · {r.lunarLabel}
                    </Link>
                  ) : (
                    <>
                      Ngày {r.canChiName} · {r.lunarLabel}
                    </>
                  )}
                </div>
                <div className="b">{r.score.reason}</div>
                {(r.score.goodStars.length > 0 || r.score.badStars.length > 0 || r.score.daiKy.length > 0) && (
                  <div className="tags">
                    {r.score.goodStars.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                    {r.score.badStars.map((s) => (
                      <span className="x" key={s}>
                        {s}
                      </span>
                    ))}
                    {r.score.daiKy.map((s) => (
                      <span className="x" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="score">
                <div className={badgeClass}>{r.score.score}</div>
                {r.score.scoreLabel && <div className="l">{r.score.scoreLabel}</div>}
                <div className="bar">
                  <i className={barClass} style={{ width: `${r.score.score}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
