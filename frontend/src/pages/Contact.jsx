import React from 'react';

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto py-20 px-6">

        {/* Identická hlavička jako v původním návrhu */}
        <header className="mb-16">
          <div className="w-12 h-1 bg-yellow-400 mb-6"></div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Kontakt
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            Máte dotaz k cvikům, nebo se chcete domluvit na individuální konzultaci? Ozvěte se mi přímo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Levá strana: Informace (zachováno) */}
          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-4">Lokalita</h3>
              <p className="text-xl text-slate-800 font-medium">
                Praha / Online video konzultace <br />
                <span className="text-slate-500 font-light text-lg">Cvičit můžeme i na dálku.</span>
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <p className="text-slate-600 italic font-light">
                "Nejrychlejší cesta k úlevě od bolesti je začít. Na zprávy odpovídám zpravidla do 24 hodin."
              </p>
              <p className="mt-4 font-bold text-slate-900">— Radim</p>
            </div>
          </div>

          {/* Pravá strana: Přímé kontakty */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tighter">
              Vyberte si způsob kontaktu
            </label>

            {/* WhatsApp */}
            <a
              href="https://wa.me/420123456789"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 hover:border-green-500 transition-all group"
            >
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Rychlá zpráva</span>
                <span className="text-lg font-bold text-slate-900">WhatsApp</span>
              </div>
              <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
            </a>

            {/* Klasický hovor - NOVÉ */}
            <a
              href="tel:+420123456789"
              className="flex items-center justify-between w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 hover:border-yellow-500 transition-all group"
            >
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Zavolat přímo</span>
                <span className="text-lg font-bold text-slate-900">+420 123 456 789</span>
              </div>
              <span className="text-2xl group-hover:scale-110 transition-transform">📞</span>
            </a>

            {/* E-mail */}
            <a
              href="mailto:info@fyzioprolaiky.cz"
              className="flex items-center justify-between w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 hover:border-blue-500 transition-all group"
            >
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">E-mailová adresa</span>
                <span className="text-lg font-bold text-slate-900">info@fyzioprolaiky.cz</span>
              </div>
              <span className="text-2xl group-hover:scale-110 transition-transform">✉️</span>
            </a>

            <div className="pt-6">
               <p className="text-sm text-slate-400 font-light italic">
                 Kliknutím na kartu se vám otevře příslušná aplikace.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}