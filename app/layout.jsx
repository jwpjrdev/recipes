import './global.css';
import clsx from 'clsx';
import localFont from "next/font/local";
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
      suppressHydrationWarning
      className={clsx(
        'text-black bg-white dark:text-white dark:bg-[#111010]',
        kaisei.variable
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "const theme = localStorage.getItem('recipes-theme'); document.documentElement.classList.toggle('dark', theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches));",
          }}
        />
      </head>
      <Providers>
        <body className="antialiased max-w-6xl mb-8 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto lg:w-[calc(100%_-_2rem)]">
          <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
            {children}
            <Analytics />
          </main>
        </body>
      </Providers>
    </html>
  );
}
