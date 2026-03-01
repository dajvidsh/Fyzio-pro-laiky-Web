import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [problemsOpen, setProblemsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    setIsOpen(false); // Zavře mobilní menu při změně stránky
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            {/*<div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform">F</div>*/}
            <img src="/logo.svg" alt="Logo" className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform"></img>
            <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">Fyzio<span className="text-yellow-500">pro</span>laiky</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors">Úvod</Link>
            <Link to="/principy" className="text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors">Principy</Link>
            <Link to="/sport" className="text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors">Sport</Link>
            <Link to="/courses" className="text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors">Kurzy</Link>
            <Link to="/blog" className="text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors">Blog</Link>

            {/* Problémy Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProblemsOpen(!problemsOpen)}
                className="flex items-center gap-1 text-slate-600 hover:text-yellow-500 font-bold text-sm transition-colors"
              >
                Problémy {problemsOpen ? '▴' : '▾'}
              </button>
              {problemsOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 z-50">
                  <Link to="/problemy/hlava-krk" className="block px-4 py-2 hover:bg-slate-50 text-sm font-medium" onClick={() => setProblemsOpen(false)}>Hlava a krk</Link>
                  <Link to="/problemy/trup-pater" className="block px-4 py-2 hover:bg-slate-50 text-sm font-medium" onClick={() => setProblemsOpen(false)}>Trup a páteř</Link>
                  <Link to="/problemy/ruce-paze" className="block px-4 py-2 hover:bg-slate-50 text-sm font-medium" onClick={() => setProblemsOpen(false)}>Paže a ruce</Link>
                  <Link to="/problemy/nohy" className="block px-4 py-2 hover:bg-slate-50 text-sm font-medium" onClick={() => setProblemsOpen(false)}>Nohy</Link>
                </div>
              )}
            </div>

            {/* Auth sekce na Desktopu */}
            <div className="flex items-center gap-4 ml-6 border-l border-slate-100 pl-6">
              {user ? (
                <>
                  <Link to="/account" className="text-sm font-bold text-slate-600 hover:text-slate-900">Můj účet</Link>
                  {user.is_admin && (
                    <Link to="/admin" className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-yellow-500 transition-all">Admin</Link>
                  )}
                  <button onClick={handleLogout} className="text-sm font-bold text-red-400 hover:text-red-600">Odhlásit</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-bold text-slate-900">Přihlásit</Link>
                  <Link to="/register" className="bg-yellow-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-400/20">Registrace</Link>
                </>
              )}
            </div>
          </div>

          {/* Hamburger (Mobile) */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-50 p-6 space-y-4 shadow-inner">
          <Link to="/" className="block text-lg font-bold text-slate-900">Úvod</Link>
          <Link to="/principy" className="block text-lg font-bold text-slate-900">Principy</Link>
          <Link to="/sport" className="block text-lg font-bold text-slate-900">Sport</Link>
          <Link to="/courses" className="block text-lg font-bold text-slate-900">Kurzy</Link>
          <Link to="/blog" className="block text-lg font-bold text-slate-900">Blog</Link>

            {/* Problémy Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProblemsOpen(!problemsOpen)}
                className="block text-lg font-bold text-slate-900"
              >
                Problémy {problemsOpen ? '▴' : '▾'}
              </button>
              {problemsOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-2xl py-2 z-50">
                  <Link to="/problemy/hlava-krk" className="block px-4 py-2 hover:bg-slate-50 text-sm font-medium" onClick={() => setProblemsOpen(false)}>Hlava a krk</Link>
                  <Link to="/problemy/trup-pater" className="block px-4 py-2 hover:bg-slate-50 text-sm font-medium" onClick={() => setProblemsOpen(false)}>Trup a páteř</Link>
                  <Link to="/problemy/ruce-paze" className="block px-4 py-2 hover:bg-slate-50 text-sm font-medium" onClick={() => setProblemsOpen(false)}>Paže a ruce</Link>
                  <Link to="/problemy/nohy" className="block px-4 py-2 hover:bg-slate-50 text-sm font-medium" onClick={() => setProblemsOpen(false)}>Nohy</Link>
                </div>
              )}
            </div>

          <hr className="border-slate-50" />
          {user ? (
            <div className="space-y-4">
              <Link to="/account" className="block text-lg font-bold text-slate-900">Můj účet</Link>
              {user.is_admin && <Link to="/admin" className="block text-lg font-bold text-yellow-500">Administrace</Link>}
              <button onClick={handleLogout} className="text-lg font-bold text-red-500">Odhlásit se</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-2">
              <Link to="/login" className="text-center font-bold py-3 border border-slate-200 rounded-2xl">Přihlásit se</Link>
              <Link to="/register" className="text-center font-bold py-3 bg-yellow-400 text-white rounded-2xl shadow-lg shadow-yellow-400/20">Vytvořit účet</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}