import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/layout/site-header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cosmic Forge | TFT Set 17 Team Builder',
  description: '롤토체스 Set 17 챔피언 탐색 및 팀 빌더',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="relative min-h-screen overflow-hidden">
          <div className="glow-orb left-[-8rem] top-[-4rem] size-72 bg-violet-600/30" />
          <div className="glow-orb right-[-6rem] top-32 size-64 bg-fuchsia-500/20" />
          <div className="cosmic-grid absolute inset-0" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
