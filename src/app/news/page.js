export default function News() {
    const newsArticles = [
      { title: "Breakthrough in AI Research", date: "Feb 15, 2025", image: "/news1.png" },
      { title: "AI in Education", date: "Feb 10, 2025", image: "/news2.jpg" },
      { title: "New AI Lab Opening", date: "Feb 5, 2025", image: "/news3.jpg" },
    ];
  
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">News</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.map((article, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-lg" />
              <h2 className="text-xl font-bold mt-4">{article.title}</h2>
              <p className="text-gray-500">{article.date}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }