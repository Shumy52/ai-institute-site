"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import units from "@/app/data/departments/researchUnitsData.json";
import supUnits from "@/app/data/departments/supportUnitsData.json";
import { allStaff } from "@/app/data/staffData";
import { proData } from "@/app/data/proData";
import { pubData } from "@/app/data/pubData";
import { techTransferPage } from "./TechTransferClient.js";

const researchUnits = Array.isArray(units) ? units : [];
const supportUnits = Array.isArray(supUnits) ? supUnits : [];

/* --- Animations --- */
const containerVariants = {
  hidden: { opacity: 0.9 }, visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};
const itemVariants = { hidden: { y: 12, opacity: 0.95 }, visible: { y: 0, opacity: 1 } };

/* --- Helpers --- */
const slugify = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeKey = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

function projectsForPersonSlug(personSlug, personName) {
  const list = Array.isArray(proData) ? proData : [];
  const meKey = normalizeKey(personSlug);
  const meNameKey = normalizeKey(personName);

  const rows = [];

  for (const proj of list) {
    const teams = Array.isArray(proj?.teams) ? proj.teams : [];
    const isInTeam = teams.some((t) => {
      const tk = normalizeKey(t?.name);
      return tk === meKey || tk === meNameKey;
    });
    const isLead = normalizeKey(proj?.lead) === meKey || normalizeKey(proj?.lead) === meNameKey;

    if (!isInTeam && !isLead) continue;

    const domains = Array.isArray(proj?.domain)
      ? proj.domain.filter((d) => typeof d === "string" && d.trim().length > 0)
      : proj?.domain
      ? [String(proj.domain)]
      : [""];

    const themes = Array.isArray(proj?.themes) ? proj.themes.filter(Boolean) : [];

    if (themes.length) {
      for (const th of themes) {
        for (const d of domains) {
          rows.push({
            title: proj?.title ?? "",
            lead: proj?.lead ?? "",
            domain: d || "",
            theme: th || undefined,
            abstract: proj?.abstract ?? "",
          });
        }
      }
    } else {
      for (const d of domains) {
        rows.push({
          title: proj?.title ?? "",
          lead: proj?.lead ?? "",
          domain: d || "",
          theme: undefined,
          abstract: proj?.abstract ?? "",
        });
      }
    }
  }

  return rows;
}

function publicationsForPersonSlug(personSlug, personName) {
  const list = Array.isArray(pubData) ? pubData : [];
  const meKey = normalizeKey(personSlug);
  const meNameKey = normalizeKey(personName);

  return list.filter((it) => {
    const authors = Array.isArray(it?.authors) ? it.authors : [];
    return authors.some((a) => {
      const ak = normalizeKey(a);
      return ak === meKey || ak === meNameKey;
    });
  });
}

const normalizeProject = (p) =>
  typeof p === "string"
    ? { title: p, lead: undefined, domain: undefined, theme: undefined, abstract: undefined }
    : p;

const normalizePublication = (pb) =>
  typeof pb === "string"
    ? { title: pb, year: undefined, domain: undefined, kind: undefined, description: undefined, docUrl: undefined }
    : pb;

