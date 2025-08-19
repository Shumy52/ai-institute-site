"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFlask, FaBook, FaProjectDiagram } from "react-icons/fa";

const submenus = [
    { id: "units", name: "Research Units", icon: FaFlask },
    { id: "projects", name: "Projects", icon: FaProjectDiagram },
    { id: "publications", name: "Publications", icon: FaBook },
];

const researchUnits = [
    {
        name: "Unit of Software and Hardware Technologies for AI",
        description:
            "Covers AI subfields such as Intelligent Agents, Machine Learning, Knowledge Engineering, Semantic Web, NLP, and Deep Learning-based Computer Vision.",
        icon: "💻",
        content: (
            <>
                <p>
                    Consists of laboratories covering key AI subfields including Intelligent Agents, Machine Learning, Knowledge Engineering and Reasoning, Semantic Web, Natural Language Processing, Deep Learning-based Computer Vision, Human-Machine Verbal Communication Technologies, and Data Science.
                </p>
                <p>
                    These laboratories develop innovative solutions for AI application challenges, data processing, and knowledge engineering while supporting research in telecommunications, software engineering, and commercialization.
                </p>
                <p>
                    Additionally, Hardware Technologies for AI includes labs dedicated to networks, communication protocols, cellular and wireless communications, sensor networks, as well as the design of analog/digital integrated circuits and digital systems.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Intelligent and Autonomous Systems",
        description:
            "Dedicated to the research and implementation of intelligent systems with autonomous capabilities.",
        icon: "🤖",
        content: (
            <>
                <p>
                    Focuses on the design and implementation of intelligent systems involving sensory perception, environmental representation, intelligent communications, control systems, distributed systems, and cyber-physical systems.
                </p>
                <p>
                    The laboratories also advance autonomous production, Industrial IoT (IIoT), connected mobility, and both industrial and medical robotics, bolstering innovation in IoT, cyber-physical systems, and social robotics.
                </p>
                <p>
                    Contributes to advanced manufacturing technologies and healthcare innovation through robotics.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Microelectronics",
        description:
            "Focuses on AI applications in integrated circuit design, rapid parameter analysis, and signal processing.",
        icon: "💡",
        content: (
            <>
                <p>
                    Concentrates on applying AI in designing integrated circuits and systems, including rapid determination of electro-thermal parameters and AI-assisted customized signal processing.
                </p>
                <p>
                    The unit also addresses AI-based yield analysis, post-Si verification, ASIC design and testing for intelligent sensors, and the development of methodologies for electromagnetic compatibility testing and standardization.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Intelligent Applications in Cybersecurity and Space",
        description:
            "Integrates AI benefits into cybersecurity defenses and civilian space applications.",
        icon: "🚀",
        content: (
            <>
                <p>
                    Focuses on developing intelligent cybersecurity solutions alongside the formulation of AI-powered applications for space exploration and civilian space uses.
                </p>
                <p>
                    Laboratories within this unit work on enhancing cybersecurity protocols and innovating in space application technologies.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Robotics and Industrial IoT (I-IoT)",
        description:
            "Explores autonomous robotics, production optimization, and digital twin simulations.",
        icon: "🏭",
        content: (
            <>
                <p>
                    Concentrates on the development of autonomous mobile and industrial robots, as well as the optimization of production planning and real-time quality control.
                </p>
                <p>
                    Also engages in virtual prototyping, product testing using Generative AI, real-time supply chain management, lifecycle optimization, and simulating manufacturing processes via AR/VR and digital twins.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Medical Technologies",
        description:
            "Advances medical procedures with robotics, AI diagnostics, and personalized healthcare.",
        icon: "⚕️",
        content: (
            <>
                <p>
                    Specializes in developing robots, mechanisms, and instruments to enhance the precision of medical procedures such as robotic surgery and precise instrument positioning.
                </p>
                <p>
                    Focuses on personalized oncological treatments, AI models for differential diagnosis, and the application of robotics in oral surgery, dental medicine, patient rehabilitation, and telemedicine.
                </p>
                <p>
                    The unit also incorporates laboratories dedicated to medical imaging, AI-based diagnostics, and bioinformatics, promoting non-invasive imaging and genetic analysis for early diagnosis and monitoring.
                </p>
            </>
        ),
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
    },
};

export default function ResearchClient() {
    const [activeTab, setActiveTab] = useState("units");
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handleUnitClick = (unit) => {
        setSelectedUnit(unit);
    };

    const resetUnit = () => {
        setSelectedUnit(null);
    };

    return (
        <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300 ">
            <div className="container max-w-5xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    {/* Sidebar Navigation */}
                    <nav className="bg-gray-100 dark:bg-gray-800 p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b pb-2">
                            Research Areas
                        </h2>
                        <ul className="space-y-3">
                            {submenus.map((submenu) => (
                                <li
                                    key={submenu.id}
                                    className={`flex items-center space-x-3 py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer ${
                                        activeTab === submenu.id
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    }`}
                                    onClick={() => setActiveTab(submenu.id)}
                                >
                                    <submenu.icon className="h-5 w-5" />
                                    <span>{submenu.name}</span>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Content Area */}
                    <section className="col-span-3 p-8">
                        {activeTab === "units" && !selectedUnit && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.h1
                                    variants={itemVariants}
                                    className="text-3xl font-extrabold text-blue-700 dark:text-yellow-400 mb-6"
                                >
                                    Research Units
                                </motion.h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {researchUnits.map((unit, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-200 dark:border-gray-700 cursor-pointer"
                                            onClick={() => handleUnitClick(unit)}
                                        >
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-3 mb-2">
                                                {unit.icon} {unit.name}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300">{unit.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "units" && selectedUnit && (
                            <motion.div
                                className="py-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-semibold text-blue-700">
                                        Research Units / {selectedUnit.name}
                                    </h2>
                                    <button
                                        onClick={resetUnit}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-gray-600">{selectedUnit.content}</div>
                            </motion.div>
                        )}

                        {activeTab === "projects" && (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                    Projects Content Coming Soon!
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-3">
                                    Stay tuned for exciting updates.
                                </p>
                            </motion.div>
                        )}

                        {activeTab === "publications" && (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                    Publications Content Coming Soon!
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-3">
                                    Check back later for our latest research publications.
                                </p>
                            </motion.div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
