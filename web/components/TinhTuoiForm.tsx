"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { type SolarDate, isValidSolarDate } from "@licham/core";
import { AgeInputError, computeAge, formatSolar } from "@/lib/tinh-tuoi";
import { getVietnamToday } from "@/lib/today";
import { canChiSlug, chiByIndex } from "@/lib/tuoi";

function parseISO(s: string): SolarDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
  return isValidSolarDate(d.day, d.month, d.year) ? d : null;
}

export function TinhTuoiForm() {
  const today = getVietnamToday();
  const [birthIso, setBirthIso] = useState("1990-01-20");

  const { value, error } = useMemo(() => {
    const birth = parseISO(birthIso);
    if (!birth) return { value: null, error: "Ngày sinh không hợp lệ." };
    try {
      return { value: computeAge(birth, today), error: null };
    } catch (err) {
      return { value: null, error: err instanceof AgeInputError ? err.message : "Không tính được tuổi." };
    }
  }, [birthIso, today]);

  return (
    <div className="box">
      <div className="box-h">
        <span className="rule" />
        <span className="t">Nhập ngày sinh dương lịch</span>
        <span className="rule" />
      </div>
      <div className="difld">
        <label htmlFor="tt-birth">Ngày sinh</label>
        <input id="tt-birth" type="date" value={birthIso} onChange={(e) => setBirthIso(e.target.value)} />
      </div>
      {error && <div className="dierr">{error}</div>}
      {value && (
        <>
          <div className="diresrow">
            <span>Tuổi dương</span>
            <span>
              {value.years} năm {value.months} tháng {value.days} ngày
            </span>
          </div>
          <div className="diresrow">
            <span>Tuổi mụ</span>
            <span>{value.tuoiMu} tuổi</span>
          </div>
          <div className="diresrow">
            <span>Can chi năm sinh</span>
            <span>
              <Link href={`/tuoi/${canChiSlug(value.canChi)}`}>{value.canChi.name}</Link>
            </span>
          </div>
          <div className="diresrow">
            <span>Con giáp</span>
            <span>
              <Link href={`/tuoi/${chiByIndex(value.canChi.chiIndex).slug}`}>
                {value.canChi.chi} ({value.conGiap})
              </Link>
            </span>
          </div>
          <div className="diresrow">
            <span>Nạp âm (theo năm can chi)</span>
            <span>
              {value.canChi.napAm.name} — hành {value.canChi.napAm.element}
            </span>
          </div>
          <div className="diresrow">
            <span>Sinh nhật tới</span>
            <span>
              {formatSolar(value.nextBirthday)}
              {value.daysToNextBirthday === 0 ? " (hôm nay)" : ` — còn ${value.daysToNextBirthday} ngày`}
            </span>
          </div>
          <div className="diresrow">
            <span>Năm âm lịch sinh</span>
            <span>{value.lunarBirthYear}</span>
          </div>
          <p className="fldhint" style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-3)", textAlign: "center" }}>
            Tính đến {formatSolar(today)}. Tuổi mụ đổi vào Tết, không vào đúng ngày sinh.
          </p>
        </>
      )}
    </div>
  );
}
