/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  // experimental: { appDir: true }, // احذف هذا السطر
}

module.exports = nextConfig
