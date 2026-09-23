"use client";

import { useState } from "react";
import { type CanChi, type TuoiXungLevel, canChiCoXung, canChiFromIndex, canChiNamDuong } from "@licham/core";
import { ConGiapArt } from "@/components/heritage/ConGiapArt";
import { Icon } from "@/components/heritage/Icon";
import { XemTuoiFormCard } from "@/components/heritage/KetHonParts";
import { chiByIndex } from "@/lib/tuoi";

// Chỉ trình bày kết quả của canChiCoXung (@licham/core): lục xung địa chi, tứ xung thiên can,
// thiên khắc địa xung. Không thêm mức hay quy tắc nào khác.

const YEAR_MIN = 1920;
const YEAR_MAX = 2015;
const YEARS: number[] = [];
for (let y = YEAR_MAX; y >= YEAR_MIN; y--) YEARS.push(y);

const LUC_XUNG: [number, number][] = [
  [0, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
];
const TU_XUNG_CAN: [string, string][] = [
  ["Giáp", "Canh"],
  ["Ất", "Tân"],
  ["Bính", "Nhâm"],
  ["Đinh", "Quý"],
];

/**
 * Can của a có thuộc tứ xung với can của b không — hỏi chính canChiCoXung bằng tuổi mang can của a
 * và chi đối với b (nếu tuổi đó có trong 60 hoa giáp). Can khác tính chẵn lẻ thì không bao giờ xung.
 */
function canXung(a: CanChi, b: CanChi): boolean {
  const chiDoi = (b.chiIndex + 6) % 12;
  for (let i = 0; i < 60; i++) {
    const cc = canChiFromIndex(i);
    if (cc.canIndex === a.canIndex && cc.chiIndex === chiDoi) return canChiCoXung(cc, b) === "thien-khac-dia-xung";
  }
  return false;
}

const LEVEL: Record<TuoiXungLevel, { tone: string; label: string }> = {
  "thien-khac-dia-xung": { tone: "bad", label: "Thiên khắc địa xung" },
  "xung-chi": { tone: "mid", label: "Xung chi (lục xung)" },
  "khong-xung": { tone: "ok", label: "Không xung" },
};

function Person({ ten, nam, cc }: { ten: string; nam: number; cc: CanChi }) {
  const chi = chiByIndex(cc.chiIndex);
  return (
    <div className="xt-person">
      <ConGiapArt chiSlug={chi.slug} ten={chi.ten} so={cc.chiIndex + 1} className="xt-art" />
      <div className="xt-person-t">
        <span className="k">
          {ten} · {nam}
        </span>
        <b>{cc.name}</b>
        <span className="s">Tuổi {chi.ten}</span>
      </div>
    </div>
  );
}

/** Các năm sinh trong khoảng của form xung với tuổi đã cho, tách thiên khắc địa xung và xung chi. */
function namXungVoi(cc: CanChi): { tkdx: number[]; chi: number[] } {
  const tkdx: number[] = [];
  const chi: number[] = [];
  for (let y = YEAR_MIN; y <= YEAR_MAX; y++) {
    const level = canChiCoXung(canChiNamDuong(y), cc);
    if (level === "thien-khac-dia-xung") tkdx.push(y);
    else if (level === "xung-chi") chi.push(y);
  }
  return { tkdx, chi };
}

function XungList({ ten, nam, cc, onPick }: { ten: string; nam: number; cc: CanChi; onPick: (y: number) => void }) {
  const { tkdx, chi } = namXungVoi(cc);
  const doi = chiByIndex((cc.chiIndex + 6) % 12).ten;
  return (
    <div className="xt-list">
      <h3>
        Xung với {ten.replace("Người", "người")} ({nam} · {cc.name})
      </h3>
      <p className="kh-note">Người tuổi {doi} xung chi; trùng thêm can xung là thiên khắc địa xung.</p>
      <div className="xt-list-row">
        <span className="pill r">Thiên khắc địa xung</span>
        <div className="xt-years">
          {tkdx.map((y) => (
            <button type="button" key={y} className="bad" onClick={() => onPick(y)}>
              {y} <small>{canChiNamDuong(y).name}</small>
            </button>
          ))}
          {tkdx.length === 0 && <span className="none">Không có năm nào trong {YEAR_MIN}–{YEAR_MAX}</span>}
        </div>
      </div>
      <div className="xt-list-row">
        <span className="pill k">Xung chi</span>
        <div className="xt-years">
          {chi.map((y) => (
            <button type="button" key={y} onClick={() => onPick(y)}>
              {y} <small>{canChiNamDuong(y).name}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function XungTuoiForm() {
  const [a, setA] = useState(1990);
  const [b, setB] = useState(1992);

  const ccA = canChiNamDuong(a);
  const ccB = canChiNamDuong(b);
  const level = canChiCoXung(ccA, ccB);
  const chiXung = level !== "khong-xung";
  const cXung = canXung(ccA, ccB);
  const chiA = chiByIndex(ccA.chiIndex);
  const chiB = chiByIndex(ccB.chiIndex);
  const lv = LEVEL[level];

  const giaiThich =
    level === "thien-khac-dia-xung"
      ? `Chi ${chiA.ten}–${chiB.ten} đứng đối nhau và can ${ccA.can}–${ccB.can} thuộc tứ xung can: xung cả can lẫn chi, mức nặng nhất trong bảng xung.`
      : level === "xung-chi"
        ? `Chi ${chiA.ten}–${chiB.ten} đứng đối nhau trong lục xung; can ${ccA.can}–${ccB.can} không thuộc tứ xung nên chưa tới mức thiên khắc địa xung.`
        : cXung
          ? `Can ${ccA.can}–${ccB.can} thuộc tứ xung can, nhưng chi ${chiA.ten}–${chiB.ten} không đứng đối nhau. Theo cách xét ở đây, xung can chỉ tính khi đã xung chi, nên kết quả là không xung.`
          : `Chi ${chiA.ten}–${chiB.ten} không đứng đối nhau trong lục xung, can ${ccA.can}–${ccB.can} cũng không thuộc tứ xung can.`;

  function field(id: string, label: string, value: number, set: (v: number) => void, cc: CanChi) {
    return (
      <div className="ch-field kh-field">
        <label htmlFor={id}>{label}</label>
        <div className="kh-sel">
          <Icon name="user" size={18} />
          <select id={id} value={value} onChange={(e) => set(Number(e.target.value))}>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <small>
          {cc.name} · tuổi {chiByIndex(cc.chiIndex).ten}
        </small>
      </div>
    );
  }

  return (
    <>
      <XemTuoiFormCard current="xung-tuoi" desc="So hai năm sinh (dương lịch) theo lục xung địa chi và tứ xung thiên can.">
        <div className="kh-form xn-form">
          {field("xt-a", "Năm sinh người A", a, setA, ccA)}
          {field("xt-b", "Năm sinh người B", b, setB, ccB)}
        </div>
        <p className="kh-note">Năm dương là ước lượng năm âm. Sinh trước Tết thì nhập ngày đủ ở trang tính tuổi.</p>
      </XemTuoiFormCard>

      <section className="ch-card xt-result" aria-labelledby="xt-kq-h" aria-live="polite">
        <div className="kh-result-head">
          <h2 className="kh-sec-h" id="xt-kq-h">
            Kết quả so hai tuổi
          </h2>
          <p className="kh-sec-sub">
            {a} ({ccA.name}) và {b} ({ccB.name})
          </p>
        </div>

        <div className="xt-pair">
          <Person ten="Người A" nam={a} cc={ccA} />
          <ul className="xt-links">
            <li className={chiXung ? "bad" : "ok"}>
              <span className="k">Địa chi</span>
              <b>
                {chiA.ten} <span aria-hidden="true">↔</span> {chiB.ten}
              </b>
              <span className={chiXung ? "pill r" : "pill g"}>{chiXung ? "Lục xung" : "Không xung"}</span>
            </li>
            <li className={cXung ? "bad" : "ok"}>
              <span className="k">Thiên can</span>
              <b>
                {ccA.can} <span aria-hidden="true">↔</span> {ccB.can}
              </b>
              <span className={cXung ? "pill r" : "pill g"}>{cXung ? "Tứ xung can" : "Không xung"}</span>
            </li>
          </ul>
          <Person ten="Người B" nam={b} cc={ccB} />
        </div>

        <div className={`xn-sum ${lv.tone}`}>
          <span className="xn-sum-n ic" aria-hidden="true">
            <Icon name="bolt" size={30} stroke={1.5} />
          </span>
          <div>
            <div className="k">Kết luận theo bảng xung</div>
            <div className="v">{lv.label}</div>
            <p>{giaiThich}</p>
          </div>
        </div>
      </section>

      <section className="ch-card" aria-labelledby="xt-nam-h">
        <h2 className="kh-sec-h" id="xt-nam-h">
          Những năm sinh xung với từng người
        </h2>
        <p className="kh-sec-sub">
          Trong khoảng {YEAR_MIN}–{YEAR_MAX}. Bấm một năm để đặt làm người còn lại.
        </p>
        <div className="xt-lists">
          <XungList ten="Người A" nam={a} cc={ccA} onPick={setB} />
          <XungList ten="Người B" nam={b} cc={ccB} onPick={setA} />
        </div>
      </section>

      <section className="ch-card" aria-labelledby="xt-bang-h">
        <h2 className="kh-sec-h" id="xt-bang-h">
          Bảng xung đang dùng
        </h2>
        <div className="kh-groups">
          <div>
            <h3 className="kh-groups-h r">Lục xung địa chi</h3>
            <ul>
              {LUC_XUNG.map(([x, y]) => {
                const on = chiXung && [x, y].includes(ccA.chiIndex);
                return (
                  <li key={x} className={on ? "on" : undefined}>
                    <span>
                      {chiByIndex(x).ten} — {chiByIndex(y).ten}
                    </span>
                    {on && <span className="pill r">Cặp đang xét</span>}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="kh-groups-h r">Tứ xung thiên can</h3>
            <ul>
              {TU_XUNG_CAN.map(([x, y]) => {
                const on = cXung && [x, y].includes(ccA.can);
                return (
                  <li key={x} className={on ? "on" : undefined}>
                    <span>
                      {x} — {y}
                    </span>
                    {on && <span className="pill r">Cặp đang xét</span>}
                  </li>
                );
              })}
            </ul>
            <p className="kh-note">Mậu và Kỷ không có can xung.</p>
          </div>
        </div>
      </section>
    </>
  );
}
