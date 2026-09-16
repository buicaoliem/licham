import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@licham/core"],
  images: { unoptimized: true },
};

export default nextConfig;
