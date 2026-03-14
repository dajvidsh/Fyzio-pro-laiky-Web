import React from 'react';

export default function AboutMe() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Levá strana: Fotka v kruhu */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80">

              {/* Hlavní obal fotky */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D1059985526148554&f=1&nofb=1&ipt=7be18ef6647c1f11f7388a3f1e4b683822408bb4f15ab3a1054243b77507e495"
                  alt="Fyzioterapeut Radim"

                  className="w-full h-full object-cover shadow-inner"
                />
              </div>
            </div>

            {/* Malý "badge" u fotky */}
          </div>

          {/* Pravá strana: Text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Ahoj já jsem <span className="text-yellow-500 text-nowrap underline decoration-yellow-400 underline-offset-8">Radim</span>, <br />
              váš průvodce zdravým pohybem
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed italic">
              "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure."
            </p>

            <div className="space-y-4">

              {/* Seznam specializací */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Bolesti zad', 'Sportovní úrazy', 'Ergonomie', 'Prevence'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}