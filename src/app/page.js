export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-black">
        <img
          src="/hero.png"
          alt="AI Research"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold">Welcome to the AI Institute</h1>
          <p className="mt-4 text-xl max-w-2xl">Leading research and innovation in artificial intelligence.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-[#e6e6fa]">About us</h2>
        <p className="text-[#e6e6fa]-600 mt-2">*insert joke*</p>
      </section>
    </main>
  );
}

export const metadata = {
  title: "ICIA - Home",
};