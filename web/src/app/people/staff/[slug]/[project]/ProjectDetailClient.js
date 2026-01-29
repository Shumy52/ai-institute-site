"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { isLocalImageUrl, isRelativeImageUrl } from "@/lib/strapi";

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
  const [tab, setTab] = useState("description");

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

      {/* Tabs */}
      <div className="mt-2 mb-6">
        <div className="flex justify-center md:justify-start">
          <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-full overflow-x-auto whitespace-nowrap">
            {["description", "themes", "publications", "team"].map((item) => {
              const labelMap = {
                description: "Description",
                themes: "Themes",
                publications: "Publications",
                team: "Team Members",
              };
              const isActive = tab === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                    isActive
                      ? "bg-blue-600 text-white dark:bg-blue-500"
                      : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                  }`}
                  aria-pressed={isActive}
                >
                  {labelMap[item]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Description */}
      {tab === "description" && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          {project?.abstract ? (
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
          {themesList.length ? (
            <ul className="mt-4 space-y-2">
              {themesList.map((theme, index) => (
                <li
                  key={`${theme}-${index}`}
                  className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm"
                >
                  {theme}
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
          {publicationsList.length ? (
            <ul className="mt-4 space-y-4">
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
                      className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition text-sm"
                      aria-label="Open publication documentation"
                    >
                      View document
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
          {teamMembersSorted.length ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembersSorted.map((member) => {
                const isActive = member?.slug === staffSlug;
                return (
                  <article
                    key={member?.slug || member?.id || member?.name}
                    className={`border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow ${
                      isActive ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    {member?.slug ? (
                      <Link
                        href={`/people/staff/${encodeURIComponent(member.slug)}`}
                        className="block text-center"
                      >
                        <MemberCard member={member} />
                      </Link>
                    ) : (
                      <div className="block text-center">
                        <MemberCard member={member} />
                      </div>
                    )}
                  </article>
                );
              })}
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

function MemberCard({ member }) {
  const avatar = member?.image || FALLBACK_AVATAR;
  const shouldUnoptimize = isLocalImageUrl(avatar) || isRelativeImageUrl(avatar);
  return (
    <>
      <div className="relative w-36 h-36 mx-auto">
        <Image
          src={avatar}
          alt={member?.name || "Team member"}
          fill
          sizes="144px"
          unoptimized={shouldUnoptimize}
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{member?.name || "Unknown member"}</h3>
      {member?.title && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{member.title}</p>
      )}
      {member?.email && <p className="text-sm mt-1">{member.email}</p>}
      {member?.phone && (
        <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {member.phone}</p>
      )}
      {member?.isLead && (
        <p className="text-xs mt-2 inline-block px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
          Lead
        </p>
      )}
    </>
  );
}
