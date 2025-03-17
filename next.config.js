/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  // Remove static export to enable API routes
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = withNextIntl(nextConfig); 