import React from "react";

const NewsCard = ({ article }) => {
  // --- SAFE DATE HANDLER ---
  const formatDate = (dateString) => {
    if (!dateString) return "Recently published";
    const parsed = Date.parse(dateString);
    return isNaN(parsed) ? "Recently published" : new Date(parsed).toDateString();
  };

  const formattedDate = formatDate(article.publishedAt);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transform hover:scale-105 transition-all duration-300">
      
      {/* IMAGE WITH GRADIENT & DATE OVERLAY */}
      <div className="relative h-48 md:h-56 w-full">
        <img
          src={article.urlToImage || "/placeholder-news.jpg"}
          alt={article.title || "News Image"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <span className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
          {formattedDate}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        {/* SOURCE BADGE */}
        {article.source?.name && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mb-2 inline-block">
            {article.source.name}
          </span>
        )}

        {/* TITLE */}
        <h2 className="font-bold text-lg md:text-xl mb-2 line-clamp-2">
          {article.title || "Untitled Article"}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {article.description || "Description not available."}
        </p>

        {/* AUTHOR OR SOURCE */}
        <p className="text-xs text-gray-400 mb-4">
          {article.author ? `By ${article.author}` : article.source?.name || "Unknown source"}
        </p>

        {/* READ MORE BUTTON */}
        <a
          href={article.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
