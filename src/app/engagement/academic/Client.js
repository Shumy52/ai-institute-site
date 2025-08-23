"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const TABS = [
  { key: "Overview", label: "Overview" },
  { key: "Initiatives", label: "Initiatives" },
  { key: "Courses", label: "Courses & Workshops" },
  { key: "Mobility", label: "Co-tutoring & Mobility" },
];

function Tabs({ value, onChange }) {
  return (
    <nav className="flex flex-wrap items-center gap-2">
      {TABS.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            aria-current={active ? "page" : undefined}
            className={
              "rounded-lg px-3 py-1.5 text-sm font-medium transition " +
              (active
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70")
            }
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

function Feature({ emoji, title, desc }) {
  return (
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
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Client() {
  const router = useRouter();
  const sp = useSearchParams();
  const tab = sp.get("tab") || "Overview";

  const setTab = useCallback(
    (t) => router.replace(`?tab=${encodeURIComponent(t)}`, { scroll: false }),
    [router]
  );

  const content = useMemo(() => {
    switch (tab) {
      case "Initiatives":
        return (
          <motion.section className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100" variants={itemVariants}>
              Inițiative
            </motion.h2>
            <motion.div
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm"
              variants={itemVariants}
            >
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Școli de vară & workshop-uri</li>
                <li>Program de co-tutoring, vizite științifice, mobilități</li>
                <li>Seminarii comune & invitați internaționali</li>
              </ul>
            </motion.div>
          </motion.section>
        );
      case "Courses":
        return (
          <motion.section className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100" variants={itemVariants}>
              Courses & Workshops
            </motion.h2>
            <motion.div className="grid gap-4 md:grid-cols-2" variants={containerVariants}>
              <Feature emoji="🧠" title="Machine Learning" desc="Cursuri comune, module aplicate, proiecte." />
              <Feature emoji="🤖" title="Robotics & Vision" desc="Laboratoare, proiecte, echipe mixte." />
              <Feature emoji="🖥️" title="HPC for AI" desc="Module practice pe infrastructura HPC." />
              <Feature emoji="🔐" title="AI Ethics & Safety" desc="Ateliere pe AI responsabil & reglementare." />
            </motion.div>
          </motion.section>
        );
      case "Mobility":
        return (
          <motion.section className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100" variants={itemVariants}>
              Co-tutelă & Mobility
            </motion.h2>
            <motion.div
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm"
              variants={itemVariants}
            >
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Co-supervizare doctorate cu universități partenere</li>
                <li>Burse de mobilitate (studenți, doctoranzi, staff)</li>
                <li>Vizite științifice & stagii scurte</li>
              </ul>
            </motion.div>
          </motion.section>
        );
      default:
        return (
          <motion.div className="grid gap-4 md:grid-cols-3" variants={containerVariants} initial="hidden" animate="visible">
            <Feature emoji="🤝" title="Academic partnerships" desc="Rețea de colaborări și activități comune." />
            <Feature emoji="🏫" title="Teaching & training" desc="Cursuri, școli de vară, workshop-uri." />
            <Feature emoji="🌍" title="Mobility" desc="Co-tutoring, vizite, stagii, mobilități." />
          </motion.div>
        );
    }
  }, [tab]);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <motion.div
        className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <section className="p-6 md:p-8">
          <motion.div className="md:flex md:items-center md:justify-between" variants={itemVariants}>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-1 text-gray-900 dark:text-gray-100 tracking-tight">
                <span className="inline-block mr-2">🎓</span> Academic engagement
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                Colaborări cu universități și institute: co-tutoring, cursuri comune, workshop-uri, vizite, mobilități.
              </p>
            </div>
            <Link
              href="/about/contact?team=academic"
              className="mt-4 md:mt-0 inline-flex items-center rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              Contact academic team
            </Link>
          </motion.div>

          <motion.div
            className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            variants={itemVariants}
          >
            <div className="px-4 md:px-6 py-3 border-b border-gray-200 dark:border-gray-800">
              <Tabs value={tab} onChange={setTab} />
            </div>
            <div className="px-4 md:px-6 py-6">{content}</div>
          </motion.div>
        </section>
      </motion.div>
    </main>
  );
}
