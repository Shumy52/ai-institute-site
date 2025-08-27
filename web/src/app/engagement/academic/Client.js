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
              <Feature emoji="🧠" title="Machine Learning" desc="Joint courses, applied modules, projects." />
              <Feature emoji="🤖" title="Robotics & Vision" desc="Labs, projects, mixed teams." />
              <Feature emoji="🖥️" title="HPC for AI" desc="Hands-on modules on the HPC infrastructure." />
              <Feature emoji="🔐" title="AI Ethics & Safety" desc="Workshops on responsible AI & regulation." />
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
            <Feature emoji="🤝" title="Academic partnerships" desc="A network of collaborations and joint activities." />
            <Feature emoji="🏫" title="Teaching & training" desc="Courses, summer schools, workshops." />
            <Feature emoji="🌍" title="Mobility" desc="Co-tutoring, visits, internships, exchanges." />
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
            className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 text-center"
          >
            🎓 Academic engagement
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Collaborations with universities and institutes: co-tutoring, joint courses, workshops, research visits, mobility.
          </motion.p>

          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
            <aside className="md:-ml-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
                {TABS.map((t) => {
                  const active = tab === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      aria-current={active ? "page" : undefined}
                      className={
                        "w-full text-left rounded-md px-3 py-2 text-sm font-medium transition " +
                        (active
                          ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70")
                      }
                    >
                      {t.label}
                    </button>
                  );
                })}
                <Link
                  href="/contact"
                  className="block text-center rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  Contact the academic team
                </Link>
              </div>
            </aside>

            <div>{content}</div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
