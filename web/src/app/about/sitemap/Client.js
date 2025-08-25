"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};
const item = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const SECTIONS = [
  {
    title: "About",
    icon: "ℹ️",
    links: [
      { label: "Mission", href: "/about/mission" },
      { label: "History / Timeline", href: "#" },
      { label: "Team", href: "#" },
    ],
  },
  {
    title: "Engagement",
    icon: "🤝",
    links: [
      { label: "Partners", href: "/engagement/partners" },
      { label: "HPC-AI services", href: "/engagement/hpc-ai" },
      { label: "Public engagement", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    title: "Research",
    icon: "🧪",
    links: [
      { label: "Research areas", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Publications", href: "#" },
      { label: "Labs & Facilities", href: "#" },
    ],
  },
  {
    title: "People",
    icon: "👥",
    links: [
      { label: "Staff", href: "#" },
      { label: "Students", href: "#" },
      { label: "Collaborators", href: "/collaborators" },
    ],
  },
  {
    title: "Resources",
    icon: "📚",
    links: [
      { label: "Documents", href: "#" },
      { label: "Downloads", href: "#" },
      { label: "Brand assets", href: "#" },
    ],
  },
  {
    title: "News & Media",
    icon: "🗞️",
    links: [
      { label: "News", href: "#" },
      { label: "Press", href: "#" },
      { label: "Gallery", href: "#" },
    ],
  },
  {
    title: "Utilities",
    icon: "🛠️",
    links: [
      { label: "Search", href: "/search" },
      { label: "Contact", href: "#" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export default function Client() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return SECTIONS;
    return SECTIONS.map(s => ({
      ...s,
      links: s.links.filter(l =>
        s.title.toLowerCase().includes(term) ||
        l.label.toLowerCase().includes(term)
      ),
    })).filter(s => s.links.length > 0);
  }, [q]);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <motion.div
        className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 tracking-tight"
          variants={item}
        >
          <span className="inline-block mr-2">🗺️</span>
          Sitemap
        </motion.h1>

        <motion.div className="mb-6 flex items-center gap-3" variants={item}>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter pages…"
            className="w-full md:w-1/2 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Filter sitemap"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="rounded-xl px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Clear
            </button>
          )}
        </motion.div>

        <motion.nav
          aria-labelledby="sitemap-title"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
        >
          {filtered.map((section) => (
            <motion.section
              key={section.title}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
              variants={item}
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </motion.nav>

        {filtered.length === 0 && (
          <motion.p className="mt-6 text-gray-600 dark:text-gray-300" variants={item}>
            No results for “{q}”.
          </motion.p>
        )}
      </motion.div>
    </main>
  );
}
