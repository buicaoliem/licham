"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { canChiNamDuong } from "@licham/core";
import { type TenGioi, goiYTenTheoNam, hanhGoiYTheoNam } from "@/lib/ten";
import { getVietnamToday } from "@/lib/today";

export function TenGoiY() {
  const today = getVietnamToday();
  const [year, setYear] = useState(today.year);
  const [gioi, setGioi] = useState<TenGioi | "all">("all");

  const { namMenh, hanhSinh } = hanhGoiYTheoNam(year);
  const canChi = canChiNamDuong(year);
  const list = useMemo(() => goiYTenTheoNam(year, gioi), [year, gioi]);

  return (
    <div className="box">
      <div className="box-h">
        <span className="rule" />
        <span className="t">Gợi ý theo năm sinh (dương lịch)</span>
        <span className="rule" />
      </div>
      <div className="difld">
        <label htmlFor="ten-year">Năm sinh con</label>
        <input
          id="ten-year"
          type="number"
          min={1900}
          max={2100}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
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
      <p style={{ fontSize: 13.5 }}>
        Năm {year} ước lượng {canChi.name}, mệnh nạp âm {canChi.napAm.name} (hành {namMenh}). Tục hay chọn chữ hành{" "}
        {hanhSinh} (sinh ra mệnh) hoặc cùng hành {namMenh}. Sinh trước Tết thì can chi thật là năm trước — xem{" "}
        <Link href="/tinh-tuoi">tính tuổi</Link>.
      </p>
      <div className="chips">
        {list.map((t) => (
          <Link className="chip" href={`/ten/${t.slug}`} key={t.slug}>
            {t.ten} ({t.hanh})
          </Link>
        ))}
      </div>
      {list.length === 0 && <p style={{ color: "var(--ink-3)" }}>Năm không hợp lệ hoặc không có tên khớp trong từ điển.</p>}
    </div>
  );
}
