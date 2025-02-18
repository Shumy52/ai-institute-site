"use client";
import { motion } from "framer-motion";

export default function Home() {
  const text = "The Artificial Intelligence Research Institute (AIRi) within the Technical University of Cluj-Napoca assumes a catalytic role in advancing research, innovation, and exploration in the field of artificial intelligence. AIRi contributes to the development of an ecosystem of excellence that generates a significant impact on society, the economy, and the academic environment. By integrating expertise from various constituent departments, ICIA aims to surpass individual results by promoting interdisciplinary collaboration, knowledge transfer, and the implementation of AI-based solutions in key sectors such as healthcare, industry, energy, or education. ICIA will also serve as a space for interaction between researchers, as well as between AI and human intelligence.";

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[600px]">
        <img
          src="/hero3.png"
          alt="AI Research"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
      </section>

      {/* Content Section */}
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800">About us</h2>
        <p className="text-gray-800 mt-2">
          {text}
        </p>
        <div className="mt-8">
          <a
            href="http://webcam.obs.utcluj.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Live Construction Site Camera
          </a>
        </div>
      </section>
    </main>
  );
}
