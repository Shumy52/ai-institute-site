export const metadata = { title: "High-school engagement – AIRi @ UTCN" };
export default function HighSchoolPage(){
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">High-school engagement</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Concursuri, evenimente și resurse de alfabetizare AI pentru elevi și profesori.
      </p>
      <a
        className="inline-block rounded-lg border px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        href="https://ailiteracyframework.org/wp-content/uploads/2025/05/AILitFramework_ReviewDraft.pdf"
        target="_blank" rel="noopener noreferrer"
      >
        AILIT Framework – Link resurse
      </a>
    </main>
  );
}
