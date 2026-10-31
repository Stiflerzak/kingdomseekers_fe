import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Kingdom Seekers | Eastern Bypass', template: '%s | Kingdom Seekers Eastern Bypass' },
  description: 'A concept for the Kingdom Seekers Eastern Bypass church experience in Nairobi: worship, community, discipleship and life beyond Sunday.',
  metadataBase: new URL('https://example.org'),
  openGraph: {
    title: 'Kingdom Seekers | Eastern Bypass',
    description: 'A church home for worship, community and growth along Nairobi’s Eastern Bypass.',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