function Chevron({ open }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.18l3.71-2.95a.75.75 0 11.94 1.16l-4.24 3.37a.75.75 0 01-.94 0L5.21 8.39a.75.75 0 01.02-1.18z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SectionToggle({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-sm font-medium transition hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <span>{label}</span>
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function pickPersonSlugForProject(project) {
  const team = Array.isArray(project?.teams) ? project.teams : [];
  for (const t of team) {
    const slug = String(t?.name || "").trim();
    if (slug && allStaff.some((s) => s.slug === slug)) return slug;
  }
  const lead = String(project?.lead || "");
  if (lead) {
    const leadKey = normalizeKey(lead);
    const found = allStaff.find(
      (s) => normalizeKey(s.slug) === leadKey || normalizeKey(s.name) === leadKey
    );
    if (found) return found.slug;
  }
  return null;
}

export default function DepartmentsClient() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitView, setUnitView] = useState("details");

  const titleRef = useRef(null);        
  const mobileBarRef = useRef(null);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setUnitView("details");
    if (typeof window !== "undefined") {
      window.history.pushState({ department: unit.name }, "", "");
      setTimeout(() => {
        titleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPopState = () => {
      if (selectedUnit) setSelectedUnit(null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [selectedUnit]);

  /* --- Global aggregates --- */
  const globalProjects = useMemo(() => {
    const rows = [];
    for (const person of allStaff) {
      const projs = projectsForPersonSlug(person.slug, person.name).map(normalizeProject);
      for (const p of projs) {
        if (!p?.title) continue;
        rows.push({
          personName: person.name,
          personSlug: person.slug,
          title: p.title,
          lead: p.lead,
          domain: p.domain,
          theme: p.theme,
          projectSlug: slugify(p.title),
        });
      }
    }
    return rows;
  }, []);

  const globalPublications = useMemo(() => {
    const rows = [];
    for (const person of allStaff) {
      const pubs = publicationsForPersonSlug(person.slug, person.name).map(normalizePublication);
      for (const pb of pubs) {
        if (!pb?.title) continue;
        rows.push({
          personName: person.name,
          personSlug: person.slug,
          title: pb.title,
          year: pb.year,
          kind: pb.kind,
          description: pb.description,
          domain: pb.domain,
          docUrl: pb.docUrl,
        });
      }
    }
    return rows;
  }, []);

  /* --- Themes --- */
  const unitThemes = useMemo(() => {
    if (!selectedUnit) return [];
    const seen = new Set();
    const themesOut = [];

    const list = Array.isArray(proData) ? proData : [];
    for (const proj of list) {
      const domains = Array.isArray(proj?.domain) ? proj.domain : proj?.domain ? [proj.domain] : [];
      if (!domains.includes(selectedUnit.name)) continue;

      const themes = Array.isArray(proj?.themes) ? proj.themes.filter(Boolean) : [];
      for (const th of themes) {
        const t = String(th).trim();
        if (!t) continue;
        if (seen.has(t)) continue;
        seen.add(t);
        themesOut.push({ theme: t });
      }
    }
    return themesOut;
  }, [selectedUnit]);

  /* --- Unit-scoped aggregates --- */
  const unitProjects = useMemo(() => {
    if (!selectedUnit) return [];
    const seen = new Set();
    const unique = [];

    for (const row of globalProjects) {
      if (row.domain !== selectedUnit.name) continue;
      const key = `${row.projectSlug}|${row.domain || ""}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(row);
    }
    return unique;
  }, [selectedUnit, globalProjects]);

  const unitPublications = useMemo(() => {
    if (!selectedUnit) return [];
    const seen = new Set();
    const unique = [];

    for (const row of globalPublications) {
      if (row.domain !== selectedUnit.name) continue;
      const key = `${(row.title || "").toLowerCase().trim()}|${row.year || ""}|${row.domain || ""}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(row);
    }
    return unique;
  }, [selectedUnit, globalPublications]);

  const unitMembers = useMemo(() => {
    if (!selectedUnit) return [];
    const unitName = String(selectedUnit.name || "").trim().toLowerCase();

    return (Array.isArray(allStaff) ? allStaff : []).filter((p) => {
      const dep = String(p?.department || "").trim();
      return dep && dep.toLowerCase() === unitName;
    });
  }, [selectedUnit]);

  /* --- Render helpers --- */
  const renderProjects = (rows) =>
    rows.length ? (
      <ul className="space-y-4">
        {rows.map((row, i) => (
          <li
            key={`${row.personSlug}-${row.projectSlug}-${i}`}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <Link
              href={`/people/staff/${encodeURIComponent(row.personSlug)}/${encodeURIComponent(row.projectSlug)}`}
              className="block group"
            >
              <div className="font-medium group-hover:underline text-gray-900 dark:text-gray-100">
                {row.title}
              </div>
              {row.lead && (
                <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Lead:</span> {row.lead}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No projects found.</p>
    );

  const renderPublications = (rows) =>
    rows.length ? (
      <ul className="space-y-4">
        {rows.map((pb, i) => (
          <li
            key={`${pb.personSlug}-${pb.title}-${i}`}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-4"
          >
            <div className="flex items-baseline gap-2">
              <div className="font-medium text-gray-900 dark:text-gray-100">{pb.title}</div>
              {typeof pb.year !== "undefined" && <span className="text-sm opacity-70">({pb.year})</span>}
            </div>
            {pb.description && (
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{pb.description}</p>
            )}
            {pb.docUrl && (
              <a
                href={pb.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm underline opacity-80 hover:opacity-100"
                aria-label="Open publication documentation"
              >
                View documentation ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No publications found.</p>
    );

  const renderMembersCards = (rows) =>
    rows.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((m) => (
          <Link
            key={m.slug}
            href={`/people/staff/${encodeURIComponent(m.slug)}`}
            className="group rounded-xl border p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={m.image || "/people/Basic_avatar_image.png"}
                  alt={m.name}
                  fill
                  sizes="64px"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold group-hover:underline text-gray-900 dark:text-gray-100">{m.name}</div>
                {m.title && (
                  <div className="text-sm text-gray-800 dark:text-gray-200 font-medium md:opacity-80">
                    {m.title}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No members found.</p>
    );

  const renderThemes = (rows) =>
    rows.length ? (
      <ul className="space-y-2">
        {rows.map((t, idx) => (
          <li
            key={`${t.theme}-${idx}`}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm"
          >
            {t.theme}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No themes found.</p>
    );

  const coordinator =
    selectedUnit?.coordonator || selectedUnit?.coordinator || selectedUnit?.["coordonator"] || "";
  const coCoordinator =
    selectedUnit?.["co-coordonator"] ||
    selectedUnit?.coCoordonator ||
    selectedUnit?.co_coordinator ||
    "";
  const elements = Array.isArray(selectedUnit?.elements) ? selectedUnit.elements : [];
  
  const isSupportUnit = selectedUnit?.type === "support" ? true : false;
  const unitMembersSorted = useMemo(
    () =>
      Array.isArray(unitMembers)
        ? [...unitMembers].sort((a, b) =>
          (a?.name || "").localeCompare(b?.name || "", "ro", {
            sensitivity: "base",
            numeric: true,
          })
        )
      : [],
    [unitMembers]
  );

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1">
          <section className="p-6 md:p-8">
            {!selectedUnit && (
              <>
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400 tracking-tight text-center"
                >
                   Research departments
                </motion.h1>

                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {researchUnits.map((unit, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-5 border cursor-pointer"
                        onClick={() => handleUnitClick(unit)}
                      >
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                          {unit.name}
                        </h2>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
            {!selectedUnit && (
              <>
             <motion.h1
                  variants={itemVariants}
                  className="mt-8 text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400 tracking-tight text-center"
                >
                   Support departments
                </motion.h1>
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {supportUnits.map((unit, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-5 border cursor-pointer"
                        onClick={() => handleUnitClick(unit)}
                      >
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                          {unit.name}
                        </h2>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                </>
               )}
              
            {selectedUnit && (
              <>
                <h2
                  ref={titleRef}
                  className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                >
                  {selectedUnit.name}
                </h2>

                <div
                  ref={mobileBarRef}
                  className="sticky top-0 z-20 -mx-6 mb-4 bg-gray-100 dark:bg-gray-800 border-b px-4 py-3"
                >
                  <div className="flex justify-center md:justify-start">
                    <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-full overflow-x-auto whitespace-nowrap">
                      {isSupportUnit ? (
                        <p className="px-4 py-2 text-sm font-medium focus:outline-none bg-blue-600 text-white dark:bg-blue-500">Details</p>
                      ) : (
                        <>
                          {[
                        { id: "details", label: "Details" },
                        { id: "themes", label: "Themes" },
                        { id: "projects", label: "Projects" },
                        { id: "members", label: "Members" },
                        { id: "publications", label: "Publications" },
                      ].map((it) => {
                        const active = unitView === it.id;
                        
                        return (
                          <button
                            key={it.id}
                            onClick={() => setUnitView(it.id)}
                            className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                              active
                                ? "bg-blue-600 text-white dark:bg-blue-500"
                                : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                            }`}
                            aria-pressed={active}
                          >
                            {it.label}
                          </button>
                        );
                      })}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {unitView === "details" && (
                  <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="space-y-4">
                      {selectedUnit.name==="Technology Transfer & Development Unit" && (
                        <>{techTransferPage}</>
                      )}
                      {selectedUnit.description && (
                        <p className="text-gray-700 dark:text-gray-300">{selectedUnit.description}</p>
                      )}

                      {!!coordinator && (
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          <span className="font-semibold">Coordinator:</span> {coordinator}
                        </p>
                      )}
                      {!!coCoordinator && (
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          <span className="font-semibold">Deputy:</span> {coCoordinator}
                        </p>
                      )}

                      {elements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            Categories:
                          </p>

                          {elements.map((el, i) => (
                            <SectionToggle key={`${el.text}-${i}`} label={el.text}>
                              {Array.isArray(el.content) ? (
                                <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
                                  {el.content.map((p, idx) => (
                                    <p key={idx}>{p}</p>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-800 dark:text-gray-200">
                                  {String(el.content || "")}
                                </p>
                              )}
                            </SectionToggle>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                )}

                {unitView === "themes" && renderThemes(unitThemes)}
                {unitView === "projects" && renderProjects(unitProjects)}
                {unitView === "members" && renderMembersCards(unitMembersSorted)}
                {unitView === "publications" && renderPublications(unitPublications)}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
