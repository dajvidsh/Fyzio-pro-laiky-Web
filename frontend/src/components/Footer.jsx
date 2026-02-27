import React from 'react';
import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Logo / Název */}
        <div className="font-bold text-slate-800 mb-4">
          Fyzio<span className="text-yellow-500">ProLaiky</span>
        </div>

        {/* Odkazy */}
        <div className="flex justify-center gap-6 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-yellow-500 transition-colors">Úvod</Link>
          <Link to="/contact" className="hover:text-yellow-500 transition-colors">Kontakt</Link>
          <Link to="/" className="hover:text-yellow-500 transition-colors">Ochrana soukromí</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Radim – Všechna práva vyhrazena.
        </p>
      </div>
    </footer>
  );
}