"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function DarkModeBubble() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-gray-800 dark:bg-yellow-400 text-white dark:text-black shadow-lg p-4 transition-transform transition-colors duration-300 hover:scale-110"
      aria-label="Toggle dark mode"
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}