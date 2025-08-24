"use client";

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBuilding, FaUserFriends, FaMicrochip } from "react-icons/fa";

const EVENTS = [
  {
    date: "2023-01-15",
    title: "Announcement of AI Institute at UTCN",
    description:
      "The Technical University of Cluj-Napoca announced plans to establish a dedicated Artificial Intelligence Institute to foster research and innovation in AI technologies.",
    icon: <FaBuilding />,
  },
  {
    date: "2023-06-10",
    title: "Groundbreaking Ceremony",
    description:
      "Official groundbreaking ceremony for the construction of the AI Institute building, attended by university officials and local dignitaries.",
    icon: <FaUserFriends />,
  },
  {
    date: "2024-09-01",
    title: "Completion of Construction",
    description:
      "The construction of the AI Institute's state-of-the-art facility was completed, featuring modern laboratories and collaborative spaces.",
    icon: <FaBuilding />,
  },
  {
    date: "2024-10-15",
    title: "Inaugural AI Symposium",
    description:
      "The institute hosted its first symposium, bringing together AI researchers, industry experts, and students to discuss the latest advancements in AI.",
    icon: <FaMicrochip />,
  },
  {
    date: "2025-08-20",
    title: "Current Building Progress",
    description: (
      <>
        Stay updated with the current building progress of the AI Institute.
        <br />
        Watch live through our webcam:
        <br />
        <a
          href="http://webcam.obs.utcluj.ro/"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "underline" }}
        >
          http://webcam.obs.utcluj.ro/
        </a>
      </>
    ),
    icon: <FaBuilding />,
  },
];

export default function HistorySection({ items = EVENTS }) {
  return (
    <>
      <VerticalTimeline lineColor="var(--icia-line)">
        {items.map((ev) => (
          <VerticalTimelineElement
            key={`${ev.title}-${ev.date}`}
            date={ev.date}
            dateClassName="timeline-date"
            icon={ev.icon}
            iconStyle={{
              background: "#dc2626",
              color: "#ffffff",
              boxShadow: "0 0 0 6px #ffffff, inset 0 0 0 2px #111827",
            }}
            contentStyle={{
              background: "var(--icia-card-bg)",
              color: "var(--icia-card-text)",
              border: "1px solid var(--icia-card-border)",
              borderRadius: "10px",
              boxShadow: "0 2px 0 rgba(203,213,225,1), 0 10px 40px rgba(0,0,0,.08)",
              padding: "22px",
            }}
            contentArrowStyle={{ borderRight: "7px solid var(--icia-card-border)" }}
          >
            <h3
              style={{
                marginBottom: "8px",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--icia-card-text)",
              }}
            >
              {ev.title}
            </h3>
            <div style={{ margin: 0, color: "var(--icia-card-text)", opacity: 0.9, lineHeight: 1.6 }}>
              {ev.description}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      <style jsx global>{`
        .icia-wrapper .vertical-timeline-element-date,
        .icia-wrapper .timeline-date {
          color: var(--icia-date) !important;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
