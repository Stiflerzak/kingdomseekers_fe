import type { Metadata, Viewport } from 'next';
import PWARegister from './PWARegister';
import LoadingScreen from './LoadingScreen';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Kingdom Seekers | Eastern Bypass', template: '%s | Kingdom Seekers Eastern Bypass' },
  description: 'A concept for the Kingdom Seekers Eastern Bypass church experience in Nairobi: worship, community, discipleship and life beyond Sunday.',
  metadataBase: new URL('https://example.org'),
  icons: { icon: '/images/logo.svg' },
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Kingdom Seekers', statusBarStyle: 'default' },
  openGraph: {
    title: 'Kingdom Seekers | Eastern Bypass',
    description: 'A church home for worship, community and growth along Nairobi’s Eastern Bypass.',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: '#142b3c', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LoadingScreen/>{children}<PWARegister/></body></html>;
}
