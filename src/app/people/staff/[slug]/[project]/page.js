import Image from "next/image";
import { use } from "react";
import { allStaff } from "@/app/data/staffData";
import { proData } from "@/app/data/proData";

const slugify = (s) =>
  String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

function projectsForPersonSlug(personSlug) {
  if (!proData) return [];

  if (!Array.isArray(proData) && typeof proData === "object") {
    const arr = proData[personSlug];
    return Array.isArray(arr) ? arr : [];
  }

  if (Array.isArray(proData)) {
    return proData.filter((p) => {
      const ownerSlug = p?.personSlug || p?.ownerSlug || p?.slug;
      const members = p?.members || p?.team || [];
      const byOwner = typeof ownerSlug === "string" && ownerSlug.toLowerCase() === String(personSlug).toLowerCase();
      const byMembers =
        Array.isArray(members) &&
        members.some((m) =>
          typeof m === "string"
            ? m.toLowerCase() === String(personSlug).toLowerCase()
            : m && typeof m === "object" && typeof m.slug === "string" && m.slug.toLowerCase() === String(personSlug).toLowerCase()
        );
      return byOwner || byMembers;
    });
  }

  return [];
}

function normalizeProject(p) {
  if (typeof p === "string") {
    return {
      title: p,
      lead: undefined,
      domain: undefined,
      description: undefined,
      start: undefined,
      end: undefined,
      docUrl: undefined,
    };
  }
  
  return {
    title: p?.title ?? "",
    lead: p?.lead,
    domain: p?.domain,
    description: p?.description,
    start: p?.start,
    end: p?.end,
    docUrl: p?.docUrl || p?.documentation || p?.docs || p?.link || undefined,
  };
}

export function generateStaticParams() {
  const params = [];
  for (const person of allStaff) {
    const projects = projectsForPersonSlug(person.slug).map((proj) =>
      typeof proj === "string" ? { title: proj } : proj
    );
    for (const p of projects) {
      if (!p?.title) continue;
      params.push({
        slug: person.slug,
        project: slugify(p.title),
      });
    }
  }
  return params;
}

export default function ProjectDetailPage({ params }) {
  const { slug, project } = use(params);

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
      return (mm || yy) ? `${mm}${yy}` : "";
    };
    const s = mk(start);
    const e = mk(end);
    if (!s && !e) return "";
    return `${s}${s || e ? " – " : ""}${e || "present"}`;
  };

  const person = allStaff.find((p) => p.slug === slug);
  if (!person) return <div className="p-6">Staff member not found.</div>;

  const normalizedProjects = projectsForPersonSlug(person.slug).map(normalizeProject);

  const proj = normalizedProjects.find((p) => slugify(p.title) === project);
  if (!proj) return <div className="p-6">Project not found.</div>;

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={person.image || "/people/Basic_avatar_image.png"}
          alt={person.name}
          width={72}
          height={72}
          className="rounded-full object-cover"
        />
        <div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Project profile</div>
          <h1 className="text-xl font-semibold">{person.name}</h1>
        </div>
      </div>

      {/* Project Details */}
      <section>
        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">{proj.title}</h2>

        <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {proj.lead ? <span className="font-medium">Lead: {proj.lead}</span> : null}
          {(proj.lead && (proj.start || proj.end)) ? <span> • </span> : null}
          {proj.start || proj.end ? <span>{formatDuration(proj.start, proj.end)}</span> : null}
        </div>

        {proj.domain && (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-200 text-xs">
              {proj.domain}
            </span>
          </div>
        )}

        {proj.description && (
          <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200">{proj.description}</p>
        )}

        {/* Link for documentation */}
        {proj.docUrl && (
          <a
            href={proj.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            aria-label="Open project documentation in a new tab"
          >
            <span>📄 View documentation</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5M6 18h6" />
            </svg>
          </a>
        )}
      </section>
    </main>
  );
}