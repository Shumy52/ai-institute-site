"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import proData from "@/app/data/staff/proData.json";

/* Animations */
const containerVariants = {
  hidden: { opacity: 0.9 },
  visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};
const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };

/* Helpers */
const toMonthName = (m) => {
  if (m == null) return "";
  const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const n = Number(m);
  if (!Number.isNaN(n) && n >= 1 && n <= 12) return names[n - 1];
  const s = String(m).trim();
  return s || "";
};

const formatDuration = (start, end) => {
  const mk = (v) => {
    if (!v) return "";
    const mm = v.month ? toMonthName(v.month) + " " : "";
    const yy = v.year ?? "";
    return (mm || yy) ? `${mm}${yy}` : "";
  };
  const s = mk(start);
  const e = mk(end);
  if (!s && !e) return "";
  return `${s}${s || e ? " – " : ""}${e || "present"}`;
};

const slugify = (s) =>
  String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeMembers = (proj) => {
  const list = Array.isArray(proj.members) ? proj.members : Array.isArray(proj.team) ? proj.team : [];
  return list.map((m) => (typeof m === "string" ? m : m?.name || m?.slug || "")).filter(Boolean);
};

const normalizeProject = (p) => {
  const year =
    (p.start && (p.start.year || p.start.month) && Number(p.start.year)) ||
    (p.end && (p.end.year || p.end.month) && Number(p.end.year)) ||
    undefined;

  return {
    title: p.title || "",
    lead: p.lead || "",
    domain: p.domain || "",
    start: p.start,
    end: p.end,
    members: normalizeMembers(p),
    personSlug: "",                 
    region: p.region || "",         
    year,
  };
};

export default function ProjectsClient() {
  // ---- State filtre ----
  const [q, setQ] = useState("");
  const [regionFilter, setRegionFilter] = useState("");       
  const [domainFilter, setDomainFilter] = useState("");       
  const [leadFilter, setLeadFilter] = useState("");           
  const [memberFilter, setMemberFilter] = useState("");       
  const [yearFilter, setYearFilter] = useState("");          

  const projects = useMemo(() => {
    const src = Array.isArray(proData) ? proData : [];
    return src.map(normalizeProject).filter((p) => p.title);
  }, []);

  const { regionOptions, domainOptions, leadOptions, memberOptions, yearOptions } = useMemo(() => {
    const regions = new Set();
    const domains = new Set();
    const leads = new Set();
    const members = new Set();
    const years = new Set();

    for (const p of projects) {
      if (p.region) regions.add(p.region);
      if (p.domain) domains.add(p.domain);
      if (p.lead) leads.add(p.lead);
      if (p.year) years.add(String(p.year));
      if (Array.isArray(p.members)) {
        p.members.forEach((m) => m && members.add(m));
      }
    }

    return {
      regionOptions: Array.from(regions).sort((a, b) => a.localeCompare(b)),
      domainOptions: Array.from(domains).sort((a, b) => a.localeCompare(b)),
      leadOptions: Array.from(leads).sort((a, b) => a.localeCompare(b)),
      memberOptions: Array.from(members).sort((a, b) => a.localeCompare(b)),
      yearOptions: Array.from(years).sort((a, b) => Number(b) - Number(a)),
    };
  }, [projects]);

  // filtering
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQ =
        !query ||
        `${p.title} ${p.lead} ${p.domain} ${p.region} ${p.members.join(" ")}`
          .toLowerCase()
          .includes(query);

      const matchesRegion = !regionFilter || p.region === regionFilter;
      const matchesDomain = !domainFilter || p.domain === domainFilter;
      const matchesLead   = !leadFilter   || p.lead === leadFilter;
      const matchesMember = !memberFilter || (Array.isArray(p.members) && p.members.includes(memberFilter));
      const matchesYear   = !yearFilter   || String(p.year) === String(yearFilter);

      return matchesQ && matchesRegion && matchesDomain && matchesLead && matchesMember && matchesYear;
    });
  }, [projects, q, regionFilter, domainFilter, leadFilter, memberFilter, yearFilter]);

  const clearFilters = () => {
    setQ("");
    setRegionFilter("");
    setDomainFilter("");
    setLeadFilter("");
    setMemberFilter("");
    setYearFilter("");
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400 text-center"
          >
            🗂️ Projects
          </motion.h1>

          {/* GRID: sidebar (filters) + list */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
            {/* Sidebar filtre */}
            <aside className="md:-ml-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search title, lead, department…"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                />

                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">All regions</option>
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>

                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">All departments</option>
                  {domainOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  value={leadFilter}
                  onChange={(e) => setLeadFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">All leads</option>
                  {leadOptions.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>

                <select
                  value={memberFilter}
                  onChange={(e) => setMemberFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">All members</option>
                  {memberOptions.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">All years</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full text-sm underline mt-1 opacity-80 hover:opacity-100"
                >
                  Reset filters
                </button>
              </div>
            </aside>

            {/* Project list */}
            <div>
              {filtered.length ? (
                <ul className="space-y-4">
                  {filtered.map((p, i) => {
                    const projectSlug = slugify(p.title);
                    // Redirect by the first person in de members grup 
                    const personSlug = p.members.length ? p.members[0] : "";

                    const content = (
                      <div>
                        <div className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:underline">
                          {p.title}
                        </div>
                        <div className="mt-1 text-sm text-gray-800 dark:text-gray-200 space-y-0.5">
                          <div>{p.lead ? `Lead: ${p.lead}` : "Lead: —"}</div>
                          <div>{p.domain ? `Department: ${p.domain}` : "Department: —"}</div>
                          <div>{(p.start || p.end) ? `Duration: ${formatDuration(p.start, p.end)}` : "Duration: —"}</div>
                          {p.region ? <div>Region: {p.region}</div> : null}
                        </div>
                      </div>
                    );

                    return (
                      <motion.li
                        key={`${p.title}-${i}`}
                        variants={itemVariants}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                      >
                        {personSlug ? (
                          <Link
                            href={`/people/staff/${encodeURIComponent(personSlug)}/${encodeURIComponent(projectSlug)}`}
                            className="block group"
                            aria-label={`Open project ${p.title || `#${i + 1}`}`}
                          >
                            {content}
                          </Link>
                        ) : (
                          content
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500">No projects found.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
