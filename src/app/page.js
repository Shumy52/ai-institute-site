"use client";
import { motion } from "framer-motion";

export default function Home() {
  const text = "We are dedicated to advancing AI technology through cutting-edge research and collaboration.";

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[500px] bg-gray-200">
        <img
          src="/hero.png"
          alt="AI Research"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-center">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to the AI Institute
          </motion.h1>
          <motion.p
            className="mt-4 text-xl max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Leading research and innovation in artificial intelligence.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800">About us</h2>
        <motion.p
          className="text-gray-800 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          {text.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3 }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.p>
      </section>
    </main>
  );
}
