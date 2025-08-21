"use client";

import { motion } from "framer-motion";
import eventsData from "@/app/data/news&events/eventsData.json"; 

export default function EventsClient() {
  const items = Array.isArray(eventsData) ? eventsData : [];

  return (
    <main className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🗓️ Events
      </motion.h1>

      <motion.p
        className="text-gray-800 dark:text-gray-200 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Highlights and memorable moments from AIRI.
      </motion.p>

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
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.15 },
            },
          }}
        >
          {items.map((ev, idx) => (
            <motion.li
              key={`${ev.title}-${idx}`}
              className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
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
