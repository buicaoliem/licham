"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/heritage/Icon";
import { monthHref, yearHref } from "@/lib/calendar/urls";
import { parseKey, vnTodayKey } from "@/lib/calendar/vn-today";

/** Bộ chọn tháng/năm của lịch: đổi là chuyển trang; nút "Hôm nay"/"Năm nay" lấy ngày theo giờ Việt Nam trên máy người xem. */
export function LichPicker({
  mode,
  month,
  year,
  range,
}: {
  mode: "month" | "year";
  month?: number;
  year: number;
  range: { start: number; end: number };
}) {
  const router = useRouter();
  const years = Array.from({ length: range.end - range.start + 1 }, (_, i) => range.start + i);

  function goToday() {
    const t = parseKey(vnTodayKey());
    const y = Math.min(range.end, Math.max(range.start, t.year));
    router.push(mode === "month" ? monthHref(y === t.year ? t.month : 1, y) : yearHref(y));
  }

  return (
    <div className="lc-picker">
      {mode === "month" && (
        <label className="lc-select">
          <span className="le-sr">Chọn tháng</span>
          <select value={month} onChange={(e) => router.push(monthHref(Number(e.target.value), year))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="lc-select">
        <span className="le-sr">Chọn năm</span>
        <select
          value={year}
          onChange={(e) => {
            const y = Number(e.target.value);
            router.push(mode === "month" ? monthHref(month ?? 1, y) : yearHref(y));
          }}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              Năm {y}
            </option>
          ))}
        </select>
      </label>
      <button type="button" className="btn lc-today-btn" onClick={goToday}>
        <Icon name="calendar" size={16} />
        {mode === "month" ? "Hôm nay" : "Năm nay"}
      </button>
    </div>
  );
}
