// filepath: /home/Shumy/Projects/ai-institute-site/src/app/contact/page.js
"use client";

import { motion } from "framer-motion";
import Head from "next/head";

export default function Contact() {
    return (
        <>
            <Head>
                <title>ICIA - Contact Us</title>
            </Head>
            <main className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg">
                <motion.h1
                    className="text-4xl font-extrabold text-center mb-8 text-blue-600"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    📞 Contact Us
                </motion.h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Get in Touch</h2>
                    <p className="text-gray-800 mb-4">
                        We would love to hear from you! Whether you have a question about our research, events, or anything else, our team is ready to answer all your questions.
                    </p>
                    <iframe
                        src="https://forms.office.com/Pages/ResponsePage.aspx?id=-nnrpqnEzkyBjbhSdNFTBXfygrOv6LlPruqY6PJRcsFURDdWSVMxNVdRVjhNSEFQMVdXQ0UzNlo0Ti4u&origin=QRCode"
                        width="100%"
                        height="500"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        title="Contact Us Form"
                        allowFullScreen
                    ></iframe>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Our Location</h2>
                    <p className="text-gray-800 mb-4">
                        Adresa: Observatorului 2, Cluj-Napoca, 400489, Cluj-Napoca, Romania
                    </p>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.567015612309!2d23.58383631560941!3d46.76937997913765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490c2a6e4b8f4b%3A0x2e2b1b1e1e1e1e1e!2sObservatorului%202%2C%20Cluj-Napoca%20400489%2C%20Romania!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </section>
            </main>
        </>
    );
}