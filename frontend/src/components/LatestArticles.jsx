import React from 'react';

const ARTICLES = [
  {
    id: 1,
    title: "Jak správně sedět u počítače a neničit si záda",
    excerpt: "Dlouhé sezení je zabiják zad. Máme pro vás 5 jednoduchých tipů, které můžete začít dělat hned teď.",
    category: "Ergonomie",
    date: "15. února 2026",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    title: "Proč vás bolí hlava? Možná je to od krční páteře",
    excerpt: "Migrény a tenzní bolesti hlavy mají často původ v zatuhlých svalech krku. Ukážeme vám, jak je uvolnit.",
    category: "Bolest hlavy",
    date: "10. února 2026",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "Ranní rozhýbání: 10 minut pro lepší den",
    excerpt: "Krátká sestava cviků, která vás probere lépe než ranní káva. Zvládne ji každý hned po probuzení.",
    category: "Cvičení",
    date: "2. února 2026",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
  }
];

export default function LatestArticles() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Nadpis sekce */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Nejnovější články</h2>
            <p className="text-slate-600 mt-2">Přečtěte si tipy pro váš zdravý pohyb</p>
          </div>
          <a href="#" className="hidden md:block text-yellow-500 font-bold hover:text-yellow-600 transition-colors">
            Všechny články →
          </a>
        </div>

        {/* Mřížka článků */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article key={article.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Obrázek */}
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
                  <a href="#">{article.title}</a>
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <a href="#" className="text-sm font-bold text-slate-900 border-b-2 border-yellow-400 hover:border-yellow-500 pb-0.5 transition-all">
                  Číst více
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Mobilní tlačítko "Všechny články" */}
        <div className="mt-10 md:hidden">
          <button className="w-full bg-white border border-slate-200 py-3 rounded-xl font-bold text-slate-700 shadow-sm">
            Všechny články
          </button>
        </div>

      </div>
    </section>
  );
}