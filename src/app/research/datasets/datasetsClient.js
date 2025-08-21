"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import staffData from "@/app/data/staff/staffData.json";
import dataverseMap from "@/app/data/staff/dataverseData.json";

/* Animations */
const containerVariants = {
  hidden: { opacity: 0.9 },
  visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};
const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const buildStaffList = (staffJson) => {
  const arr = Array.isArray(staffJson) ? staffJson : Object.values(staffJson || {}).flat();
  
  const safe = arr
    .filter((p) => p && (p.slug || p.name))
    .map((p) => ({
      slug: String(p.slug || "").trim(),
      name: String(p.name || p.slug || "").trim(),
    }));
  const seen = new Set();
  const out = [];
  for (const p of safe) {
    const key = `${p.slug}|${p.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
};

export default function DatasetsClient() {
  const staffList = useMemo(() => buildStaffList(staffData), []);
  const [selectedSlug, setSelectedSlug] = useState(
    staffList.length ? staffList[0].slug || staffList[0].name : ""
  );

  const datasets = useMemo(() => {
    if (!selectedSlug) return [];
    const list = dataverseMap[selectedSlug];
    return Array.isArray(list) ? list : [];
  }, [selectedSlug]);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            className="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 text-center"
          >
            💾 Datasets
          </motion.h1>

          {/* GRID: sidebar + content */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
            {/* Sidebar: staff list */}
            <aside className="md:-ml-6">
              <div className="rounded-xl p-4 space-y-2 bg-blue-100 dark:bg-blue-900">
                {staffList.map((p) => {
                  const key = p.slug || p.name;
                  const active = key === selectedSlug;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSlug(key)}
                      className={`w-full text-left px-3 py-2 rounded-md border text-sm transition
                        border-gray-200 dark:border-gray-800
                        ${active ? "bg-gray-200 dark:bg-gray-700 font-semibold" : "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"}
                      `}
                      title={p.name}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Content */}
            <div>
              <motion.div
                key={selectedSlug || "none"}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="rounded-xl border border-gray-200 dark:border-gray-800 p-5"
              >
                {datasets.length ? (
                  <ul className="space-y-2">
                    {datasets.map((label, idx) => (
                      <li
                        key={`${selectedSlug}-${idx}`}
                        className="rounded-lg border border-gray-100 dark:border-gray-800 p-3"
                      >
                        <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                          {label}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    No datasets available yet for this person.
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
