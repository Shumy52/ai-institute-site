"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { allStaff } from "@/app/data/staffData";
import { getPublicationsByAuthor } from "@/app/data/pubData";
import { getProjectsByMember } from "@/app/data/proData";
import { getDatasetsByAuthor } from "@/app/data/dataverseData";

export default function StaffDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const person = allStaff.find((p) => p.slug === slug);

  const [view, setView] = useState("publications"); 

  // ----- utils -----
  const slugify = (s) =>
    String(s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  // ----- state filtre Publications -----
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [kindFilter, setKindFilter] = useState("");
  const [domainFilter, setDomainFilter] = useState("");

  // ----- state filtre Projects -----
  const [pQuery, setPQuery] = useState("");
  const [pDomainFilter, setPDomainFilter] = useState("");
  const [pLeadFilter, setPLeadFilter] = useState("");

  // ----- state filtre Dataverse -----
  const [dQuery, setDQuery] = useState("");
  const [dYearFilter, setDYearFilter] = useState("");   
  const [dKindFilter, setDKindFilter] = useState("");   
  const [dDomainFilter, setDDomainFilter] = useState(""); 

  if (!person) return <div className="p-6">Staff member not found.</div>;

  // helper: for month
  const toMonthName = (m) => {
    if (m == null) return "";
    const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const n = Number(m);
    if (!Number.isNaN(n) && n >= 1 && n <= 12) return names[n - 1];
    const s = String(m).trim();
    return s || "";
  };

  // helper: for duration
  const formatDuration = (start, end) => {
    const mk = (v) => {
      if (!v) return "";
      const mm = v && v.month ? toMonthName(v.month) + " " : "";
      const yy = v && v.year != null ? v.year : "";
      return mm || yy ? `${mm}${yy}` : "";
    };
    const s = mk(start);
    const e = mk(end);
    if (!s && !e) return "";
    return `${s}${s || e ? " – " : ""}${e || "present"}`;
  };

  // ===== Publications (pubData.js) =====
  const normalizedPubs = useMemo(() => {
    const pubs = getPublicationsByAuthor(person.slug) ?? [];
    return pubs.map((pub) =>
      typeof pub === "string"
        ? { title: pub, year: undefined, domain: undefined, kind: undefined, description: undefined }
        : {
            title: pub.title ?? "",
            year: pub.year,
            domain: pub.domain,
            kind: pub.kind,
            description: pub.description,
          }
    );
  }, [person.slug]);

  const { yearOptions, kindOptions, domainOptions } = useMemo(() => {
    const years = Array.from(
      new Set(
        normalizedPubs
          .map((p) => (typeof p.year === "number" || typeof p.year === "string" ? String(p.year) : ""))
          .filter(Boolean)
      )
    ).sort((a, b) => Number(b) - Number(a));
    const kinds = Array.from(new Set(normalizedPubs.map((p) => p.kind).filter(Boolean)));
    const domains = Array.from(new Set(normalizedPubs.map((p) => p.domain).filter(Boolean)));
    return { yearOptions: years, kindOptions: kinds, domainOptions: domains };
  }, [normalizedPubs]);

  const filteredPubs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return normalizedPubs.filter((p) => {
      const matchesSearch =
        !q || `${p.title ?? ""} ${p.year ?? ""} ${p.domain ?? ""} ${p.kind ?? ""}`.toLowerCase().includes(q);
      const matchesYear = !yearFilter || String(p.year) === String(yearFilter);
      const matchesKind = !kindFilter || p.kind === kindFilter;
      const matchesDomain = !domainFilter || p.domain === domainFilter;
      return matchesSearch && matchesYear && matchesKind && matchesDomain;
    });
  }, [normalizedPubs, query, yearFilter, kindFilter, domainFilter]);

  const clearFilters = () => {
    setQuery("");
    setYearFilter("");
    setKindFilter("");
    setDomainFilter("");
  };

  // ===== Projects (proData.js) =====
  const normalizedProjects = useMemo(() => {
    const projs = getProjectsByMember(person.slug) ?? [];
    return projs.map((proj) =>
      typeof proj === "string"
        ? {
            title: proj,
            lead: undefined,
            domain: undefined,
            description: undefined,
            start: undefined,
            end: undefined,
          }
        : {
            title: proj.title ?? "",
            lead: proj.lead,
            domain: proj.domain,
            description: proj.description,
            start: proj.start,
            end: proj.end,
          }
    );
  }, [person.slug]);

  const { pDomainOptions, pLeadOptions } = useMemo(() => {
    const domains = Array.from(new Set(normalizedProjects.map((p) => p.domain).filter(Boolean)));
    const leads = Array.from(new Set(normalizedProjects.map((p) => p.lead).filter(Boolean)));
    return { pDomainOptions: domains, pLeadOptions: leads };
  }, [normalizedProjects]);

  const filteredProjects = useMemo(() => {
    const q = pQuery.trim().toLowerCase();
    return normalizedProjects.filter((p) => {
      const matchesSearch =
        !q || `${p.title ?? ""} ${p.lead ?? ""} ${p.domain ?? ""} ${p.description ?? ""}`.toLowerCase().includes(q);
      const matchesDomain = !pDomainFilter || p.domain === pDomainFilter;
      const matchesLead = !pLeadFilter || p.lead === pLeadFilter;
      return matchesSearch && matchesDomain && matchesLead;
    });
  }, [normalizedProjects, pQuery, pDomainFilter, pLeadFilter]);

  const clearProjectFilters = () => {
    setPQuery("");
    setPDomainFilter("");
    setPLeadFilter("");
  };

  // ===== Dataverse (dataverseData.js) =====
  const normalizedDatasets = useMemo(() => {
    const list = getDatasetsByAuthor(person.slug) ?? [];
    return (Array.isArray(list) ? list : []).map((title) => ({
      title: String(title || ""),
      year: undefined,
      domain: undefined,
      kind: undefined,
      description: undefined,
      doi: undefined,
    }));
  }, [person.slug]);

  const { dYearOptions, dKindOptions, dDomainOptions } = useMemo(() => {
    return { dYearOptions: [], dKindOptions: [], dDomainOptions: [] };
  }, [normalizedDatasets]);

  const filteredDatasets = useMemo(() => {
    const q = dQuery.trim().toLowerCase();
    return normalizedDatasets.filter((d) => {
      const searchable = `${d.title ?? ""} ${d.year ?? ""} ${d.domain ?? ""} ${d.kind ?? ""} ${d.description ?? ""} ${d.doi ?? ""}`.toLowerCase();
      const matchesSearch = !q || searchable.includes(q);
      const matchesYear = !dYearFilter || String(d.year) === String(dYearFilter);
      const matchesKind = !dKindFilter || d.kind === dKindFilter;
      const matchesDomain = !dDomainFilter || d.domain === dDomainFilter;
      return matchesSearch && matchesYear && matchesKind && matchesDomain;
    });
  }, [normalizedDatasets, dQuery, dYearFilter, dKindFilter, dDomainFilter]);

  const clearDatasetFilters = () => {
    setDQuery("");
    setDYearFilter("");
    setDKindFilter("");
    setDDomainFilter("");
  };

  return (
    <main className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <Image
          src={person.image || "/people/Basic_avatar_image.png"}
          alt={person.name}
          width={160}
          height={160}
          className="rounded-full object-cover mb-4"
        />
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">{person.name}</h1>
        {person.title && <p className="text-lg">{person.title}</p>}
        {person.email && <p>{person.email}</p>}
        {person.phone && <p>{person.phone}</p>}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <button
            type="button"
            onClick={() => setView("publications")}
            className={`px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring ${
              view === "publications"
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
            aria-pressed={view === "publications"}
          >
            📚 Publications
          </button>
          <button
            type="button"
            onClick={() => setView("projects")}
            className={`px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring ${
              view === "projects"
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
            aria-pressed={view === "projects"}
          >
            📁 Projects
          </button>
          <button
            type="button"
            onClick={() => setView("dataverse")}
            className={`px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring ${
              view === "dataverse"
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
            aria-pressed={view === "dataverse"}
          >
            💾 Dataverse
          </button>
        </div>
      </div>

      {/* Content */}
      {view === "publications" ? (
        <section className="mt-10">
          {/* GRID: sidebar on left side + list of publication on right side */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
            <aside className="md:-ml-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">Filter by year...</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>

                <select
                  value={kindFilter}
                  onChange={(e) => setKindFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">Filter by type...</option>
                  {kindOptions.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">Filter by Research Area...</option>
                  {domainOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for..."
                    className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => {}}
                    className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                    title="Search"
                    aria-label="Search"
                  >
                    🔎
                  </button>
                </div>

                <button onClick={clearFilters} className="w-full text-sm underline mt-1 opacity-80 hover:opacity-100">
                  Reset filters
                </button>
              </div>
            </aside>

            {/* Publication List */}
            <div>
              {filteredPubs.length ? (
                <ul className="space-y-4">
                  {filteredPubs.map((pub, i) => (
                    <li key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                      <div className="flex items-baseline gap-2">
                        <div className="font-medium">{pub.title}</div>
                        {typeof pub.year !== "undefined" && <span className="text-sm opacity-70">({pub.year})</span>}
                      </div>
                      {pub.description && (
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{pub.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No publications match your filters.</p>
              )}
            </div>
          </div>
        </section>
      ) : view === "projects" ? (
        <section className="mt-10">
          {/* GRID: sidebar on left side + list of projects on right side */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
            <aside className="md:-ml-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
                <select
                  value={pDomainFilter}
                  onChange={(e) => setPDomainFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">Filter by Research Area...</option>
                  {pDomainOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <select
                  value={pLeadFilter}
                  onChange={(e) => setPLeadFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">Filter by lead...</option>
                  {pLeadOptions.map((lead) => (
                    <option key={lead} value={lead}>
                      {lead}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <input
                    value={pQuery}
                    onChange={(e) => setPQuery(e.target.value)}
                    placeholder="Search for..."
                    className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => {}}
                    className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                    title="Search"
                    aria-label="Search"
                  >
                    🔎
                  </button>
                </div>

                <button
                  onClick={clearProjectFilters}
                  className="w-full text-sm underline mt-1 opacity-80 hover:opacity-100"
                >
                  Reset filters
                </button>
              </div>
            </aside>

            {/* Project List */}
            <div>
              {filteredProjects.length ? (
                <ul className="space-y-4">
                  {filteredProjects.map((p, i) => {
                    const projectSlug = p?.title ? slugify(p.title) : `project-${i}`;
                    return (
                      <li
                        key={i}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <Link
                          href={`/people/staff/${encodeURIComponent(slug || "")}/${encodeURIComponent(projectSlug)}`}
                          className="block group"
                          aria-label={`Open project ${p.title || `#${i + 1}`}`}
                        >
                          <div className="font-medium group-hover:underline">{p.title}</div>

                          <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                            {p.lead ? <span>{p.lead}</span> : null}
                            {p.lead && (p.start || p.end) ? <span> • </span> : null}
                            {p.start || p.end ? <span>{formatDuration(p.start, p.end)}</span> : null}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500">No projects match your filters.</p>
              )}
            </div>
          </div>
        </section>
      ) : (
        // Dataverse View 
        <section className="mt-10">
          {/* GRID: sidebar + list */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
            <aside className="md:-ml-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
                <select
                  value={dYearFilter}
                  onChange={(e) => setDYearFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">Filter by year...</option>
                  {dYearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>

                <select
                  value={dKindFilter}
                  onChange={(e) => setDKindFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">Filter by type...</option>
                  {dKindOptions.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                <select
                  value={dDomainFilter}
                  onChange={(e) => setDDomainFilter(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option value="">Filter by Research Area...</option>
                  {dDomainOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <input
                    value={dQuery}
                    onChange={(e) => setDQuery(e.target.value)}
                    placeholder="Search for..."
                    className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                  />
                  <button
                    onClick={() => {}}
                    className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                    title="Search"
                    aria-label="Search"
                  >
                    🔎
                  </button>
                </div>

                <button
                  onClick={clearDatasetFilters}
                  className="w-full text-sm underline mt-1 opacity-80 hover:opacity-100"
                >
                  Reset filters
                </button>
              </div>
            </aside>

            {/* Dataset List */}
            <div>
              {filteredDatasets.length ? (
                <ul className="space-y-4">
                  {filteredDatasets.map((ds, i) => (
                    <li key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                      <div className="flex items-baseline gap-2">
                        <div className="font-medium">{ds.title || `Dataset ${i + 1}`}</div>
                        {typeof ds.year !== "undefined" && <span className="text-sm opacity-70">({ds.year})</span>}
                      </div>
                      {ds.description && (
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{ds.description}</p>
                      )}
                      {ds.doi && (
                        <a
                          href={ds.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm underline opacity-80 hover:opacity-100"
                          aria-label="Open dataset link"
                        >
                          View dataset
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No datasets match your filters.</p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
