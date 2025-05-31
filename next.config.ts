import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com', 'cdn.stockcake.com', 'www.foodiesfeed.com'],
    unoptimized: true,
  },
  // Needed for GitHub Pages to work with the repository name as the base path
  basePath: process.env.NODE_ENV === 'production' ? '/matcha-powder' : '',
  // For GitHub Pages trailing slash is needed
  trailingSlash: true,
};

export default nextConfig;
