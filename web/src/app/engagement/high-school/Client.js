"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function HighSchoolClient() {
  const Feature = ({ emoji, title, desc }) => (
    <motion.div
      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/70 transition"
      variants={itemVariants}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl" aria-hidden>{emoji}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{desc}</p>
        </div>
      </div>
    </motion.div>
  );

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
            className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900 dark:text-gray-100 tracking-tight"
            variants={itemVariants}
          >
            <span className="inline-block mr-2">🎒</span>
            High-school engagement
          </motion.h1>

          <motion.p
            className="text-gray-700 dark:text-gray-300 mb-6"
            variants={itemVariants}
          >
            Concursuri, evenimente și resurse de alfabetizare AI pentru elevi și profesori.
          </motion.p>

          <motion.div
            className="grid gap-4 md:grid-cols-3 mb-8"
            variants={containerVariants}
          >
            <Feature emoji="🏆" title="Concursuri" desc="Competiții de AI și programare pentru liceeni." />
            <Feature emoji="🎓" title="Evenimente" desc="Workshop-uri, vizite în laboratoare, întâlniri cu experți." />
            <Feature emoji="📚" title="Resurse educaționale" desc="Ghiduri și materiale de alfabetizare AI." />
          </motion.div>

          <motion.a
            href="https://ailiteracyframework.org/wp-content/uploads/2025/05/AILitFramework_ReviewDraft.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            variants={itemVariants}
          >
            📖 AILIT Framework – Link resurse
          </motion.a>
        </section>
      </motion.div>
    </main>
  );
}
