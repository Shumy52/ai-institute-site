"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TABS = [
  { key: "Overview", label: "Overview" },
  { key: "Projects", label: "Projects" },
  { key: "Consulting", label: "Consulting & Audit" },
  { key: "Training", label: "Training Programs" },
];

function Tabs({ value, onChange }) {
  return (
    <nav className="flex flex-wrap items-center gap-2">
      {TABS.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={
              "rounded-lg px-3 py-1.5 text-sm font-medium transition " +
              (active
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70")
            }
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

function Feature({ emoji, title, desc }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/70 transition">
      <div className="flex items-start gap-3">
        <div className="text-2xl" aria-hidden>{emoji}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Client() {
  const router = useRouter();
  const sp = useSearchParams();
  const tab = sp.get("tab") || "Overview";

  const setTab = useCallback(
    (t) => router.replace(`?tab=${encodeURIComponent(t)}`, { scroll: false }),
    [router]
  );

  const content = useMemo(() => {
    switch (tab) {
      case "Projects":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Feature emoji="⚙️" title="Applied R&D" desc="Proiecte aplicate împreună cu companiile pentru soluții AI." />
            <Feature emoji="🔬" title="Joint labs" desc="Laboratoare comune pentru testare și dezvoltare." />
          </div>
        );
      case "Consulting":
        return (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Consulting & Audit</h2>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Audit AI pentru procese industriale</li>
                <li>Consultanță pentru transformare digitală</li>
                <li>Asistență tehnică în proiecte complexe</li>
              </ul>
            </div>
          </section>
        );
      case "Training":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Feature emoji="📊" title="AI for managers" desc="Programe scurte de training pentru decidenți." />
            <Feature emoji="💻" title="Hands-on workshops" desc="Ateliere aplicate pentru angajați și echipe R&D." />
          </div>
        );
      default:
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <Feature emoji="🤝" title="Partnerships" desc="Colaborăm cu industrie pentru AI aplicat." />
            <Feature emoji="📈" title="Consulting" desc="Audit AI și suport tehnic pentru companii." />
            <Feature emoji="🎓" title="Training" desc="Programe de training & workshop-uri pentru industrie." />
          </div>
        );
    }
  }, [tab]);

  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
        <section className="p-6 md:p-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-1 text-gray-900 dark:text-gray-100 tracking-tight">
                Industry engagement
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                Colaborăm cu companii pentru proiecte aplicate, consultanță și training.
              </p>
            </div>
            <Link
              href="/about/contact?team=industry"
              className="mt-4 md:mt-0 inline-flex items-center rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              Contact industry team
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-4 md:px-6 py-3 border-b border-gray-200 dark:border-gray-800">
              <Tabs value={tab} onChange={setTab} />
            </div>
            <div className="px-4 md:px-6 py-6">{content}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
