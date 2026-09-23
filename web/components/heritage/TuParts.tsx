import type { ReactNode } from "react";

/** Khối dùng chung của nhóm Xem tuổi (tuổi, sinh năm, tử vi, tính tuổi, đặt tên) theo Contemporary Heritage. */

export function TuoiFact({ k, v, h, tone }: { k: string; v: ReactNode; h?: string; tone?: "g" | "r" }) {
  return (
    <div className="tuoi-fact">
      <span className={tone ? `dot ${tone}` : "dot"} aria-hidden="true" />
      <div>
        <div className="k">{k}</div>
        <div className="v">{v}</div>
        {h && <div className="h">{h}</div>}
      </div>
    </div>
  );
}

/** Khối nội dung của trang tuổi: thẻ + tiêu đề mục + ghi chú nguồn (tùy chọn). */
export function TuSec({ title, note, className, children }: { title: string; note?: string; className?: string; children: ReactNode }) {
  return (
    <section className={className ? `ch-card tu-sec ${className}` : "ch-card tu-sec"}>
      <h2 className="tu-sec-h">{title}</h2>
      {children}
      {note && <p className="tu-note">{note}</p>}
    </section>
  );
}

/** Một dòng hợp/kỵ: nhãn · giá trị · nhãn trạng thái. */
export function HkRow({ k, v, tone }: { k: string; v: ReactNode; tone?: "g" | "r" }) {
  return (
    <li>
      <span className="k">{k}</span>
      <span className="v">{v}</span>
      {tone && <span className={`pill ${tone}`}>{tone === "g" ? "Hợp" : "Kỵ"}</span>}
    </li>
  );
}
