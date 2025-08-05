"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const staffCategories = [
  "Scientific Staff",
  "Adjunct Scientists",
  "Associated Units' Personal",
  "PHD Students",
  "Master Students",
  "Engineers",
  "Administrative Staff",
  "IT Staff",
  "Content & Communications Staff",
  "Maintenance Staff",
];

const staffData = {
  "Scientific Staff": [
    {
      name: "Prenume Nume",
      title: "Titlu",
      phone: "0744444444",
      email: "Nume.Prenume@ex.com",
      image: "/people/Basic_avatar_image.png",
    },
  ],
};

export default function StaffClient() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        👥 Staff & Students
      </motion.h1>

      <p className="text-gray-800 dark:text-gray-200 mb-6">
        Meet the administrative and support staff who ensure the smooth operation of our institute.
      </p>

      <div className="space-y-6">
        {staffCategories.map((category) => (
          <div key={category}>
            <motion.button
              onClick={() => {
                setSelectedCategory(selectedCategory === category ? null : category);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-lg font-semibold ${
                selectedCategory === category
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-gray-100 dark:bg-gray-800"
              } text-blue-700 dark:text-blue-400 py-3 rounded border border-gray-300 dark:border-gray-600 transition`}
            >
              {category.toUpperCase()}
            </motion.button>

            {selectedCategory === category && staffData[category] && (
              <section className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {staffData[category].map((person, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow text-center"
                    >
                      <div className="w-32 h-32 mx-auto mb-4 relative rounded overflow-hidden">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">
                        {person.name}
                      </h3>
                      <p className="text-sm">{person.title}</p>
                      {person.phone && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Phone Ext. {person.phone}
                        </p>
                      )}
                      <p className="text-sm italic">{person.email}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
