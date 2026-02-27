import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // FastAPI vyžaduje form-data pro tento typ přihlášení
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const res = await fetch('http://localhost:8000/api/token', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.access_token); // Uložíme si "vstupenku"
      navigate('/admin'); // Po přihlášení šup do administrace
    } else {
      setError('Neplatné údaje. Zkuste to znovu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100">
        <h1 className="text-3xl font-black mb-2 text-slate-900">Přihlášení</h1>
        <p className="text-slate-500 mb-8">Vítejte zpět, pane fyzioterapeute.</p>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold">{error}</div>}

        <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-600/10" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Heslo" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 mb-8 outline-none focus:ring-2 focus:ring-blue-600/10" value={password} onChange={e => setPassword(e.target.value)} required />

        <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all">
          Přihlásit se
        </button>
        <p className="text-center mt-6 text-sm text-slate-400">
          Nemáte účet? <Link to="/register" className="text-yellow-500 font-bold underline">Vytvořit účet</Link>
        </p>
      </form>
    </div>
  );
}