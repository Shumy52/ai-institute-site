"use client";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBuilding, FaFirefox, FaUserTie } from "react-icons/fa";
import Head from "next/head";
import { motion } from "framer-motion";

export default function TimelinePage() {
    const events = [
        {
            date: "2023-01-15",
            title: "Announcement of AI Institute at UTCN",
            description: "The Technical University of Cluj-Napoca announced plans to establish a dedicated Artificial Intelligence Institute to foster research and innovation in AI technologies.",
            icon: <FaBuilding />,
        },
        {
            date: "2023-06-10",
            title: "Groundbreaking Ceremony",
            description: "Official groundbreaking ceremony for the construction of the AI Institute building, attended by university officials and local dignitaries.",
            icon: <FaUserTie />,
        },
        {
            date: "2024-09-01",
            title: "Completion of Construction",
            description: "The construction of the AI Institute's state-of-the-art facility was completed, featuring modern laboratories and collaborative spaces.",
            icon: <FaBuilding />,
        },
        {
            date: "2024-10-15",
            title: "Inaugural AI Symposium",
            description: "The institute hosted its first symposium, bringing together AI researchers, industry experts, and students to discuss the latest advancements in artificial intelligence.",
            icon: <FaFirefox />,
        },
        {
            date: "2025-02-18",
            title: "Launch of AI Research Programs",
            description: "The AI Institute officially launched its research programs, focusing on machine learning, robotics, and data science, aiming to contribute to both academic knowledge and practical applications.",
            icon: <FaUserTie />,
        },
    ];

    return (
        <>
            <Head>
                <title>ICIA - Timeline</title>
            </Head>
            <main className="max-w-4xl mx-auto p-6 bg-gray-1000 text-white rounded-lg shadow-lg">
                <motion.h1
                    className="text-4xl font-extrabold text-center mb-8 text-blue-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    📅 ICIA Timeline
                </motion.h1>
                <VerticalTimeline>
                    {events.map((event, index) => (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: "#1f2937", color: "#fff" }}
                            contentArrowStyle={{ borderRight: "7px solid #1f2937" }}
                            date={event.date}
                            dateClassName="text-blue-400 font-semibold"
                            iconStyle={{ background: "#e63946", color: "#fff" }}
                            icon={event.icon}
                        >
                            <motion.h3
                                className="text-xl font-bold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                {event.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                {event.description}
                            </motion.p>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </main>
        </>
    );
}