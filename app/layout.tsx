import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'علیرضا اورعی | Ali Orei — Multidisciplinary Creator',
  description: 'پورتفولیوی علیرضا اورعی؛ استراتژیست خلاق، تولیدکننده محتوا، کریتور هوش مصنوعی، بیت‌پرودیوسر و ورزشکار.',
  openGraph: {
    title: 'علیرضا اورعی | Multidisciplinary Creator',
    description: 'Creator. Strategist. Athlete. AI Creator. Beat Producer.',
    type: 'website',
    locale: 'fa_IR',
    images: [{ url: '/og.png', width: 1536, height: 804, alt: 'علیرضا اورعی — Multidisciplinary Creator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'علیرضا اورعی | Multidisciplinary Creator',
    description: 'Creator. Strategist. Athlete. AI Creator. Beat Producer.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
