import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  title: "AIRI",
  description: "The Artificial Intelligence Research Institute (AIRI) within the Technical University of Cluj-Napoca assumes a catalytic role in advancing research, innovation, and exploration in the field of artificial intelligence. AIRi contributes to the development of an ecosystem of excellence that generates a significant impact on society, the economy, and the academic environment. By integrating expertise from various constituent departments, ICIA aims to surpass individual results by promoting interdisciplinary collaboration, knowledge transfer, and the implementation of AI-based solutions in key sectors such as healthcare, industry, energy, or education. ICIA will also serve as a space for interaction between researchers, as well as between AI and human intelligence. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
