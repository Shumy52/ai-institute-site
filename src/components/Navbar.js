import Link from "next/link";
import Image from 'next/image';
import Logo5 from '../../public/media/Logos/Logo5.svg';


export default function Navbar() {
  return (
    <nav className="bg-white text-black p-4 border-b-2 border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src={Logo5} alt="AI Institute Logo" width={200} height={200} />
          {/* <Link href="/" className="text-2xl font-bold tracking-wide"></Link> */}
        </div>
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/news" className="hover:underline">News</Link></li>
          <li><Link href="/media" className="hover:underline">Media</Link></li>
          <li><Link href="/timeline" className="hover:underline">Timeline</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}