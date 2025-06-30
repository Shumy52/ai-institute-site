'use client';

import { useEffect, useState } from 'react';

export default function DarkModeBubble() {
  const [dark, setDark] = useState(false);

  // On mount, read from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // When dark changes, update localStorage and html class
  useEffect(() => {
    localStorage.setItem('darkMode', dark ? 'true' : 'false');
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="fixed bottom-6 right-6 z-50 bg-gray-800 dark:bg-yellow-400 text-white dark:text-black rounded-full shadow-lg p-4 transition-colors duration-300 hover:scale-110"
      aria-label="Toggle dark mode"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
    >
      {dark ? '🌞' : '🌙'}
    </button>
  );
}