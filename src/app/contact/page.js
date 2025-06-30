"use client";

import { motion } from "framer-motion";
import Head from "next/head";

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

export default function Contact() {
    return (
        <>
            <Head>
                <title>ICIA - Contact Us</title>
            </Head>
            <main className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg transition-colors duration-300">
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
                    <div style={{ overflow: 'hidden', height: '450px' }}>
                        <iframe
                            src="https://forms.office.com/Pages/ResponsePage.aspx?id=-nnrpqnEzkyBjbhSdNFTBXfygrOv6LlPruqY6PJRcsFURDdWSVMxNVdRVjhNSEFQMVdXQ0UzNlo0Ti4u&origin=QRCode"
                            width="100%"
                            height="500px"
                            style={{ marginTop: '-50px', background: 'transparent' }}
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
                        style={{ border: 0, background: 'transparent' }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </section>
            </main>
        </>
    );
}
