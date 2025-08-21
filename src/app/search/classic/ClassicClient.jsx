"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseTerms(q) {
  return q.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function buildPrefixRegex(terms) {
  if (!terms.length) return null;
  const source = terms.map(escapeRegExp).join("|");
  return new RegExp(`\\b(${source}\\w*)`, "ig");
}

function highlightPrefix(text, terms) {
  if (!terms.length || !text) return text;
  const re = buildPrefixRegex(terms);
  if (!re) return text;
  const parts = text.split(re);
  return parts.map((part, i) =>
    re.test(part) ? (
      <mark key={`h-${i}`} className="bg-yellow-200 px-0.5 rounded">
        {part}
      </mark>
    ) : (
      <span key={`t-${i}`}>{part}</span>
    )
  );
}

function matchesAllTermsPrefix(item, terms) {
  if (!terms.length) return false;
  const title = (item.title || "").toLowerCase();
  const snippet = (item.snippet || "").toLowerCase();
  const tags = (item.tags || []).map((t) => (t || "").toLowerCase());

  return terms.every((t) => {
    const re = new RegExp(`\\b${escapeRegExp(t)}`, "i");
    if (re.test(title)) return true;
    if (re.test(snippet)) return true;
    for (const tag of tags) if (re.test(tag)) return true;
    return false;
  });
}

function scoreItemPrefix(item, terms) {
  let score = 0;
  const title = (item.title || "").toLowerCase();
  const snippet = (item.snippet || "").toLowerCase();
  const tags = (item.tags || []).map((t) => (t || "").toLowerCase());

  for (const t of terms) {
    const re = new RegExp(`\\b${escapeRegExp(t)}`, "i");
    if (re.test(title)) score += 3;
    else if (tags.some((tag) => re.test(tag))) score += 2;
    else if (re.test(snippet)) score += 1;
  }
  return score;
}

export default function ClassicClient() {
  const [idx, setIdx] = useState([]);
  const [q, setQ] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then(setIdx)
      .finally(() => setReady(true));
  }, []);

  const { results, terms } = useMemo(() => {
    const terms = parseTerms(q);
    if (!terms.length) return { results: [], terms };

    const raw = idx
      .filter((item) => matchesAllTermsPrefix(item, terms))
      .map((item) => ({ ...item, _score: scoreItemPrefix(item, terms) }))
      .sort((a, b) => b._score - a._score || a.title.localeCompare(b.title));

    const seen = new Set();
    const deduped = raw.filter((r) => {
      const key = `${r.route}::${r.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return { results: deduped, terms };
  }, [q, idx]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-4">Search</h1>

      <div className="rounded-2xl border p-4 mb-6 bg-white/70 dark:bg-slate-900/60 backdrop-blur">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type to search pages…"
          className="w-full rounded-xl border px-4 py-3 bg-white dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500"
        />
      </div>

      {ready && q.trim() && (
        <>
          <div className="text-sm text-slate-500 mb-3">
            {results.length} result{results.length === 1 ? "" : "s"} for <strong>“{q.trim()}”</strong>
          </div>

          <ul className="space-y-3">
            {results.map((r) => (
              <li
                key={`${r.route}::${r.title}`}
                className="rounded-xl border p-4 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <Link href={r.route} className="text-blue-600 dark:text-blue-400 underline font-medium">
                  {highlightPrefix(r.title, terms)}
                </Link>
                <div className="text-xs text-slate-500 mt-1">{r.route}</div>
                {r.snippet && (
                  <p className="text-slate-700 dark:text-slate-300 mt-2">
                    {highlightPrefix(r.snippet, terms)}
                  </p>
                )}
                {Array.isArray(r.tags) && r.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {r.tags.slice(0, 6).map((tag, i) => (
                      <span
                        key={`${r.route}::${r.title}::tag-${i}-${tag}`}
                        className="text-xs px-2 py-0.5 rounded-full border bg-white dark:bg-slate-900"
                      >
                        #{highlightPrefix(String(tag), terms)}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {results.length === 0 && (
            <div className="text-slate-600 dark:text-slate-300">
              No matches! Try different keywords or check your spelling!
            </div>
          )}
        </>
      )}
    </main>
  );
}
