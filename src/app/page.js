import Link from "next/link";

export const metadata = {
  title: "AIRI - Home",
  description:
    "Advancing research, innovation, and exploration in the field of artificial intelligence at the Technical University of Cluj-Napoca.",
};

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          <img
          src="/icia-staging/homepage/hero5.png"
          alt="AI Research Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
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
        <img
          src="/icia-staging/homepage/qrSignup.jpg"
          alt="Sign Up QR Code"
          className="absolute bottom-8 left-8 w-32 h-32 md:w-48 md:h-48 object-contain rounded-xl shadow-xl border-4 border-white dark:border-gray-800"
        />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="container mx-auto px-4 py-16 max-w-5xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-yellow-400 mb-4 text-center">
          About Us
        </h2>
        <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl mb-6 text-center">
          The Artificial Intelligence Research Institute (AIRi) within the
          Technical University of Cluj-Napoca assumes a catalytic role in
          advancing research, innovation, and exploration in the field of
          artificial intelligence. AIRi contributes to the development of an
          ecosystem of excellence that generates a significant impact on society,
          the economy, and the academic environment. By integrating expertise from
          various constituent departments, ICIA aims to surpass individual results
          by promoting interdisciplinary collaboration, knowledge transfer, and
          the implementation of AI-based solutions in key sectors such as
          healthcare, industry, energy, or education. ICIA will also serve as a
          space for interaction between researchers, as well as between AI and
          human intelligence.
        </p>
      </section>

      {/* Quick Links Section */}
      <section className="container mx-auto px-4 pb-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/research" // No need to add basepath for links. The router handles it
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
            href="/news" 
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

      {/* Live Construction Camera Card */}
      <section className="container mx-auto px-4 pb-16 max-w-3xl">
        <div className="bg-yellow-50 dark:bg-gray-800 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-lg p-6 flex items-center gap-6 shadow">
          <img
            src="/icia-staging/homepage/hero4.jpg"
            alt="Construction Site"
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
      </section>
    </main>
  );
}