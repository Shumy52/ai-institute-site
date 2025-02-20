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
  }
];

export default function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <>
      <Head>
        <title>ICIA - Media</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg">
        <motion.h1
          className="text-4xl font-extrabold text-center mb-8 text-blue-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          📸 ICIA Media Gallery
        </motion.h1>
        <p className="mb-4 text-center">
          Explore images and videos showcasing the progress of the ICIA Institute
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mediaItems.map((item, index) => (
            <motion.div
              key={index}
              className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              onClick={() => setSelectedMedia(item)}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover object-center rounded-lg"
                />
              ) : (
                <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center text-blue-600">
                  🎥 Video: {item.title}
                </div>
              )}
            </motion.div>
          ))}
        </div>

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
                className="bg-white p-4 rounded-lg max-w-3xl w-full relative"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-lg text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedMedia(null)}
                >
                  ✖
                </button>
                {selectedMedia.type === "image" ? (
                  <Image
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                ) : (
                  <iframe
                    width="100%"
                    height="400"
                    src={selectedMedia.src}
                    title={selectedMedia.title}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                <p className="mt-2 text-center font-semibold text-[#01274a]">
                  {selectedMedia.title}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://ro.linkedin.com/school/universitatea-tehnica-din-cluj-napoca/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08 0-1.15.92-2.08 2.06-2.08 1.14 0 2.06.93 2.06 2.08 0 1.15-.92 2.08-2.06 2.08zm15.11 12.87h-3.56v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.68h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24z" />
                {/* I honestly stole the code from somewhere. This actually draws the linked in logo, it's not something "imported" so to speak. This is why it's so freaking long. (that's what she said) */}
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@universitateatehnicadinclu9191"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M23.498 6.186a2.97 2.97 0 0 0-2.092-2.092C19.622 3.5 12 3.5 12 3.5s-7.622 0-9.406.594a2.97 2.97 0 0 0-2.092 2.092C0 7.97 0 12 0 12s0 4.03.502 5.814a2.97 2.97 0 0 0 2.092 2.092C4.378 20.5 12 20.5 12 20.5s7.622 0 9.406-.594a2.97 2.97 0 0 0 2.092-2.092C24 16.03 24 12 24 12s0-4.03-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
