export const metadata = { title: "HPC-AI services – AIRi @ UTCN" };

export default function HpcAiPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
        <section className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900 dark:text-gray-100 tracking-tight">
            HPC-AI services
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Servicii de calcul de înaltă performanță, training și suport pentru proiecte AI.
          </p>
        </section>
      </div>
    </main>
  );
}