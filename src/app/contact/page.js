"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo3 from '../../../public/media/Logos/Logo3.png';

export default function Contact() {
  const contacts = [
    {
      title: "",
      items: [
        { text: `Thank you for your interest in the Artificial Intelligence Research Institute (AIRI) at UTCN.
          We would love to hear from you! Whether you have a question about our research, events, or anything else,
          our team is ready to answer all your questions.
          With our appreciation, The AIRI Team at the Technical University from Cluj-Napoca`}
      ]
    },
    {
      title: "Contact Form",
      items: [
        { text: "Contact & Collaboration Interest Form", url: "https://forms.office.com/Pages/ResponsePage.aspx?id=-nnrpqnEzkyBjbhSdNFTBXfygrOv6LlPruqY6PJRcsFURDdWSVMxNVdRVjhNSEFQMVdXQ0UzNlo0Ti4u&origin=QRCode"}
      ]
    },
    /* {
      title: "E-mail",
      items: [
        { text: "E-mail", url: "mailto:exemplu@yahoo.com"}
      ]
    }, */
    {
      title: "Phone",
      items: [
        { text: "+40264202206"}
       
      ]
    },
  {
    title: "Address",
    items: [
      { text: "Artificial Intelligence Research Institute (AIRi)"},
      { text: "Technical University of Cluj-Napoca"},
      { text: "Observatorului 2, 400347, Cluj-Napoca, Romania"},
      { text: "📍 Find on Google Maps", url: "https://www.google.com/maps/place/Strada+Observatorului+2,+Cluj-Napoca+400347/@46.757063,23.5947728,19z/data=!4m15!1m8!3m7!1s0x47490c32b03140c1:0x437ed6aee538f132!2sStrada+Observatorului+2,+Cluj-Napoca+400347!3b1!8m2!3d46.757156!4d23.5966031!16s%2Fg%2F11h3jhh6s5!3m5!1s0x47490c32b03140c1:0x437ed6aee538f132!8m2!3d46.757156!4d23.5966031!16s%2Fg%2F11h3jhh6s5?entry=ttu&g_ep=EgoyMDI1MDIxNy4wIKXMDSoASAFQAw%3D%3D"}
    ]
  },
  {
    title: "LinkedIn",
    items: [
      { text: "LinkedIn Profile", url: "https://www.linkedin.com/school/universitatea-tehnica-din-cluj-napoca/posts/?feedView=all" }
    ]
  }

  ];

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="filter grayscale">📞</span>
        Contact Us
      </motion.h1>
      {contacts.map((section, index) => (
        <motion.section
          key={index}
          className={`p-5 ${index === 0 ? "bg-gray-100 text-blue-800 p-6 rounded-lg shadow-md" : ""}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
          <ul className="space-y-2">
            {section.items.map((item, idx) => (
               item.url ? ( 
                <motion.li
                  key={idx}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 hover:underline transition duration-300"
                  >
                    {item.text}
                  </a>
                </motion.li>
              ) : ( 
                <li key={idx} className="text-gray-700 ">{item.text}</li>
              )
            ))}
          </ul>
        </motion.section>
      ))}
    </main>
  );
}
