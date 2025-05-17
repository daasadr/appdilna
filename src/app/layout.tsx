import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'AppDílna - Vytvořte si vlastní aplikaci',
  description: 'Vaše digitální dílna pro tvorbu PWA aplikací',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Providers>
          <main className="min-h-screen bg-[#f5f1e6]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
} 