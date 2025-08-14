"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { staffData } from "@/app/data/staffData";

export default function ResearchersClient() {
  const students = staffData["Students"] ?? [];

  return (
    <main className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🔬 Researchers
      </motion.h1>

      <motion.p
        className="text-gray-800 dark:text-gray-200 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        This section lists our students involved in research activities.
      </motion.p>

      {/* Students list*/}
      {students.length === 0 ? (
        <motion.p
          className="mt-10 text-center text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          No students available yet.
        </motion.p>
      ) : (
        <motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
          {students.map((person) => (
            <motion.article
              key={person.slug}
              className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Link href={`/people/staff/${encodeURIComponent(person.slug)}`} className="block text-center">
                <Image
                  src={person.image || "/people/Basic_avatar_image.png"}
                  alt={person.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto object-cover"
                />
                <h2 className="mt-4 text-lg font-semibold">{person.name}</h2>
                {person.title && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{person.title}</p>
                )}
              </Link>
            </motion.article>
          ))}
        </motion.div>
      )}
    </main>
  );
}
