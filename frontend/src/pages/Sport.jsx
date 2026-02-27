import React from 'react';
import { Link } from 'react-router-dom';

export default function Sport() {
  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-2xl mx-auto py-20 px-6">

        {/* Header - Konzistentní s Principy */}
        <header className="mb-16">
          <div className="w-12 h-1 bg-yellow-400 mb-6"></div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Sport a <span className="text-yellow-500">pohyb</span>
          </h1>
          <p className="text-xl text-slate-500 font-light mb-4">
            Jak správně sportovat a předcházet zraněním.
          </p>
          <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">
            Čas čtení: 10 minut
          </div>
        </header>

        <div className="space-y-16 text-slate-700 leading-relaxed text-lg">

          {/* Sekce 01: Rozcvičení */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-yellow-500 font-black text-3xl">01</span>
              Rozcvičení před sportem
            </h2>
            <p className="mb-6">
              Správné rozcvičení připraví tělo na následující zátěž, zvýší prokrvení svalů a sníží riziko zranění. Rozcvičení by mělo trvat <strong>minimálně 10–15 minut</strong> a zahrnovat:
            </p>
            <ul className="space-y-3 pl-5 border-l-2 border-slate-100">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">•</span> Lehkou aerobní aktivitu (běh, kolo, švihadlo)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">•</span> Dynamické protažení hlavních svalových skupin
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold">•</span> Aktivaci stabilizačních svalů
              </li>
            </ul>
          </section>

          {/* Sekce 02: Běh */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-yellow-500 font-black text-3xl">02</span>
              Běh
            </h2>
            <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wide">Správná technika běhu</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Vzpřímený postoj s mírným předklonem', 'Dopady pod těžištěm těla', 'Relaxovaná ramena a ruce', 'Pravidelné dýchání'].map((item) => (
                <li key={item} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Sekce 03: Silový trénink */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-yellow-500 font-black text-3xl">03</span>
              Silový trénink
            </h2>
            <p className="mb-8 italic text-slate-500 border-l-4 border-yellow-400 pl-6">
              Silový trénink je důležitý pro všechny věkové kategorie. Pomáhá udržovat svalovou hmotu a zlepšuje metabolismus.
            </p>

            <div className="grid gap-8">
              <div className="group">
                <h4 className="text-yellow-500 font-bold mb-2 tracking-wide uppercase text-xs">Pro začátečníky</h4>
                <p>Začněte s cviky s vlastní váhou těla. Zaměřte se na <strong>správnou techniku</strong> před přidáváním zátěže.</p>
              </div>
              <div className="group">
                <h4 className="text-yellow-500 font-bold mb-2 tracking-wide uppercase text-xs">Pro pokročilé</h4>
                <p>Postupně zvyšujte zátěž, dbejte na pestrost cvičení a pravidelně měňte tréninkový plán.</p>
              </div>
            </div>
          </section>

          {/* Sekce 04: Regenerace */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-yellow-500 font-black text-3xl">04</span>
              Regenerace po sportu
            </h2>
            <p className="mb-6">
              Regenerace je stejně důležitá jako samotný trénink. Po sportovní aktivitě nezapomeňte:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-medium">Zpomalit a vydýchat se</div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-medium">Lehké protažení</div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-medium">Doplnit tekutiny</div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-medium">Dostatečný příjem živin</div>
            </div>
          </section>

        </div>

        {/* Navigace zpět */}
        <div className="mt-20 pt-10 border-t border-slate-100">
           <Link to="/" className="text-yellow-500 font-bold hover:underline transition-all inline-flex items-center gap-2">
             ← Zpět na úvodní stranu
           </Link>
        </div>

      </article>
    </div>
  );
}