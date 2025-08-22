import HistorySection from "./HistorySection";
import { FaRegCalendarAlt } from "react-icons/fa";

export const metadata = {
  title: "About – Mission & History | AIRi @ UTCN",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl">
        <section className="p-6 md:p-8">
          <section id="mission" className="mb-10">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
              Mission
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Paragraf mission...
            </p>
          </section>

          <section className="icia-wrapper rounded-3xl border bg-white/80 dark:bg-slate-900/70 backdrop-blur shadow-xl px-5 py-8 md:px-8 md:py-10">
            <div className="flex flex-col items-center mb-6 md:mb-8">
              <FaRegCalendarAlt className="h-8 w-8 mb-2" style={{ color: "var(--icia-title)" }} />
              <h2
                className="text-3xl font-extrabold tracking-wide"
                style={{ color: "var(--icia-title)" }}
              >
                ICIA Timeline
              </h2>
            </div>

            <HistorySection />
          </section>
        </section>
      </div>
    </main>
  );
}
