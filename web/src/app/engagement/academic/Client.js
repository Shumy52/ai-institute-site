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

const containerVariants = {
  hidden: { opacity: 0.9 },
  visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};
const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };

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
              Initiatives
            </motion.h2>
            <motion.div
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm"
              variants={itemVariants}
            >
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Summer schools & workshops</li>
                <li>Co-tutoring program, research visits, mobility</li>
                <li>Joint seminars & invited speakers</li>
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
              <Feature title="Machine Learning" desc="Joint courses, applied modules, projects." />
              <Feature title="Robotics & Vision" desc="Labs, projects, mixed teams." />
              <Feature title="HPC for AI" desc="Hands-on modules on the HPC infrastructure." />
              <Feature title="AI Ethics & Safety" desc="Workshops on responsible AI & regulation." />
            </motion.div>
          </motion.section>
        );
      case "Mobility":
        return (
          <motion.section className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100" variants={itemVariants}>
              Co-tutoring & Mobility
            </motion.h2>
            <motion.div
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm"
              variants={itemVariants}
            >
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Co-supervision of PhD theses with partner universities</li>
                <li>Mobility grants (students, PhD candidates, staff)</li>
                <li>Research visits & short-term placements</li>
              </ul>
            </motion.div>
          </motion.section>
        );
      default:
        return (
          <motion.div className="grid gap-4 md:grid-cols-3" variants={containerVariants} initial="hidden" animate="visible">
            <Feature title="Academic partnerships" desc="A network of collaborations and joint activities." />
            <Feature title="Teaching & training" desc="Courses, summer schools, workshops." />
            <Feature title="Mobility" desc="Co-tutoring, visits, internships, exchanges." />
          </motion.div>
        );
    }
  }, [tab]);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            className="text-2xl md:text-3xl font-extrabold mb-2 text-blue-600 dark:text-yellow-400 tracking-tight text-center"
          >
            Academic engagement
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Collaborations with universities and institutes: co-tutoring, joint courses, workshops, research visits, mobility.
          </motion.p>

          <div className="mt-6 md:mt-8">
            <div className="flex justify-start">
              <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-full overflow-x-auto whitespace-nowrap">
                {TABS.map((t) => {
                  const active = tab === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTab(t.key)}
                      aria-pressed={active}
                      className={
                        "px-4 py-2 text-sm font-medium focus:outline-none " +
                        (active
                          ? "bg-blue-600 text-white dark:bg-blue-500"
                          : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900")
                      }
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 border-b border-gray-200 dark:border-gray-800" />
          </div>

          <div className="mt-6">{content}</div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              Contact the academic team
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
