"use client";
// Rendered on client side, enables use of browser-specific stuff.
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBuilding, FaFirefox, FaUserTie } from "react-icons/fa";
import Head from "next/head";

export default function TimelinePage() {
    const events = [
        {
            date: "2022",
            title: "This was all made statically",
            description: "Let me know how we should we be able to add to this list",
            icon: <FaBuilding />,
        },
        {
            date: "2022",
            title: "Shumy is now a director",
            description: "Hooray",
            icon: <FaUserTie />,
        },
        {
            date: "2021",
            title: "A PC Blew Up",
            description: "Kaboom.",
            icon: <FaFirefox />,
        },
        {
            date: "2018",
            title: "I don't know",
            description: "Send More Money.",
            icon: <FaBuilding />,
        },
    ];

    return (
        <>
            <Head>
                <title>ICIA - Timeline</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.2.0/css/solid.min.css" integrity="sha512-3Xlq6/m1pc+8T7pBp1bEiXqkePXleQYqwrOJYUd9QObFM2jktAZdjFAJZDNS13kG8j9/+u5PhEzhFREtTAcozg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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