import { type NextRequest, NextResponse } from "next/server";
import { resolveLegacyUrl } from "@/lib/calendar/legacy-urls";
import { isGonePath } from "@/lib/legacy-gone";

/**
 * `skipTrailingSlashRedirect` tắt bước 308 thêm "/" của Next để URL cũ (không có "/" cuối) chỉ redirect
 * đúng một bước 301 tới URL chuẩn. Middleware tự thêm "/" cho mọi đường dẫn còn lại.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  // URL của site casino cũ trên tên miền này: 410 Gone (không redirect, không thêm "/").
  if (isGonePath(pathname, search)) {
    return new NextResponse("410 Gone", { status: 410, headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" } });
  }
  const result = resolveLegacyUrl(pathname);
  if (result) {
    if (result.kind === "redirect") return NextResponse.redirect(new URL(result.to, req.url), 301);
    // Trang không tồn tại: render 404 thật, không redirect.
    return NextResponse.rewrite(new URL("/ngay/0000-00-00/", req.url));
  }
  const last = pathname.slice(pathname.lastIndexOf("/") + 1);
  if (!pathname.endsWith("/") && !last.includes(".")) return NextResponse.redirect(new URL(`${pathname}/${search}`, req.url), 308);
  return NextResponse.next();
}

// Bỏ qua _next và api; tệp có phần mở rộng (sitemap.xml, favicon…) được bỏ qua trong middleware.
export const config = {
  // "/" riêng để bắt được /?p=123 (kiểu WordPress).
  matcher: ["/", "/((?!_next/|api/).+)"],
};
