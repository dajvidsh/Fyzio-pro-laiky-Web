import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    fetch(`http://localhost:8000/api/articles/${id}`, { headers })
      .then(res => {
        if (res.status === 402) {
          setIsLocked(true);
          setLoading(false);
          throw new Error("Premium Locked");
        }
        if (!res.ok) throw new Error("Chyba při načítání");
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // Důležité: Přestat načítat i při chybě!
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Načítám...</div>;

  if (isLocked) return (
    <div className="max-w-xl mx-auto py-20 text-center">
       <h1 className="text-4xl font-black mb-4">🔒 Premium obsah</h1>
       <p className="mb-8">Tento článek je dostupný pouze pro naše Premium členy.</p>
       <button onClick={() => navigate('/register')} className="bg-yellow-500 px-8 py-3 rounded-xl font-bold">Chci Premium</button>
    </div>
  );

  if (!article) return <div className="text-center py-20">Článek nebyl nalezen.</div>;

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
              {/*<div className="mt-12 p-10 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-2xl">*/}
              {/*   /!* ... tvůj kód zámku ... *!/*/}
              {/*</div>*/}
            </>
          ) : (
            // Zde je to kouzlo pro zobrazení stylovaného textu
            <div className="text-slate-800 text-lg leading-relaxed font-light">
              <div
                className="prose prose-slate lg:prose-xl max-w-none break-words text-slate-800 font-light leading-relaxed prose-headings:font-black prose-headings:text-slate-900 prose-strong:font-bold prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}