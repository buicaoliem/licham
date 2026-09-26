import type { NextConfig } from "next";
import { LE_HOI_IMPORTED } from "./lib/van-hoa/data/le-hoi.generated";

// URL cũ (/ngay/DD-MM-YYYY, /lich-thang-M-YYYY) được xử lý trong middleware.ts để kiểm tra tính hợp lệ của ngày.
const nextConfig: NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  transpilePackages: ["@licham/core"],
  images: { unoptimized: true },
  // Lễ hội đã đổi slug: trang cũ chuyển hướng vĩnh viễn (308) sang slug mới.
  async redirects() {
    return LE_HOI_IMPORTED.filter((f) => f.oldSlug).map((f) => ({ source: `/van-hoa/le-hoi/${f.oldSlug}`, destination: `/van-hoa/le-hoi/${f.slug}/`, permanent: true }));
  },
};

export default nextConfig;
