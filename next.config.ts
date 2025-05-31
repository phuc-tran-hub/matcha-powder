/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Needed for GitHub Pages to work with the repository name as the base path
  basePath: process.env.NODE_ENV === 'production' ? '/matcha-powder' : '',
  // For GitHub Pages trailing slash is needed
  trailingSlash: true,
  // Image configuration
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.stockcake.com',
      },
      {
        protocol: 'https',
        hostname: 'www.foodiesfeed.com',
      },
    ],
  },
};

module.exports = nextConfig;
