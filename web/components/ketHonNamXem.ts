"use client";

import { useSyncExternalStore } from "react";

// "Năm xem" (năm bắt đầu xét năm cưới) của trang cặp năm sinh nằm ở hash URL (#nam-xem-2027):
// trang được sinh tĩnh nên không đọc được query ở server, còn hash không đổi canonical/SEO.
// Form chọn năm sinh và bảng năm cưới cùng đọc/ghi qua đây.

const EVENT = "kh-nam-xem";
const HASH_RE = /^#nam-xem-(\d{4})$/;

export function namXemHash(nam: number): string {
  return `#nam-xem-${nam}`;
}

function read(): number | null {
  const m = HASH_RE.exec(window.location.hash);
  return m ? Number(m[1]) : null;
}

function subscribe(cb: () => void): () => void {
  window.addEventListener("hashchange", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener(EVENT, cb);
  };
}

/** Năm xem đang chọn trên URL; null = mặc định (lúc dựng trang và khi hash trống). */
export function useNamXem(): number | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

/** Đổi năm xem ngay trên trang hiện tại (không thêm mục lịch sử); null = về mặc định. */
export function setNamXem(nam: number | null): void {
  const url = window.location.pathname + window.location.search + (nam === null ? "" : namXemHash(nam));
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(EVENT));
}
