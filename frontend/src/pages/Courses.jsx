import React from 'react';

export default function Courses() {

    return(
        <div className="bg-white min-h-screen">
            <article className="max-w-2xl mx-auto py-20 px-6">

            {/* Header */}
            <header className="mb-16">
              <div className="w-12 h-1 bg-yellow-400 mb-6"></div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                Kurzy
              </h1>
              <p className="text-xl text-slate-500 font-light mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              {/*<div className="text-sm text-slate-400 font-medium uppercase tracking-widest">*/}
              {/*  Čas čtení: 10 minut*/}
              {/*</div>*/}
            </header>

            </article>
        </div>

    );
}