import Image from "next/image";
import { allStaff } from "@/app/data/staffData";

const slugify = (s) =>
  String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export function generateStaticParams() {
  const params = [];
  for (const person of allStaff) {
    const projects = (person.projects ?? []).map((proj) =>
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
  const { slug, project } = params;

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

  const normalizedProjects = (person.projects ?? []).map((proj) =>
    typeof proj === "string"
      ? { title: proj, lead: undefined, domain: undefined, description: undefined, start: undefined, end: undefined }
      : proj
  );

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
          <div className="text-sm text-gray-600 dark:text-gray-400">Project lead profile</div>
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
      </section>

      {/* Link back */}
      <div className="mt-8">
        <a href={`/people/staff/${encodeURIComponent(slug)}`} className="text-sm underline opacity-80 hover:opacity-100">
          ← Back to {person.name}
        </a>
      </div>
    </main>
  );
}
