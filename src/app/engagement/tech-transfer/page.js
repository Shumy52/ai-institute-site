export const metadata = { title: "Technology transfer & development – AIRi @ UTCN" };
export default function TechTransferPage(){
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Technology transfer & development unit</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Sprijinim transferul tehnologic: identificare IP, licentiere, prototipare, spin-offs.
      </p>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h2 className="text-lg font-semibold">Servicii</h2>
        <ul className="list-disc pl-6 mt-2 text-sm">
          <li>Evaluare TRL & roadmap</li>
          <li>Prototipare rapida</li>
          <li>Matchmaking cu industrie</li>
        </ul>
      </div>
    </main>
  );
}
