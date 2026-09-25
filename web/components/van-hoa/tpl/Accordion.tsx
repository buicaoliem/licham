"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/heritage/Icon";
import t from "./tpl.module.css";

/**
 * Mục thu gọn được trên điện thoại. Nội dung luôn có trong HTML (thẻ details, mặc định mở);
 * sau khi tải, màn hình hẹp tự thu gọn, màn hình rộng giữ mở và không bấm được (CSS).
 */
export function Accordion({ num, title, children }: { num: number; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (window.matchMedia("(max-width: 899px)").matches && ref.current) ref.current.open = false;
  }, []);
  return (
    <details className={t.acc} ref={ref} open>
      <summary>
        <span className={t.accNum} aria-hidden="true">
          <span>{num}</span>
        </span>
        {title}
        <Icon name="chevron" size={20} className={t.accChev} />
      </summary>
      <div className={t.accBody}>{children}</div>
    </details>
  );
}
