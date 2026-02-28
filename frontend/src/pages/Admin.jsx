import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";

// POMOCNÁ FUNKCE: Dekóduje token a zjistí, zda je uživatel admin
const getIsAdminFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.is_admin === true;
  } catch (e) {
    return false;
  }
};

export default function Admin() {
  const [isChecking, setIsChecking] = useState(true);
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: '', excerpt: '', content: '', category: 'Cvičení', image: '', is_premium: false
  });

  const navigate = useNavigate();
  const latestArticles = [...articles].sort((a, b) => b.id - a.id);

  // Načítání dat při startu
  useEffect(() => {
    const isAdmin = getIsAdminFromToken();
    if (!isAdmin) {
      navigate('/', { replace: true });
    } else {
      setIsChecking(false);
      fetchArticles();
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = () => {
  const token = localStorage.getItem('token');
  console.log("Stahuji uživatele s tokenem:", token); // DEBUG

  fetch('http://10.0.1.54:8000/api/users', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => {
    console.log("Status odpovědi:", res.status); // DEBUG
    if (!res.ok) return res.json().then(err => { throw err; });
    return res.json();
  })
  .then(data => {
    console.log("Data z backendu:", data); // DEBUG
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error("Data nejsou pole!", data);
      setUsers([]);
    }
  })
  .catch(err => {
    console.error("Chyba při fetchování uživatelů:", err);
    setUsers([]);
  });
};

  const fetchArticles = () => {
    fetch('http://10.0.1.54:8000/api/articles')
      .then(res => res.json())
      .then(setArticles);
  };

  const togglePremium = (userId) => {
    const token = localStorage.getItem('token');
    fetch(`http://10.0.1.54:8000/api/users/${userId}/toggle-premium`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(fetchUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // 1. Získáme token

    fetch('http://10.0.1.54:8000/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 2. Přidáme ho do hlavičky
      },
      body: JSON.stringify({ ...newArticle, date: new Date().toLocaleDateString('cs-CZ') }),
    }).then((res) => {
      if (res.ok) {
        fetchArticles();
        setNewArticle({ title: '', excerpt: '', content: '', category: 'Cvičení', image: '', is_premium: false });
      } else {
        alert("Chyba při ukládání: Pravděpodobně vypršelo přihlášení.");
      }
    });
  };

const handleDelete = (id) => {
  if (confirm('Smazat tento článek?')) {
    const token = localStorage.getItem('token'); // Nezapomenout i tady!

    fetch(`http://10.0.1.54:8000/api/articles/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(() => {
      fetchArticles();
    });
  }
};

  const modules = {
    toolbar: [[{ 'header': [2, 3, false] }], ['bold', 'italic', 'underline'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link', 'clean']],
  };

  const inputStyle = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all mb-4";

  if (isChecking) return null;

  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* HORNÍ SEKCE: Správa obsahu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

          {/* LEVÁ STRANA: Formulář */}
          <div>
            <h1 className="text-3xl font-black mb-2 text-slate-900">Nový příspěvek</h1>
            <p className="text-slate-500 mb-8 font-light">Přidejte nový obsah pro své klienty.</p>

            <form onSubmit={handleSubmit} className="space-y-2">
              <input type="text" placeholder="Název článku" className={inputStyle} value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})} required />
              <input type="text" placeholder="URL obrázku" className={inputStyle} value={newArticle.image} onChange={e => setNewArticle({...newArticle, image: e.target.value})} />

              <div className="flex gap-4">
                <input type="text" placeholder="Kategorie" className={inputStyle} value={newArticle.category} onChange={e => setNewArticle({...newArticle, category: e.target.value})} />
                <div className="flex items-center gap-3 px-4 h-12 bg-slate-50 rounded-2xl border border-slate-200 mb-4">
                  <input type="checkbox" className="w-5 h-5 accent-yellow-500" checked={newArticle.is_premium} onChange={e => setNewArticle({...newArticle, is_premium: e.target.checked})} />
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-tighter">Premium</span>
                </div>
              </div>

              <textarea placeholder="Krátké shrnutí..." className={`${inputStyle} h-24`} value={newArticle.excerpt} onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})} required />

              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-2">Hlavní text článku</label>
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                  <ReactQuill theme="snow" value={newArticle.content} onChange={(content) => setNewArticle({...newArticle, content})} modules={modules} placeholder="Psát můžete zde..." />
                </div>
              </div>

              <button type="submit" className="w-full bg-yellow-500 text-white py-4 rounded-2xl font-bold hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-600/20">
                Publikovat nyní
              </button>
            </form>
          </div>

          {/* PRAVÁ STRANA: Seznam článků */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-slate-900 flex items-center gap-3">Vaše články <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-full">{articles.length}</span></h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
              {latestArticles.map(art => (
                <div key={art.id} className="group p-5 bg-white border border-slate-100 rounded-[2rem] hover:border-yellow-200 hover:shadow-xl transition-all flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                      <img src={art.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">{art.title}</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-widest flex items-center gap-2">
                        {art.category} {art.is_premium && <span className="text-yellow-500">★ Premium</span>}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(art.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DOLNÍ SEKCE: Správa uživatelů */}
        <div className="border-t border-slate-100 pt-16">
          <h2 className="text-2xl font-bold mb-8 text-slate-900">Správa uživatelů & Premium</h2>
          <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Email uživatele</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Aktuální Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400 text-right">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Array.isArray(users) && users.filter(u => !u.is_admin).map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.has_premium ? (
                        <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">Premium Aktivní</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-400 text-[10px] font-black px-3 py-1 rounded-full uppercase">Základní účet</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => togglePremium(user.id)}
                        className={`text-sm font-bold px-4 py-2 rounded-xl transition-all ${user.has_premium ? 'text-red-500 hover:bg-red-50' : 'text-blue-600 hover:bg-blue-50'}`}
                      >
                        {user.has_premium ? 'Deaktivovat Premium' : 'Aktivovat Premium'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}