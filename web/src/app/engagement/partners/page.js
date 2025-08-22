export const metadata = { title: "Partners – AIRi @ UTCN" };

import CollaboratorsClient from "../../collaborators/CollaboratorsClient";

const partners = [
  { name: "CLAIRE", url: "https://claire-ai.org", blurb: "Confederation of Laboratories for AI Research in Europe." },
  { name: "ELLIS", url: "https://ellis.eu", blurb: "European Laboratory for Learning and Intelligent Systems." },
  { name: "AI-on-Demand (AIoD)", url: "https://www.aiod.eu", blurb: "Platformă europeană pentru resurse AI." },
  { name: "euRobotics", url: "https://www.eu-robotics.net", blurb: "Rețea europeană pentru robotică." },
  { name: "ADRA", url: "https://adr-association.eu", blurb: "AI, Data and Robotics Association." },
  { name: "AI4Europe", url: "https://www.ai4europe.eu", blurb: "Ecosistem european AI." },
  { name: "BDVA", url: "https://bdva.eu", blurb: "Big Data Value Association." }
];

export default function PartnersPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8">Partners</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition block"
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.blurb}</p>
          </a>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Partners map</h2>
        <CollaboratorsClient partners={partners} />
      </section>
    </main>
  );
}
