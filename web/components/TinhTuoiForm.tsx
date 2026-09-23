"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type SolarDate, isValidSolarDate } from "@licham/core";
import { parseKey, vnTodayKey } from "@/lib/calendar/vn-today";
import { AgeInputError, computeAge, formatSolar } from "@/lib/tinh-tuoi";
import { canChiSlug, chiByIndex } from "@/lib/tuoi";

function parseISO(s: string): SolarDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
  return isValidSolarDate(d.day, d.month, d.year) ? d : null;
}

const same = (a: SolarDate, b: SolarDate) => a.day === b.day && a.month === b.month && a.year === b.year;

/** `initial`: ngày máy chủ dựng trang (giờ Việt Nam); khi gắn trang được đặt lại theo hôm nay giờ Việt Nam. */
export function TinhTuoiForm({ initial }: { initial: SolarDate }) {
  const [today, setToday] = useState(initial);
  const [birthIso, setBirthIso] = useState("1990-01-20");

  useEffect(() => {
    const t = parseKey(vnTodayKey());
    if (!same(t, initial)) setToday(t);
  }, [initial]);

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
    <>
      <section className="ch-card tool-form tt-form" aria-labelledby="tt-form-h">
        <h2 className="ch-h2 ch-card-h" id="tt-form-h">
          Nhập ngày sinh dương lịch
        </h2>
        <div className="difld">
          <label htmlFor="tt-birth">Ngày sinh</label>
          <input id="tt-birth" type="date" min="1900-01-01" max="2100-12-31" value={birthIso} onChange={(e) => setBirthIso(e.target.value)} />
        </div>
        {error && (
          <div className="dierr" role="alert">
            {error}
          </div>
        )}
      </section>

      {value && (
        <section className="ch-card" aria-live="polite" aria-labelledby="tt-res-h">
          <div className="ch-card-h">
            <h2 className="ch-h2" id="tt-res-h">
              Kết quả
            </h2>
            <p className="ch-sub">Tính đến {formatSolar(today)}. Tuổi mụ đổi vào Tết, không vào đúng ngày sinh.</p>
          </div>
          <div className="ch-stats tt-stats">
            <div className="ch-stat">
              <div className="v sm">
                {value.years} năm {value.months} tháng {value.days} ngày
              </div>
              <div className="k">Tuổi dương</div>
            </div>
            <div className="ch-stat">
              <div className="v">{value.tuoiMu} tuổi</div>
              <div className="k">Tuổi mụ</div>
            </div>
          </div>
          <div className="diresrow">
            <span>Can chi năm sinh</span>
            <span>
              <Link href={`/tuoi/${canChiSlug(value.canChi)}/`}>{value.canChi.name}</Link>
            </span>
          </div>
          <div className="diresrow">
            <span>Con giáp</span>
            <span>
              <Link href={`/tuoi/${chiByIndex(value.canChi.chiIndex).slug}/`}>
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
        </section>
      )}
    </>
  );
}
