import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const latestArticles = [...articles].sort((a, b) => b.id - a.id)

  useEffect(() => {
    fetch('http://localhost:8000/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Chyba při načítání článků:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hlavička Blogu */}
      <header className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-12 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            Zamyšlení o zdraví, pohybu a životním stylu
          </p>
        </div>
      </header>

      {/* Seznam článků */}
      <main className="max-w-7xl mx-auto py-16 px-6 lg:px-8">

        {loading ? (
          <div className="text-center py-20 text-slate-400 animate-pulse">Načítám články...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {latestArticles.map((article) => (
              <article key={article.id} className="group flex flex-col">
                {/* Obrázek s efektem */}
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
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
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-yellow-500 uppercase tracking-widest shadow-sm">
                    {article.category}
                  </div>
                </div>

                {/* Textová část */}
                <div className="flex-1 px-2">
                  <div className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-tighter">
                    {article.date}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-yellow-500 transition-colors leading-tight">
                    <Link to={`/blog/${article.id}`}>{article.title}</Link>
                  </h2>
                  <p className="text-slate-500 font-light leading-relaxed mb-6 line-clamp-3 italic">
                    {article.excerpt}
                  </p>

                  <Link
                    to={`/blog/${article.id}`}
                    className="inline-flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest group-hover:text-yellow-500 transition-all"
                  >
                    Číst článek
                    <span className="w-8 h-[2px] bg-yellow-400 group-hover:w-12 transition-all"></span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Prázdný stav, pokud nejsou žádné články */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 italic">Zatím nejsou dostupné žádné články. Ale brzy přibudou!</p>
          </div>
        )}
      </main>
    </div>
  );
}