/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  compress: true,

  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders,
    },
  ],

  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
  },

  images: {
    domains: ['bac-resultats.vercel.app'],
    minimumCacheTTL: 86400,
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  poweredByHeader: false,
  generateEtags: false,



  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // nextScriptWorkers: true, // Décommente uniquement si tu installes Partytown
  },
};

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' } // à utiliser sur fichiers statiques uniquement
];

export default nextConfig;
