import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);

  const latestArticles = [...articles]
  .sort((a, b) => b.id - a.id)
  .slice(0, 3);

  useEffect(() => {
    fetch('http://localhost:8000/api/articles').then(res => res.json()).then(data => setArticles(data)).catch(err => console.error("Chyba pri nacitani", err));
  }, []);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nadpis sekce */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Nejnovější články</h2>
            <p className="text-slate-600 mt-2">Přečtěte si tipy pro váš zdravý pohyb</p>
          </div>
          <Link to="/blog" className="hidden md:block text-yellow-500 font-bold hover:text-yellow-600 transition-colors">
            Všechny články →
          </Link>
        </div>

        {/* Mřížka článků */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Obrázek */}
              <div className="h-48 overflow-hidden bg-slate-50 flex items-center justify-center border-b border-slate-100 relative">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  /* Tady je ten náhradník */
                  <div className="text-center">
                    <span className="text-4xl">🤸</span> {/* Nebo jiná ikonka podle zaměření */}
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">
                      Bez náhledu
                    </div>
                  </div>
                )}
              </div>

              {/* Obsah karty */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400">{article.date}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-500 transition-colors">
                  <Link to={`/blog/${article.id}`}>{article.title}</Link>
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <Link to={`/blog/${article.id}`} className="text-sm font-bold text-slate-900 border-b-2 border-yellow-400 hover:border-yellow-500 pb-0.5 transition-all">
                  Číst více
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Mobilní tlačítko "Všechny články" */}
        <div className="mt-10 md:hidden">
          <button className="w-full bg-white border border-slate-200 py-3 rounded-xl font-bold text-slate-700 shadow-sm">
            <Link to="/blog">
              Všechny články
            </Link>
          </button>
        </div>

      </div>
    </section>
  );
}