"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { canChiNamDuong } from "@licham/core";
import { type TenEntry, type TenGioi, goiYTenTheoNam, hanhGoiYTheoNam } from "@/lib/ten";

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

export function TenGoiY({ initialYear }: { initialYear: number }) {
  const [yearText, setYearText] = useState(String(initialYear));
  const [gioi, setGioi] = useState<TenGioi | "all">("all");

  // Ô trống hoặc năm ngoài 1900–2100 không được đem đi tính (trước đây ô trống thành năm 0).
  const year = /^\d{4}$/.test(yearText) ? Number(yearText) : null;
  const valid = year !== null && year >= MIN_YEAR && year <= MAX_YEAR;
  const list = useMemo<TenEntry[]>(() => (valid ? goiYTenTheoNam(year, gioi) : []), [valid, year, gioi]);
  const menh = valid ? { ...hanhGoiYTheoNam(year), canChi: canChiNamDuong(year) } : null;

  return (
    <section className="ch-card tool-form ten-form" aria-labelledby="ten-form-h">
      <h2 className="ch-h2 ch-card-h" id="ten-form-h">
        Gợi ý theo năm sinh (dương lịch)
      </h2>
      <div className="ten-fields">
        <div className="difld">
          <label htmlFor="ten-year">Năm sinh con</label>
          <input
            id="ten-year"
            type="number"
            inputMode="numeric"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={yearText}
            onChange={(e) => setYearText(e.target.value)}
          />
        </div>
        <div className="difld">
          <label htmlFor="ten-gioi">Giới (tục đặt tên)</label>
          <select id="ten-gioi" value={gioi} onChange={(e) => setGioi(e.target.value as TenGioi | "all")}>
            <option value="all">Tất cả</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>
        </div>
      </div>
      {menh ? (
        <p className="ten-note">
          Năm {year} ước lượng {menh.canChi.name}, mệnh nạp âm {menh.canChi.napAm.name} (hành {menh.namMenh}). Tục hay chọn chữ
          hành {menh.hanhSinh} (sinh ra mệnh) hoặc cùng hành {menh.namMenh}. Sinh trước Tết thì can chi thật là năm trước — xem{" "}
          <Link href="/tinh-tuoi/">tính tuổi</Link>.
        </p>
      ) : (
        <div className="dierr" role="alert">
          Nhập năm sinh từ {MIN_YEAR} đến {MAX_YEAR}.
        </div>
      )}
      {list.length > 0 && (
        <div className="chips">
          {list.map((t) => (
            <Link className="chip" href={`/ten/${t.slug}/`} key={t.slug}>
              {t.ten} ({t.hanh})
            </Link>
          ))}
        </div>
      )}
      {valid && list.length === 0 && <p className="ten-empty">Năm không hợp lệ hoặc không có tên khớp trong từ điển.</p>}
    </section>
  );
}
