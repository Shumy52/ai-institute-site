"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Animations 
const containerVariants = {
  hidden: { opacity: 0.9 }, visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};
const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function ThemesClient({ themes = [] }) {
  const normalizedThemes = useMemo(() => {
    const map = new Map();
    const list = Array.isArray(themes) ? themes : [];

    for (const theme of list) {
      const name = String(theme?.name || "").trim();
      if (!name) continue;

      const slug = String(theme?.slug || "").trim();
      const summary = typeof theme?.summary === "string" ? theme.summary.trim() : "";
      const color = typeof theme?.color === "string" ? theme.color.trim() : "";
      const key = slug || name.toLowerCase();

      if (!map.has(key)) {
        map.set(key, { name, slug, summary, color });
      }
    }

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [themes]);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400 tracking-tight text-center"
          >
            Themes
          </motion.h1>

          {normalizedThemes.length ? (
            <ul className="space-y-4">
              {normalizedThemes.map(({ name, slug, summary, color }) => (
                <motion.li
                  key={slug || name}
                  variants={itemVariants}
                  className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                  style={color ? { borderLeftColor: color, borderLeftWidth: 6 } : undefined}
                >
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {name}
                  </h2>
                  {summary ? (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{summary}</p>
                  ) : null}
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No themes found.</p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
