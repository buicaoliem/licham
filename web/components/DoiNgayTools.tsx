"use client";

import { useState } from "react";
import { type SolarDate, canChiOfYear, isValidSolarDate, jdFromDate, lunarToSolar } from "@licham/core";
import { pad2 } from "@/lib/format";

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
  const d = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
  return isValidSolarDate(d.day, d.month, d.year) ? d : null;
}

function DemNgay() {
  const today = todaySolar();
  const [fromIso, setFromIso] = useState(() => toISO({ ...today, month: 1, day: 1 }));
  const [toIso, setToIso] = useState(() => toISO(today));

  const from = parseISO(fromIso);
  const to = parseISO(toIso);
  const days = from && to ? jdFromDate(to.day, to.month, to.year) - jdFromDate(from.day, from.month, from.year) : null;

  return (
    <div className="box">
      <div className="box-h">
        <span className="rule" />
        <span className="t">Đếm ngày</span>
        <span className="rule" />
      </div>
      <div className="difld">
        <label htmlFor="dn-from">Từ ngày</label>
        <input id="dn-from" type="date" value={fromIso} onChange={(e) => setFromIso(e.target.value)} />
      </div>
      <div className="difld">
        <label htmlFor="dn-to">Đến ngày</label>
        <input id="dn-to" type="date" value={toIso} onChange={(e) => setToIso(e.target.value)} />
      </div>
      <div className="diresrow">
        <span>Cách nhau</span>
        <span>{days === null ? "—" : `${Math.abs(days)} ngày`}</span>
      </div>
    </div>
  );
}

function DoiNgayGio() {
  const today = todaySolar();
  const [day, setDay] = useState(20);
  const [month, setMonth] = useState(12);

  const years: { year: number; label: string }[] = [];
  for (let y = today.year + 1; y <= today.year + 5; y++) {
    try {
      const solar = lunarToSolar(day, month, y, false);
      years.push({ year: y, label: `${pad2(solar.day)}/${pad2(solar.month)}` });
    } catch {
      years.push({ year: y, label: "—" });
    }
  }

  return (
    <div className="box">
      <div className="box-h">
        <span className="rule" />
        <span className="t">Đổi ngày giỗ sang dương</span>
        <span className="rule" />
      </div>
      <div className="difld">
        <label>Ngày âm</label>
        <div className="row2">
          <input
            type="number"
            aria-label="Ngày âm"
            min={1}
            max={30}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          />
          <input
            type="number"
            aria-label="Tháng âm"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
        </div>
      </div>
      {years.map((y) => (
        <div className="diresrow" key={y.year}>
          <span>Năm {y.year}</span>
          <span>{y.label}</span>
        </div>
      ))}
    </div>
  );
}

function TinhTuoi() {
  const today = todaySolar();
  const [birthYear, setBirthYear] = useState(today.year - 30);

  const valid = Number.isInteger(birthYear) && birthYear >= 1900 && birthYear <= today.year;
  const canChi = valid ? canChiOfYear(birthYear) : null;
  const tuoiDuong = valid ? today.year - birthYear : null;

  return (
    <div className="box">
      <div className="box-h">
        <span className="rule" />
        <span className="t">Tính tuổi</span>
        <span className="rule" />
      </div>
      <div className="difld">
        <label htmlFor="tt-year">Năm sinh</label>
        <input
          id="tt-year"
          type="number"
          min={1900}
          max={today.year}
          value={birthYear}
          onChange={(e) => setBirthYear(Number(e.target.value))}
        />
      </div>
      {valid && canChi && tuoiDuong !== null ? (
        <>
          <div className="diresrow">
            <span>Tuổi dương</span>
            <span>{tuoiDuong} tuổi</span>
          </div>
          <div className="diresrow">
            <span>Tuổi mụ</span>
            <span>{tuoiDuong + 1} tuổi</span>
          </div>
          <div className="diresrow">
            <span>Can chi năm sinh</span>
            <span>{canChi.name}</span>
          </div>
          <div className="diresrow">
            <span>Nạp âm</span>
            <span>{canChi.napAm.name}</span>
          </div>
        </>
      ) : (
        <div className="dierr">Năm sinh không hợp lệ.</div>
      )}
    </div>
  );
}

export function DoiNgayTools() {
  return (
    <div className="tools">
      <DemNgay />
      <DoiNgayGio />
      <TinhTuoi />
    </div>
  );
}
