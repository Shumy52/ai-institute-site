"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Head from "next/head";

const mediaItems = [
  {
    type: "image",
    src: "/media/Construction1.png",
    alt: "ICIA Construction Site",
    title: "Construction Progress",
  },
  {
    type: "image",
    src: "/media/Construction2.png",
    alt: "ICIA Research Team",
    title: "Research Team at Work",
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    alt: "ICIA Presentation",
    title: "ICIA Institute Presentation",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <>
      <Head>
        <title>ICIA - Media</title>
      </Head>
      <main className="flex flex-col items-center justify-center  bg-gray-100 py-12">
        <motion.div
          className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="px-8 py-12">
            <motion.h1
              className="text-5xl font-extrabold text-center text-blue-700 mb-6"
              variants={itemVariants}
            >
              <span className="inline-block mr-2">📸</span> ICIA Media Gallery
            </motion.h1>
            <motion.p
              className="text-lg text-center text-gray-700 mb-10"
              variants={itemVariants}
            >
              Explore images and videos showcasing the progress of the ICIA
              Institute.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {mediaItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  variants={itemVariants}
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        🎥 {item.title}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="bg-gray-50 px-4 py-6">
            <motion.div
              className="flex justify-center space-x-6"
              variants={itemVariants}
            >
              <a
                href="https://ro.linkedin.com/school/universitatea-tehnica-din-cluj-napoca/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08 0-1.15.92-2.08 2.06-2.08 1.14 0 2.06.93 2.06 2.08 0 1.15-.92 2.08-2.06 2.08zm15.11 12.87h-3.56v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.68h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@universitateatehnicadinclu9191"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M23.498 6.186a2.97 2.97 0 0 0-2.092-2.092C19.622 3.5 12 3.5 12 3.5s-7.622 0-9.406.594a2.97 2.97 0 0 0-2.092 2.092C0 7.97 0 12 0 12s0 4.03.502 5.814a2.97 2.97 0 0 0 2.092 2.092C4.378 20.5 12 20.5 12 20.5s7.622 0 9.406-.594a2.97 2.97 0 0 0 2.092-2.092C24 16.03 24 12 24 12s0-4.03-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMedia(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white p-6 rounded-3xl max-w-4xl w-full relative"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  onClick={() => setSelectedMedia(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {selectedMedia.type === "image" ? (
                  <Image
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover object-center rounded-2xl"
                  />
                ) : (
                  <iframe
                    width="100%"
                    height="600"
                    src={selectedMedia.src}
                    title={selectedMedia.title}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-2xl"
                  ></iframe>
                )}
                <p className="mt-4 text-center font-semibold text-blue-800 text-lg">
                  {selectedMedia.title}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
