import './global.css';
import clsx from 'clsx';
import localFont from '@next/font/local';
import globalMetadata from './metadata';
import Providers from './providers';
import { Analytics } from '@vercel/analytics/react';

const kaisei = localFont({
  src: '../public/fonts/kaisei-tokumin-latin-700-normal.woff2',
  weight: '700',
  variable: '--font-kaisei',
  display: 'swap',
});

export const metadata = globalMetadata;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx(
        'text-black bg-white dark:text-white dark:bg-[#111010]',
        kaisei.variable
      )}
    >
      <Providers>
        <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
          <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
            {children}
            <Analytics />
          </main>
        </body>
      </Providers>
    </html>
  );
}
