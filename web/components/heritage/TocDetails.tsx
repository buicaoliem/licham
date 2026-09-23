"use client";

import { type ReactNode, useRef } from "react";

/** Mục lục thu gọn (điện thoại): tự đóng lại khi chọn một mục để không che nội dung vừa nhảy tới. */
export function TocDetails({ className, summary, children }: { className?: string; summary: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      ref={ref}
      className={className}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a") && ref.current) ref.current.open = false;
      }}
    >
      <summary>{summary}</summary>
      {children}
    </details>
  );
}
