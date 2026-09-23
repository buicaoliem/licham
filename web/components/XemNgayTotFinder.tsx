"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SolarDate } from "@licham/core";
import { Icon } from "@/components/heritage/Icon";
import { dayHref } from "@/lib/calendar/urls";
import { pad2 } from "@/lib/format";
import { isSupportedYear } from "@/lib/calendar/config";
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

  // Phụ thuộc theo từng thành phần ngày (số) để không tính lại khi object ngày đổi tham chiếu nhưng cùng giá trị.
  /* eslint-disable react-hooks/exhaustive-deps */
  const results = useMemo<DayResult[]>(
    () => bestDaysInRange(viec, from, to, birthDates, 7),
    [viec, from.day, from.month, from.year, to.day, to.month, to.year, dateA.day, dateA.month, dateA.year, dateB.day, dateB.month, dateB.year, twoPersons],
  );
  /* eslint-enable react-hooks/exhaustive-deps */

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

  const dateField = (id: string, label: string, value: string, key: "dateA" | "dateB", parsed: SolarDate | null) => (
    <div className="difld">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="date"
        min="1900-01-01"
        max={dateMax}
        value={value}
        onChange={(e) => setDraft((p) => ({ ...p, [key]: e.target.value }))}
      />
      {parsed && <p className="fldhint">{birthDateLabel(parsed)}</p>}
    </div>
  );

  return (
    <>
      <section className="ch-card tool-form xn-form" aria-labelledby="xn-form-h">
        <h2 className="ch-h2 ch-card-h" id="xn-form-h">
          Thông tin người xem
        </h2>
        <div className="xn-fields">
          {twoPersons ? (
            <>
              {dateField("date-a", "Ngày sinh chú rể", draft.dateA, "dateA", draftDateA)}
              {dateField("date-b", "Ngày sinh cô dâu", draft.dateB, "dateB", draftDateB)}
            </>
          ) : (
            dateField("date-a", "Ngày sinh", draft.dateA, "dateA", draftDateA)
          )}
          <div className="difld">
            <label htmlFor="range">Khoảng thời gian</label>
            <select id="range" value={draft.range} onChange={(e) => setDraft((p) => ({ ...p, range: e.target.value as RangeOption }))}>
              {(Object.keys(labels) as RangeOption[]).map((opt) => (
                <option key={opt} value={opt}>
                  {labels[opt]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="xn-actions">
          <button type="button" className="ch-btn" onClick={handleReset}>
            Đặt lại
          </button>
          <button type="button" className="ch-btn pri" onClick={handleFind}>
            <Icon name="search" size={18} />
            Tìm ngày tốt
          </button>
        </div>
      </section>

      <section className="ch-card xn-results" aria-live="polite" aria-labelledby="xn-res-h">
        <div className="ch-card-h">
          <h2 className="ch-h2" id="xn-res-h">
            Bảy ngày tốt nhất trong {rangeLabel}
          </h2>
          <p className="ch-sub">Xếp theo điểm từ cao xuống thấp, thang 100 điểm.</p>
        </div>
        {results.length === 0 && <p className="xn-empty">Không có ngày nào trong khoảng đã chọn.</p>}
        <ol className="xn-list">
          {results.map((r, i) => {
            const hasDetailPage = isSupportedYear(r.solar.year);
            const tone = r.score.score >= 85 ? "hi" : r.score.score >= 70 ? "mid" : "low";
            const dateSlug = dayHref(r.solar);
            return (
              <li className={`xn-item ${tone}`} key={dateSlug}>
                <span className="xn-rank" aria-label={`Hạng ${i + 1}`}>
                  {i + 1}
                </span>
                <div className="xn-date">
                  <span className="w">{r.weekday}</span>
                  <b>{r.solar.day}</b>
                  <span className="m">{r.monthWord}</span>
                </div>
                <div className="xn-mid">
                  <p className="a">
                    {hasDetailPage ? (
                      <Link href={dateSlug}>
                        Ngày {r.canChiName} · {r.lunarLabel}
                      </Link>
                    ) : (
                      <>
                        Ngày {r.canChiName} · {r.lunarLabel}
                      </>
                    )}
                  </p>
                  <p className="b">{r.score.reason}</p>
                  {(r.score.goodStars.length > 0 || r.score.badStars.length > 0 || r.score.daiKy.length > 0) && (
                    <div className="xn-tags">
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
                <div className="xn-score">
                  <b>{r.score.score}</b>
                  {r.score.scoreLabel && <span className="l">{r.score.scoreLabel}</span>}
                  <span className="bar" aria-hidden="true">
                    <i style={{ width: `${r.score.score}%` }} />
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
