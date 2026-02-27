import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Hesla se neshodují.');
      return;
    }

    const res = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, hashed_password: password }), // Posíláme čisté heslo, backend ho zahashuje
    });

    if (res.ok) {
      alert('Registrace proběhla úspěšně! Nyní se můžete přihlásit.');
      navigate('/login');
    } else {
      const data = await res.json();
      setError(data.detail || 'Něco se nepovedlo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <form onSubmit={handleRegister} className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-slate-100">
        <h1 className="text-3xl font-black mb-2 text-slate-900">Registrace</h1>
        <p className="text-slate-500 mb-8 font-light">Získejte přístup k prémiovému obsahu.</p>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold">{error}</div>}

        <input type="email" placeholder="Váš email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-600/10" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Heslo" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-600/10" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" placeholder="Heslo znovu" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 mb-8 outline-none focus:ring-2 focus:ring-blue-600/10" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

        <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-blue-600/20">
          Zaregistrovat se
        </button>

        <p className="text-center mt-6 text-sm text-slate-400">
          Již máte účet? <Link to="/login" className="text-yellow-500 font-bold underline">Přihlaste se</Link>
        </p>
      </form>
    </div>
  );
}