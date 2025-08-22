import { 
  FaBookOpen, FaChalkboardTeacher, FaIdBadge, FaServer, FaMapMarkedAlt,
  FaUserGraduate, FaUserAlt, FaProjectDiagram, FaUsers, FaSignOutAlt 
} from "react-icons/fa";

export const metadata = {
  title: "Guidelines (Onboarding) – AIRi @ UTCN",
};

const ITEMS = [
  { label: "Students",                href: "/engagement/academic",   icon: FaBookOpen },
  { label: "Faculty & Researchers",   href: "/research",              icon: FaChalkboardTeacher },
  { label: "Staff",                   href: "/people/staff",          icon: FaIdBadge },
  { label: "IT Staff",                href: null,                     icon: FaServer },
  { label: "Visitors",                href: "/about/virtual-tour",    icon: FaMapMarkedAlt },
  { label: "Alumni",                  href: "/people/alumni",         icon: FaUserGraduate },
  { label: "Retirees",                href: null,                     icon: FaUserAlt },
  { label: "Sponsored Affiliates",    href: "/engagement/partners",   icon: FaProjectDiagram },
  { label: "Parents & Family",        href: null,                     icon: FaUsers },
  { label: "Former Staff & Affiliates", href: null,                   icon: FaSignOutAlt },
];

function Tile({ label, href, icon: Icon }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={`group flex flex-col items-center gap-3 p-4 rounded-xl ${
        href
          ? "focus:outline-none focus-visible:ring-2 ring-offset-2 ring-blue-500 cursor-pointer transition hover:bg-gray-50 dark:hover:bg-gray-800/60"
          : "opacity-60 cursor-default"
      }`}
    >
      <span className="grid place-items-center h-16 w-16 rounded-full bg-[#0b3160] text-white shadow-md group-hover:scale-105 transition">
        <Icon className="h-8 w-8" aria-hidden />
      </span>
      <span className="text-[15px] text-slate-700 dark:text-slate-300 group-hover:underline text-center">
        {label}
      </span>
    </Wrapper>
  );
}

export default function GuidelinesPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-6xl mx-auto bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-10 text-gray-900 dark:text-gray-100 tracking-tight">
          Just For You
        </h1>
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-12 gap-y-10">
          {ITEMS.map((it) => (
            <Tile key={it.label} {...it} />
          ))}
        </section>
      </div>
    </main>
  );
}
