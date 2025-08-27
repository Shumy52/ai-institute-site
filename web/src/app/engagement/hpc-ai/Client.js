"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Client() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <motion.div
        className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <section className="p-6 md:p-10 space-y-6">
          <motion.h1
            className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-yellow-400 tracking-tight text-center"
            variants={itemVariants}
          >
            🖥️⚡ HPC-AI services
          </motion.h1>

          <motion.p className="text-gray-700 dark:text-gray-300" variants={itemVariants}>
            UTCN has designed, within AIRi@UTCN, a computing infrastructure consisting of 32 GPU Node
            servers (each with 8 GPUs), along with control servers, storage, and networking equipment, arranged
            in up to 6 racks with cooling based on RDHx (Rear Door Heat Exchanger) and DLC (Direct Liquid
            Cooling).
          </motion.p>

          <motion.p className="text-gray-700 dark:text-gray-300" variants={itemVariants}>
            The operationalization of this infrastructure will be carried out gradually, depending on the current
            stage of AI development in the local ecosystem and the progressive maturity of AI-based systems
            developed at UTCN.
          </motion.p>

          <motion.h2
            className="text-xl md:text-2xl font-bold pt-4 text-gray-900 dark:text-gray-100"
            variants={itemVariants}
          >
            📊 Overview
          </motion.h2>

          <motion.div className="space-y-4" variants={itemVariants}>
            <p className="text-gray-700 dark:text-gray-300">
              Stage 1 is currently being implemented through the acquisition of the first 4 servers under the
              project “Romanian Artificial Intelligence Hub – HRIA,” part of the Smart Growth, Digitalization, and
              Financial Instruments Program 2021–2027 (PoCIDIF), funded by the European Regional Development
              Fund (ERDF), SMIS code: 334906.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Stage 2 aims to equip the computing center with an additional 8 servers.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By 2026, UTCN’s computing center will integrate an advanced 4-server architecture, with plans to
              expand by an additional 8 GPU servers, creating one of the most powerful AI research infrastructures
              in the region.
            </p>
          </motion.div>

          <motion.h2
            className="text-xl md:text-2xl font-bold pt-4 text-gray-900 dark:text-gray-100"
            variants={itemVariants}
          >
            🔑 Key Features of the Initial 4-Server Setup
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              title="High-Performance GPU Nodes with Liquid Cooling"
              body="Four GPU nodes, each equipped with cutting-edge accelerators and cooled using Direct Liquid Cooling (DLC) technology, ensure maximum efficiency and stability during the most demanding AI training workloads."
            />
            <FeatureCard
              title="Secure Access through a Dedicated Login Node"
              body="Researchers connect to the cluster via a secure login node. This setup enhances cybersecurity by isolating user access from the compute infrastructure and supports modern security measures such as multi-factor authentication and key-based SSH access."
            />
            <FeatureCard
              title="Smart Workload Management"
              body="A central controller node powered by Slurm scheduling software manages job queues, monitors resources, and optimizes task distribution across the cluster."
            />
            <FeatureCard
              title="Centralized System Administration"
              body="A dedicated management node ensures smooth operation of the infrastructure through orchestration services, telemetry sensors, and real-time health monitoring."
            />
            <FeatureCard
              title="Scalable Data Storage Platform"
              body="A high-performance, distributed file system enables seamless access to large datasets and can expand transparently with new storage nodes—critical for data-intensive AI projects."
            />
            <FeatureCard
              title="High-Speed Networking"
              body="With 400Gbps low-latency interconnects, the cluster provides the bandwidth required for advanced parallel computing."
            />
            <FeatureCard
              title="Efficient Cooling & Sustainable Operation"
              body="The system employs Rear Door Heat Exchangers (RDHX) and DLC technologies to remove heat efficiently. A Chiller unit with free cooling mode reduces energy use by leveraging outside air during colder seasons."
            />
            <FeatureCard
              title="Reliability through UPS Protection"
              body="An Uninterruptible Power Supply (UPS) safeguards sensitive equipment against power fluctuations and outages, ensuring continuity of long AI training sessions that may last days or weeks."
            />
          </div>

          <motion.h2
            className="text-xl md:text-2xl font-bold pt-4 text-gray-900 dark:text-gray-100"
            variants={itemVariants}
          >
            🔮 Looking Ahead
          </motion.h2>
          <motion.p className="text-gray-700 dark:text-gray-300" variants={itemVariants}>
            This modular architecture will be expanded with 8 additional GPU servers, boosting computing
            power and enabling larger, more complex AI models to be developed within the AIRi@UTCN ecosystem.
          </motion.p>
        </section>
      </motion.div>
    </main>
  );
}

function FeatureCard({ title, body }) {
  return (
    <motion.article
      variants={itemVariants}
      className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-1 h-9 w-9 rounded-lg ring-1 ring-gray-200 dark:ring-white/10 bg-gradient-to-br from-indigo-200 to-sky-200 dark:from-indigo-700/40 dark:to-sky-700/40 grid place-items-center">
          <span className="text-base">⚡</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{body}</p>
        </div>
      </div>
    </motion.article>
  );
}
