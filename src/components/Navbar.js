'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo5 from '../../public/media/Logos/Logo5.svg';
import Logo5White from '../../public/media/Logos/Logo3.png'; // TODO: Replace with an actual fitting model

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/news', label: 'News' },
  { href: '/media', label: 'Media' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/collaborators', label: 'Collaborators' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

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
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-white dark:bg-gray-950 py-4 border-t border-gray-300 dark:border-gray-800">
          {navLinks.map(link => (
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
        </ul>
      )}
    </nav>
  );
}