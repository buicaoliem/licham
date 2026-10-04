import type { NextConfig } from "next";
import { LE_HOI_IMPORTED } from "./lib/van-hoa/data/le-hoi.generated";

// URL cũ (/ngay/DD-MM-YYYY, /lich-thang-M-YYYY) được xử lý trong middleware.ts để kiểm tra tính hợp lệ của ngày.
const nextConfig: NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  transpilePackages: ["@licham/core"],
  images: { unoptimized: true },
  // Feed nội dung cho app di động (public/api/app/content, sinh lúc build): không để công cụ tìm kiếm lập chỉ mục.
  // Manifest và bản không băm cache ngắn; file có hash trong tên (catalog.<12 hex>.json) bất biến nên cache dài.
  async headers() {
    const feed = "/api/app/content";
    return [
      {
        source: `${feed}/:path*`,
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=300" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      {
        source: `${feed}/:file((?:catalog|heritage|articles)\\.[0-9a-f]{12}\\.json)`,
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  // Lễ hội đã đổi slug: trang cũ chuyển hướng vĩnh viễn (308) sang slug mới.
  async redirects() {
    return LE_HOI_IMPORTED.filter((f) => f.oldSlug).map((f) => ({ source: `/van-hoa/le-hoi/${f.oldSlug}`, destination: `/van-hoa/le-hoi/${f.slug}/`, permanent: true }));
  },
};

export default nextConfig;
