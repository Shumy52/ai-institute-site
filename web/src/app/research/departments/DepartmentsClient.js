"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { allStaff } from "@/app/data/staffData";
import { proData } from "@/app/data/proData";
import { pubData } from "@/app/data/pubData";

/* --- Research Units descriptions --- */
const researchUnits = [
  {
    name: "Unit of Software and Hardware Technologies for AI",
    description:
      "Covers AI subfields such as Intelligent Agents, Machine Learning, Knowledge Engineering, Semantic Web, NLP, and Deep Learning-based Computer Vision.",
    icon: "💻",
    content: (
      <>
        <p>
          Consists of laboratories covering key AI subfields including Intelligent Agents, Machine Learning,
          Knowledge Engineering and Reasoning, Semantic Web, Natural Language Processing, Deep Learning-based
          Computer Vision, Human-Machine Verbal Communication Technologies, and Data Science.
        </p>
        <p>
          These laboratories develop innovative solutions for AI application challenges, data processing, and
          knowledge engineering while supporting research in telecommunications, software engineering, and
          commercialization.
        </p>
        <p>
          Additionally, Hardware Technologies for AI includes labs dedicated to networks, communication
          protocols, cellular and wireless communications, sensor networks, as well as the design of analog/digital
          integrated circuits and digital systems.
        </p>
      </>
    ),
  },
  {
    name: "Unit of Intelligent and Autonomous Systems",
    description:
      "Dedicated to the research and implementation of intelligent systems with autonomous capabilities.",
    icon: "🤖",
    content: (
      <>
        <p>
          Focuses on the design and implementation of intelligent systems involving sensory perception, environmental
          representation, intelligent communications, control systems, distributed systems, and cyber-physical systems.
        </p>
        <p>
          The laboratories also advance autonomous production, Industrial IoT (IIoT), connected mobility, and both
          industrial and medical robotics, bolstering innovation in IoT, cyber-physical systems, and social robotics.
        </p>
        <p>Contributes to advanced manufacturing technologies and healthcare innovation through robotics.</p>
      </>
    ),
  },
  {
    name: "Unit of Microelectronics",
    description:
      "Focuses on AI applications in integrated circuit design, rapid parameter analysis, and signal processing.",
    icon: "💡",
    content: (
      <>
        <p>
          Concentrates on applying AI in designing integrated circuits and systems, including rapid determination of
          electro-thermal parameters and AI-assisted customized signal processing.
        </p>
        <p>
          The unit also addresses AI-based yield analysis, post-Si verification, ASIC design and testing for intelligent
          sensors, and the development of methodologies for electromagnetic compatibility testing and standardization.
        </p>
      </>
    ),
  },
  {
    name: "Unit of Intelligent Applications in Cybersecurity and Space",
    description: "Integrates AI benefits into cybersecurity defenses and civilian space applications.",
    icon: "🚀",
    content: (
      <>
        <p>
          Focuses on developing intelligent cybersecurity solutions alongside the formulation of AI-powered applications
          for space exploration and civilian space uses.
        </p>
        <p>
          Laboratories within this unit work on enhancing cybersecurity protocols and innovating in space application
          technologies.
        </p>
      </>
    ),
  },
  {
    name: "Unit of Robotics and Industrial IoT (I-IoT)",
    description: "Explores autonomous robotics, production optimization, and digital twin simulations.",
    icon: "🏭",
    content: (
      <>
        <p>
          Concentrates on the development of autonomous mobile and industrial robots, as well as the optimization of
          production planning and real-time quality control.
        </p>
        <p>
          Also engages in virtual prototyping, product testing using Generative AI, real-time supply chain management,
          lifecycle optimization, and simulating manufacturing processes via AR/VR and digital twins.
        </p>
      </>
    ),
  },
  {
    name: "Unit of Medical Technologies",
    description: "Advances medical procedures with robotics, AI diagnostics, and personalized healthcare.",
    icon: "⚕️",
    content: (
      <>
        <p>
          Specializes in developing robots, mechanisms, and instruments to enhance the precision of medical procedures
          such as robotic surgery and precise instrument positioning.
        </p>
        <p>
          Focuses on personalized oncological treatments, AI models for differential diagnosis, and the application of
          robotics in oral surgery, dental medicine, patient rehabilitation, and telemedicine.
        </p>
        <p>
          The unit also incorporates laboratories dedicated to medical imaging, AI-based diagnostics, and bioinformatics,
          promoting non-invasive imaging and genetic analysis for early diagnosis and monitoring.
        </p>
      </>
    ),
  },
];

