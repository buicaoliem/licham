"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

/**
 * Menu thả xuống trên điện thoại/máy tính bảng (< 1024px): nút ba gạch bên phải đầu trang,
 * panel căn mép phải ngay dưới đầu trang. Đóng khi nhấn lại nút, nhấn ra ngoài, chọn một mục,
 * nhấn Escape hoặc khi đổi trang.
 */
export function ChMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="ch-menu" ref={rootRef}>
      <button
        ref={btnRef}
        type="button"
        className="ch-menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? "close" : "menu"} size={22} />
      </button>
      <nav
        id={panelId}
        className="ch-menu-panel"
        aria-label="Menu chính"
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        {children}
      </nav>
    </div>
  );
}
