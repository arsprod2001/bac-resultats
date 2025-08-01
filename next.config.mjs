// next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer';

/** Bundle Analyzer activé si ANALYZE=true */
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Pour éviter les erreurs avec les fichiers JSON volumineux
    largePageDataBytes: 128 * 1000, // 128 Ko
  },
};

export default withAnalyzer(nextConfig);
