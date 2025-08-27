"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import newsData from "@/app/data/news&events/newsData.json";

/* Animations */
const containerVariants = {
  hidden: { opacity: 0.9 }, visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

//  Format date  
function formatNewsDate(date) {
  if (!date || (typeof date !== "object")) return "";
  const m = Number(date.month ?? date.mouth ?? 0); 
  const d = Number(date.day ?? 0);
  const y = Number(date.year ?? 0);
  if (!m || !d || !y) return "";
  const names = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const monthName = names[m] || "";
  return `${monthName} ${d} ${y}`;
}


// Generation function for XML file 
function generateAndDownloadRSS() {
  const groups = Array.isArray(newsData) ? newsData : [];
  const items = [];

  for (const g of groups) {
    const groupTitle = typeof g?.title === "string" ? g.title : "";
    const list = Array.isArray(g?.items) ? g.items : [];
    for (const it of list) {
      if (it?.text && it?.url) {
        const fullTitle = groupTitle ? `${groupTitle} — ${it.text}` : it.text;
        items.push({ title: fullTitle, link: it.url });
      }
    }
  }

  const now = new Date().toUTCString();

  const rssItems = items
    .map(
      (it) => `
  <item>
    <title>${escapeXml(it.title)}</title>
    <link>${escapeXml(it.link)}</link>
    <guid>${escapeXml(it.link)}</guid>
    <pubDate>${now}</pubDate>
  </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>AIRI News</title>
  <link>http://localhost:3000/news</link>
  <description>The latest AIRI updates and announcements.</description>
  <lastBuildDate>${now}</lastBuildDate>
  ${rssItems}
</channel>
</rss>`;

  const blob = new Blob([xml], { type: "application/rss+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "news.xml";
  a.click();
  URL.revokeObjectURL(url);
}

export default function NewsClient() {
  const groups = Array.isArray(newsData) ? newsData : [];
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedGroup = useMemo(
    () => groups[selectedIdx] ?? { title: "", items: [] },
    [groups, selectedIdx]
  );

  return (
    <>
      <main className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
        <motion.h1
          className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          📰 News
        </motion.h1>

        <motion.p
          className="text-gray-800 dark:text-gray-200 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          The latest AIRI updates and announcements.
        </motion.p>

        {groups.length === 0 ? (
          <motion.p
            className="mt-10 text-center text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            No news available at the moment.
          </motion.p>
        ) : (
          <motion.div
            className="mt-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-6 flex justify-center md:justify-start">
              <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden max-w-full overflow-x-auto whitespace-nowrap">
                {groups.map((g, idx) => {
                  const active = selectedIdx === idx;
                  return (
                    <button
                      key={`${g.title}-${idx}`}
                      type="button"
                      onClick={() => setSelectedIdx(idx)}
                      aria-pressed={active}
                      className={`px-4 py-2 text-sm font-medium focus:outline-none transition
                        ${
                          active
                            ? "bg-blue-600 text-white dark:bg-blue-500"
                            : "bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                    >
                      {g.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info card news */}
            <motion.div
              key={selectedGroup.title}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className=""
            >
              {Array.isArray(selectedGroup.items) && selectedGroup.items.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedGroup.items.map((it, i) => {
                    const dateStr = formatNewsDate(it.date);
                    return (
                      <li
                        key={`${it.text}-${i}`}
                        className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {it.image ? (
                          <a
                            href={it.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open: ${it.text}`}
                          >
                            <img
                              src={it.image}
                              alt={it.text}
                              className="w-full h-48 md:h-56 object-cover"
                              loading="lazy"
                            />
                          </a>
                        ) : (
                          <div className="w-full h-48 md:h-56 bg-gray-100 dark:bg-gray-800" />
                        )}

                        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                          <a
                            href={it.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-base md:text-lg font-medium leading-snug transition-colors duration-200 hover:underline hover:text-blue-600 dark:hover:text-yellow-400"
                          >
                            {it.text}
                          </a>

                          {dateStr && (
                            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {dateStr}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  No items available in this section yet.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* RSS Button */}
      <button
        onClick={generateAndDownloadRSS}
        aria-label="Download RSS feed (XML)"
        title="Download RSS feed (XML)"
        className="fixed bottom-6 right-20 z-50 bg-blue-600 dark:bg-yellow-400 text-white dark:text-black rounded-full shadow-lg p-4 transition-transform duration-300 hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
          <path d="M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM3 5v3c7.18 0 13 5.82 13 13h3C19 12.4 11.6 5 3 5zm0 6v3a7 7 0 0 1 7 7h3c0-5.52-4.48-10-10-10z" />
        </svg>
      </button>
    </>
  );
}
