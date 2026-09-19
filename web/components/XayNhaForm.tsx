"use client";

import { useMemo, useState } from "react";
import { getVietnamToday } from "@/lib/today";
import { chiByIndex } from "@/lib/tuoi";
import { tamTaiLabel, xemTuoiXayNha } from "@/lib/xem-tuoi-xay-nha";

function yearOptions(from: number, to: number): number[] {
  const out: number[] = [];
  for (let y = to; y >= from; y--) out.push(y);
  return out;
}

export function XayNhaForm() {
  const today = getVietnamToday();
  const birthYears = useMemo(() => yearOptions(1940, today.year), [today.year]);
  const buildYears = useMemo(() => yearOptions(today.year - 2, today.year + 8), [today.year]);
  const [namSinh, setNamSinh] = useState(1990);
  const [namXay, setNamXay] = useState(today.year);

  const r = xemTuoiXayNha(namSinh, namXay);
  const chiSinh = chiByIndex(r.canChiSinh.chiIndex);

  return (
    <div className="box">
      <div className="box-h">
        <span className="rule" />
        <span className="t">Năm sinh và năm xây</span>
        <span className="rule" />
      </div>
      <div className="difld">
        <label htmlFor="xn-sinh">Năm sinh gia chủ</label>
        <select id="xn-sinh" value={namSinh} onChange={(e) => setNamSinh(Number(e.target.value))}>
          {birthYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="difld">
        <label htmlFor="xn-xay">Năm động thổ / xây</label>
        <select id="xn-xay" value={namXay} onChange={(e) => setNamXay(Number(e.target.value))}>
          {buildYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="diresrow">
        <span>Tuổi mụ năm xây</span>
        <span>{r.tuoiMuValue}</span>
      </div>
      <div className="diresrow">
        <span>Can chi năm sinh</span>
        <span>
          {r.canChiSinh.name} — mệnh {r.canChiSinh.napAm.name}
        </span>
      </div>
      <div className="diresrow">
        <span>Can chi năm xây</span>
        <span>{r.canChiXay.name}</span>
      </div>
      <div className="diresrow">
        <span>Kim Lâu</span>
        <span>{r.kimLau.phamKimLau ? `Phạm ${r.kimLau.loai}` : "Không phạm"}</span>
      </div>
      <div className="diresrow">
        <span>Hoang Ốc</span>
        <span>
          {r.hoangOc.name} — {r.hoangOc.tot ? "thường coi là tốt" : "thường coi là xấu"}
        </span>
      </div>
      <div className="diresrow">
        <span>Tam tai</span>
        <span>{r.tamTai ? `Phạm (tuổi ${chiSinh.ten} kỵ năm ${tamTaiLabel(r.canChiSinh.chiIndex)})` : "Không phạm"}</span>
      </div>
      <div className="diresrow">
        <span>Năm tuổi / xung chi</span>
        <span>
          {r.namTuoi ? "Năm tuổi (bổn mạng). " : ""}
          {r.xungChi ? "Năm xung chi." : r.namTuoi ? "" : "Không trùng chi, không xung chi."}
        </span>
      </div>
    </div>
  );
}