/* --- Animations --- */
const containerVariants = {
  hidden: { opacity: 0.9 },
  visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
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

const toMonthName = (m) => {
  if (m == null) return "";
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    return mm || yy ? `${mm}${yy}` : "";
  };
  const s = mk(start);
  const e = mk(end);
  if (!s && !e) return "";
  return `${s}${s || e ? " – " : ""}${e || "present"}`;
};


function projectsForPersonSlug(personSlug, personName) {
  if (!proData) return [];
  
  if (!Array.isArray(proData) && typeof proData === "object") {
    const arr = proData[personSlug];
    return Array.isArray(arr) ? arr : [];
  }
  
  if (Array.isArray(proData)) {
    const slugLC = String(personSlug).toLowerCase();
    const nameLC = String(personName || "").toLowerCase();
    return proData.filter((p) => {
      const owner = (p?.personSlug || p?.ownerSlug || p?.slug || "").toLowerCase?.() || "";
      const members = p?.members || p?.team || [];
      const byOwner = owner === slugLC;
      const byMembers =
        Array.isArray(members) &&
        members.some((m) =>
          typeof m === "string"
            ? m.toLowerCase() === slugLC || m.toLowerCase() === nameLC
            : m && typeof m === "object" && (
                (typeof m.slug === "string" && m.slug.toLowerCase() === slugLC) ||
                (typeof m.name === "string" && m.name.toLowerCase() === nameLC)
              )
        );
      return byOwner || byMembers;
    });
  }
  return [];
}

function publicationsForPersonSlug(personSlug, personName) {
  if (!pubData) return [];
  
  if (!Array.isArray(pubData) && typeof pubData === "object") {
    const arr = pubData[personSlug];
    return Array.isArray(arr) ? arr : [];
  }
  
  if (Array.isArray(pubData)) {
    const slugLC = String(personSlug).toLowerCase();
    const nameLC = String(personName || "").toLowerCase();
    return pubData.filter((it) => {
      const authorSlug = (it?.personSlug || it?.authorSlug || it?.slug || "").toLowerCase?.() || "";
      const authors = it?.authors;
      const bySlug = authorSlug === slugLC;
      const byAuthors =
        Array.isArray(authors) &&
        authors.some((a) =>
          typeof a === "string"
            ? a.toLowerCase() === slugLC || a.toLowerCase() === nameLC
            : a && typeof a === "object" && (
                (typeof a.slug === "string" && a.slug.toLowerCase() === slugLC) ||
                (typeof a.name === "string" && a.name.toLowerCase() === nameLC)
              )
        );
      return bySlug || byAuthors;
    });
  }
  return [];
}

const normalizeProject = (p) =>
  typeof p === "string"
    ? {
        title: p,
        lead: undefined,
        domain: undefined,
        description: undefined,
        start: undefined,
        end: undefined,
        theme: undefined,
      }
    : p;

const normalizePublication = (pb) =>
  typeof pb === "string"
    ? { title: pb, year: undefined, domain: undefined, kind: undefined, description: undefined }
    : pb;

