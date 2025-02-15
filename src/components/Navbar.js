import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide">AI Institute</Link>
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/news" className="hover:underline">News</Link></li>
          <li><Link href="/media" className="hover:underline">Media</Link></li>
        </ul>
      </div>
    </nav>
  );
}
