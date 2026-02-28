import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState(null);
  const [payment, setPayment] = useState(null);

  // Stavy pro změnu hesla
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Stavy pro UI (načítání a zprávy)
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Pokud není token, uživatel tu nemá co dělat
    if (!token) {
      navigate('/login');
      return;
    }

    // Načtení dat o uživateli a platbě paralelně
    Promise.all([
      fetch('http://10.0.1.54:8000/api/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        if (!res.ok) throw new Error("Neautorizováno");
        return res.json();
      }),
      fetch('http://10.0.1.54:8000/api/payment-info').then(res => res.json())
    ])
    .then(([userData, paymentData]) => {
      setUser(userData);
      setPayment(paymentData);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [token, navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    // Validace na frontendu
    if (newPassword !== confirmPassword) {
      setMsg({ type: 'error', text: 'Hesla se neshodují.' });
      return;
    }

    if (newPassword.length < 6) {
      setMsg({ type: 'error', text: 'Heslo musí mít alespoň 6 znaků.' });
      return;
    }

    try {
      const res = await fetch('http://10.0.1.54:8000/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ new_password: newPassword })
      });

      if (res.ok) {
        setMsg({ type: 'success', text: 'Heslo bylo úspěšně změněno!' });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMsg({ type: 'error', text: 'Něco se nepovedlo. Zkuste to znovu.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Server neodpovídá.' });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse font-black text-slate-200 tracking-widest uppercase">Načítám profil...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* HLAVIČKA PROFILU */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Můj účet</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              {user.email}
              {user.is_admin && <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-md uppercase font-black">Admin</span>}
            </p>
          </div>
          <button
            onClick={() => { localStorage.removeItem('token'); navigate('/'); }}
            className="text-sm font-bold text-red-400 hover:text-red-600 transition-colors"
          >
            Odhlásit se z účtu
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* KARTA 1: PŘEDPLATNÉ A STATUS */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-white text-sm">★</span>
              Stav členství
            </h2>

            {user.has_premium ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-green-50 border border-green-100 rounded-[2rem] p-10 text-center">
                <span className="text-5xl mb-4">🏆</span>
                <h3 className="text-green-800 font-black uppercase text-sm tracking-widest mb-2">Premium aktivováno</h3>
                <p className="text-green-600/70 text-sm leading-relaxed">
                  Máte plný přístup ke všem cvičením a odborným článkům bez omezení.
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Momentálně využíváte základní verzi. Pro aktivaci Premium přístupu proveďte platbu:
                </p>

                {payment && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-100 flex justify-center shadow-inner">
                      {/*<img src={payment.qr_code_url} alt="QR Platba" className="w-48 h-48 mix-blend-multiply" />*/}
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2023%2F02%2F28%2F01%2F50%2Fqr-code-7819652_1280.jpg&f=1&nofb=1&ipt=a787aa39cddc5f6d213c24b5c09d9fb853e1575038ecf08f0a10bc2f31de9b64" alt=""/>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl space-y-2 border border-slate-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase">Částka</span>
                        <span className="text-slate-900 font-black">{payment.price} CZK</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase">Zpráva pro příjemce</span>
                        <span className="text-blue-600 font-black">{user.email}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 italic text-center leading-relaxed">
                      {payment.instructions}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* KARTA 2: ZABEZPEČENÍ */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm">⚙</span>
              Změna hesla
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Nové heslo</label>
                <input
                  type="password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 transition-all"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Potvrzení hesla</label>
                <input
                  type="password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {msg.text && (
                <div className={`p-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300 ${
                  msg.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {msg.type === 'success' ? '✓ ' : '✕ '} {msg.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
              >
                Aktualizovat heslo
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}