"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { allStaff } from "@/app/data/staffData";
import { proData } from "@/app/data/proData";
import { pubData } from "@/app/data/pubData";

/* helpers */
const slugify = (s) =>
  String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeKey = (s) =>
  String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

function projectsForPerson(person) {
  const list = Array.isArray(proData) ? proData : [];
  const meKey = normalizeKey(person.slug);
  const meNameKey = normalizeKey(person.name);

  return list.filter((proj) => {
    const teams = Array.isArray(proj?.teams) ? proj.teams : [];
    const inTeam = teams.some((t) => {
      const tk = normalizeKey(t?.name);
      return tk === meKey || tk === meNameKey;
    });
    const isLead =
      normalizeKey(proj?.lead) === meKey || normalizeKey(proj?.lead) === meNameKey;

    return inTeam || isLead;
  });
}

function normalizeProject(p) {
  const domains = Array.isArray(p?.domain)
    ? p.domain.filter((d) => typeof d === "string" && d.trim().length > 0)
    : p?.domain ? [String(p.domain)] : [];

  return {
    title: p?.title ?? "",
    lead: p?.lead ?? "",
    abstract: p?.abstract ?? "",
    publication: p?.publication ?? "",
    domains,
    themes: Array.isArray(p?.themes) ? p.themes : [], 
    teams: Array.isArray(p?.teams) ? p.teams : [],
    region: p?.region,
    partners: p?.partners ?? p?.parteners ?? "",
    docUrl: p?.docUrl || "",
  };
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const projectSlug = Array.isArray(params?.project) ? params.project[0] : params?.project;

  const person = allStaff.find((p) => p.slug === slug);
  if (!person) return <div className="p-6">Staff member not found.</div>;

  const { project, staffTeam } = useMemo(() => {
    const normalized = projectsForPerson(person).map(normalizeProject);
    const proj = normalized.find((p) => slugify(p.title) === projectSlug);

    const memberSlugs = (proj?.teams || [])
      .map((t) => String(t?.name || "").trim())
      .filter(Boolean);
    const staff = allStaff.filter((s) => memberSlugs.includes(s.slug));

    return { project: proj, staffTeam: staff };
  }, [person, projectSlug]);

  const [tab, setTab] = useState("description");

  if (!project) return <div className="p-6">Project not found.</div>;

  // --- Publications ---
  const publicationTitles = useMemo(() => {
    if (Array.isArray(project.publication)) return project.publication;
    if (project.publication) return [project.publication];
    return [];
  }, [project]);

  const allPubs = Array.isArray(pubData) ? pubData : [];
  const matchedPubs = useMemo(() => {
    const norm = (s) => String(s || "").trim().toLowerCase();
    return publicationTitles.map((t) => {
      const tNorm = norm(t);
      return (
        allPubs.find((p) => norm(p.title) === tNorm) ||
        { title: t }
      );
    });
  }, [publicationTitles, allPubs]);

  const partnersText = Array.isArray(project.partners)
    ? project.partners.filter(Boolean).join(", ")
    : (project.partners || "");

  const staffTeamSorted = useMemo(
    () =>
      Array.isArray(staffTeam)
        ? [...staffTeam].sort((a, b) =>
          (a?.name || "").localeCompare(b?.name || "", "ro", {
            sensitivity: "base",
            numeric: true,
          })
        )
      : [],
    [staffTeam]
  );

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
        {project.title}
      </h2>

      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-5">
        {project.lead && (
          <div>
            <span className="font-medium">Lead:</span> {project.lead}
          </div>
        )}
        {partnersText && (
          <div>
            <span className="font-medium">Collaborating organisations:</span> {partnersText}
          </div>
        )}
        {project.region && (
          <div>
            <span className="font-medium">Region:</span> {project.region}
          </div>
        )}
      </div>

      {/* Tabs: Description / Themes / Publications / Team Members */}
      <div className="mt-2 mb-6">
        <div className="flex justify-center md:justify-start">
          <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-full overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={() => setTab("description")}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                tab === "description"
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
              aria-pressed={tab === "description"}
            >
              Description
            </button>

            <button
              type="button"
              onClick={() => setTab("themes")}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                tab === "themes"
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
              aria-pressed={tab === "themes"}
            >
              Themes
            </button>

            <button
              type="button"
              onClick={() => setTab("publications")}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                tab === "publications"
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
              aria-pressed={tab === "publications"}
            >
              Publications
            </button>
            <button
              type="button"
              onClick={() => setTab("team")}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                tab === "team"
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
              aria-pressed={tab === "team"}
            >
              Team Members
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      {tab === "description" && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          {project.abstract ? (
            <>
              <p className="mt-4 text-base leading-relaxed text-gray-800 dark:text-gray-200">
                {project.abstract}
              </p>

              {project.docUrl ? (
                <a
                  href={project.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition text-sm"
                  aria-label="Open project presentation"
                >
                  Presentation
                </a>
              ) : null}
            </>
          ) : (
            <p className="mt-4 text-gray-600 dark:text-gray-400">No description available.</p>
          )}
        </div>
      )}

      {/* Themes */}
      {tab === "themes" && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          {Array.isArray(project.themes) && project.themes.length ? (
            <ul className="mt-4 space-y-2">
              {project.themes.map((th, i) => (
                <li
                  key={`${th}-${i}`}
                  className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm"
                >
                  {th}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600 dark:text-gray-400">No themes listed for this project.</p>
          )}
        </div>
      )}

      {/* Publications */}
      {tab === "publications" && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          {matchedPubs.length ? (
            <ul className="mt-4 space-y-4">
              {matchedPubs.map((pub, i) => (
                <li key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-baseline gap-2">
                    <div className="font-medium">{pub.title || `Publication ${i + 1}`}</div>
                    {typeof pub.year !== "undefined" && (
                      <span className="text-sm opacity-70">({pub.year})</span>
                    )}
                  </div>
                  {pub.description && (
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{pub.description}</p>
                  )}

                  {pub.docUrl && (
                    <a
                      href={pub.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                      aria-label="Open publication documentation"
                    >
                      View documentation
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              No publications listed for this project.
            </p>
          )}
        </div>
      )}

      {/* Team Members */}
      {tab === "team" && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          {Array.isArray(staffTeamSorted) && staffTeamSorted.length ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {staffTeamSorted.map((m) => (
                <article
                  key={m.slug}
                  className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
                >
                  <Link href={`/people/staff/${encodeURIComponent(m.slug)}`} className="block text-center">
                    <div className="relative w-36 h-36 mx-auto">
                      <Image
                        src={m.image || "/people/Basic_avatar_image.png"}
                        alt={m.name}
                        fill
                        sizes="144px"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
                    {m.title && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{m.title}</p>
                    )}
                    {m.email && <p className="text-sm mt-1">{m.email}</p>}
                    {m.phone && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {m.phone}</p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              No team members found in our directory.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
