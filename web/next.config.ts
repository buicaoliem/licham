import type { NextConfig } from "next";

// URL cũ (/ngay/DD-MM-YYYY, /lich-thang-M-YYYY) được xử lý trong middleware.ts để kiểm tra tính hợp lệ của ngày.
const nextConfig: NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  transpilePackages: ["@licham/core"],
  images: { unoptimized: true },
};

export default nextConfig;
