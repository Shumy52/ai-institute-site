export const metadata = { title: "Technology transfer & development – AIRi @ UTCN" };

export default function TechTransferPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
        <section className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-tight">
            Technology transfer & development unit
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Sprijinim transferul tehnologic: identificare IP, licențiere, prototipare, spin‑offs.
          </p>

          <div className="mt-2 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Servicii</h2>
            </div>
            <div className="px-4 md:px-6 py-6">
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Evaluare TRL & roadmap</li>
                <li>Prototipare rapidă</li>
                <li>Matchmaking cu industrie</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
