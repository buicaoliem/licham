"use client";

import Link from "next/link";
import { useState } from "react";
import { type SolarDate, getDayInfo, isValidSolarDate, jdFromDate, lunarToSolar, solarToLunar } from "@licham/core";
import { dateToSlug } from "@/lib/date-slug";
import { MONTH_WORD, WEEKDAY_LONG, pad2 } from "@/lib/format";
import { YEAR_END, YEAR_START } from "@/lib/site-years";

interface AmDraft {
  day: number;
  month: number;
  isLeap: boolean;
}

function todaySolar(): SolarDate {
  const now = new Date();
  return { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
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

export function DoiNgayConverter() {
  const [duong, setDuong] = useState<SolarDate>(() => todaySolar());
  const [activeSide, setActiveSide] = useState<"duong" | "am">("duong");
  const [duongDraft, setDuongDraft] = useState(() => toISO(todaySolar()));
  const [amDraft, setAmDraft] = useState<AmDraft>(() => amDraftOf(todaySolar()));
  const [error, setError] = useState<string | null>(null);

  const lunar = solarToLunar(duong.day, duong.month, duong.year);
  const info = getDayInfo(duong);

  function handleSwap() {
    setActiveSide((s) => (s === "duong" ? "am" : "duong"));
    setError(null);
  }

  function handleToday() {
    const t = todaySolar();
    setDuong(t);
    setDuongDraft(toISO(t));
    setAmDraft(amDraftOf(t));
    setActiveSide("duong");
    setError(null);
  }

  function handleConvert() {
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

  const today = todaySolar();
  const diffDays = jdFromDate(duong.day, duong.month, duong.year) - jdFromDate(today.day, today.month, today.year);
  const diffLabel = diffDays === 0 ? "Chính là hôm nay" : diffDays > 0 ? `${diffDays} ngày nữa` : `${-diffDays} ngày trước`;
  const hasDetailPage = duong.year >= YEAR_START && duong.year <= YEAR_END;

  return (
    <>
      <div className="box" style={{ marginBottom: 20, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
        {activeSide === "duong" ? (
          <div className="difld">
            <label htmlFor="di-duong">Nhập ngày dương lịch</label>
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
            <label>Nhập ngày âm lịch (năm {lunar.year})</label>
            <div className="row2">
              <input
                type="number"
                aria-label="Ngày âm lịch"
                min={1}
                max={30}
                value={amDraft.day}
                onChange={(e) => {
                  setAmDraft((a) => ({ ...a, day: Number(e.target.value) }));
                  setError(null);
                }}
              />
              <input
                type="number"
                aria-label="Tháng âm lịch"
                min={1}
                max={12}
                value={amDraft.month}
                onChange={(e) => {
                  setAmDraft((a) => ({ ...a, month: Number(e.target.value) }));
                  setError(null);
                }}
              />
            </div>
            <label className="chk">
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
        )}
        {error && <div className="dierr">{error}</div>}
      </div>

      <div className="dconv">
        <div className="cbox">
          <div className="lb">Dương lịch</div>
          <div className="big">{duong.day}</div>
          <div className="sm">
            Tháng {MONTH_WORD[duong.month - 1]} năm {duong.year}
          </div>
          <div className="sm" style={{ color: "var(--ink-3)", fontSize: 12.5 }}>
            {WEEKDAY_LONG[info.solar.dayOfWeek]}
          </div>
        </div>
        <button type="button" className="swap" onClick={handleSwap} aria-label="Đổi chiều nhập ngày">
          ⇄
        </button>
        <div className="cbox">
          <div className="lb">Âm lịch</div>
          <div className="big">{lunar.day}</div>
          <div className="sm">
            Tháng {MONTH_WORD[lunar.month - 1]}
            {lunar.isLeapMonth ? " (nhuận)" : ""} năm {info.canChi.year.name}
          </div>
          <div className="sm" style={{ color: "var(--ink-3)", fontSize: 12.5 }}>
            {lunar.monthLength === 30 ? "Tháng đủ, 30 ngày" : "Tháng thiếu, 29 ngày"}
          </div>
        </div>
      </div>

      <div className="right">
        <button type="button" className="btn" onClick={handleToday}>
          Về hôm nay
        </button>
        <button type="button" className="btn pri" onClick={handleConvert}>
          Đổi ngày
        </button>
      </div>

      <div className="cols2" style={{ marginTop: 22 }}>
        <div className="box">
          <div className="box-h">
            <span className="rule" />
            <span className="t">Can chi</span>
            <span className="rule" />
          </div>
          <div className="row">
            <span>Ngày</span>
            <span>{info.canChi.day.name}</span>
          </div>
          <div className="row">
            <span>Tháng</span>
            <span>{info.canChi.month.name}</span>
          </div>
          <div className="row">
            <span>Năm</span>
            <span>{info.canChi.year.name}</span>
          </div>
          <div className="row">
            <span>Ngũ hành ngày</span>
            <span>{info.canChi.day.napAm.name}</span>
          </div>
          <div className="row">
            <span>Tiết khí</span>
            <span>{info.solarTerm.name}</span>
          </div>
        </div>

        <div className="box">
          <div className="box-h">
            <span className="rule" />
            <span className="t">Ngày này còn là</span>
            <span className="rule" />
          </div>
          <div className="row">
            <span>Tốt xấu</span>
            <span>{info.thanSatNgay.isHoangDao ? "Hoàng đạo" : "Hắc đạo"}</span>
          </div>
          <div className="row">
            <span>Trực</span>
            <span>{info.truc.name}</span>
          </div>
          <div className="row">
            <span>Cách hôm nay</span>
            <span>{diffLabel}</span>
          </div>
          {hasDetailPage && (
            <div className="row">
              <span>Xem đầy đủ</span>
              <span>
                <Link href={`/ngay/${dateToSlug(duong)}`}>Trang chi tiết ngày ›</Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