export default function DepartmentsClient() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitView, setUnitView] = useState("themes");

  const asideRef = useRef(null);
  const mobileBarRef = useRef(null);

  // Select a unit: set state + pushState + scroll to proper submenu
  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    setUnitView("themes");
    if (typeof window !== "undefined") {
      window.history.pushState({ department: unit.name }, "", "");
      setTimeout(() => {
        if (window.innerWidth < 768) {
          mobileBarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          asideRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
    }
  };

  // Back for browser
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
          start: p.start,
          end: p.end,
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
        });
      }
    }
    return rows;
  }, []);

  const globalThemes = useMemo(() => {
    return globalProjects
      .filter((p) => !!p.theme && typeof p.theme === "string" && p.theme.trim().length > 0)
      .map((p) => ({
        theme: p.theme.trim(),
        projectTitle: p.title,
        domain: p.domain,
        personSlug: p.personSlug,
        projectSlug: p.projectSlug,
      }));
  }, [globalProjects]);

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
    const unitName = selectedUnit.name;
    const setSlugs = new Set();
    for (const row of globalProjects) if (row.domain === unitName) setSlugs.add(row.personSlug);
    for (const row of globalPublications) if (row.domain === unitName) setSlugs.add(row.personSlug);
    return allStaff.filter((p) => setSlugs.has(p.slug));
  }, [selectedUnit, globalProjects, globalPublications]);

  const unitThemes = useMemo(() => {
    if (!selectedUnit) return [];
    const seen = new Set();
    const unique = [];

    for (const t of globalThemes) {
      if (t.domain !== selectedUnit.name) continue;
      const key = `${t.projectSlug}|${t.domain || ""}`; 
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(t);
    }

    return unique;
  }, [selectedUnit, globalThemes]);

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
              <div className="font-medium group-hover:underline text-gray-900 dark:text-gray-100">{row.title}</div>
              <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {row.lead && <span>{row.lead}</span>}
                {row.lead && (row.start || row.end) && <span> • </span>}
                {(row.start || row.end) && <span>{formatDuration(row.start, row.end)}</span>}
                <span className="block opacity-70">
                  {row.domain ? `${row.domain} • ` : ""}
                  {row.personName}
                </span>
              </div>
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
          <li key={`${pb.personSlug}-${pb.title}-${i}`} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-baseline gap-2">
              <div className="font-medium text-gray-900 dark:text-gray-100">{pb.title}</div>
              {pb.year && <span className="text-sm opacity-70">({pb.year})</span>}
            </div>
            {pb.description && <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{pb.description}</p>}
            <div className="mt-1 text-xs opacity-70">
              {pb.domain ? `${pb.domain} • ` : ""}
              {pb.personName}
              {pb.kind ? ` • ${pb.kind}` : ""}
            </div>
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
              <Image
                src={m.image || "/people/Basic_avatar_image.png"}
                alt={m.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
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
      <ul className="list-disc list-inside space-y-2">
        {rows.map((t, idx) => (
          <li key={`${t.projectSlug}-${idx}`}>
            <Link
              href={`/people/staff/${encodeURIComponent(t.personSlug)}/${encodeURIComponent(t.projectSlug)}`}
              className="underline decoration-dotted hover:decoration-solid"
            >
              {t.theme}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No themes found.</p>
    );

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
        {/* For desktop: sidebar + content; for mobil: content, hidden sidebar */}
        <div className={`grid ${selectedUnit ? "grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]" : "grid-cols-1"}`}>
          
          {selectedUnit && (
            <aside
              ref={asideRef}
              className="hidden md:block bg-gray-100 dark:bg-gray-800 p-6 border-r md:sticky md:top-16 md:z-10"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Research Unit</h3>
              <ul className="space-y-2">
                {[
                  { id: "themes", label: "Themes" },
                  { id: "projects", label: "Projects" },
                  { id: "members", label: "Members" },
                  { id: "publications", label: "Publications" },
                ].map((it) => (
                  <li key={it.id}>
                    <button
                      onClick={() => setUnitView(it.id)}
                      className={`w-full text-left py-2 px-3 rounded-md transition ${
                        unitView === it.id
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-gray-900 border text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {it.label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <section className="p-6 md:p-8">
            {!selectedUnit && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-gray-900 dark:text-gray-100 tracking-tight"
                >
                  Research Units
                </motion.h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {researchUnits.map((unit, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 md:p-5 border cursor-pointer"
                      onClick={() => handleUnitClick(unit)}
                    >
                      <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3 mb-2">
                        {unit.icon} {unit.name}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">{unit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {selectedUnit && (
              <div
                ref={mobileBarRef}
                className="md:hidden sticky top-0 z-20 -mx-6 mb-4 bg-gray-100 dark:bg-gray-800 border-b px-4 py-3"
              >
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {[
                    { id: "themes", label: "Themes" },
                    { id: "projects", label: "Projects" },
                    { id: "members", label: "Members" },
                    { id: "publications", label: "Publications" },
                  ].map((it) => (
                    <button
                      key={it.id}
                      onClick={() => setUnitView(it.id)}
                      className={`shrink-0 px-3 py-1.5 rounded-lg text-sm transition ${
                        unitView === it.id
                          ? "bg-blue-600 text-white"
                          : "bg-white dark:bg-gray-900 border text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {it.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedUnit && (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {selectedUnit.name}
                </h2>
                {unitView === "themes" && renderThemes(unitThemes)}
                {unitView === "projects" && renderProjects(unitProjects)}
                {unitView === "members" && renderMembersCards(unitMembers)}
                {unitView === "publications" && renderPublications(unitPublications)}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}