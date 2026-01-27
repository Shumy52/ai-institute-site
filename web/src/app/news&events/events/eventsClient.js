"use client";

import { motion } from "framer-motion";

/* Animations */
const containerVariants = {
  hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CALENDAR_EMBED_URL_RAW =
  "https://outlook.office365.com/owa/calendar/03fcfa83c4ac48e1ba0031c55a958c35@campus.utcluj.ro/4deb95cb924d4d80ae21dd1a539599a014540741905280907663/calendar.ics";

const CALENDAR_EMBED_URL = CALENDAR_EMBED_URL_RAW.replace(/calendar\.ics(\?.*)?$/i, "calendar.html$1");

export default function EventsClient({ events = [] }) {
  const items = Array.isArray(events) ? events : [];

  return (
    <main className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Events
      </motion.h1>

      <motion.p
        className="text-gray-800 dark:text-gray-200 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Highlights and memorable moments from AIRI.
      </motion.p>

      {/* Calendar section */}
      <motion.section
        className="mt-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        aria-label="Institute calendar"
      >
        <div className="px-5 pt-4">
          <h2 className="text-lg font-semibold">Institute Calendar</h2>
        </div>

        <div className="p-5 pt-3">
          <div className="w-full rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
            <div
              className="overflow-x-auto md:overflow-x-visible -mx-5 md:mx-0"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehaviorX: "contain",
              }}
            >
              <div className="inline-block w-[1100px] md:w-full">
                <iframe
                  title="AIRI Institute Calendar"
                  src={CALENDAR_EMBED_URL}
                  className="w-[1100px] md:w-full"
                  style={{ height: "90vh" }}
                  loading="lazy"
                  scrolling="no"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {items.length === 0 ? (
        <motion.p
          className="mt-10 text-center text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          No events available at the moment.
        </motion.p>
      ) : (
        <motion.ul
          className="mt-10 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((ev, idx) => (
            <motion.li
              key={`${ev.title}-${idx}`}
              className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
              variants={itemVariants}
            >
              <div className="p-5">
                <a
                  href={ev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base md:text-lg font-semibold leading-snug transition-colors duration-200 hover:underline hover:text-blue-600 dark:hover:text-yellow-400"
                >
                  {ev.title}
                </a>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </main>
  );
}
