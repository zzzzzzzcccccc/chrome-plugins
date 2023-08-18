/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: './',
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, child_process: false };
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    return config;
  },
};

module.exports = nextConfig;
