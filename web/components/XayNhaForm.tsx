"use client";

import Link from "next/link";
import { useState } from "react";
import { canChiNamDuong } from "@licham/core";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { XemTuoiFormCard } from "@/components/heritage/KetHonParts";
import { chiByIndex } from "@/lib/tuoi";
import { HOANG_OC_NAMES, type XayNhaResult, hoangOc, tamTaiLabel, xemTuoiXayNha } from "@/lib/xem-tuoi-xay-nha";

// Chỉ trình bày kết quả của xemTuoiXayNha (Kim Lâu, Hoang Ốc, Tam tai, năm tuổi / xung chi) —
// không gộp thành điểm hay kết luận "nên/không nên xây".

function yearOptions(from: number, to: number): number[] {
  const out: number[] = [];
  for (let y = to; y >= from; y--) out.push(y);
  return out;
}

/** Các phép bị phạm trong năm xây (Hoang Ốc xấu tính là phạm). */
function phepPham(r: XayNhaResult): string[] {
  const out: string[] = [];
  if (r.kimLau.phamKimLau) out.push("Kim Lâu");
  if (!r.hoangOc.tot) out.push("Hoang Ốc");
  if (r.tamTai) out.push("Tam tai");
  return out;
}

function Check({
  ten,
  icon,
  bad,
  pill,
  value,
  calc,
}: {
  ten: string;
  icon: IconName;
  bad: boolean;
  pill: string;
  value: string;
  calc: string;
}) {
  return (
    <li className={bad ? "xn-check bad" : "xn-check"}>
      <div className="xn-check-h">
        <span className="ic" aria-hidden="true">
          <Icon name={icon} size={18} />
        </span>
        <b>{ten}</b>
        <span className={bad ? "pill r" : "pill g"}>{pill}</span>
      </div>
      <div className="v">{value}</div>
      <div className="calc">{calc}</div>
    </li>
  );
}

