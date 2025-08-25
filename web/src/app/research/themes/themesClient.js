"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { proData } from "@/app/data/proData";

// Animations 
const containerVariants = {
  hidden: { opacity: 0.9 }, visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};
const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function ThemesClient() {
  const themes = useMemo(() => {
    const set = new Set();
    const list = Array.isArray(proData) ? proData : [];

    for (const proj of list) {
      const th = Array.isArray(proj?.themes) ? proj.themes : [];
      for (const t of th) {
        const s = String(t || "").trim();
        if (s) set.add(s);           
      }
    }

    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400 tracking-tight text-center"
          >
            🧭 Themes
          </motion.h1>

          {themes.length ? (
            <ul className="space-y-4">
              {themes.map((title) => (
                <motion.li
                  key={title}
                  variants={itemVariants}
                  className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                  </h2>
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
