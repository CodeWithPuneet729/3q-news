"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState("india");
  const [language, setLanguage] = useState("en");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ["india", "world", "technology", "sports", "business", "entertainment"];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?q=${query}&lang=${language}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news:", err);
        setLoading(false);
      });
  }, [query, language]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { setQuery("india"); setIsMenuOpen(false); }}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              3Q
            </div>
            <span className="text-2xl font-black tracking-tighter bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
              NEWS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                ${query === item
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 scale-105'
                    : 'bg-transparent text-slate-400 border border-transparent hover:border-slate-700 hover:text-white'
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-wrap gap-2 justify-center pb-4 border-t border-slate-800 pt-4">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setQuery(item);
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium 
                ${query === item ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="p-8 bg-black text-white min-h-screen">
        <section className="inputs grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="input flex flex-col gap-2 bg-slate-800 p-4 rounded-lg">
            <label htmlFor="query" className="text-slate-300">Choose a query:</label>
            <select
              id="query"
              value={query}
              className="bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-xl p-3 outline-none"
              onChange={(e) => setQuery(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
            </select>
          </div>

          <div className="input flex flex-col gap-2 bg-slate-800 p-4 rounded-lg">
            <label htmlFor="language" className="text-slate-300">Choose a language:</label>
            <select
              id="language"
              value={language}
              className="bg-slate-900 border border-slate-600 focus:border-blue-500 rounded-xl p-3 outline-none"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi - हिंदी</option>
              <option value="es">Spanish - Español</option>
            </select>
          </div>
        </section>

        <section className="news">
          <h1 className="text-3xl font-bold mb-6 capitalize">News Articles: {query}</h1>
          {loading ? (
            <div className="animate-pulse flex flex-col gap-4">
              <div className="h-20 bg-slate-800 rounded"></div>
              <div className="h-20 bg-slate-800 rounded"></div>
            </div>
          ) : news && news.length > 0 ? (
            <div className="grid gap-4">
              {news.map((article, index) => (
                <div key={index} className="p-4 border border-slate-700 bg-slate-900/50 rounded-lg hover:border-blue-500 transition-colors">
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-400 hover:text-blue-300">
                    {article.title}
                  </a>
                  <p className="text-sm text-slate-400 mt-2">Published on: {new Date(article.pubDate).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-slate-400">No news articles found.</p>}
        </section>
      </main>

      <footer className='bg-slate-900 flex flex-col justify-center items-center gap-2 text-center py-6'>
        <p className="text-slate-400 text-sm">© 2023 3Q News. All rights reserved.</p>
        <p className="text-slate-400 text-sm">Created with ❤️ by CodeWithPuneet</p>
      </footer>
    </>);
}
