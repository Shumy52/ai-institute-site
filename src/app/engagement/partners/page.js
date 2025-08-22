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
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 tracking-tight">
          Partners
        </h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800/70 transition block"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{p.name}</h2>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{p.blurb}</p>
            </a>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Partners map</h2>
          <CollaboratorsClient partners={partners} />
        </section>
      </div>
    </main>
  );
}
