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
      <main className="max-w-4xl mx-auto p-6 bg-gray-1000 text-white rounded-lg shadow-lg">
        <motion.h1
          className="text-4xl font-extrabold text-center mb-8 text-blue-400"
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
                <div className="relative w-full aspect-video bg-black flex items-center justify-center text-blue-300">
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
        <p className="mt-6 text-center text-sm text-gray-400">
          Note: Videos from Youtube will not work here, security reasons
        </p>
      </main>
    </>
  );
}
