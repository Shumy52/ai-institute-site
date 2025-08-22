"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import pubData from "@/app/data/staff/pubData.json";
import proData from "@/app/data/staff/proData.json";
import staffData from "@/app/data/staff/staffData.json";

/* Animations */
const containerVariants = {
  hidden: { opacity: 0.9 },
  visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};
const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };

const buildStaffLookup = (staffJson) => {
  const arr = Array.isArray(staffJson) ? staffJson : Object.values(staffJson || {}).flat();
  const map = new Map();
  for (const p of arr) {
    if (p?.slug) map.set(String(p.slug).toLowerCase(), p.name || p.slug);
    if (p?.name) map.set(String(p.name).toLowerCase(), p.name);
  }
  return map;
};

const nameFromMember = (m, lookup) => {
  if (!m) return "";
  if (typeof m === "string") {
    const key = m.toLowerCase();
    return lookup.get(key) || m;
  }
  if (typeof m === "object") {
    const bySlug = m.slug && lookup.get(String(m.slug).toLowerCase());
    if (bySlug) return bySlug;
    return m.name || m.slug || "";
  }
  return "";
};

const normalizeMembers = (members, lookup) => {
  const list = Array.isArray(members) ? members : [];
  const names = list.map((m) => nameFromMember(m, lookup)).filter(Boolean);
  return Array.from(new Set(names));
};

const normalizeAuthors = (authors, lookup) => {
  const list = Array.isArray(authors) ? authors : [];
  const names = list.map((a) => nameFromMember(a, lookup)).filter(Boolean);
  return Array.from(new Set(names));
};

export default function ThemesClient() {
  const staffLookup = useMemo(() => buildStaffLookup(staffData), []);

  const themes = useMemo(() => {
    const map = new Map(); 

    // Publications
    if (Array.isArray(pubData)) {
      for (const pb of pubData) {
        const title = pb?.title ? String(pb.title).trim() : "";
        if (!title) continue;
        if (!map.has(title)) map.set(title, { title, projects: [], publications: [] });

        const item = {
          title,
          domain: pb?.domain || "",
          authors: normalizeAuthors(pb?.authors, staffLookup),
        };

        const bucket = map.get(title).publications;
        const k = `${item.title}|${item.domain}`;
        if (!bucket.some((x) => `${x.title}|${x.domain}` === k)) {
          bucket.push(item);
        }
      }
    }

    // Projects
    if (Array.isArray(proData)) {
      for (const pr of proData) {
        const title = pr?.title ? String(pr.title).trim() : "";
        if (!title) continue;
        if (!map.has(title)) map.set(title, { title, projects: [], publications: [] });

        const item = {
          title,
          domain: pr?.domain || "",
          lead: pr?.lead || "",
          members: normalizeMembers(pr?.members ?? pr?.team, staffLookup),
        };

        const bucket = map.get(title).projects;
        const k = `${item.title}|${item.domain}`;
        if (!bucket.some((x) => `${x.title}|${x.domain}` === k)) {
          bucket.push(item);
        }
      }
    }

    return Array.from(map.values()).sort((a, b) => a.title.localeCompare(b.title));
  }, [staffLookup]);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400 tracking-tight text-center"
          >
            🧭 Themes
          </motion.h1>

          {themes.length ? (
            <ul className="space-y-4">
              {themes.map((t) => (
                <motion.li
                  key={t.title}
                  variants={itemVariants}
                  className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {t.title}
                  </h2>

                  {t.publications.length > 0 && (
                    <div className="mt-3">
                      <div className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
                        Publication
                      </div>
                      <ul className="space-y-2">
                        {t.publications.map((pb, idx) => (
                          <li
                            key={`pub-${idx}`}
                            className="rounded-lg border border-gray-100 dark:border-gray-800 p-3"
                          >
                            <div className="text-xs text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Authors:</span>{" "}
                              {pb.authors?.length ? pb.authors.join(", ") : "—"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {t.projects.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
                        Project
                      </div>
                      <ul className="space-y-2">
                        {t.projects.map((pr, idx) => (
                          <li
                            key={`proj-${idx}`}
                            className="rounded-lg border border-gray-100 dark:border-gray-800 p-3"
                          >
                            <div className="text-xs text-gray-700 dark:text-gray-300">
                              {pr.lead ? (
                                <>
                                  <span className="font-medium">Lead:</span> {pr.lead}
                                  <span className="mx-2 opacity-60">•</span>
                                </>
                              ) : null}
                              <span className="font-medium">Members:</span>{" "}
                              {pr.members?.length ? pr.members.join(", ") : "—"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No themes found.</p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
