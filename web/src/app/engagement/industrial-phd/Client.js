"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Client() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <motion.div
        className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <section className="p-6 md:p-8">
          <motion.h1
            className="text-2xl md:text-3xl font-extrabold mb-2 text-blue-600 dark:text-yellow-400 tracking-tight text-center"
            variants={itemVariants}
          >
            <span className="inline-block mr-2">🎓🏭</span>
            Industrial PhD
          </motion.h1>

          <motion.p
            className="text-gray-700 dark:text-gray-300"
            variants={itemVariants}
          >
            Framework for industrial PhDs, co-funding, and application-oriented topics with our partners.
          </motion.p>
        </section>
      </motion.div>
    </main>
  );
}
