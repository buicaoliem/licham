/**
 * Dữ liệu URL cũ của website casino/spam từng dùng tên miền licham.app (khoảng 10/2025–05/2026).
 * Mọi URL khớp ở đây trả HTTP 410 Gone (xem middleware.ts). Muốn mở rộng chỉ cần thêm vào file này.
 *
 * Nguồn: Wayback CDX (licham.app/*), các URL chụp trước 09/2026 và không thuộc route hiện tại.
 * Quy ước: đường dẫn so khớp không phân biệt "/" cuối; không được trùng bất kỳ URL nào trong sitemap
 * (kiểm tra bằng `pnpm check:gone`).
 */

/** Tiền tố: khớp chính nó và mọi đường dẫn con (vd. "/tag" khớp "/tag", "/tag/casino-x/"). */
export const GONE_PREFIXES: readonly string[] = [
  "/tag",
  "/category",
  "/author",
  "/page",
  "/feed",
  "/comments",
  "/wp-admin",
  "/wp-content",
  "/wp-includes",
  "/wp-json",
  "/assets",
  "/css",
  "/img",
  "/js",
];

/** Đường dẫn bắt đầu bằng chuỗi này (không cần ranh giới "/"): /wp-login.php, /feeds, /wp-sitemap.xml… */
export const GONE_STARTS_WITH: readonly string[] = ["/wp-", "/feed"];

/** Đường dẫn đúng bằng (đã bỏ "/" cuối): bài viết và trang gốc của site cũ. */
export const GONE_EXACT: readonly string[] = [
  "/xmlrpc.php",
  "/about-us",
  "/aliquam-voluptatem-id-et",
  "/bYnsbeNzG.js",
  "/best-welcome-bonus-casino-2025",
  "/bkKzoetBD.js",
  "/bnYtaUgJG.js",
  "/casino-games-offer-best-odds",
  "/casino-rtp",
  "/choose-safe-online-casino-in-2025",
  "/contact-us",
  "/corrupti-et-repellendus-cumque-id-fuga",
  "/esse-et-quas-voluptas-ex",
  "/hello-world",
  "/magni-facere-unde-optio",
  "/molestiae-et-ab-odio-tempora",
  "/no-wagering-bonus-casinos",
  "/omnis-dolorem-natus-suscipit-assumenda",
  "/online-casino-bonus",
  "/privacy-policy",
  "/rem-quo-sunt-neque-accusantium-commodi",
  "/slot-machine-features",
  "/sitemap",
  "/style.css",
  "/table-games-online-casinos",
  "/top-mistakes-casino-players-avoid",
  "/veritatis-non-iure-dolores-nulla",
  "/vitae-aut-voluptates-perferendis-sint",
  "/voluptatem-minus-quia-assumenda-vel",
  "/wagering-requirements-online-bonuses",
  "/what-is-online-casino",
];

/** Query kiểu WordPress trên trang gốc: /?p=123, /?page_id=5, /?s=casino. */
export const GONE_QUERY_PARAMS: readonly string[] = ["p", "page_id", "s"];

function normalize(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

/** `true` nếu (pathname, search) là URL cũ của site casino và phải trả 410. */
export function isGonePath(pathname: string, search = ""): boolean {
  const p = normalize(pathname);
  if (p === "/") {
    const params = new URLSearchParams(search);
    return GONE_QUERY_PARAMS.some((k) => params.has(k));
  }
  if (GONE_EXACT.includes(p)) return true;
  if (GONE_PREFIXES.some((x) => p === x || p.startsWith(`${x}/`))) return true;
  return GONE_STARTS_WITH.some((x) => p.startsWith(x));
}
