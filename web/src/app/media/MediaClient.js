"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  EmailIcon,
} from "next-share";

const mediaItems = [
  {
    type: "image",
    src: "/media/Construction1.png",
    alt: "ICIA Construction Site",
    title: "Construction Progress",
  },
  {
    type: "image",
    src: "/media/Construction2.png",
    alt: "ICIA Research Team",
    title: "Research Team at Work",
  },
  // Easter egg
  // {
  //   type: "video",
  //   src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   alt: "ICIA Presentation",
  //   title: "ICIA Institute Presentation",
  // },
  // TESTING
  {
    type: "pdf",
    src: "/media/Brosura Prezentare ICIA.pdf",
    alt: "ICIA Document",
    title: "Presentation brochure",
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
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function MediaClient() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  // If the code is running in the browser (window is defined), it uses the current page URL (window.location.href).
  // If not (like during server-side rendering), it falls back to "localhost:3000".
  const shareUrl = typeof window !== "undefined" ? window.location.href : "localhost:3000"; 
  
  // This sets the title for sharing (from the social buttons)
  const title = selectedMedia ? selectedMedia.title : "ICIA Media"; 

  return (
    <>
      <Head>
        <title>ICIA - Media</title>
      </Head>
      <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
        <motion.div
          className="max-w-5xl mx-auto bg-white dark:bg-gray-950 rounded-3xl shadow-xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="px-8 py-12">
            <motion.h1
              className="text-5xl font-extrabold text-center text-blue-700 dark:text-yellow-400 mb-6"
              variants={itemVariants}
            >
              ICIA Media Gallery
            </motion.h1>
            <motion.p
              className="text-lg text-center text-gray-700 dark:text-gray-200 mb-10"
              variants={itemVariants}
            >
              Explore images and videos showcasing the progress of the ICIA
              Institute.
            </motion.p>

            {/* Part responsible to the animation of the images on page load (upwards & fade-in) */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {/* Mapping over the items from the start of the page, easier to edit */}
              {mediaItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  variants={itemVariants}
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={400}
                      unoptimized
                      className="w-full h-full object-cover object-center"
                    />
                  ) : item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.alt}
                      width={600}
                      height={400}
                      unoptimized
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {item.title}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Animating the images when they're selected */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedMedia(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* The actual white rectangle with the image, after clicking an item */}
              <motion.div
                className="bg-white dark:bg-gray-900 p-6 rounded-3xl max-w-6xl w-full relative"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* The X button, but clicking outside the image will also work. */}
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  onClick={() => setSelectedMedia(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {selectedMedia.type === "image" ? (
                  <>
                    <Image
                      src={selectedMedia.src}
                      alt={selectedMedia.alt}
                      width={1920}
                      height={1080}
                      unoptimized
                      className="w-full h-full object-cover object-center rounded-2xl"
                    />
                    {/* <div className="absolute bottom-4 right-4 flex space-x-2"> */}
                    <div className="flex justify-center mt-4 space-x-2">
                      <FacebookShareButton
                        url={shareUrl}
                        title={title}
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={shareUrl}
                        title={title}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <LinkedinShareButton
                        url={shareUrl}
                        title={title}
                      >
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                      <PinterestShareButton
                        url={shareUrl}
                        title={title}
                        media={`${shareUrl}${selectedMedia.src}`}
                      >
                        <PinterestIcon size={32} round />
                      </PinterestShareButton>
                      <EmailShareButton
                        url={shareUrl}
                        title={title}
                      >
                        <EmailIcon size={32} round />
                      </EmailShareButton>
                    </div>
                  </>
                ) : (
                  <iframe
                    width="100%"
                    height="800"
                    src={selectedMedia.src}
                    title={selectedMedia.title}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-2xl"
                  ></iframe>
                )}
                <p className="mt-4 text-center font-semibold text-blue-800 dark:text-yellow-300 text-lg break-words">
                  {selectedMedia.title}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
