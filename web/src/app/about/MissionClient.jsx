"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};
const item = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function MissionClient() {
  return (
    <motion.section id="mission" className="mb-10" variants={container} initial="hidden" animate="visible">
      <motion.h1
        className="text-2xl md:text-3xl font-extrabold mb-3 text-blue-600 dark:text-yellow-400 tracking-tight text-center"
        variants={item}
      >
        Mission
      </motion.h1>

      <motion.p className="text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto" variants={item}>
        Mission paragraph...
      </motion.p>
    </motion.section>
  );
}
