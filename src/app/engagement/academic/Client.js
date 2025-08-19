"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

const TABS = [
  { key: "Overview", label: "Overview" },
  { key: "Initiatives", label: "Initiatives" },
  { key: "Courses", label: "Courses & Workshops" },
  { key: "Mobility", label: "Co-tutoring & Mobility" },
];

function Tabs({ value, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-800 p-1 bg-white dark:bg-gray-900">
      {TABS.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={
            "px-3 py-1.5 text-sm rounded-lg transition " +
            (value === t.key
              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/70")
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Feature({ title, desc, emoji }) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-3">
        <div className="text-2xl" aria-hidden>
          {emoji}
        </div>
        <div>
          <h3 className="title-hero text-lg font-semibold">{title}</h3>
          <p className="muted text-sm mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Client() {
  const router = useRouter();
  const sp = useSearchParams();

  const tab = sp.get("tab") || "Overview";
  const setTab = (t) => router.replace(`?tab=${encodeURIComponent(t)}`, { scroll: false });

  const content = useMemo(() => {
    switch (tab) {
      case "Initiatives":
        return (
          <section className="space-y-4">
            <h2 className="title-hero text-xl font-semibold">Inițiative</h2>
            <div className="card p-5">
              <ul className="muted list-disc pl-6 space-y-1 text-sm">
                <li>Scoli de vara & workshop-uri</li>
                <li>Program de co-tutoring, vizite stiintifice, mobilitati</li>
                <li>Seminarii comune & invitati internationali</li>
              </ul>
            </div>
          </section>
        );

      case "Courses":
        return (
          <section className="space-y-4">
            <h2 className="title-hero text-xl font-semibold">Courses & Workshops</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Feature emoji="🧠" title="Machine Learning" desc="Cursuri comune, module aplicate, proiecte." />
              <Feature emoji="🤖" title="Robotics & Vision" desc="Laboratoare, proiecte, echipe mixte." />
              <Feature emoji="🖥️" title="HPC for AI" desc="Module practice pe infrastructura HPC." />
              <Feature emoji="🔐" title="AI Ethics & Safety" desc="Ateliere pe AI responsabil & reglementare." />
            </div>
          </section>
        );

      case "Mobility":
        return (
          <section className="space-y-4">
            <h2 className="title-hero text-xl font-semibold">Co-tutelă & Mobility</h2>
            <div className="card p-5">
              <ul className="muted list-disc pl-6 space-y-1 text-sm">
                <li>Co-supervizare doctorate cu universitati partenere</li>
                <li>Burse de mobilitate (studenti, doctoranzi, staff)</li>
                <li>Vizite stiintifice & stagii scurte</li>
              </ul>
            </div>
          </section>
        );

      default:
        return (
          <>
            <p className="muted mb-8 max-w-3xl">
              Colaborari cu universitati si institutii: co-tutoring, cursuri comune, workshop-uri, vizite,
              schimburi de cercetatori.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <Feature emoji="🤝" title="Academic partnerships" desc="Retea de colaborari si activitati comune." />
              <Feature emoji="🏫" title="Teaching & training" desc="Cursuri, scoli de vara, workshop-uri." />
              <Feature emoji="🌍" title="Mobility" desc="Co-tutoring, vizite, stagii, mobilitati." />
            </div>
          </>
        );
    }
  }, [tab]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="title-hero text-3xl md:text-4xl font-semibold">Academic engagement</h1>
      </header>

      <div className="flex items-center justify-between mb-6">
        <Tabs value={tab} onChange={setTab} />
        <Link
          href="/contact"
          className="rounded-xl border px-3 py-1.5 text-sm border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/70 transition"
        >
          Contact academic team
        </Link>
      </div>

      {content}

      <div className="card p-5 mt-10">
        <p className="muted text-sm">Continut</p>
      </div>
    </main>
  );
}
