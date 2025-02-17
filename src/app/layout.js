import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Added by me, get navbar on all pages
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ICIA - Home",
  description: "Official website of the AI Institute at UTCN.",
};

// Title and description, for search engines

// We pass to it the "prop" (kinda like parameter): children

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
