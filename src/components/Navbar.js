'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo5 from '../../public/media/Logos/Logo5.svg';
import Logo5White from '../../public/media/Logos/Logo3.png'; // TODO: Replace with an actual fitting model

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/people/', label: 'People' },
  { href: '/news', label: 'News' },
  { href: '/engagement', label: 'Engagement' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/collaborators', label: 'Collaborators' },
  { href: '/contact', label: 'Contact' },
];

const engagementMenu = [
  { href: '/engagement/public', label: 'Public engagement' },
  { href: '/engagement/academic', label: 'Academic engagement' },
  { href: '/engagement/industry', label: 'Industry engagement' },
  { href: '/engagement/high-school', label: 'High-school engagement' },
  { href: '/engagement/partners', label: 'Partners' },
  { href: '/engagement/tech-transfer', label: 'Technology transfer & development' },
  { href: '/engagement/hpc-ai', label: 'HPC-AI services' },
  { href: '/engagement/industrial-phd', label: 'Industrial PhD' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const peopleTimeoutRef = useRef(null);
  const [engOpen, setEngOpen] = useState(false);
  const [engMobileOpen, setEngMobileOpen] = useState(false); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <nav
      className="bg-white dark:bg-gray-950 text-black dark:text-white p-4 border-b-2 border-gray-300 dark:border-gray-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" aria-label="Home">
            <Image
              src={isDark && Logo5White ? Logo5White : Logo5}
              alt="AI Institute Logo"
              width={200}
              height={200}
              priority
              style={{ cursor: 'pointer', filter: !Logo5White && isDark ? 'invert(1) brightness(2)' : undefined }}
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 relative">
          {navLinks.map(link => {
            if (link.label === 'People') {
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => {
                    clearTimeout(peopleTimeoutRef.current);
                    setIsPeopleOpen(true);
                  }}
                    onMouseLeave={() => {
                      peopleTimeoutRef.current = setTimeout(() => {
                      setIsPeopleOpen(false);
                    }, 200);
                  }}>
                  <span className="cursor-pointer hover:underline">{link.label}</span>

                  {isPeopleOpen && (
                  <ul
                    className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-950 shadow-lg rounded-md border border-gray-200 dark:border-gray-800 z-50"
                    onMouseEnter={() => {
                      clearTimeout(peopleTimeoutRef.current);
                      setIsPeopleOpen(true);
                    }}
                    onMouseLeave={() => {
                      peopleTimeoutRef.current = setTimeout(() => {
                      setIsPeopleOpen(false);
                    }, 200);
                    }}>
                    <li>
                      <Link href="/people/researchers" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        RESEARCHERS
                      </Link>
                    </li>
                    <li>
                      <Link href="/people/staff" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        STAFF & STUDENTS
                      </Link>
                    </li>
                    <li>
                      <Link href="/people/alumni" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        ALUMNI
                      </Link>
                    </li>
                    <li>
                      <Link href="/people/visiting_researches" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        VISITING RESEARCHERS
                      </Link>
                    </li>
                  </ul>)}
                </li>);
            } else if (link.label === 'Engagement'){
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setEngOpen(true)}
                  onMouseLeave={() => setEngOpen(false)}
                >
                  <span 
                    type="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                    aria-expanded={engOpen}
                    className="hover:underline cursor:pointer"
                    onClick={() => setEngOpen(o => !o)}
                  >
                    {link.label}
                    </span>

                    <div 
                      className={`absolute left-0 top-full w-80 z-50 ${engOpen ? 'block' : 'hidden'}`}
                      role="menu"
                    >
                    <div className="pt-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg">
                      <ul className="py-2">
                        {engagementMenu.map(item => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                 </li>
                );
            } else {
              return (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
  <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-white dark:bg-gray-950 py-4 border-t border-gray-300 dark:border-gray-800">
    {navLinks
      .filter(l => l.label !== 'Engagement')
      .map(link => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        </li>
      ))}
    <li className="w-full max-w-sm">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg border
                   border-gray-200 dark:border-gray-800"
        onClick={() => setEngMobileOpen(o => !o)}
        aria-expanded={engMobileOpen}
        aria-controls="engagement-mobile-submenu"
      >
        <span>Engagement</span>
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform ${engMobileOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {engMobileOpen && (
        <ul id="engagement-mobile-submenu" className="mt-2 space-y-1">
          {engagementMenu.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-6 py-2 text-sm text-gray-700 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                onClick={() => { setIsOpen(false); setEngMobileOpen(false); }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  </ul>
)}

    </nav>
  );
}