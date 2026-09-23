"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type SolarDate, getDayInfo, isValidSolarDate, jdFromDate, lunarToSolar, solarToLunar } from "@licham/core";
import { Icon } from "@/components/heritage/Icon";
import { dayHref } from "@/lib/calendar/urls";
import { parseKey, vnTodayKey } from "@/lib/calendar/vn-today";
import { MONTH_WORD, WEEKDAY_LONG, pad2 } from "@/lib/format";
import { isSupportedYear } from "@/lib/calendar/config";

interface AmDraft {
  day: number;
  month: number;
  isLeap: boolean;
}

/** Hôm nay theo giờ Việt Nam (UTC+7), không theo múi giờ của máy người xem. */
function todaySolar(): SolarDate {
  return parseKey(vnTodayKey());
}

function toISO(d: SolarDate): string {
  return `${d.year}-${pad2(d.month)}-${pad2(d.day)}`;
}

function parseISO(s: string): SolarDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
}

function amDraftOf(d: SolarDate): AmDraft {
  const l = solarToLunar(d.day, d.month, d.year);
  return { day: l.day, month: l.month, isLeap: l.isLeapMonth };
}

/**
 * Đổi ngày dương ↔ âm. `initial` là ngày máy chủ dựng trang (giờ Việt Nam); trang tĩnh có thể được mở vào ngày
 * khác nên khi gắn trang, nếu người xem chưa thao tác, kết quả được đặt lại về hôm nay theo giờ Việt Nam.
 */
