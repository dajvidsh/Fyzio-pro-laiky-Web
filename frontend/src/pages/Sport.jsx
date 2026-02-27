import React from 'react';
import { Link } from 'react-router-dom';

export default function Sport() {
  return (
    <div className="bg-white min-h-screen">
      <article className="max-w-2xl mx-auto py-20 px-6">

        {/* Header - Identický styl jako Principy */}
        <header className="mb-16">
          <div className="w-12 h-1 bg-yellow-400 mb-6"></div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-6">
            Sport bez <br/>
            <span className="text-yellow-500">limitů a zranění</span>
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            Sport by měl tělo rozvíjet, ne ho ničit. Ukážu vám, jak efektivně propojit trénink s chytrou fyzioterapií.
          </p>
        </header>

        {/* Sekce - Identický styl jako Principy */}
        <div className="space-y-12 text-slate-700 leading-relaxed text-lg">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="text-yellow-500 font-black">01</span>
              Chytrý Warm-up
            </h2>
            <p>
              Zapomeňte na statické protahování před výkonem. Tělo potřebuje <strong>dynamickou aktivaci</strong>. Naučím vás, jak „probudit“ stabilizační svaly, aby vaše klouby byly v bezpečí i při maximálním zatížení.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="text-yellow-500 font-black">02</span>
              Kompenzace zátěže
            </h2>
            <p>
              Každý sport jednostranně zatěžuje tělo – ať už běháte, hrajete tenis nebo zvedáte činky. Klíčem k dlouhověkosti ve sportu je <strong>vyrovnání těchto disbalancí</strong> dříve, než se promění v chronický zánět nebo bolest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="text-yellow-500 font-black">03</span>
              Vnímání únavy
            </h2>
            <p>
              Bolest při sportu není nepřítel, kterého je třeba umlčet práškem. Je to <strong>zpětná vazba</strong>. Učím sportovce rozpoznat rozdíl mezi „dobrou“ tréninkovou únavou a signálem, že se blíží zranění.
            </p>
          </section>

          {/* Obrázek - Stejný styl (grayscale, zaoblení) */}
          <div className="py-8">
            <div className="h-64 rounded-3xl overflow-hidden bg-slate-100 border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
                alt="Sportovní příprava"
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
          </div>

          <section>
            <p className="font-medium text-slate-900">
              Můj přístup ke sportu není o zákazu pohybu, ale o jeho optimalizaci. Chci, abyste se mohli věnovat tomu, co milujete, co nejdéle to půjde.
            </p>
          </section>
        </div>

        {/* Footer link - místo buttonu používáme Link pro bleskový přechod */}
        <div className="mt-20 pt-10 border-t border-slate-100">
           <Link to="/" className="text-yellow-500 font-bold hover:underline transition-all inline-block">
             ← Zpět na hlavní stranu
           </Link>
        </div>

      </article>
    </div>
  );
}