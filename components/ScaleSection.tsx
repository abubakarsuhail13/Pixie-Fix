
import React from 'react';
import { LANGUAGES } from '../constants';

export const ScaleSection: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-[#121212] mb-12">Universal Service, Local Presence</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {LANGUAGES.map(lang => (
            <span key={lang.code} className="px-6 py-2 rounded-full border border-slate-100 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all cursor-default">
              {lang.name}
            </span>
          ))}
        </div>

        <div className="relative inline-block">
          <img 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200" 
            alt="Diverse Professionals" 
            className="rounded-[40px] max-h-[500px] w-full object-cover shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-[40px]"></div>
          <div className="absolute bottom-10 left-10 text-left text-white max-w-md">
            <h3 className="text-2xl font-bold mb-2">Designed for Every Community</h3>
            <p className="text-white/80">Connecting homeowners with vetted pros from all backgrounds, speaking your language, ensuring trust at every step.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
