"use client";

import { useMemo } from "react";
import Link from "next/link";

const FALLBACK_AVATAR = "/people/Basic_avatar_image.png";

const joinPartners = (partners) => {
  if (Array.isArray(partners)) {
    return partners.filter(Boolean).join(", ");
  }
  return typeof partners === "string" ? partners : "";
};

const authorsToText = (authors) => {
  if (!Array.isArray(authors)) return "";
  return authors
    .map((author) =>
      typeof author === "string"
        ? author
        : author?.name || author?.full_name || author?.slug || ""
    )
    .filter(Boolean)
    .join(", ");
};

export default function ProjectDetailClient({
  staffSlug,
  project,
  publications = [],
  teamMembers = [],
}) {
  const domainList = useMemo(
    () => (Array.isArray(project?.domain) ? project.domain : []),
    [project?.domain]
  );

  const themesList = useMemo(
    () => (Array.isArray(project?.themes) ? project.themes : []),
    [project?.themes]
  );

  const partnersText = useMemo(
    () => joinPartners(project?.partners),
    [project?.partners]
  );

  const publicationsList = useMemo(
    () => (Array.isArray(publications) ? publications : []),
    [publications]
  );

  const teamMembersSorted = useMemo(() => {
    if (!Array.isArray(teamMembers)) return [];
    return [...teamMembers].sort((a, b) =>
      (a?.name || "").localeCompare(b?.name || "", "ro", {
        sensitivity: "base",
        numeric: true,
      })
    );
  }, [teamMembers]);

  const leadName = project?.leadName || project?.lead || project?.leadDetails?.name || "";
  const leadSlug = project?.leadSlug || project?.leadDetails?.slug || "";

  const bodyBlocks = Array.isArray(project?.body) ? project.body : [];
  const timeline = Array.isArray(project?.timeline) ? project.timeline : [];
  const hasBody = bodyBlocks.length > 0;

  const renderRichText = (html, key) =>
    html ? (
      <div
        key={key}
        className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    ) : null;

  const renderBlock = (block, index) => {
    if (!block) return null;
    switch (block.__component) {
      case "shared.rich-text":
        return renderRichText(block.body, `rich-${index}`);
      case "shared.section":
        return (
          <section key={`section-${index}`} className="space-y-3">
            {block.heading ? (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {block.heading}
              </h3>
            ) : null}
            {block.subheading ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">{block.subheading}</p>
            ) : null}
            {renderRichText(block.body, `section-body-${index}`)}
            {block.media ? (
              <img
                src={block.media}
                alt={block.heading || "Project media"}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800"
                loading="lazy"
              />
            ) : null}
          </section>
        );
      case "shared.media":
        return block.file ? (
          <img
            key={`media-${index}`}
            src={block.file}
            alt="Project media"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-800"
            loading="lazy"
          />
        ) : null;
      case "shared.slider":
        return Array.isArray(block.files) && block.files.length ? (
          <div key={`slider-${index}`} className="grid gap-3 sm:grid-cols-2">
            {block.files.map((file, idx) => (
              <img
                key={`slider-${index}-${idx}`}
                src={file}
                alt="Project media"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800"
                loading="lazy"
              />
            ))}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
        {project?.title || "Project"}
      </h2>

      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-5">
        {leadName && (
          <div>
            <span className="font-medium">Lead:</span>{" "}
            {leadSlug ? (
              <Link
                href={`/people/staff/${encodeURIComponent(leadSlug)}`}
                className="underline hover:opacity-80"
              >
                {leadName}
              </Link>
            ) : (
              leadName
            )}
          </div>
        )}
        {partnersText && (
          <div>
            <span className="font-medium">Collaborating organisations:</span>{" "}
            {partnersText}
          </div>
        )}
        {project?.region && (
          <div>
            <span className="font-medium">Region:</span> {project.region}
          </div>
        )}
        {Array.isArray(domainList) && domainList.length > 0 && (
          <div>
            <span className="font-medium">Departments:</span> {domainList.join(", ")}
          </div>
        )}
        {project?.oficialUrl && (
          <div>
            <span className="font-medium">Official page:</span>{" "}
            <a
              href={project.oficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
              aria-label="Open official project page"
            >
              Click here
            </a>
          </div>
        )}
      </div>

      <section className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Overview</h3>

        {hasBody ? (
          <div className="space-y-6">{bodyBlocks.map(renderBlock)}</div>
        ) : project?.abstract ? (
          <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line">
            {project.abstract}
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No description available.</p>
        )}

        {project.docUrl ? (
          <a
            href={project.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition text-sm"
            aria-label="Open project presentation"
          >
            Presentation
          </a>
        ) : null}

        {themesList.length ? (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Themes</h4>
            <div className="flex flex-wrap gap-2">
              {themesList.map((theme, index) => (
                <span
                  key={`${theme}-${index}`}
                  className="px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {timeline.length ? (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Timeline</h4>
            <ul className="space-y-2">
              {timeline.map((entry, idx) => (
                <li key={`${entry.label}-${idx}`} className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{entry.label}</span>
                  {entry.date ? <span className="ml-2 text-xs opacity-70">{entry.date}</span> : null}
                  {entry.description ? (
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {entry.description}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Team & publications</h3>

        {teamMembersSorted.length ? (
          <ul className="space-y-3">
            {teamMembersSorted.map((member) => (
              <li
                key={member.slug || member.name}
                className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 ${
                  member.isPrimary
                    ? "bg-blue-50 dark:bg-blue-950"
                    : "bg-white dark:bg-gray-950"
                }`}
              >
                <img
                  src={member.image || FALLBACK_AVATAR}
                  alt={member.name || "Team member"}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
                <div>
                  {member.slug ? (
                    <Link
                      href={`/people/staff/${encodeURIComponent(member.slug)}`}
                      className="font-medium hover:underline"
                    >
                      {member.name || "Unknown"}
                    </Link>
                  ) : (
                    <div className="font-medium">{member.name || "Unknown"}</div>
                  )}
                  {member.title && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">{member.title}</div>
                  )}
                  {member.isLead && (
                    <div className="text-xs text-blue-600 dark:text-blue-300 font-semibold">Lead</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No team members found in our directory.
          </p>
        )}

        {publicationsList.length ? (
          <ul className="space-y-4">
            {publicationsList.map((pub, index) => (
              <li
                key={pub?.slug || pub?.id || index}
                className="rounded-xl border border-gray-200 dark:border-gray-800 p-4"
              >
                <div className="flex items-baseline gap-2">
                  <div className="font-medium">{pub?.title || `Publication ${index + 1}`}</div>
                  {typeof pub?.year !== "undefined" && pub?.year !== null && (
                    <span className="text-sm opacity-70">({pub.year})</span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {pub?.kind && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {pub.kind}
                    </span>
                  )}
                  {pub?.domain && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                      {pub.domain}
                    </span>
                  )}
                </div>

                {authorsToText(pub?.authors) && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Authors:</span> {authorsToText(pub.authors)}
                  </p>
                )}

                {pub?.description && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {pub.description}
                  </p>
                )}

                {pub?.docUrl && (
                  <a
                    href={pub.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm underline"
                  >
                    View documentation
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No publications linked to this project.</p>
        )}
      </section>
    </main>
  );
}
