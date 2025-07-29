import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Résultats du Bac - Mauritanie',
  description: 'Consultez vos résultats du Baccalauréat Mauritanie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-indigo-100`}>
        {children}
         <Analytics />
      </body>
    </html>
  )
}