export function XayNhaForm({ year }: { year: number }) {
  const birthYears = yearOptions(1940, year);
  const [namSinh, setNamSinh] = useState(1990);
  // năm xây không trước năm sinh (tuổi mụ từ 1 trở lên)
  const buildYears = yearOptions(Math.max(year - 2, namSinh), year + 8);
  const [namXay, setNamXay] = useState(year);

  const r = xemTuoiXayNha(namSinh, namXay);
  const chiSinh = chiByIndex(r.canChiSinh.chiIndex);
  const chiXay = chiByIndex(r.canChiXay.chiIndex);
  const pham = phepPham(r);
  const tone = pham.length === 0 ? "ok" : pham.length === 1 ? "mid" : "bad";
  const bangNam = Array.from({ length: 9 }, (_, i) => xemTuoiXayNha(namSinh, year + i));

  return (
    <>
      <XemTuoiFormCard current="xay-nha" desc="Xem năm dự định động thổ có phạm Kim Lâu, Hoang Ốc, Tam tai với tuổi gia chủ hay không.">
        <div className="kh-form xn-form">
          <div className="ch-field kh-field">
            <label htmlFor="xn-sinh">Năm sinh gia chủ</label>
            <div className="kh-sel">
              <Icon name="user" size={18} />
              <select id="xn-sinh" value={namSinh} onChange={(e) => {
                  const v = Number(e.target.value);
                  setNamSinh(v);
                  if (namXay < v) setNamXay(v);
                }}>
                {birthYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <small>
              {r.canChiSinh.name} · {r.canChiSinh.napAm.name}
            </small>
          </div>
          <div className="ch-field kh-field">
            <label htmlFor="xn-xay">Năm động thổ / xây</label>
            <div className="kh-sel">
              <Icon name="calendar" size={18} />
              <select id="xn-xay" value={namXay} onChange={(e) => setNamXay(Number(e.target.value))}>
                {buildYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <small>
              {r.canChiXay.name} · tuổi mụ gia chủ {r.tuoiMuValue}
            </small>
          </div>
        </div>
      </XemTuoiFormCard>

      <section className="ch-card xn-result" aria-labelledby="xn-kq-h" aria-live="polite">
        <div className="kh-result-head">
          <h2 className="kh-sec-h" id="xn-kq-h">
            Kết quả năm {namXay}
          </h2>
          <p className="kh-sec-sub">
            Gia chủ sinh {namSinh} ({r.canChiSinh.name}, mệnh {r.canChiSinh.napAm.name}) · năm {namXay} là {r.canChiXay.name} · tuổi mụ{" "}
            {r.tuoiMuValue}
          </p>
        </div>

        <div className={`xn-sum ${tone}`}>
          <span className="xn-sum-n" aria-hidden="true">
            <b>{pham.length}</b>/3
          </span>
          <div>
            <div className="k">Ba phép xem năm làm nhà</div>
            <div className="v">{pham.length === 0 ? "Không phạm phép nào" : `Phạm ${pham.join(", ")}`}</div>
            <div className="tags">
              {r.namTuoi && <span className="tag">Năm tuổi (bổn mạng)</span>}
              {r.xungChi && <span className="tag">Năm xung chi</span>}
              {!r.namTuoi && !r.xungChi && <span className="tag soft">Không trùng chi, không xung chi</span>}
            </div>
          </div>
        </div>

        <ul className="xn-checks">
          <Check
            ten="Kim Lâu"
            icon="temple"
            bad={r.kimLau.phamKimLau}
            pill={r.kimLau.phamKimLau ? "Phạm" : "Không phạm"}
            value={r.kimLau.phamKimLau ? r.kimLau.loai! : "Không phạm Kim Lâu"}
            calc={`${r.tuoiMuValue} chia 9 dư ${r.tuoiMuValue % 9}; dư 1, 3, 6, 8 thì phạm.`}
          />
          <Check
            ten="Hoang Ốc"
            icon="home"
            bad={!r.hoangOc.tot}
            pill={r.hoangOc.tot ? "Tốt" : "Xấu"}
            value={r.hoangOc.name}
            calc={`(${r.tuoiMuValue} − 1) chia 6 dư ${r.hoangOc.remainder} → cung ${r.hoangOc.remainder + 1} trong vòng sáu.`}
          />
          <Check
            ten="Tam tai"
            icon="flame"
            bad={r.tamTai}
            pill={r.tamTai ? "Phạm" : "Không phạm"}
            value={`Tuổi ${chiSinh.ten} kỵ năm ${tamTaiLabel(r.canChiSinh.chiIndex)}`}
            calc={`Năm ${namXay} là năm ${chiXay.ten}${r.tamTai ? ", rơi vào ba năm kỵ." : ", ngoài ba năm kỵ."}`}
          />
        </ul>

        <div className="xn-ring">
          <div className="xn-ring-h">Vòng Hoang Ốc theo tuổi mụ</div>
          <ol>
            {HOANG_OC_NAMES.map((name, i) => (
              <li key={name} className={[hoangOc(i + 1).tot ? "tot" : "xau", i === r.hoangOc.remainder ? "on" : ""].filter(Boolean).join(" ")}>
                <span className="i">{i + 1}</span>
                <span className="t">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ch-card xn-years" aria-labelledby="xn-nam-h">
        <h2 className="kh-sec-h" id="xn-nam-h">
          Các năm tới của gia chủ sinh {namSinh}
        </h2>
        <p className="kh-sec-sub">Chọn một năm trong bảng để xem chi tiết ở trên.</p>
        <table className="tuoitable xn-table">
          <thead>
            <tr>
              <th>Năm</th>
              <th>Kim Lâu</th>
              <th>Hoang Ốc</th>
              <th>Tam tai</th>
            </tr>
          </thead>
          <tbody>
            {bangNam.map((row) => {
              const clean = phepPham(row).length === 0;
              return (
                <tr key={row.namXay} className={[row.namXay === namXay ? "on" : "", clean ? "clean" : ""].filter(Boolean).join(" ") || undefined}>
                  <td data-k="Năm">
                    <button type="button" onClick={() => setNamXay(row.namXay)} aria-pressed={row.namXay === namXay}>
                      <b>{row.namXay}</b>
                      <small>
                        {canChiNamDuong(row.namXay).name}
                        <span className="sep"> · </span>
                        <span className="tm">tuổi mụ {row.tuoiMuValue}</span>
                      </small>
                    </button>
                  </td>
                  <td data-k="Kim Lâu">{row.kimLau.phamKimLau ? <span className="pill r">Phạm</span> : <span className="pill g">Không</span>}</td>
                  <td data-k="Hoang Ốc">
                    <span className={row.hoangOc.tot ? "xn-ho tot" : "xn-ho xau"}>{row.hoangOc.name}</span>
                  </td>
                  <td data-k="Tam tai">{row.tamTai ? <span className="pill r">Phạm</span> : <span className="pill g">Không</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="kh-note">
          Dòng nền xanh: năm không phạm cả ba phép. Năm dương dùng làm ước lượng năm âm — sinh trước Tết thì can chi và tuổi mụ có thể lệch
          một năm, xem <Link href="/tinh-tuoi/">tính tuổi</Link> với ngày sinh đầy đủ.
        </p>
      </section>
    </>
  );
}
