import type { Metadata } from 'next'
import './globals.css'
import PublicHeader from '@/components/layout/PublicHeader'

export const metadata: Metadata = {
  title: 'Intec - Industrial & Electrical Services',
  description: 'Professional motor rewinding and electrical repair services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
