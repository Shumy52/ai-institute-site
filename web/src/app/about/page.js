import HistorySection from "./HistorySection";
import MissionClient from "./MissionClient";
import { FaRegCalendarAlt } from "react-icons/fa";

export const metadata = {
  title: "About – Mission & History | AIRi @ UTCN",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <section className="icia-wrapper rounded-3xl border bg-white/80 dark:bg-slate-900/70 backdrop-blur shadow-xl px-5 py-8 md:px-8 md:py-10">
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <MissionClient />
        </div>

        <div className="flex flex-col items-center mb-6 md:mb-8 border-t border-gray-200 dark:border-gray-800 pt-10 w-full">
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
    </main>
  );
}
