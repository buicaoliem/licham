"use client";

import { useMemo, useState } from "react";
import { canChiCoXung, canChiNamDuong } from "@licham/core";
import { chiByIndex } from "@/lib/tuoi";

const YEAR_MIN = 1920;
const YEAR_MAX = 2015;

function yearOptions(): number[] {
  const out: number[] = [];
  for (let y = YEAR_MAX; y >= YEAR_MIN; y--) out.push(y);
  return out;
}

export function XungTuoiForm() {
  const years = useMemo(() => yearOptions(), []);
  const [a, setA] = useState(1990);
  const [b, setB] = useState(1992);

  const ccA = canChiNamDuong(a);
  const ccB = canChiNamDuong(b);
  const level = canChiCoXung(ccA, ccB);
  const chiA = chiByIndex(ccA.chiIndex);
  const chiB = chiByIndex(ccB.chiIndex);

  const label =
    level === "thien-khac-dia-xung"
      ? "Thiên khắc địa xung — xung cả can lẫn chi"
      : level === "xung-chi"
        ? "Xung chi (lục xung) — chưa tới mức thiên khắc địa xung"
        : "Không xung theo lục xung / tứ xung can";

  return (
    <div className="box">
      <div className="box-h">
        <span className="rule" />
        <span className="t">Hai năm sinh (dương lịch)</span>
        <span className="rule" />
      </div>
      <div className="difld">
        <label htmlFor="xt-a">Năm sinh người A</label>
        <select id="xt-a" value={a} onChange={(e) => setA(Number(e.target.value))}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="difld">
        <label htmlFor="xt-b">Năm sinh người B</label>
        <select id="xt-b" value={b} onChange={(e) => setB(Number(e.target.value))}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="diresrow">
        <span>Can chi A</span>
        <span>
          {ccA.name} — tuổi {chiA.ten}
        </span>
      </div>
      <div className="diresrow">
        <span>Can chi B</span>
        <span>
          {ccB.name} — tuổi {chiB.ten}
        </span>
      </div>
      <div className="diresrow">
        <span>Kết quả</span>
        <span>{label}</span>
      </div>
      <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 10 }}>
        Năm dương là ước lượng năm âm. Sinh trước Tết thì nhập ngày đủ ở trang tính tuổi.
      </p>
    </div>
  );
}
