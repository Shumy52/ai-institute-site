"use client";

import { motion } from "framer-motion";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ContactClient() {
  const email = "AIRI@campus.utcluj.ro";

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-950 text-black dark:text-white rounded-lg shadow-lg transition-colors duration-300">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-8 text-blue-600 dark:text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        📞 Contact Us
      </motion.h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-600 dark:text-yellow-400">Get in Touch</h2>
        <p className="text-gray-800 dark:text-gray-200 mb-4">
          We would love to hear from you! Whether you have a question about our research, events, or anything else, our team is ready to answer all your questions.
        </p>
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-6">
            <motion.div
              className="flex justify-center space-x-6"
              variants={itemVariants}
            >
              <a
                href="https://www.linkedin.com/company/109110973/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08 0-1.15.92-2.08 2.06-2.08 1.14 0 2.06.93 2.06 2.08 0 1.15-.92 2.08-2.06 2.08zm15.11 12.87h-3.56v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.68h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@universitateatehnicadinclu9191"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M23.498 6.186a2.97 2.97 0 0 0-2.092-2.092C19.622 3.5 12 3.5 12 3.5s-7.622 0-9.406.594a2.97 2.97 0 0 0-2.092 2.092C0 7.97 0 12 0 12s0 4.03.502 5.814a2.97 2.97 0 0 0 2.092 2.092C4.378 20.5 12 20.5 12 20.5s7.622 0 9.406-.594a2.97 2.97 0 0 0 2.092-2.092C24 16.03 24 12 24 12s0-4.03-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
              <a
                href={`mailto:${email}`}
                className="relative group text-blue-700 hover:text-blue-900 transition-colors duration-200"
                aria-label={`Send email to ${email}`}
              >
                {/* Show email on hover */}
                <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded px-2 py-1 dark:bg-gray-200 dark:text-gray-900">
                  {email}
                </span> 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2zM4 8l8 5 8-5v2l-8 5-8-5V8z" />
                </svg>
              </a>
            </motion.div>
          </div>
        {/* small spacer between icons and next content */}
        <div className="h-6" aria-hidden="true" />
        
        <h2 className="text-2xl font-semibold mb-4 text-yellow-600 dark:text-yellow-400">Contact Form</h2>
        <div style={{ overflow: 'hidden', height: '450px' }}>
          <iframe
            src="https://forms.office.com/Pages/ResponsePage.aspx?id=-nnrpqnEzkyBjbhSdNFTBXfygrOv6LlPruqY6PJRcsFURDdWSVMxNVdRVjhNSEFQMVdXQ0UzNlo0Ti4u&origin=QRCode"
            width="100%"
            height="500px"
            style={{ marginTop: '-50px' }}
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Contact Us Form"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-yellow-600 dark:text-yellow-400">Our Location</h2>
        <p className="text-gray-800 dark:text-gray-200 mb-4">
          Adresa: Strada Observatorului 2, Cluj-Napoca 400347, Romania
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1366.6963107204735!2d23.595919670551666!3d46.757156971379665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490c32b03140c1%3A0x437ed6aee538f132!2sStrada%20Observatorului%202%2C%20Cluj-Napoca%20400347!5e0!3m2!1sen!2sro!4v1740037763187!5m2!1sen!2sro"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </main>
  );
}