"use client";
// Rendered on client side, enables use of browser-specific stuff.
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBuilding, FaFirefox, FaUserTie } from "react-icons/fa";
import Head from "next/head";

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
            <div className="p-10">
                <h1 className="text-4xl font-bold text-center mb-8">Timeline</h1>
                <VerticalTimeline>
                    {events.map((event, index) => (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: "#f3f4f6", color: "#000" }}
                            contentArrowStyle={{ borderRight: "7px solid #f3f4f6" }}
                            date={event.date}
                            dateClassName="text-blue-600 font-semibold"
                            iconStyle={{ background: "#e63946", color: "#fff" }}
                            icon={event.icon}
                        >
                            <h3 className="text-xl font-bold">{event.title}</h3>
                            <p>{event.description}</p>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </>
    );
}

// For some reason, when using "use client", you can't export metadata
// there has to be a technical reason, I'll get it soon enough
// export const metadata = {
//     title: "ICIA - Timeline",
//   };

// For the moment I can't set the title properly: TODO: