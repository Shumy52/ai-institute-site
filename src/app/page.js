"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// List of images to cycle through
const images = [
  "/media/AI stuff/AI1.png",
  "/media/AI stuff/AI2.png",
  "/media/AI stuff/AI3.png",
  "/media/AI stuff/AI4.png"
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fromLeft, setFromLeft] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setFromLeft((prev) => !prev); // Toggle direction each time
    }, 3000); // Change image every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-4xl font-bold"
      >
        Welcome to the AI Institute
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5 }}
        className="mt-4 text-lg"
      >
        Advancing artificial intelligence research in Romania.
      </motion.p>

      {/* Animated Images Sliding Past Above and Below Title */}
      <AnimatePresence mode="wait">
        {/* Image above title (left to right) */}
        <motion.img
          key={`top-${index}`}
          src={images[index]}
          className="absolute top-[20%] w-[300px] h-[200px] object-cover rounded-xl shadow-lg"
          initial={{ x: fromLeft ? "-100vw" : "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: fromLeft ? "100vw" : "-100vw", opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Image below title (right to left) */}
        <motion.img
          key={`bottom-${index}`}
          src={images[(index + 1) % images.length]} // Show a different image
          className="absolute bottom-[20%] w-[300px] h-[200px] object-cover rounded-xl shadow-lg"
          initial={{ x: fromLeft ? "100vw" : "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: fromLeft ? "-100vw" : "100vw", opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </main>
  );
}
