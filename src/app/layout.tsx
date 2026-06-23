import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Footer from './footer';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Argentum - Premium Silver Jewelry',
  description: 'Handcrafted 925 silver jewelry with transparent live market pricing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <CartDrawer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
