const createNextIntlPlugin = require('next-intl/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = createNextIntlPlugin('./src/i18n/request.ts')(nextConfig); 