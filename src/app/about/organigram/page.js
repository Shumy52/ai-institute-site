export const metadata = {
  title: "Organigram | AI Institute",
};

export default function OrganigramPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Organigram</h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
        Descriere <strong>Director Committee</strong> si{" "}
        <strong>Scientific Committee</strong>
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Director Committee</h2>
        <p className="mb-2 text-gray-600 dark:text-gray-400">
          View the structure of the Director Committee:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a
              href="/files/organigram-director.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Download PDF
            </a>
          </li>
          <li>
            <a
              href="/files/organigram-director.png"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View PNG
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Scientific Committee</h2>
        <p className="mb-2 text-gray-600 dark:text-gray-400">
          View the structure of the Scientific Committee:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a
              href="/files/organigram-scientific.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Download PDF
            </a>
          </li>
          <li>
            <a
              href="/files/organigram-scientific.png"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View PNG
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
