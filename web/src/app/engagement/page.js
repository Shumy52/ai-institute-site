export const metadata = { title: "AIRi @ UTCN – Engagement" };
import Link from "next/link";

const items = [
  { href: "/engagement/public", title: "Public engagement", desc: "Programe, resurse si media pentru public." },
  { href: "/engagement/academic", title: "Academic engagement", desc: "Colaborari academice, cursuri, workshop-uri." },
  { href: "/engagement/industry", title: "Industry engagement", desc: "Proiecte industriale, consultanta, training." },
  { href: "/engagement/high-school", title: "High-school engagement", desc: "Competitii, evenimente, resurse pentru elevi." },
  { href: "/engagement/partners", title: "Partners", desc: "CLAIRE, ELLIS, AIoD, euRobotics, ADRA, AI4Europe, BDVA." },
  { href: "/engagement/industrial-phd", title: "Industrial PhD", desc: "Programe doctorale cu parteneri industriali." },
  { href: "/engagement/hpc-ai", title: "HPC-AI services", desc: "HPC, suport si training pentru AI." },
];

export default function EngagementPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="title-hero text-3xl md:text-4xl font-semibold mb-6">Engagement</h1>
      <p className="muted text-base mb-10 max-w-3xl">
        Conectam AIRI @ UTCN cu publicul, mediul academic si industria.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="card card-hover block p-6"
          >
            <h2 className="title-hero text-xl font-semibold">{it.title}</h2>
            <p className="muted mt-2 text-sm">{it.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
