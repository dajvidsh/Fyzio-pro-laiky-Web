import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* LOGO A POPIS */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              {/*<div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform text-sm">F</div>*/}
              <img src="/logo.svg" alt="Logo" className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform text-sm"></img>
              <span className="font-black text-lg tracking-tighter text-slate-900 uppercase">Fyzio<span className="text-yellow-500">pro</span>laiky</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
              Rehabilitace a cvičení srozumitelně pro každého. Pomáhám vám porozumět vašemu tělu.
            </p>
          </div>

          {/* ODKAZY */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-6">Navigace</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><Link to="/blog" className="hover:text-yellow-500 transition-colors">Blog</Link></li>
              <li><Link to="/courses" className="hover:text-yellow-500 transition-colors">Kurzy</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-500 transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* KONTAKT */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-6">Kontakt</h3>
            <p className="text-sm text-slate-500 font-light mb-2">Máte dotaz? Napište mi:</p>
            <a href="mailto:info@fyzioprolaiky.cz" className="text-sm font-black text-slate-900 hover:text-yellow-500 transition-colors">info@fyzioprolaiky.cz</a>
          </div>

        </div>

        {/* SPODNÍ ČÁST S GDPR VĚTOU */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
          <p>© {new Date().getFullYear()} FYZIOPROLAIKY.CZ</p>

          {/* Tady je ta důležitá věta o tokenech/cookies */}
          <p className="text-center md:text-right normal-case italic font-light tracking-normal">
            Pro zajištění funkčnosti přihlášení ukládáme do vašeho prohlížeče nezbytný autorizační klíč (token).
          </p>
        </div>
      </div>
    </footer>
  );
}