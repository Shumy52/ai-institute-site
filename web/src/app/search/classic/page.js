export const metadata = { title: "Search – Classic" };

import ClassicClient from "./ClassicClient";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl w-full">
        <section className="p-6 md:p-10">
          <ClassicClient />
        </section>
      </div>
    </main>
  );
}
