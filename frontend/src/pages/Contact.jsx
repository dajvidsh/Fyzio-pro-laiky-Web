import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tady to časem napojíme na tvůj FastAPI backend
    console.log("Odesláno:", formData);
    setStatus('Zpráva byla úspěšně odeslána! Ozvu se vám co nejdříve.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto py-20 px-6">

        <header className="mb-16">
          <div className="w-12 h-1 bg-yellow-400 mb-6"></div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Kontakt
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            Máte dotaz k cvikům, nebo se chcete domluvit na individuální konzultaci? Napište mi.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Levá strana: Informace */}
          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-4">E-mail</h3>
              <p className="text-xl text-slate-800 font-medium">info@fyzioprolaiky.cz</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-4">Lokalita</h3>
              <p className="text-xl text-slate-800 font-medium">
                Praha / Online video konzultace <br />
                <span className="text-slate-500 font-light text-lg">Cvičit můžeme i na dálku.</span>
              </p>
            </div>

            {/*<div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">*/}
            {/*  <p className="text-slate-600 italic font-light">*/}
            {/*    "Nejrychlejší cesta k úlevě od bolesti je začít. Odpovídám většinou do 24 hodin."*/}
            {/*  </p>*/}
            {/*  <p className="mt-4 font-bold text-slate-900">— Radim</p>*/}
            {/*</div>*/}
          </div>

          {/* Pravá strana: Formulář */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">Jméno</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="Vaše jméno"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">E-mail</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="vas@email.cz"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">Zpráva</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  placeholder="S čím vám mohu pomoci?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-yellow-500 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/10"
              >
                Odeslat zprávu
              </button>

              {status && (
                <p className="text-green-600 font-medium text-center animate-pulse">{status}</p>
              )}
            </form>

          </div>

        </div>
      </div>
    </div>
  );
}