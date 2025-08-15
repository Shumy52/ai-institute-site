'use client';

import { useEffect,  useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo5 from '../../public/media/Logos/Logo5.svg';
import Logo5White from '../../public/media/Logos/Logo3.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/engagement', label: 'Engagement' },
  { href: '/people/', label: 'People' },
  { href: '/news', label: 'News & Events' },
  { href: '/about', label: 'About' },
  { href: '/search', label: 'Search' },
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

const peopleMenu = [
  { href: '/people/researchers', label: 'Researchers' },
  { href: '/people/staff', label: 'Staff' },
  { href: '/people/alumni', label: 'Alumni' },
  { href: '/people/visiting_researchers', label: 'Visiting researchers' },
];

const researchMenu = [
  { href: '/research/departments', label: 'Departments' },
  { href: '/research/themes', label: 'Themes' },
  { href: '/research/projects', label: 'Projects' },
  { href: '/research/publications', label: 'Publications' },
  { href: '/research/thesis', label: 'Thesis' },
  { href: '/research/tools', label: 'Tools' },
  { href: '/research/datasets', label: 'Datasets' },
];

const newsMenu = [
  { href: '/news', label: 'News' },
  { href: '/news/events', label: 'Events' },
  { href: '/news/seminars', label: 'Seminars' },
  { href: '/news/open-project-calls', label: 'Open Project calls' },
  { href: '/news/awards', label: 'Awards' },
  { href: '/news/careers', label: 'Career/Job Opportunities' },
];

const aboutMenu = [
  { href: '/about#mission', label: 'Mission' },
  { href: '/about/organigram', label: 'Organigram' },
  { href: '/about/sitemap', label: 'Sitemap' },
  { href: '/about/reports', label: 'Reports Self-assessment reports' },
  { href: '/about/procedures-regulations', label: 'Procedures & Regulations' },
  { href: '/about/guidelines', label: 'Guidelines' },
  { href: '/about/virtual-tour', label: 'Virtual Tour' },
  { href: '/about/rooms-calendar', label: 'Rooms & calendar' },
  { href: '/contact', label: 'Contact' },
];

const searchMenu = [
  { href: '/search', label: 'Classic search' },
  { href: '/search/chatbot', label: 'AIRi chatbot (LLM-based)' },
  { href: '/search/knowledge-graphs', label: 'AIRi Knowledge graphs navigator' },
];

function DesktopDropdown({ link, open, setOpen, items, alignRight = false }) {
  return (
    <li
      key={link.href}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open}
        className="hover:underline cursor-pointer"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen((o) => !o)}
      >
        {link.label}
      </span>

      <div
        className={`absolute ${alignRight ? 'right-0' : 'left-0'} top-full z-50 ${
          open ? 'block' : 'hidden'
        } max-h-[70vh] overflow-auto min-w-64 max-w-[90vw]`}
        role="menu"
      >
        <div className="pt-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg">
          <ul className="py-2">
            {items.map((item) => (
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
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [engOpen, setEngOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [engMobileOpen, setEngMobileOpen] = useState(false);
  const [peopleMobileOpen, setPeopleMobileOpen] = useState(false);
  const [researchMobileOpen, setResearchMobileOpen] = useState(false);
  const [newsMobileOpen, setNewsMobileOpen] = useState(false);
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false);
  const [searchMobileOpen, setSearchMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
      const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      return () => observer.disconnect();
    }
  }, []);

  const desktopDropdowns = {
    'People':        { open: isPeopleOpen, setOpen: setIsPeopleOpen, items: peopleMenu },
    'Engagement':    { open: engOpen,      setOpen: setEngOpen,      items: engagementMenu },
    'Research':      { open: researchOpen, setOpen: setResearchOpen, items: researchMenu },
    'News & Events': { open: newsOpen,     setOpen: setNewsOpen,     items: newsMenu },
    'About':         { open: aboutOpen,    setOpen: setAboutOpen,    items: aboutMenu },
    'Search':        { open: searchOpen,   setOpen: setSearchOpen,   items: searchMenu },
  };

  const Arrow = ({ open }) => (
    <svg
      viewBox="0 0 20 20"
      className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        clipRule="evenodd"
      />
    </svg>
  );

  const MobileAccordion = ({ title, open, setOpen, items }) => (
    <li className="px-4">
      <button
        type="button"
        className="w-full flex items-center justify-between rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${title.toLowerCase().replace(/\s+/g, '-')}-mobile-panel`}
      >
        <span className="uppercase tracking-wide font-semibold">{title}</span>
        <Arrow open={open} />
      </button>

      <div
        id={`${title.toLowerCase().replace(/\s+/g, '-')}-mobile-panel`}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="rounded-b-md border-x border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-3 text-[16px] font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  setIsOpen(false);
                  setOpen(false);
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );

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

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className="hidden md:flex space-x-6 relative">
          {navLinks.map((link) => {
            const dd = desktopDropdowns[link.label];
            if (dd) {
              return (
                <DesktopDropdown
                  key={link.href}
                  link={link}
                  open={dd.open}
                  setOpen={dd.setOpen}
                  items={dd.items}
                  alignRight={link.label === 'Search' || link.label === 'About'}
                />
              );
            }
            return (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {isOpen && (
        <ul className="md:hidden flex flex-col items-stretch space-y-4 mt-4 bg-white dark:bg-gray-950 py-4 border-t border-gray-300 dark:border-gray-800">
          <li className="px-4">
            <Link
              href="/"
              className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 uppercase tracking-wide font-semibold text-left hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <MobileAccordion
            title="Research"
            open={researchMobileOpen}
            setOpen={setResearchMobileOpen}
            items={researchMenu}
          />
          <MobileAccordion
            title="Engagement"
            open={engMobileOpen}
            setOpen={setEngMobileOpen}
            items={engagementMenu}
          />
          <MobileAccordion
            title="People"
            open={peopleMobileOpen}
            setOpen={setPeopleMobileOpen}
            items={peopleMenu}
          />
          <MobileAccordion
            title="News & Events"
            open={newsMobileOpen}
            setOpen={setNewsMobileOpen}
            items={newsMenu}
          />
          <MobileAccordion
            title="About"
            open={aboutMobileOpen}
            setOpen={setAboutMobileOpen}
            items={aboutMenu}
          />
          <MobileAccordion
            title="Search"
            open={searchMobileOpen}
            setOpen={setSearchMobileOpen}
            items={searchMenu}
          />
        </ul>
      )}
    </nav>
  );
}
