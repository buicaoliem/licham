import type { ReactNode } from "react";
import { Icon } from "@/components/heritage/Icon";
import t from "./tpl.module.css";

/**
 * Mục thu gọn trên điện thoại, chỉ bằng CSS: ô tích ẩn + nhãn. Thu gọn ngay từ lần vẽ đầu (không cần JS, không giật trang),
 * màn hình rộng luôn mở. Nội dung luôn có trong HTML.
 */
export function Acc({ id, num, title, children }: { id: string; num: number; title: string; children: ReactNode }) {
  return (
    <div className={t.acc}>
      <input type="checkbox" id={id} className={t.accToggle} />
      <label htmlFor={id} className={t.accHead}>
        <span className={t.accNum} aria-hidden="true">
          <span>{num}</span>
        </span>
        {title}
        <Icon name="chevron" size={20} className={t.accChev} />
      </label>
      <div className={t.accBody}>{children}</div>
    </div>
  );
}
