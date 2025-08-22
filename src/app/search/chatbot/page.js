export const metadata = { title: "Search – AIRi Chatbot" };

export default function ChatbotSoon() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-5xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl w-full">
        <section className="p-6 md:p-10">
          <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Search</h1>

          <div className="rounded-2xl border p-6 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">AIRi Chatbot</h2>
            <p className="text-slate-700 dark:text-slate-300">
              Coming soon — LLM-based chatbot for AIRi knowledge and site content.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
