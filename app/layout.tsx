import Header from '@/components/layout/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Mulish, Montserrat } from 'next/font/google';
import Providers from './providers';
import Announcement from '@/components/actions/Announcement';

const inter = Inter({ subsets: ['latin'] });
const monsterrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-theme='theme1'>
      <body className={`${inter.className} ${monsterrat.className}`}>
        <Announcement />
        <Providers>
          <Header />
        </Providers>
        {children}
      </body>
    </html>
  );
}
