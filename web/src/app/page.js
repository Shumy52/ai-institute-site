import Image from "next/image";
import Link from "next/link";
import LinkedInWidget from "@/components/LinkedInWidget";

export const metadata = {
  title: "AIRI - Home",
  description:
    "Advancing research, innovation, and exploration in artificial intelligence at the Technical University of Cluj-Napoca - AIRi@UTCN",
};

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative isolate h-[55vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <Image
          src="/homepage/hero5.png"
          alt="AI Research Hero"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-70"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/35 to-indigo-700/25 dark:from-gray-950/70 dark:to-gray-800/70"
          aria-hidden="true"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
            Artificial Intelligence Research Institute
          </h1>
          <p className="text-lg md:text-2xl font-medium mb-6 max-w-2xl mx-auto drop-shadow">
            Advancing research, innovation, and exploration in the field of
            artificial intelligence at the Technical University of Cluj-Napoca.
          </p>
          <Link
            href="#about"
            className="inline-block bg-yellow-400 dark:bg-yellow-600 text-black dark:text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 dark:hover:bg-yellow-500 transition"
          >
            Learn More
          </Link>
        </div>
        <div className="absolute bottom-8 left-8 z-10">
          <Image
            src="/homepage/qrSignup.jpg"
            alt="Sign up QR code"
            width={192}
            height={192}
            className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-xl shadow-xl border-4 border-white dark:border-gray-800"
            priority
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="rounded-2xl border border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30 p-6 text-center shadow-sm">
          <p className="text-lg md:text-xl font-semibold text-yellow-800 dark:text-yellow-200">
            AIRi@UTCN is currently under construction. Follow our channels for updates.
          </p>
        </div>
      </section>

      <section
        id="about"
        className="container mx-auto px-4 py-16 max-w-5xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-yellow-400 mb-4 text-center">
          About Us
        </h2>
        <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl mb-6 text-center">
          The Artificial Intelligence Research Institute (AIRi) is a nexus for collaborative research at the
          Technical University of Cluj-Napoca. AIRi@UTCN promotes excellence in AI theory and practice, bringing
          together researchers across UTCN around a vision of open collaboration. Our work spans interdisciplinary
          research, AI literacy across disciplines, and impact through business and public co-creation partnerships.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/research/departments"
            className="bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg p-6 shadow text-center transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-400 mb-2">
              Research
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore our research units and projects.
            </p>
          </Link>
          <Link
            href="/news&events/news"
            className="bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg p-6 shadow text-center transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-400 mb-2">News</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with the latest news and events.
            </p>
          </Link>
          <Link
            href="/media"
            className="bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg p-6 shadow text-center transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-400 mb-2">
              Media
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse our media gallery and publications.
            </p>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-5xl space-y-8">
        <div className="bg-yellow-50 dark:bg-gray-800 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-lg p-6 flex items-center gap-6 shadow">
          <Image
            src="/homepage/hero4.jpg"
            alt="Construction site"
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
          />
          <div>
            <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">
              Live Construction Camera
            </h3>
            <p className="text-gray-700 dark:text-gray-200 mb-2">
              See the progress of our new research facility in real time.
            </p>
            <a
              href="http://webcam.obs.utcluj.ro/"
              className="text-blue-600 dark:text-yellow-300 underline font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live Construction Site Camera
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-yellow-400">Latest on LinkedIn</h3>
          <LinkedInWidget />
        </div>
      </section>
    </main>
  );
}


