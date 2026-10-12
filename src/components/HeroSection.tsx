import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Moon, MapPin } from 'lucide-react';
import { getElapsedTime, ElapsedTime } from '../utils/time';
import { ROTATING_QUOTES } from '../data/initialData';

interface HeroSectionProps {
  isDarkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isDarkMode }) => {
  const [elapsed, setElapsed] = useState<ElapsedTime>(() => getElapsedTime());
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Live timer ticking every second
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(getElapsedTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotating romantic quotes every 5 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ROTATING_QUOTES.length);
    }, 5000);
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Kicker: Clean unboxed metadata */}
        <div className="text-center mb-4">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${
            isDarkMode ? 'text-rose-400' : 'text-rose-600'
          }`}>
            <span>Warangal ↔ Bihar</span>
            <span aria-hidden="true">·</span>
            <span>Est. 15 May 2026</span>
            <span aria-hidden="true">·</span>
            <span>Asia/Kolkata</span>
          </div>
        </div>

        {/* Hero Title with glowing animated heart */}
        <div className="text-center mb-4">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
            <span className={`${isDarkMode ? 'text-rose-100' : 'text-slate-900'} drop-shadow-xs`}>
              Nummu
            </span>
            <span className="relative inline-flex items-center justify-center mx-1">
              <span className="absolute -inset-1.5 bg-rose-400/20 rounded-full blur-sm animate-ping opacity-30" />
              <Heart className="w-9 h-9 sm:w-14 sm:h-14 fill-rose-500 text-rose-500 animate-gentle-pulse drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]" />
            </span>
            <span className={`${isDarkMode ? 'text-rose-100' : 'text-slate-900'} drop-shadow-xs`}>
              Shaisuu
            </span>
          </h1>

          <p className={`mt-4 text-lg sm:text-xl md:text-2xl font-serif italic max-w-2xl mx-auto text-balance ${
            isDarkMode ? 'text-rose-300/90' : 'text-slate-600'
          }`}>
            “Two hearts, one journey, and a future we pray for.”
          </p>

          <p className={`mt-1 text-sm font-medium tracking-wide ${
            isDarkMode ? 'text-rose-400/80' : 'text-rose-600/80'
          }`}>
            Since 15 May 2026
          </p>
        </div>

        {/* Rotating Romantic Quotes Box */}
        <div className="my-6 max-w-xl mx-auto text-center">
          <div className={`py-2.5 px-4 rounded-xl transition-all duration-700 ${
            isDarkMode ? 'bg-rose-950/30 border border-rose-900/30' : 'bg-rose-50/80 border border-rose-200/60 shadow-xs'
          }`}>
            <p className={`font-script text-xl sm:text-2xl tracking-wide transition-opacity duration-500 ${
              isDarkMode ? 'text-rose-300' : 'text-rose-700'
            }`}>
              {ROTATING_QUOTES[quoteIndex]}
            </p>
          </div>
        </div>

        {/* Live Relationship Timer Card */}
        <div className={`mt-8 p-6 sm:p-8 rounded-3xl shadow-lg backdrop-blur-xl transition-all duration-300 ${
          isDarkMode
            ? 'glass-panel-dark shadow-rose-950/40'
            : 'glass-panel-light shadow-rose-100/50'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-rose-500/15 gap-2">
            <div>
              <h2 className={`font-serif text-xl sm:text-2xl font-semibold flex items-center gap-2 ${
                isDarkMode ? 'text-rose-100' : 'text-slate-800'
              }`}>
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Our Time Together</span>
              </h2>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                Every second counted since 15 May 2026 00:00:00 IST
              </p>
            </div>
            <div className={`text-xs font-mono self-start sm:self-auto flex items-center gap-1.5 ${
              isDarkMode ? 'text-rose-300' : 'text-rose-600'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Ticking</span>
            </div>
          </div>

          {/* Grid of Time Units (Tabular figures, responsive) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            
            {/* Years */}
            <div className={`p-4 rounded-xl text-center flex flex-col justify-center ${
              isDarkMode ? 'bg-rose-950/40 border border-rose-900/30' : 'bg-white/90 border border-rose-150 shadow-xs'
            }`}>
              <div className={`font-mono tabular-nums text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                {elapsed.years}
              </div>
              <div className={`text-xs font-medium uppercase tracking-wider mt-1 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                {elapsed.years === 1 ? 'Year' : 'Years'}
              </div>
            </div>

            {/* Months */}
            <div className={`p-4 rounded-xl text-center flex flex-col justify-center ${
              isDarkMode ? 'bg-rose-950/40 border border-rose-900/30' : 'bg-white/90 border border-rose-150 shadow-xs'
            }`}>
              <div className={`font-mono tabular-nums text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                {elapsed.months}
              </div>
              <div className={`text-xs font-medium uppercase tracking-wider mt-1 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                {elapsed.months === 1 ? 'Month' : 'Months'}
              </div>
            </div>

            {/* Days Remaining / Total */}
            <div className={`p-4 rounded-xl text-center flex flex-col justify-center ${
              isDarkMode ? 'bg-rose-950/40 border border-rose-900/30' : 'bg-white/90 border border-rose-150 shadow-xs'
            }`}>
              <div className={`font-mono tabular-nums text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                {elapsed.days}
              </div>
              <div className={`text-xs font-medium uppercase tracking-wider mt-1 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                Days
              </div>
              <div className={`text-[10px] font-mono mt-0.5 ${isDarkMode ? 'text-rose-400/60' : 'text-slate-400'}`}>
                ({elapsed.totalDays} Total)
              </div>
            </div>

            {/* Hours */}
            <div className={`p-4 rounded-xl text-center flex flex-col justify-center ${
              isDarkMode ? 'bg-rose-950/40 border border-rose-900/30' : 'bg-white/90 border border-rose-150 shadow-xs'
            }`}>
              <div className={`font-mono tabular-nums text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                {String(elapsed.hours).padStart(2, '0')}
              </div>
              <div className={`text-xs font-medium uppercase tracking-wider mt-1 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                Hours
              </div>
            </div>

            {/* Minutes */}
            <div className={`p-4 rounded-xl text-center flex flex-col justify-center ${
              isDarkMode ? 'bg-rose-950/40 border border-rose-900/30' : 'bg-white/90 border border-rose-150 shadow-xs'
            }`}>
              <div className={`font-mono tabular-nums text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                {String(elapsed.minutes).padStart(2, '0')}
              </div>
              <div className={`text-xs font-medium uppercase tracking-wider mt-1 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                Minutes
              </div>
            </div>

            {/* Seconds */}
            <div className={`p-4 rounded-xl text-center flex flex-col justify-center ${
              isDarkMode ? 'bg-rose-900/40 border border-rose-800/40 text-pink-300' : 'bg-rose-100/80 border border-rose-200 text-rose-600'
            }`}>
              <div className="font-mono tabular-nums text-3xl sm:text-4xl font-bold">
                {String(elapsed.seconds).padStart(2, '0')}
              </div>
              <div className={`text-xs font-medium uppercase tracking-wider mt-1 ${isDarkMode ? 'text-pink-300/80' : 'text-rose-700'}`}>
                Seconds
              </div>
            </div>

          </div>

          {/* Quick couple facts bar */}
          <div className="mt-6 pt-4 border-t border-rose-500/15 flex flex-wrap items-center justify-between text-xs gap-3">
            <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-rose-300/80' : 'text-slate-600'}`}>
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Nummu (Warangal) & Shaisuu (Bihar)</span>
            </div>
            <div className={`flex items-center gap-3 ${isDarkMode ? 'text-rose-300/80' : 'text-slate-600'}`}>
              <span className="flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-amber-500" />
                <span>Monthly 15th Anniversary Tradition</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Dream Nikah: 2032 InshaAllah</span>
            </div>
          </div>
        </div>

        {/* Visual Romance Card Split */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 rounded-2xl overflow-hidden relative shadow-md group border border-rose-200/40 max-h-80">
            <img
              src="/src/assets/images/hero_romantic_stars_1791766982647.jpg"
              alt="Nummu and Shaisuu under the romantic starlit sky"
              referrerPolicy="no-referrer"
              className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-6">
              <p className="font-script text-2xl sm:text-3xl text-rose-100 drop-shadow">
                “Every breath between Warangal and Bihar brings us closer.”
              </p>
              <p className="text-xs text-rose-200/90 mt-1">
                Two souls united across distance, dreaming of Dua, Nuh, and a lifetime of shared prayers.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            <div className={`p-4 rounded-xl border backdrop-blur-md ${
              isDarkMode ? 'bg-[#1f0e18]/80 border-rose-950/60' : 'bg-white/90 border-rose-150 shadow-xs'
            }`}>
              <div className="text-xs uppercase tracking-wider text-rose-600 font-semibold mb-1">
                Our Sweet Nicknames
              </div>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-rose-100' : 'text-slate-700'}`}>
                Hubby & Wifeyy · Begum · Madam Ji · Cutieee · Baby 🙈
              </p>
            </div>

            <div className={`p-4 rounded-xl border backdrop-blur-md ${
              isDarkMode ? 'bg-[#1f0e18]/80 border-rose-950/60' : 'bg-white/90 border-rose-150 shadow-xs'
            }`}>
              <div className="text-xs uppercase tracking-wider text-rose-600 font-semibold mb-1">
                Our Sacred Milestone
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-rose-100' : 'text-slate-700'}`}>
                Every 15th is celebrated as our monthly milestone. 5 months of endless prayers and blooming devotion.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
