import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
