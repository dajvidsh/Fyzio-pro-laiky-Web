import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-20 text-center text-slate-400">Načítám...</div>;
  if (!article) return <div className="py-20 text-center text-slate-400">Článek nenalezen.</div>;

  // Bezpečná kontrola obsahu - pokud content chybí, dáme tam aspoň prázdný text
  const content = article.content || "";

  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-50 z-10 py-4">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
          <Link to="/blog" className="text-sm font-bold text-slate-400 hover:text-blue-600">← Zpět</Link>
          {article.is_premium && <span className="text-[10px] font-black uppercase text-yellow-600">★ Premium</span>}
        </div>
      </div>

      <article className="max-w-3xl mx-auto py-16 px-6">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-6">{article.title}</h1>
          <p className="text-2xl text-slate-500 italic border-l-4 border-yellow-400 pl-6 mb-10">
            {article.excerpt}
          </p>
        </header>

        {/* Obrázek se vykreslí jen tehdy, pokud v article.image něco je */}
        {article.image && (
          <div className="max-w-xl mx-auto aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-lg border border-slate-50">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Vykreslení obsahu */}
        <div className="text-slate-800 text-lg leading-relaxed font-light prose prose-slate max-w-none">
          {article.is_premium ? (
            <>
              {/* U prémiových článků vyrenderujeme jen kousek */}
              <div
                className="prose prose-slate max-w-none wrap-break-word"
                dangerouslySetInnerHTML={{ __html: article.content.substring(0, 300) + "..." }}
              />
              <div className="mt-12 p-10 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-2xl">
                 {/* ... tvůj kód zámku ... */}
              </div>
            </>
          ) : (
            // Zde je to kouzlo pro zobrazení stylovaného textu
            <div
              className="prose prose-slate max-w-none wrap-break-word"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
        </div>
      </article>
    </div>
  );
}