"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function KnowledgeGraphClient() {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <motion.h1
        className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100"
        variants={item}
      >
        <span className="inline-block mr-2">📊</span>
        Search
      </motion.h1>

      <motion.div
        className="rounded-2xl border p-6 bg-white/80 dark:bg-slate-900/70 backdrop-blur"
        variants={item}
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          AIRi Knowledge Graphs
        </h2>
        <p className="text-slate-700 dark:text-slate-300">
          Coming soon — interactive navigator for AIRi knowledge graphs.
        </p>
      </motion.div>
    </motion.div>
  );
}
