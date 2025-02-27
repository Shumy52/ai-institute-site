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
        description: "Focuses on AI subfields like Machine Learning, NLP, and Computer Vision.",
        icon: "💻",
        content: (
            <>
                <p>
                    Consists of laboratories covering key subfields of artificial
                    intelligence, including Intelligent Agents, Machine Learning,
                    Knowledge Engineering and Reasoning, Semantic Web, Natural Language
                    Processing, Deep Learning-based Computer Vision, Human-Machine Verbal
                    Communication Technologies, and Data Science.
                </p>
                <p>
                    These laboratories conduct research and develop solutions for various
                    challenges in AI application development and intelligent systems.
                </p>
                <p>
                    Hardware Technologies for AI includes laboratories dedicated to networks,
                    communication protocols, integrated circuits, and sensor design.
                </p>
                <p>
                    Contributes to innovation in IoT, Cyber-physical systems, Cybersecurity,
                    Cloud computing, and more.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Intelligent and Autonomous Systems",
        description: "Dedicated to intelligent systems with autonomous capabilities.",
        icon: "🤖",
        content: (
            <>
                <p>
                    Focuses on research, design, and implementation of intelligent systems,
                    components, and applications with autonomous capabilities.
                </p>
                <p>
                    Specialized laboratories develop solutions for autonomous systems across
                    various sectors.
                </p>
                <p>
                    Contributes to innovation in IoT, Cyber-physical systems, Autonomous
                    mobility, and Social robotics.
                </p>
                <p>
                    Also contributes to Advanced Manufacturing Technologies and Healthcare
                    through robotics innovation.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Microelectronics",
        description: "Focuses on AI applications in the design of integrated circuits and systems",
        icon: "💡",
        content: (
            <>
                <p>
                    Focuses on AI applications in the design of integrated circuits and
                    systems.
                </p>
                <p>
                    Includes rapid determination of electro-thermal parameters, AI-assisted
                    signal processing, and AI-based yield analysis.
                </p>
                <p>
                    Also focuses on ASIC design and testing for intelligent sensors and
                    developing AI-based methodologies for testing and standardization in
                    electromagnetic compatibility.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Intelligent Applications in Cybersecurity and Space",
        description: "Integrates AI benefits into cybersecurity and space applications.",
        icon: "🚀",
        content: (
            <>
                <p>
                    Integrates AI benefits into cybersecurity and space applications by
                    developing intelligent solutions for cybersecurity protection and civilian
                    space applications.
                </p>
                <p>Includes laboratories focused on intelligent cybersecurity.</p>
                <p>Includes laboratories focused on intelligent space applications.</p>
            </>
        ),
    },
    {
        name: "Unit of Robotics and Industrial IoT (I-IoT)",
        description: "Focuses on autonomous mobile robots, production planning, and real-time quality control.",
        icon: "🏭",
        content: (
            <>
                <p>
                    Focuses on the development of autonomous mobile robots and industrial
                    robots.
                </p>
                <p>
                    Includes optimization of production planning, real-time quality control,
                    and supply chain management.
                </p>
                <p>
                    Also focuses on simulation and optimization of manufacturing processes
                    using AR/VR solutions.
                </p>
            </>
        ),
    },
    {
        name: "Unit of Medical Technologies",
        description: "Focuses on increasing the precision of medical procedures.",
        icon: "⚕️",
        content: (
            <>
                <p>
                    Focuses on the development of robots, mechanisms, and instruments to
                    increase the precision of medical procedures.
                </p>
                <p>
                    Includes personalized oncological treatments, AI models for differential
                    diagnosis, and the application of AI and robotics in oral surgery and
                    dental medicine.
                </p>
                <p>
                    Also includes dedicated laboratories for medical imaging, AI-based
                    diagnostics, and bioinformatics.
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

export default function ResearchPage() {
    const [activeTab, setActiveTab] = useState("units");
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handleUnitClick = (unit) => {
        setSelectedUnit(unit);
    };

    const resetUnit = () => {
        setSelectedUnit(null);
    };

    return (
        <main className="flex flex-col items-center justify-center bg-gray-50 py-12">
            <div className="container max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    {/* Sidebar Navigation */}
                    <nav className="bg-gray-100 p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                            Research Areas
                        </h2>
                        <ul className="space-y-3">
                            {submenus.map((submenu) => (
                                <li
                                    key={submenu.id}
                                    className={`flex items-center space-x-3 py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer ${
                                        activeTab === submenu.id
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "text-gray-700 hover:bg-gray-200"
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
                                    className="text-3xl font-extrabold text-blue-700 mb-6"
                                >
                                    Research Units
                                </motion.h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {researchUnits.map((unit, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-200 cursor-pointer"
                                            onClick={() => handleUnitClick(unit)}
                                        >
                                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3 mb-2">
                                                {unit.icon} {unit.name}
                                            </h2>
                                            <p className="text-gray-600">{unit.description}</p>
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
                                <h2 className="text-2xl font-semibold text-gray-700">
                                    Projects Content Coming Soon!
                                </h2>
                                <p className="text-gray-500 mt-3">
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
                                <h2 className="text-2xl font-semibold text-gray-700">
                                    Publications Content Coming Soon!
                                </h2>
                                <p className="text-gray-500 mt-3">
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
