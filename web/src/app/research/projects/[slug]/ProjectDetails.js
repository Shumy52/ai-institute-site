"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectDetailsClient({ project }) {
  const [tab, setTab] = useState("description");

  if (!project) return <div className="p-6">Project not found.</div>;

  // Use pre-computed relations from Strapi transformation
  const publications = project.publications || [];
  const staffTeamSorted = (project.members || []).sort((a, b) => 
    (a?.name || "").localeCompare(b?.name || "", "ro", { sensitivity: "base", numeric: true })
  );
  
  // Also handle "lead" if it's not in members? 
  // Strapi transform includes `leadDetails`. 
  // If we want to show lead in "Team Members" tab, we might need to combine them or check logic.
  // The original page used `staffTeamSorted` from `allStaff` filtered by name match.
  // Strapi transform returns `members` linked in backend.
  
  const partnersText = Array.isArray(project.partners)
    ? project.partners.filter(Boolean).join(", ")
    : project.partners || "";

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">{project.title}</h2>

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
        {project.oficialUrl && (
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

      <div className="mt-2 mb-6">
        <div className="flex justify-center md:justify-start">
          <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-full overflow-x-auto whitespace-nowrap">
            {[
              { id: "description", label: "Description" },
              { id: "themes", label: "Themes" },
              { id: "publications", label: "Publications" },
              { id: "team", label: "Team Members" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                  tab === item.id
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
                aria-pressed={tab === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === "description" && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          {project.abstract ? (
            <>
              <p className="mt-4 text-base leading-relaxed text-gray-800 dark:text-gray-200">{project.abstract}</p>

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
            <p className="mt-4 text-gray-600 dark:text-gray-400">No themes available.</p>
          )}
        </div>
      )}

      {tab === "publications" && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          {publications.length ? (
            <ul className="mt-4 space-y-3">
              {publications.map((pub, idx) => (
                <li
                  key={`${pub.title || "pub"}-${idx}`}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-3"
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">{pub.title}</div>
                  {pub.description ? (
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{pub.description}</p>
                  ) : null}
                  {pub.docUrl ? (
                    <a
                      href={pub.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm underline"
                    >
                      View documentation
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600 dark:text-gray-400">No publications linked.</p>
          )}
        </div>
      )}

      {tab === "team" && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
          {staffTeamSorted.length ? (
            <ul className="mt-4 space-y-2">
              {staffTeamSorted.map((member) => (
                <li key={member.slug} className="text-sm">
                   {/* TODO: Adjust link path if 'people/staff' is strict or if check type. 
                       Assuming standard link is okay. */}
                  <Link
                    href={`/people/staff/${encodeURIComponent(member.slug)}`}
                    className="underline hover:opacity-80"
                  >
                    {member.name}
                  </Link>
                  {member.title ? <span className="ml-1 text-gray-600 dark:text-gray-400">— {member.title}</span> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600 dark:text-gray-400">No team members linked.</p>
          )}
        </div>
      )}
    </main>
  );
}
