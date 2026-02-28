import React from 'react';
import {Link} from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">

          {/* Hlavní nadpis */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Fyzio pro <span className="text-yellow-500">Laiky</span>
          </h1>

          {/* Popisek */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10">
            lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
          </p>

          {/* Tlačítka (CTA) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="bg-yellow-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-600 transition-all shadow-lg hover:shadow-blue-200 active:scale-95">
              Najít můj problém
            </Link>
              <Link to="/contact" className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
                Kontakt
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}