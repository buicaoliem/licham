import { type NextRequest, NextResponse } from "next/server";
import { resolveLegacyUrl } from "@/lib/calendar/legacy-urls";

export function middleware(req: NextRequest) {
  const result = resolveLegacyUrl(req.nextUrl.pathname);
  if (!result) return NextResponse.next();
  if (result.kind === "redirect") return NextResponse.redirect(new URL(result.to, req.url), 301);
  // Trang không tồn tại: render 404 thật, không redirect.
  return NextResponse.rewrite(new URL("/ngay/0000-00-00/", req.url));
}

// Chỉ chạy cho hai dạng URL cũ, không chạy cho các trang lịch bình thường.
export const config = {
  matcher: ["/ngay/:legacy(\\d{2}-\\d{2}-\\d{4})", "/lich-thang-:legacy(\\d{1,2}-\\d{4})"],
};
