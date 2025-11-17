import React, { useState } from "react";
import { FiSearch, FiBell, FiMoon, FiMenu, FiX } from "react-icons/fi";

const Header = ({ category, setCategory, query, setQuery, onSearch }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    "General",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  const categoryMap = {
    General: "general",
    Business: "business",
    Entertainment: "entertainment",
    Health: "health",
    Science: "science",
    Sports: "sports",
    Technology: "technology",
  };

  return (
    <header className="w-full bg-white shadow-sm py-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* LEFT: LOGO + BRAND */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">News Today</h1>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-6 ml-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(categoryMap[cat])}
                className={`text-sm font-medium ${
                  category === categoryMap[cat]
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT: SEARCH + ICONS */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <form
            onSubmit={onSearch}
            className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-full"
          >
            <FiSearch className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-40"
            />
          </form>

          {/* DARK MODE */}
          <FiMoon size={20} className="text-gray-700 cursor-pointer hidden md:block" />

          {/* NOTIFICATION */}
          <FiBell size={20} className="text-gray-700 cursor-pointer hidden md:block" />

          {/* HAMBURGER MENU (Mobile Only) */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 animate-slideDown">

          {/* MOBILE SEARCH */}
          <form
            onSubmit={onSearch}
            className="flex items-center bg-gray-100 px-3 py-2 rounded-full mb-4"
          >
            <FiSearch className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
            />
          </form>

          {/* MOBILE CATEGORIES */}
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(categoryMap[cat]);
                  setMenuOpen(false);
                }}
                className={`text-left py-2 px-2 rounded ${
                  category === categoryMap[cat]
                    ? "bg-blue-600 text-white"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
