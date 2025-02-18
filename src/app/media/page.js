"use client";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

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
  }
];

//TODO

export default function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <>
      <Head>
        <title>ICIA - Media</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">📸 ICIA Media Gallery</h1>
        <p className="mb-4">Explore images and videos showcasing the progress of the ICIA Institute.</p>
        
        <div className="grid grid-cols-2 gap-4">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedMedia(item)}
            >
              {item.type === "image" ? (
                <Image src={item.src} alt={item.alt} width={400} height={250} className="w-full w-full h-full object-cover object-center rounded-lg" />
              ) : (
                <div className="relative w-full aspect-video bg-black flex items-center justify-center text-blue">
                  🎥 Video: {item.title}
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMedia(null)}>
            <div className="bg-white p-4 rounded-lg max-w-3xl w-full relative">
              <button
                className="absolute top-2 right-2 text-lg text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedMedia(null)}
              >
                ✖
              </button>
              {selectedMedia.type === "image" ? (
                <Image src={selectedMedia.src} alt={selectedMedia.alt} width={800} height={500} className="w-full h-full object-cover object-center rounded-lg" />
              ) : (
                <iframe
                  width="100%"
                  height="400"
                  src={selectedMedia.src}
                  title={selectedMedia.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              {/* Change the selected media title to black (or some other color) */}
              <p className="mt-2 text-center font-semibold text-[#01274a]">{selectedMedia.title}</p> 
            </div>
          </div>
        )}
      </main>
    </>
  );
}
