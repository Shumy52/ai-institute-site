import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getStaffMember,
  transformStaffData,
  transformPublicationData,
  transformProjectData,
} from "@/lib/strapi";
import StaffDetailClient from "./StaffDetailClient";

export default async function StaffDetailPage({ params }) {
  // In Next.js 15+, params is a Promise
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug[0] : resolvedParams?.slug;
  
  if (!slug) {
    notFound();
  }

  const strapiPerson = await getStaffMember(slug);

  if (!strapiPerson) {
    notFound();
  }

  const [personEntry] = transformStaffData([strapiPerson]);

  if (!personEntry) {
    notFound();
  }

  // Handle both Strapi 4 (with attributes) and Strapi 5 (flat) formats
  const personData = strapiPerson.attributes ?? strapiPerson;
  
  const publicationsRaw = transformPublicationData(
    personData.publications?.data ?? personData.publications ?? []
  );

  const leadingProjectsRaw = transformProjectData(
    personData.leading_projects?.data ?? personData.leading_projects ?? []
  );

  const memberProjectsRaw = transformProjectData(
    personData.projects?.data ?? personData.projects ?? []
  );

  const normalizePublication = (pub) => ({
    id: pub.id ?? null,
    title: pub.title || "",
    year: pub.year ?? null,
    domain: pub.domain || "",
    kind: pub.kind || "",
    description: pub.description || "",
    authors: Array.isArray(pub.authors)
      ? pub.authors.map((author) => author?.name).filter(Boolean)
      : [],
    docUrl: pub.docUrl || "",
  });

  const publications = publicationsRaw.map(normalizePublication);

  const projectMap = new Map();

  const mergeProject = (project) => {
    if (!project?.slug && !project?.title) return;
    const key = project.slug || project.title;
    if (projectMap.has(key)) return;

    const leadName =
      typeof project.lead === "string"
        ? project.lead
        : project.lead?.name || project.leadName || "";
    const leadSlug =
      typeof project.lead === "object" && project.lead
        ? project.lead.slug || ""
        : project.leadSlug || "";

    projectMap.set(key, {
      id: project.id ?? null,
      slug: project.slug || key,
      title: project.title || "",
      lead: leadName,
      leadName,
      leadSlug,
      abstract: project.abstract || "",
      themes: Array.isArray(project.themes) ? project.themes : [],
      teams: Array.isArray(project.teams) ? project.teams : [],
      region: project.region || "",
      domain: Array.isArray(project.domain) ? project.domain : [],
      partners: Array.isArray(project.partners) ? project.partners : [],
      docUrl: project.docUrl || "",
      oficialUrl: project.oficialUrl || project.officialUrl || "",
    });
  };

  leadingProjectsRaw.forEach(mergeProject);
  memberProjectsRaw.forEach(mergeProject);

  const projects = Array.from(projectMap.values());

  const person = {
    ...personEntry,
    department: personEntry.department || personEntry.departmentInfo?.name || "",
  };

  return (
    <main className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative w-36 h-36 mx-auto mb-4">
          <Image
            src={person.image || "/people/Basic_avatar_image.png"}
            alt={person.name}
            fill
            sizes="144px"
            className="rounded-full object-cover"
          />
        </div>
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

                      {pub.docUrl && (
                        <a
                          href={pub.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition text-sm"
                          aria-label="Open publication documentation in a new tab"
                        >
                          View documentation
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5M6 18h6" />
                          </svg>
                        </a>
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
                          href={`/research/projects/${encodeURIComponent(projectSlug)}`}
                          className="block group"
                          aria-label={`Open project ${p.title || `#${i + 1}`}`}
                        >
                          <div className="font-medium group-hover:underline">{p.title}</div>
                          {p.lead && (
                            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Lead:</span> {p.lead}
                            </div>
                          )}
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
