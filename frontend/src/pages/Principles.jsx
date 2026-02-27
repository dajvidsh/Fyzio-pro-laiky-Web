import React from 'react';
import {Link} from "react-router-dom";

export default function Principles() {
  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-2xl mx-auto py-20 px-6">

        <header className="mb-16">
          <div className="w-12 h-1 bg-yellow-400 mb-6"></div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Principy <span className="text-yellow-500">Fyzioterapie</span>
          </h1>
          <p className="text-xl text-slate-500 font-light mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">
            Čas čtení: 8 minut
          </div>
        </header>

        <div className="space-y-12 text-slate-700 leading-relaxed text-lg">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="text-yellow-500 font-black text-3xl">01</span>
              Zpomalení
            </h2>
            <p>
              Většina lidí se snaží bolest „přecvičit“ rychlostí a silou. Jenže mozek v rychlosti nestíhá vnímat chyby.
              Když pohyb zpomalíte, začnete cítit, kde vzniká napětí a které svaly ve skutečnosti nepracují. <strong>Kvalita vždy vítězí nad kvantitou.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="text-yellow-500 font-black text-3xl">02</span>
              Dech jako podpora
            </h2>
            <p>
              Všimněte si, jak dýcháte, když vás něco bolí. Krátce a jen do hrudníku. Správný nádech dolů do břicha a boků ale dokáže „nafouknout“ vnitřní oporu pro vaši páteř. Je to nejlevnější a nejúčinnější rehabilitace na světě.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="text-yellow-500 font-black text-3xl">03</span>
              Pravidelnost
            </h2>
            <p>
              Zapomeňte na hodinu cvičení jednou týdně. Tělo potřebuje pravidelný signál. <strong>Pět minut každé ráno</strong> má na nervovou soustavu větší vliv než jakýkoliv víkendový seminář. Budujeme návyk, který se stane součástí vašeho dne.
            </p>
          </section>

          <div className="py-8">
            <div className="h-64 rounded-3xl overflow-hidden bg-slate-100 border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
                alt="Detail cvičení"
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
          </div>

          <section>
            <p className="font-medium text-slate-900">
              Cílem není být dokonalý sportovec, ale rozumět tomu, co se v těle děje, když sedíte, chodíte nebo zvedáte nákup. To je skutečná fyzioterapie pro život.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100">
             <Link to='/' className="text-yellow-500 font-bold hover:underline transition-all">
             ← Zpět na hlavní stranu
             </Link>
        </div>

      </article>
    </div>
  );
}