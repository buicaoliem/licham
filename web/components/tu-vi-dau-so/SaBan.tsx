"use client";

import type { Cung, LaSo, SaoTrongCung } from "@/lib/tu-vi-dau-so/engine";
import { tamPhuongTuChinh } from "@/lib/tu-vi-dau-so/engine";
import type { SaoLuu } from "@/lib/tu-vi-dau-so/van-han";
import type { ReactNode } from "react";

/** Vị trí ô trên sa bàn 4×4 truyền thống (hàng, cột) theo địa chi — Tỵ ở góc trên trái, Hợi góc dưới phải. */
export const O_SA_BAN: Record<number, [number, number]> = {
  5: [1, 1],
  6: [1, 2],
  7: [1, 3],
  8: [1, 4],
  4: [2, 1],
  9: [2, 4],
  3: [3, 1],
  10: [3, 4],
  2: [4, 1],
  1: [4, 2],
  0: [4, 3],
  11: [4, 4],
};

const HANH_CLASS: Record<string, string> = { Kim: "h-kim", Mộc: "h-moc", Thủy: "h-thuy", Hỏa: "h-hoa", Thổ: "h-tho" };

export function SaoTen({ s }: { s: SaoTrongCung }) {
  return (
    <>
      {s.name}
      {s.hoa && <span className={`ls-hoa hoa-${s.hoa === "Kỵ" ? "ky" : "tot"}`}>{s.hoa}</span>}
    </>
  );
}

function CellBody({ c, luu, compactNames = false }: { c: Cung; luu: SaoLuu[]; compactNames?: boolean }) {
  return (
    <>
      <span className="ls-cell-top">
        <span className="ls-cname">{c.ten}</span>
        {c.laThan && <span className="ls-than">Thân</span>}
        <span className="ls-dh" title={`Đại hạn ${c.daiHan.tu}–${c.daiHan.den} tuổi`}>
          {c.daiHan.tu}
        </span>
      </span>
      <span className="ls-chinh">
        {c.chinhTinh.length ? (
          c.chinhTinh.map((s) => (
            <span key={s.id} className={HANH_CLASS[s.hanh ?? ""]}>
              <SaoTen s={s} />
            </span>
          ))
        ) : (
          <span className="ls-vcd">Vô chính diệu</span>
        )}
      </span>
      {!compactNames && (
        <span className="ls-phu">
          <span className="ls-phu-col cat">
            {c.phuTinhCat.map((s) => (
              <span key={s.id}>
                <SaoTen s={s} />
              </span>
            ))}
          </span>
          <span className="ls-phu-col sat">
            {c.phuTinhSat.map((s) => (
              <span key={s.id}>
                <SaoTen s={s} />
              </span>
            ))}
          </span>
        </span>
      )}
      {luu.length > 0 && (
        <span className="ls-luu">
          {luu.map((s) => (
            <span key={s.id} className={`t-${s.tone}`}>
              {s.name}
            </span>
          ))}
        </span>
      )}
      <span className="ls-cell-foot">
        <span className="ls-canchi">
          {c.canName} {c.chiName}
          {(c.tuan || c.triet) && (
            <span className="ls-tt">
              {c.tuan && <span>Tuần</span>}
              {c.triet && <span>Triệt</span>}
            </span>
          )}
        </span>
        <span className="ls-vong">
          {c.trangSinh} · {c.bacSi} · {c.thaiTue}
        </span>
      </span>
    </>
  );
}

/** Sa bàn đầy đủ (máy tính, máy tính bảng): 12 ô quanh thiên bàn ở giữa. */
export function SaBanDesktop({
  laSo,
  selected,
  onSelect,
  luu,
  hanCung,
  center,
}: {
  laSo: LaSo;
  selected: number;
  onSelect: (chi: number) => void;
  luu: SaoLuu[];
  /** Cung đại hạn và tiểu hạn của năm xem, để đánh dấu. */
  hanCung: { daiHan?: number; tieuHan?: number };
  center: ReactNode;
}) {
  const tp = tamPhuongTuChinh(selected);
  const related = new Set([tp.xungChieu, ...tp.tamHop]);
  return (
    <div className="ls-board" role="group" aria-label="Sa bàn 12 cung">
      {laSo.cung.map((c) => {
        const [row, col] = O_SA_BAN[c.chi];
        const cls = [
          "ls-cell",
          c.chi === selected ? "on" : "",
          related.has(c.chi) ? "tp" : "",
          c.chi === laSo.menhChi ? "menh" : "",
          c.chi === hanCung.daiHan ? "dh-on" : "",
          c.chi === hanCung.tieuHan ? "th-on" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <button
            key={c.chi}
            type="button"
            className={cls}
            style={{ gridRow: row, gridColumn: col }}
            aria-pressed={c.chi === selected}
            aria-label={`Cung ${c.ten} tại ${c.chiName}${c.chinhTinh.length ? `, chính tinh ${c.chinhTinh.map((s) => s.name).join(", ")}` : ", vô chính diệu"}`}
            onClick={() => onSelect(c.chi)}
          >
            <CellBody c={c} luu={luu.filter((s) => s.chi === c.chi)} />
            {(c.chi === hanCung.daiHan || c.chi === hanCung.tieuHan) && (
              <span className="ls-han">
                {c.chi === hanCung.daiHan && <span>ĐH</span>}
                {c.chi === hanCung.tieuHan && <span>TH</span>}
              </span>
            )}
          </button>
        );
      })}
      <div className="ls-center">{center}</div>
    </div>
  );
}

/** Mobile: bản đồ 12 cung tối giản để chọn cung (chỉ tên cung và chính tinh), không phải sa bàn thu nhỏ. */
export function CungMap({ laSo, selected, onSelect, hanCung }: { laSo: LaSo; selected: number; onSelect: (chi: number) => void; hanCung: { daiHan?: number; tieuHan?: number } }) {
  const tp = tamPhuongTuChinh(selected);
  const related = new Set([tp.xungChieu, ...tp.tamHop]);
  return (
    <div className="ls-map" role="group" aria-label="Chọn cung">
      {laSo.cung.map((c) => {
        const [row, col] = O_SA_BAN[c.chi];
        return (
          <button
            key={c.chi}
            type="button"
            className={["ls-map-c", c.chi === selected ? "on" : "", related.has(c.chi) ? "tp" : "", c.chi === laSo.menhChi ? "menh" : ""].filter(Boolean).join(" ")}
            style={{ gridRow: row, gridColumn: col }}
            aria-pressed={c.chi === selected}
            onClick={() => onSelect(c.chi)}
          >
            <span className="n">
              {c.ten}
              {c.laThan ? " · Thân" : ""}
            </span>
            <span className="s">{c.chinhTinh.length ? c.chinhTinh.map((s) => s.name).join(", ") : "VCD"}</span>
            <span className="z">
              {c.chiName}
              {c.chi === hanCung.daiHan ? " · ĐH" : ""}
              {c.chi === hanCung.tieuHan ? " · TH" : ""}
            </span>
          </button>
        );
      })}
      <div className="ls-map-mid" aria-hidden="true">
        <span>{laSo.canChiNam.name}</span>
        <span>{laSo.cuc.ten}</span>
      </div>
    </div>
  );
}
