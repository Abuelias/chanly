/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  output: 'standalone', // مهم لتصدير static
  trailingSlash: true,  // يسهل التعامل مع export paths
}

module.exports = nextConfig
