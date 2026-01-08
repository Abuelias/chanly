/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  output: undefined, // أهم خطوة: نتركها SSR/Hybrid
  // trailingSlash: true, // يمكن حذفه لأنه لا يحتاج للتصدير
}

module.exports = nextConfig
