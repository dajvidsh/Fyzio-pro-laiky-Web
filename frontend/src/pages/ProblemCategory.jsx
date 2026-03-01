import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const categoryData = {
  'hlava-krk': { title: 'Hlava a krk', description: 'Řešení pro bolesti krční páteře, ztuhlost šíje a migrény.', icon: '🧠' },
  'trup-pater': { title: 'Trup a páteř', description: 'Zaměřeno na bedra, hrudní páteř a správné držení těla.', icon: '🦴' },
  'ruce-paze': { title: 'Paže a ruce', description: 'Pomoc při tenisovém lokti, syndromu karpálního tunelu a bolesti ramen.', icon: '💪' },
  'nohy': { title: 'Nohy', description: 'Péče o kolena, kyčle, kotníky a ploché nohy.', icon: '🦵' }
};

export default function ProblemCategory() {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = categoryData[categoryId] || { title: 'Kategorie', description: 'Vyberte si oblast, která vás trápí.' };

  useEffect(() => {
    setLoading(true);
    // Zde později přidáš fetch na API, které vrátí články podle kategorie
    // fetch(`https://fyzio-pro-laiky-server.onrender.com/api/articles?category=${categoryId}`)

    // Pro teď jen simulace načítání
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [categoryId]);

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-6xl mb-6 block">{data.icon}</span>
        <h1 className="text-5xl font-black text-slate-900 mb-6">{data.title}</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {data.description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold mb-4">Články a návody se připravují</h2>
          <p className="text-slate-500 mb-8">Pracujeme na tom, abychom vám brzy přinesli ty nejlepší cviky pro tuto oblast.</p>
          <Link to="/blog" className="text-blue-600 font-bold hover:underline">Prohlédnout si všechny články →</Link>
        </div>
      </div>
    </div>
  );
}