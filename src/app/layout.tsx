import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './../components/ui/header';

import ReactQueryProvider from './../provider/ReactQuery';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Digital Shop',
  description: 'digital shop to buy digital stuff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>
          <Header />
          <div className="pt-25 px-5 md:max-w-6xl md:px-0 mx-auto"> {children}</div>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
