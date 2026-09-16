import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@licham/core"],
  images: { unoptimized: true },
};

export default nextConfig;
