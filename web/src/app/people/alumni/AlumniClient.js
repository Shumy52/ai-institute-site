"use client";

import { motion } from "framer-motion";

export default function AlumniClient() {
  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🎓 Alumni
      </motion.h1>
      <p className="text-gray-800 dark:text-gray-200">
        Since our institute has just started, we do not have any alumni yet. However, we are committed to building a strong community of graduates in the coming years.
      </p>
    </main>
  );
}
