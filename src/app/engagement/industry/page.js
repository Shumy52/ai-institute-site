export const metadata = { title: "Industry engagement – AIRi @ UTCN" };
export default function IndustryPage(){
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Industry engagement</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Colaboram cu companii pentru proiecte R&D, consultanta si training.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {["Proiecte aplicate", "Consultanta & audit AI", "Programe de training", "Laboratoare comune"].map(t=>(
          <div key={t} className="rounded-xl border border-gray-200 dark:border-gray-800 p-5">
            <h2 className="text-lg font-semibold">{t}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
