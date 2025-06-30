"use client";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBuilding, FaFirefox, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TimelineClient() {
    const today = new Date().toISOString().split('T')[0];
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
            date: today,
            title: "Current Building Progress",
            description: (
                <>
                    Stay updated with the current building progress of the AI Institute.<br></br> Watch live through our webcam:{" "} <br></br>
                    <a href="http://webcam.obs.utcluj.ro/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        http://webcam.obs.utcluj.ro/
                    </a>
                </>
            ),
            icon: <FaBuilding />,
        },
    ];
      
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsDark(document.documentElement.classList.contains("dark"));
            const observer = new MutationObserver(() => {
                setIsDark(document.documentElement.classList.contains("dark"));
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
            return () => observer.disconnect();
        }
    }, []);

    return (
        <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg transition-colors duration-300">
            <motion.h1
                className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
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
                        contentStyle={{ background: isDark ? "#1a202c" : "#f3f4f6", color: isDark ? "#fff" : "#000" }}
                        contentArrowStyle={{ borderRight: isDark ? "7px solid #1a202c" : "7px solid #f3f4f6" }}
                        date={event.date}
                        dateClassName="text-blue-600 dark:text-yellow-400 font-semibold"
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
    );
}