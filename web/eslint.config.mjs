import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  { ignores: [".next/**", "out/**", "public/**", "next-env.d.ts", "data/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Logo và hình minh hoạ là SVG/ảnh tĩnh, images.unoptimized đã bật nên <Image /> không đem lại lợi ích.
    rules: { "@next/next/no-img-element": "off" },
  },
];

export default config;
