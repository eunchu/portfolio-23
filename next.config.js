const debug = process.env.NODE_ENV !== "production";
const repository = "https://eunchu.github.io/portfolio-23";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // assetPrefix: !debug ? `/${repository}` : "", // assetPrefix
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록 함
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
