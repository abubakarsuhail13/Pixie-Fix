
import React from 'react';

interface NavbarProps {
  onStart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 bg-[#121212] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#121212]">PIXIE FIX</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">How It Works</a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">Services</a>
            <a href="#tech" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">Technology</a>
          </div>

          <button 
            onClick={onStart}
            className="px-6 py-3 bg-[#121212] text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95"
          >
            Get an Instant Quote
          </button>
        </div>
      </div>
    </nav>
  );
};
