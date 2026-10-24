import type { Metadata } from 'next'
import './globals.css'
import { SiteChrome } from '@/components/site-chrome'

export const metadata: Metadata = {
  metadataBase: new URL('https://savyora.pk'),
  title: { default: 'The Savyora Fitness', template: '%s' },
  description: 'More Than Fitness. A Lifestyle. Train at The Savyora Fitness in Peshawar.',
  icons: { icon: '/assets/favicon.ico' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>
}
