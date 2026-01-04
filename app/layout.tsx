import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cs146s-korean.vercel.app'),
  title: 'CS146S: The Modern Software Developer - Korean Edition',
  description: 'Stanford CS146S 강좌의 한국어 버전. AI 기반 소프트웨어 개발과 현대적인 개발 도구를 배웁니다.',
  keywords: ['Stanford', 'CS146S', 'AI', '소프트웨어 개발', 'Claude', 'Vibe Coding', '한국어'],
  authors: [{ name: 'CS146S Korean Translation Team' }],
  openGraph: {
    title: 'CS146S: The Modern Software Developer - Korean Edition',
    description: 'Stanford CS146S 강좌의 한국어 버전. AI 기반 소프트웨어 개발과 현대적인 개발 도구를 배웁니다.',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/stanford-logo-transparent.png',
        width: 800,
        height: 800,
        alt: 'Stanford University Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'CS146S: The Modern Software Developer - Korean Edition',
    description: 'Stanford CS146S 강좌의 한국어 버전',
    images: ['/stanford-logo-transparent.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
