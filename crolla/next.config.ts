import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 👈 必須：HTMLとして書き出す設定
  images: {
    unoptimized: true, // v0の画像タグ(placeholder)でエラーを出さない設定
  },
};

export default nextConfig;