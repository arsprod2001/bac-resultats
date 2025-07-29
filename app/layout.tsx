import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: '400',
  preload: true
});

export const metadata: Metadata = {
  title: {
    default: 'Résultats du Baccalauréat - Mauritanie',
    template: '%s | Bac Mauritanie'
  },
  description: 'Consultez vos résultats officiels du Baccalauréat Mauritanie en ligne',
  applicationName: 'Bac Mauritanie Résultats',
  generator: 'Next.js',
  keywords: ['Bac Mauritanie', 'résultats bac mauritanie', 'bac 2024', 'résultats bac'],
  icons: {
    icon: '/favicon.ico',

  },
  metadataBase: new URL('https://bac-resultats.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      fr: '/fr',
      ar: '/ar',
    },
  },
};

// Fonction séparée pour viewport et themeColor
export function generateViewport() {
  return {
    themeColor: '#0f0c29',
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        {/* Les métadonnées liées au viewport et themeColor seront injectées automatiquement */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Préchargement de la police */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${inter.variable} font-sans bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
