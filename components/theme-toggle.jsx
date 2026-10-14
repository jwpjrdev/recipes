'use client';

import { useEffect, useState } from 'react';

const themeStorageKey = 'recipes-theme';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const useSystemTheme = savedTheme !== 'light' && savedTheme !== 'dark';
    const initialIsDark = useSystemTheme ? mediaQuery.matches : savedTheme === 'dark';

    root.classList.toggle('dark', initialIsDark);
    setIsDark(initialIsDark);

    const handleSystemThemeChange = event => {
      if (window.localStorage.getItem(themeStorageKey) === null) {
        root.classList.toggle('dark', event.matches);
        setIsDark(event.matches);
      }
    };

    let wasDarkBeforePrint = false;
    const handleBeforePrint = () => {
      wasDarkBeforePrint = root.classList.contains('dark');
      root.classList.remove('dark');
    };
    const handleAfterPrint = () => {
      root.classList.toggle('dark', wasDarkBeforePrint);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextIsDark);
    window.localStorage.setItem(themeStorageKey, nextIsDark ? 'dark' : 'light');
    setIsDark(nextIsDark);
  }

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="theme-toggle flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-black dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        ) : (
          <path d="M20.1 15.2A8.5 8.5 0 0 1 8.8 3.9 8.5 8.5 0 1 0 20.1 15.2Z" />
        )}
      </svg>
    </button>
  );
}
