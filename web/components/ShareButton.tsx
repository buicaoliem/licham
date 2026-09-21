"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { copyText, facebookShareUrl, reduceMenu, shareNative, type ShareData } from "@/lib/share";

function ShareIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="2.6" />
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="18" cy="19" r="2.6" />
      <path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3" />
    </svg>
  );
}

function legacyCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok;
}

/**
 * Nút chia sẻ phụ (secondary): ưu tiên Web Share API, không có thì mở menu nhỏ (Sao chép liên kết, Facebook).
 * `url` phải là URL chuẩn đầy đủ (dựng bằng buildShareUrl), không mang tham số theo dõi.
 */
export function ShareButton({
  url,
  title,
  text,
  variant = "plain",
  align = "center",
  label = "Chia sẻ",
  className,
}: ShareData & { variant?: "plain" | "onband"; align?: "center" | "end"; label?: string; className?: string }) {
  const [menu, dispatch] = useReducer(reduceMenu, { open: false });
  const [toast, setToast] = useState<string | null>(null);
  const rootRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!menu.open) return;
    rootRef.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) dispatch("outside");
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menu.open]);

  function flash(message: string) {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2200);
  }

  async function onShare() {
    if (menu.open) return dispatch("toggle");
    const nav = typeof navigator === "undefined" ? undefined : navigator;
    const outcome = await shareNative(
      {
        share: typeof nav?.share === "function" ? (d) => nav.share(d) : undefined,
        canShare: typeof nav?.canShare === "function" ? (d) => nav.canShare(d) : undefined,
      },
      { title, text, url },
    );
    if (outcome === "fallback") dispatch("toggle");
  }

  async function onCopy() {
    const ok = await copyText({ writeText: navigator.clipboard ? (t) => navigator.clipboard.writeText(t) : undefined, legacyCopy }, url);
    dispatch("select");
    btnRef.current?.focus();
    flash(ok ? "Đã sao chép liên kết" : "Không sao chép được, hãy sao chép từ thanh địa chỉ");
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!menu.open) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      dispatch("escape");
      btnRef.current?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const items = [...(rootRef.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? [])];
      const i = items.indexOf(document.activeElement as HTMLElement);
      items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
    }
  }

  return (
    <span className={`share share-${align}${className ? ` ${className}` : ""}`} ref={rootRef} onKeyDown={onKeyDown}>
      <button
        type="button"
        ref={btnRef}
        className={`btn share-btn${variant === "onband" ? " onband" : ""}`}
        aria-haspopup="menu"
        aria-expanded={menu.open}
        aria-label={`${label}: ${title}`}
        onClick={onShare}
      >
        <ShareIcon />
        <span>{label}</span>
      </button>
      {menu.open && (
        <div className="share-menu" role="menu" aria-label="Chia sẻ trang này">
          <button type="button" role="menuitem" onClick={onCopy}>
            Sao chép liên kết
          </button>
          <a role="menuitem" href={facebookShareUrl(url)} target="_blank" rel="noopener noreferrer nofollow" onClick={() => dispatch("select")}>
            Facebook
          </a>
        </div>
      )}
      {toast && (
        <span className="share-toast" role="status" aria-live="polite">
          {toast}
        </span>
      )}
    </span>
  );
}