export function DoiNgayConverter({ initial }: { initial: SolarDate }) {
  const [duong, setDuong] = useState<SolarDate>(initial);
  const [today, setToday] = useState<SolarDate>(initial);
  const [activeSide, setActiveSide] = useState<"duong" | "am">("duong");
  const [duongDraft, setDuongDraft] = useState(() => toISO(initial));
  const [amDraft, setAmDraft] = useState<AmDraft>(() => amDraftOf(initial));
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const t = todaySolar();
    if (toISO(t) === toISO(initial)) return;
    setToday(t);
    if (touched) return;
    setDuong(t);
    setDuongDraft(toISO(t));
    setAmDraft(amDraftOf(t));
    // chỉ chạy một lần khi gắn trang
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lunar = solarToLunar(duong.day, duong.month, duong.year);
  const info = getDayInfo(duong);

  function pickSide(side: "duong" | "am") {
    setActiveSide(side);
    setError(null);
  }

  function handleToday() {
    const t = todaySolar();
    setTouched(true);
    setToday(t);
    setDuong(t);
    setDuongDraft(toISO(t));
    setAmDraft(amDraftOf(t));
    setActiveSide("duong");
    setError(null);
  }

  function handleConvert() {
    setTouched(true);
    if (activeSide === "duong") {
      const parsed = parseISO(duongDraft);
      if (!parsed || !isValidSolarDate(parsed.day, parsed.month, parsed.year)) {
        setError("Ngày dương lịch không hợp lệ.");
        return;
      }
      setDuong(parsed);
      setAmDraft(amDraftOf(parsed));
      setError(null);
    } else {
      try {
        const solar = lunarToSolar(amDraft.day, amDraft.month, lunar.year, amDraft.isLeap);
        setDuong(solar);
        setDuongDraft(toISO(solar));
        setError(null);
      } catch {
        setError("Ngày âm lịch này không tồn tại — kiểm tra lại ngày, tháng hoặc ô nhuận.");
      }
    }
  }

  const diffDays = jdFromDate(duong.day, duong.month, duong.year) - jdFromDate(today.day, today.month, today.year);
  const diffLabel = diffDays === 0 ? "Chính là hôm nay" : diffDays > 0 ? `${diffDays} ngày nữa` : `${-diffDays} ngày trước`;
  const hasDetailPage = isSupportedYear(duong.year);

  const facts: { k: string; v: string; s?: string }[] = [
    { k: "Can chi ngày", v: info.canChi.day.name, s: `Ngũ hành ngày: ${info.canChi.day.napAm.name}` },
    { k: "Can chi tháng", v: info.canChi.month.name },
    { k: "Can chi năm", v: info.canChi.year.name },
    { k: "Tiết khí", v: info.solarTerm.name },
    { k: "Tốt xấu", v: info.thanSatNgay.isHoangDao ? "Hoàng đạo" : "Hắc đạo", s: `Trực ${info.truc.name}` },
    { k: "Cách hôm nay", v: diffLabel },
  ];

  return (
    <>
      <section className="ch-card dn-conv" aria-labelledby="dn-conv-h">
        <h2 className="le-sr" id="dn-conv-h">
          Nhập ngày cần đổi
        </h2>
        <div className="dn-tabs" role="group" aria-label="Chiều đổi ngày">
          <button type="button" aria-pressed={activeSide === "duong"} onClick={() => pickSide("duong")}>
            Dương lịch → Âm lịch
          </button>
          <button type="button" aria-pressed={activeSide === "am"} onClick={() => pickSide("am")}>
            Âm lịch → Dương lịch
          </button>
        </div>

        <div className="dn-input">
          {activeSide === "duong" ? (
            <div className="difld">
              <label htmlFor="di-duong">Ngày dương lịch</label>
              <input
                id="di-duong"
                type="date"
                value={duongDraft}
                min="1900-01-01"
                max="2100-12-31"
                onChange={(e) => {
                  setDuongDraft(e.target.value);
                  setError(null);
                }}
              />
            </div>
          ) : (
            <div className="difld">
              <label htmlFor="di-am-ngay">Ngày âm lịch (năm {lunar.year})</label>
              <div className="dn-am">
                <span className="dn-num">
                  <span aria-hidden="true">Ngày</span>
                  <input
                    id="di-am-ngay"
                    type="number"
                    inputMode="numeric"
                    aria-label="Ngày âm lịch"
                    min={1}
                    max={30}
                    value={amDraft.day}
                    onChange={(e) => {
                      setAmDraft((a) => ({ ...a, day: Number(e.target.value) }));
                      setError(null);
                    }}
                  />
                </span>
                <span className="dn-num">
                  <span aria-hidden="true">Tháng</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    aria-label="Tháng âm lịch"
                    min={1}
                    max={12}
                    value={amDraft.month}
                    onChange={(e) => {
                      setAmDraft((a) => ({ ...a, month: Number(e.target.value) }));
                      setError(null);
                    }}
                  />
                </span>
                <label className="dn-chk">
                  <input
                    type="checkbox"
                    checked={amDraft.isLeap}
                    onChange={(e) => {
                      setAmDraft((a) => ({ ...a, isLeap: e.target.checked }));
                      setError(null);
                    }}
                  />
                  Tháng nhuận
                </label>
              </div>
            </div>
          )}
          <div className="dn-actions">
            <button type="button" className="ch-btn" onClick={handleToday}>
              Về hôm nay
            </button>
            <button type="button" className="ch-btn pri" onClick={handleConvert}>
              <Icon name="swap" size={18} />
              Đổi ngày
            </button>
          </div>
        </div>
        {error && (
          <div className="dierr" role="alert">
            {error}
          </div>
        )}
      </section>

      <section className="ch-card dn-result" aria-live="polite" aria-labelledby="dn-res-h">
        <div className="ch-card-h">
          <h2 className="ch-h2" id="dn-res-h">
            Kết quả chuyển đổi
          </h2>
        </div>
        <div className="dn-pair">
          <div className="dn-side duong">
            <span className="lb">
              <Icon name="sun" size={18} />
              Dương lịch
            </span>
            <b>
              {pad2(duong.day)}/{pad2(duong.month)}/{duong.year}
            </b>
            <span className="sm">
              {WEEKDAY_LONG[info.solar.dayOfWeek]}, ngày {duong.day} tháng {MONTH_WORD[duong.month - 1]} năm {duong.year}
            </span>
          </div>
          <div className="dn-side am">
            <span className="lb">
              <Icon name="yinyang" size={18} />
              Âm lịch
            </span>
            <b>
              {pad2(lunar.day)}/{pad2(lunar.month)}
              {lunar.isLeapMonth ? " nhuận" : ""}/{lunar.year}
            </b>
            <span className="sm">
              Tháng {MONTH_WORD[lunar.month - 1]}
              {lunar.isLeapMonth ? " (nhuận)" : ""} năm {info.canChi.year.name} ·{" "}
              {lunar.monthLength === 30 ? "Tháng đủ, 30 ngày" : "Tháng thiếu, 29 ngày"}
            </span>
          </div>
        </div>
        <dl className="dn-facts">
          {facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
              {f.s && <dd className="s">{f.s}</dd>}
            </div>
          ))}
        </dl>
        {hasDetailPage && (
          <div className="dn-detail-row">
            <Link className="ch-btn dn-detail" href={dayHref(duong)}>
              Trang chi tiết ngày {pad2(duong.day)}/{pad2(duong.month)}/{duong.year}
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
