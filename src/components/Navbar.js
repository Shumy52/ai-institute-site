'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo5 from '../../public/media/Logos/Logo5.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black p-4 border-b-2 border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src={Logo5} alt="AI Institute Logo" width={200} height={200} />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/research" className="hover:underline">Research</Link></li>
          <li><Link href="/news" className="hover:underline">News</Link></li>
          <li><Link href="/media" className="hover:underline">Media</Link></li>
          <li><Link href="/timeline" className="hover:underline">Timeline</Link></li>
          <li><Link href="/collaborators" className="hover:underline">Collaborators</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-white py-4 border-t border-gray-300">
          <li><Link href="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/research" className="hover:underline" onClick={() => setIsOpen(false)}>Research</Link></li>
          <li><Link href="/news" className="hover:underline" onClick={() => setIsOpen(false)}>News</Link></li>
          <li><Link href="/media" className="hover:underline" onClick={() => setIsOpen(false)}>Media</Link></li>
          <li><Link href="/timeline" className="hover:underline" onClick={() => setIsOpen(false)}>Timeline</Link></li>
          <li><Link href="/collaborators" className="hover:underline" onClick={() => setIsOpen(false)}>Collaborators</Link></li>
          <li><Link href="/contact" className="hover:underline" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
}
