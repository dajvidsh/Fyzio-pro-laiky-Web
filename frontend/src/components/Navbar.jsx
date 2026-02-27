import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [problemsOpen, setProblemsOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo a Název */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Fyzio<span className="text-yellow-500">ProLaiky</span>
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-slate-600 hover:text-yellow-500 font-medium transition-colors">Úvod</Link>
                <Link to="/principy" className="text-slate-600 hover:text-yellow-500 font-medium transition-colors">Principy</Link>
                <Link to="/sport" className="text-slate-600 hover:text-yellow-500 font-medium transition-colors">Sport</Link>
                <div className="relative">
                  <button
                    onClick={() => setProblemsOpen(!problemsOpen)}
                    className="flex items-center gap-1 text-slate-600 hover:text-yellow-500 font-medium transition-colors cursor-pointer"
                  >
                    Problémy s <span>{problemsOpen ? '▴' : '▾'}</span>
                  </button>
                  {problemsOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 shadow-lg rounded-lg py-2 z-50">
                      <Link to="#" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Hlava a krk</Link>
                      <Link to="#" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Trup a páteř</Link>
                      <Link to="#" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Paže a ruce</Link>
                      <Link to="#" className="block px-4 py-2 hover:bg-slate-50 text-slate-700">Nohy</Link>
                    </div>
                  )}
                </div>

                <Link to="#" className="text-slate-600 hover:text-yellow-500 font-medium transition-colors">Kurzy</Link>
                <Link to="#" className="text-slate-600 hover:text-yellow-500 font-medium transition-colors">Blog</Link>
                <Link to="#" className="text-slate-600 hover:text-yellow-500 font-medium transition-colors">Kontakt</Link>

            </div>

            {/* Mobile Button (Hamburger) */}
            <div className="flex items-center md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-slate-600 hover:text-slate-900 focus:outline-none"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        )}
                    </svg>
                </button>
            </div>
        </div>
      </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              <Link to="/" className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">Úvod</Link>
              <Link to="/principy" className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">Principy</Link>
              <Link to="/sport" className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">Sport</Link>

              <div>
                <button
                  onClick={() => setProblemsOpen(!problemsOpen)}
                  className="w-full flex items-center justify-center gap-1 px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md"
                >
                  Problémy s <span>{problemsOpen ? '▴' : '▾'}</span>
                </button>

                {problemsOpen && (
                  <div className="bg-slate-50 rounded-lg py-1 mx-4 mb-2">
                    <Link to="#" className="block py-2 text-sm text-slate-500 hover:text-yellow-500">Hlava a krk</Link>
                    <Link to="#" className="block py-2 text-sm text-slate-500 hover:text-yellow-500">Trup a páteř</Link>
                    <Link to="#" className="block py-2 text-sm text-slate-500 hover:text-yellow-500">Paže a ruce</Link>
                    <Link to="#" className="block py-2 text-sm text-slate-500 hover:text-yellow-500">Nohy</Link>
                  </div>
                )}
              </div>

              <Link to="#" className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">Kurzy</Link>
              <Link to="#" className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">Blog</Link>
              <Link to="#" className="block px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-md">Kontakt</Link>
            </div>
          </div>
        )}
    </nav>
  );
}