import React from 'react';
import { Heart, Moon, ArrowUp } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`mt-20 border-t transition-colors ${
      isDarkMode
        ? 'bg-[#10070c] border-rose-950/60 text-rose-300/80'
        : 'bg-rose-50/50 border-rose-200/60 text-slate-600'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div>
            <div className="font-serif text-xl font-bold text-rose-500 flex items-center justify-center md:justify-start gap-1.5">
              <span>Nummu</span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Shaisuu</span>
            </div>
            <p className="text-xs text-rose-300/70 mt-1 max-w-md">
              A private digital love journal for Mohammed Numaan Ali & Shaistah Khan. Established 15 May 2026.
            </p>
            <div className="text-[11px] text-rose-500/80 mt-1">
              Warangal (Nummu) ↔ Bihar (Shaisuu) · Dua, Nuh & Our Future Nikah 2032 InshaAllah 💍
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs text-rose-300/60 flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>Every 15th is our day</span>
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-full border border-rose-500/20 text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-rose-500/10 text-center text-[11px] text-rose-400/50">
          Made with infinite love, patience, and duas · All rights reserved for Nummu & Shaisuu ❤️
        </div>
      </div>
    </footer>
  );
};
