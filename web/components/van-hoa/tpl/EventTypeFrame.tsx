import type { CSSProperties } from "react";
import { DrumPattern } from "@/components/heritage/AnhHungParts";
import { EVENT_TYPES, eventTypeLabel, type EventType } from "@/lib/van-hoa/event-type";
import t from "./tpl.module.css";

/** Biểu tượng nét mảnh (viewBox 24) cho từng loại sự kiện, vẽ tay theo bộ icon của trang. */
const ICON: Record<EventType, string> = {
  "khoi-nghia": "M6 21V3.5M6 4.5h12l-3 4 3 4H6",
  "tran-danh": "M4 4l12 12M12 16l4-4M16 16l3 3M20 4L8 16M8 16l-4-4M8 16l-3 3",
  "trieu-dai": "M4 19h16M4 19L3 8l5 4 4-7 4 7 5-4-1 11",
  "chinh-tri": "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h4",
  "van-hoa": "M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14C17 4 14 4.5 12 6zM12 6v14",
  "ton-giao": "M3 21h18M5 21v-8M19 21v-8M9 21v-5h6v5M2 13l10-5 10 5M5 10l7-4 7 4M12 3v3",
  "truyen-thuyet": "M12 20c-4 0-8-2.5-9-7 3 0 5.5 1 7 3M12 20c4 0 8-2.5 9-7-3 0-5.5 1-7 3M12 20c-2.5-2-3.5-5-3.5-8S10 6 12 4c2 2 3.5 5 3.5 8s-1 6-3.5 8z",
  "nhan-vat": "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6",
  khac: "M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9",
};

const TONE: Record<EventType, "son" | "luc" | "kim"> = {
  "khoi-nghia": "son",
  "tran-danh": "son",
  "trieu-dai": "kim",
  "chinh-tri": "kim",
  "van-hoa": "luc",
  "ton-giao": "kim",
  "truyen-thuyet": "luc",
  "nhan-vat": "kim",
  khac: "kim",
};

/**
 * Khung biểu tượng cho sự kiện không có tranh riêng: hoa văn trống đồng làm nền, một icon theo loại ở giữa.
 * Cùng kiểu với khung nhân vật chưa có tranh (.ah-art); không kèm chú thích "Tranh minh họa". Kích thước do `className` quyết định.
 */
export function EventTypeFrame({ type, className }: { type?: EventType; className: string }) {
  const k: EventType = EVENT_TYPES.some((x) => x.key === type) ? type! : "khac";
  const tone = TONE[k];
  return (
    <div className={`${className} ${t.typeFrame}`} style={{ "--tone": `var(--${tone})`, "--tone-soft": `var(--${tone}-soft)` } as CSSProperties} role="img" aria-label={eventTypeLabel(k)}>
      <DrumPattern className={t.typeBg} />
      <svg className={t.typeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d={ICON[k]} />
      </svg>
    </div>
  );
}
