import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CommunityHub BD',
  description: 'Community issue reporting, food rescue, and volunteering for Bangladesh',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
