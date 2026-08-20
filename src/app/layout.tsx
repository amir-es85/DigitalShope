import type { Metadata } from 'next';
import './globals.css';
import Header from './../components/ui/header';
import ReactQueryProvider from './../provider/ReactQuery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './../provider/ThemeProvider';

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            <Header />

            <div className="pt-25 px-5 md:max-w-6xl md:px-0 mx-auto">{children}</div>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
