/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration
  images: {
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
