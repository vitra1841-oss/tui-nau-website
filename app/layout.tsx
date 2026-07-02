import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, Geist_Mono } from 'next/font/google'
import { ScrollProvider } from '../components/scroll-provider'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
})
const dmSans = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Tiệm Trà Túi Nâu - Một tách trà, một khoảnh khắc',
  description:
    'Tiệm Trà Túi Nâu - quán trà & cà phê ấm cúng mang hơi thở vintage Việt Nam. Một tách trà, một khoảnh khắc chỉ của bạn.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#2c1a0e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      className={`light ${playfair.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased bg-background">
        <ScrollProvider />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
