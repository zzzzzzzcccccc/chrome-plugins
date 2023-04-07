/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: './',
  webpack: (config) => {
    config.resolve.fallback = { fs: false, child_process: false };
    return config;
  },
};

module.exports = nextConfig;
