"use client";

import { useEffect } from "react";
import { vnTodayKey } from "@/lib/calendar/vn-today";

/**
 * Trang dựng sẵn có thể cũ hơn ngày thật (ISR, qua 00:00): đặt lại lớp "today" trên các ô [data-day]
 * theo giờ Việt Nam của máy người xem. Không đổi nội dung nào khác.
 */
export function LichTodayMarker({ scope }: { scope: string }) {
  useEffect(() => {
    const root = document.querySelector(scope);
    if (!root) return;
    const t = vnTodayKey();
    for (const el of root.querySelectorAll<HTMLElement>("[data-day]")) {
      const on = el.dataset.day === t;
      el.classList.toggle("today", on);
      if (on) el.setAttribute("aria-current", "date");
      else el.removeAttribute("aria-current");
    }
  }, [scope]);
  return null;
}
