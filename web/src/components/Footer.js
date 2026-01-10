'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo5 from "../../public/media/Logos/Logo5.svg";
import Logo5White from "../../public/media/Logos/Logo3.png";

export default function Footer() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 text-black dark:text-white mt-12 border-t-2 border-gray-300 dark:border-gray-800 w-full mt-auto">
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center gap-4">
          <a href="/" aria-label="Home">
            <Image
              src={isDark && Logo5White ? Logo5White : Logo5}
              alt="AI Institute Logo"
              width={150}
              height={150}
              style={{ filter: !Logo5White && isDark ? "invert(1) brightness(2)" : undefined }}
              priority
            />
          </a>

          <ul className="flex gap-4">
            <li>
              <a
                href="https://www.linkedin.com/company/109110973/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08 0-1.15.92-2.08 2.06-2.08 1.14 0 2.06.93 2.06 2.08 0 1.15-.92 2.08-2.06 2.08zm15.11 12.87h-3.56v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.68h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCKpee9L9pHMWH7dVMS2kvlw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M23.498 6.186a2.97 2.97 0 0 0-2.092-2.092C19.622 3.5 12 3.5 12 3.5s-7.622 0-9.406.594a2.97 2.97 0 0 0-2.092 2.092C0 7.97 0 12 0 12s0 4.03.502 5.814a2.97 2.97 0 0 0 2.092 2.092C4.378 20.5 12 20.5 12 20.5s7.622 0 9.406-.594a2.97 2.97 0 0 0 2.092-2.092C24 16.03 24 12 24 12s0-4.03-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.flickr.com/people/203870795@N08/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200"
                aria-label="Flickr"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm-3.5 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm7 0a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-2">
          <a
            href="https://www.google.com/maps/dir//Laboratoarele+UTC-N+Strada+Observatorului+2+Cluj-Napoca+400347"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 flex-shrink-0 mt-1 text-blue-700 hover:text-blue-900"
            >
              <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>
            <span>
              2 Observatorului Street,<br />
              Cluj-Napoca 400347,<br />
              Romania
            </span>
          </a>

          <a
            href="mailto:AIRI@campus.utcluj.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-blue-700 hover:text-blue-900"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2zM4 8l8 5 8-5v2l-8 5-8-5V8z" />
            </svg>
            <span>AIRI@campus.utcluj.ro</span>
          </a>
        </div>

        <div className="flex flex-col items-center">
          <ul>
            <li><a href='/research/projects' className="underline" >Projects</a></li>
            <li><a href='/about/sitemap' className="underline" >Sitemap</a></li>
            <li><a href="https://didatec.sharepoint.com/sites/UTCNRooms/SitePages/UTCN-AIRI-OBSERVATOR-CLUJ.aspx?csf=1&web=1&e=1KDf0F&CID=8d5db74e-8c12-43de-8556-93adf5bbba81" className="underline" target="_blank" rel="noopener noreferrer">Rooms</a></li>
            <li><a href="https://didatec-my.sharepoint.com/personal/airi_campus_utcluj_ro/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fairi%5Fcampus%5Futcluj%5Fro%2FDocuments%2FAIRi%2Don%2DDemand%20%E2%80%93%20Communication%20and%20Dissemination%20Materials&ga=1" className="underline" >Dissemination</a></li>
            <li><a href='/contact' className="underline" >Contact Us</a></li>
          </ul>
        </div>

      </div>

      <div className="bg-gray-800 dark:bg-gray-900">
        <div className="container mx-auto py-2 text-center text-sm text-gray-200 dark:text-gray-400">
          © {new Date().getFullYear()} Technical University of Cluj-Napoca. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
