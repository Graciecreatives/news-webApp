import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard.jsx";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const NewsFeed = () => {
  // Supported NewsAPI categories
  const categoryMap = {
    General: "general",
    Business: "business",
    Entertainment: "entertainment",
    Health: "health",
    Science: "science",
    Sports: "sports",
    Technology: "technology",
  };

  const [category, setCategory] = useState("general"); // default active
  const [articles, setArticles] = useState([]);
  const [heroArticle, setHeroArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  /** FETCH NEWS */
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&q=${query || ""}&apiKey=${apiKey}`;
      const response = await axios.get(url);

      const all = response.data.articles || [];
      setHeroArticle(all[0] || null);
      setArticles(all.length > 1 ? all.slice(1) : []);
    } catch (err) {
      setError("Failed to fetch news articles.");
      console.error(err);
    }

    setLoading(false);
  }, [category, query, apiKey]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6">
      {/* PAGE HEADER */}
      <Header
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />


      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white border shadow rounded-full px-5 py-3 mb-6 max-w-4xl mx-auto"
      >
        <span className="text-gray-500 mr-3 text-lg">🔍</span>
        <input
          type="text"
          className="flex-1 outline-none text-gray-700"
          placeholder="Search for news, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {Object.keys(categoryMap).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(categoryMap[cat])}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${category === categoryMap[cat]
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* HERO SECTION */}
      {heroArticle && (
  <div
    className="rounded-xl overflow-hidden shadow-lg mb-12 relative h-[260px] md:h-[350px]"
    style={{
      backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
        url(${heroArticle.urlToImage || "/placeholder.jpg"})
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="p-4 md:p-10 h-full flex flex-col justify-end">
      <h1 className="text-xl md:text-4xl font-extrabold text-white mb-2 md:mb-4 leading-snug">
        {heroArticle.title || "No title available"}
      </h1>

      <p className="text-gray-200 max-w-2xl mb-3 md:mb-4 text-sm md:text-lg line-clamp-3">
        {heroArticle.description || "No description available."}
      </p>

      <a
        href={heroArticle.url || "#"}
        target="_blank"
        className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-medium w-max text-sm md:text-base"
      >
        Read More
      </a>
    </div>
  </div>
)}


      {/* Loading & Error */}
      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Recent Articles */}
      {articles.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <NewsCard
                key={index}
                article={{
                  title: article.title || "No title available",
                  description: article.description || "No description available",
                  urlToImage: article.urlToImage || "/placeholder.jpg",
                  url: article.url || "#",
                }}
              />
            ))}
          </div>
        </>
      ) : (
        !loading &&
        !heroArticle && (
          <p className="text-center text-gray-500">No news articles found.</p>
        )
      )}
      <Footer />
    </div>
  );
};

export default NewsFeed;
