import type { CSSProperties, ReactNode } from "react";

/** Khung mục có tiêu đề h2, dùng lại cho mọi khối trang lịch. */
export function Box({ title, children, style }: { title: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <section className="box" style={style}>
      <h2 className="box-h">
        <span className="rule" />
        <span className="t">{title}</span>
        <span className="rule" />
      </h2>
      {children}
    </section>
  );
}
