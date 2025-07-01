"use client";
import { motion } from "framer-motion";

export default function NewsClient() {
  const mediaLinks = [
    {
      title: "Major Announcements",
      items: [
        { text: "Project Launch", url: "https://www.vasiletopa.ro/proiecte/demararea-lucrarilor-de-proiectare-si-executie-pentru-institutul-de-inteligenta-artificiala" },
        { text: "Official Start of the Institute", url: "https://www.linkedin.com/posts/universitatea-tehnica-din-cluj-napoca_weareutcn-artificialintelligenceresearchinstitute-activity-7201526374799405056-Oa_o" },
        { text: "ICIA Inauguration", url: "https://www.linkedin.com/posts/universitatea-tehnica-din-cluj-napoca_universitatea-tehnic%C4%83-din-cluj-napoca-anun%C8%9B%C4%83-activity-7199829141624373248-GB44" }
      ]
    },
    {
      title: "Construction Updates",
      items: [
        { text: "Drone Footage & Progress Reports", url: "https://www.soletanche-bachy.com/roumanie-le-premier-institut-dedie-a-la-recherche-sur-lintelligence-artificielle-est-en-construction/" },
        { text: "ICIA Construction Update 1", url: "https://www.linkedin.com/posts/sdc-proiect_structuralengineering-engineering-piles-activity-7241440282435604480-Yljm" },
        { text: "ICIA Construction Update 2", url: "https://www.linkedin.com/posts/sdc-proiect_structuralengineering-engineering-piles-activity-7213830649479065600-eI-e" },
        { text: "Latest Site Photos (January 17, 2025)", url: "https://zcj.ro/economie/cum-arata-santierul-institutului-de-cercetare-in-inteligenta-artificiala-din-cluj-napoca-e-primul-din-romania--274626.html" }
      ]
    },
  {
    title: "Event Videos & Visits",
    items: [
      { text: "Groundbreaking Ceremony Video", url: "https://www.linkedin.com/posts/kesz-romania_kaezszromania-stonelayingceremony-project-activity-7206606723040608256-_n4_" },
      { text: "Best Construction Progress Video", url: "https://www.linkedin.com/posts/kesz-romania_the-construction-work-of-the-artificial-intelligence-activity-7211671006652841984-8bA2" },
      { text: "Prime Minister Marcel Ciolacu’s Visit", url: "https://www.linkedin.com/posts/kesz-romania_kaezszromania-project-artificialintelligenceresearchinstitute-activity-7244698737023799296-m2ZK" },
      { text: "Ligia Deca’s Visit", url: "https://www.linkedin.com/feed/update/urn:li:activity:7249391606162706433" }
    ]
  },
  {
    title: "Architectural & Development Contributions",
    items: [
      { text: "Architectural Design by Arhimar", url: "https://www.linkedin.com/posts/arhimar_arhimar-airesearch-clujnapoca-activity-7257280386357993474-R5_P" },
      { text: "Scientific Director of Research, Puskas Attila", url: "https://www.linkedin.com/posts/kesz-romania_kaezszromania-stonelayingceremony-project-activity-7199756314938392582-cM7B" }
    ]
  }

  ];

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg transition-colors duration-300 ">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        📢 ICIA News & Updates
      </motion.h1>
      {mediaLinks.map((section, index) => (
        <motion.section
          key={index}
          className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-yellow-600 dark:text-yellow-400">{section.title}</h2>
          <ul className="space-y-2">
            {section.items.map((item, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-amber-700 hover:text-yellow-500 dark:hover:text-amber-600 hover:underline transition duration-300"
                >
                  {item.text}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      ))}
    </main>
  );
}