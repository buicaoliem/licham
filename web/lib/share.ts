import { SITE_URL } from "./site";

export interface ShareData {
  title: string;
  text: string;
  url: string;
}

/**
 * URL đầy đủ để chia sẻ: luôn trên host chuẩn, có "/" cuối, bỏ hash và mọi query (utm, debug, preview…).
 * Chỉ giữ các query trong `keep` (theo đúng thứ tự khai báo) khi cần để tái tạo kết quả công cụ.
 */
export function buildShareUrl(path: string, opts?: { keep?: readonly string[]; query?: Record<string, string | string[] | undefined> }): string {
  let pathname = path.startsWith(SITE_URL) ? path.slice(SITE_URL.length) : path;
  pathname = pathname.split("#")[0]!.split("?")[0]!;
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (!pathname.endsWith("/")) pathname += "/";
  const qs = new URLSearchParams();
  for (const key of opts?.keep ?? []) {
    const raw = opts?.query?.[key];
    const value = (Array.isArray(raw) ? raw[0] : raw)?.trim();
    if (value) qs.set(key, value);
  }
  const query = qs.toString();
  return `${SITE_URL}${pathname}${query ? `?${query}` : ""}`;
}

export function facebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export interface ShareDeps {
  share?: (data: ShareData) => Promise<void>;
  canShare?: (data: ShareData) => boolean;
}

export type ShareOutcome = "native" | "cancelled" | "fallback";

/** Ưu tiên Web Share API; không hỗ trợ → "fallback" để UI mở menu. Người dùng đóng hộp thoại → "cancelled" (không báo lỗi). */
export async function shareNative(deps: ShareDeps, data: ShareData): Promise<ShareOutcome> {
  if (!deps.share || (deps.canShare && !deps.canShare(data))) return "fallback";
  try {
    await deps.share(data);
    return "native";
  } catch (e) {
    return (e as { name?: string })?.name === "AbortError" ? "cancelled" : "fallback";
  }
}

export interface ClipboardDeps {
  writeText?: (text: string) => Promise<void>;
  legacyCopy?: (text: string) => boolean;
}

export async function copyText(deps: ClipboardDeps, text: string): Promise<boolean> {
  if (deps.writeText) {
    try {
      await deps.writeText(text);
      return true;
    } catch {
      /* thử cách dự phòng */
    }
  }
  try {
    return deps.legacyCopy ? deps.legacyCopy(text) : false;
  } catch {
    return false;
  }
}

export type MenuState = { open: boolean };
export type MenuEvent = "toggle" | "escape" | "outside" | "select";

/** Trạng thái menu chia sẻ: Escape, bấm ra ngoài và chọn mục đều đóng; toggle đảo trạng thái. */
export function reduceMenu(state: MenuState, event: MenuEvent): MenuState {
  switch (event) {
    case "toggle":
      return { open: !state.open };
    case "escape":
    case "outside":
    case "select":
      return state.open ? { open: false } : state;
  }
}
