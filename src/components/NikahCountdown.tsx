import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, Edit3, Check, RotateCcw, AlertCircle } from 'lucide-react';
import { getCountdownTime, CountdownTime } from '../utils/time';
import { DEFAULT_NIKAH_TARGET } from '../types';

interface NikahCountdownProps {
  isDarkMode: boolean;
}

export const NikahCountdown: React.FC<NikahCountdownProps> = ({ isDarkMode }) => {
  // Load saved custom date if user set one
  const [targetDateStr, setTargetDateStr] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('nikah_target_date');
      return saved || DEFAULT_NIKAH_TARGET;
    } catch {
      return DEFAULT_NIKAH_TARGET;
    }
  });

  const [isCustomDateSet, setIsCustomDateSet] = useState<boolean>(() => {
    try {
      return localStorage.getItem('nikah_is_custom') === 'true';
    } catch {
      return false;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputDate, setInputDate] = useState('2032-05-15');
  const [countdown, setCountdown] = useState<CountdownTime>(() =>
    getCountdownTime(targetDateStr)
  );

  // Ticking countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownTime(targetDateStr));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  const handleSaveCustomDate = () => {
    if (!inputDate) return;
    const isoString = `${inputDate}T00:00:00+05:30`;
    setTargetDateStr(isoString);
    setIsCustomDateSet(true);
    try {
      localStorage.setItem('nikah_target_date', isoString);
      localStorage.setItem('nikah_is_custom', 'true');
    } catch {
      // storage error
    }
    setIsModalOpen(false);
  };

  const handleResetToDefault = () => {
    setTargetDateStr(DEFAULT_NIKAH_TARGET);
    setIsCustomDateSet(false);
    try {
      localStorage.removeItem('nikah_target_date');
      localStorage.removeItem('nikah_is_custom');
    } catch {
      // storage error
    }
    setIsModalOpen(false);
  };

  // Format display of current target date
  const targetDateObj = new Date(targetDateStr);
  const formattedTargetDate = targetDateObj.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section id="nikah" className="py-16 md:py-24 relative overflow-hidden">
      
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card with luxury aesthetic & gold accents */}
        <div className={`p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-2xl border transition-all ${
          isDarkMode
            ? 'glass-panel-dark border-amber-500/25 shadow-amber-950/30'
            : 'glass-panel-light border-amber-400/40 shadow-amber-100/60'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Column: Wedding Rings Art */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-amber-400/30 group max-w-sm w-full">
                <img
                  src="/src/assets/images/nikah_gold_rings_1791766999423.jpg"
                  alt="Champagne gold wedding rings on blush silk and rose petals"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 text-amber-300 font-serif text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Two Rings · One Eternal Promise</span>
                  </div>
                  <p className="font-script text-2xl text-rose-200 mt-1">
                    “Dua, Sabr, & Forever”
                  </p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Badge */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Sacred Dream · 2032</span>
              </div>

              {/* Title */}
              <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance flex items-center gap-3 ${
                isDarkMode ? 'text-rose-100' : 'text-slate-900'
              }`}>
                <span>Our Dream Nikah</span>
                <span className="text-3xl sm:text-4xl">💍</span>
              </h2>

              <p className={`mt-3 text-base sm:text-lg font-serif italic text-balance ${
                isDarkMode ? 'text-rose-300/90' : 'text-slate-600'
              }`}>
                “InshaAllah, one day our duas will become our reality.”
              </p>

              {/* Status / Disclaimer Box */}
              <div className={`mt-4 p-3.5 rounded-xl border text-xs sm:text-sm ${
                isCustomDateSet
                  ? isDarkMode
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                  : isDarkMode
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-200/90'
                  : 'bg-rose-50 border-rose-200/80 text-slate-700'
              }`}>
                {isCustomDateSet ? (
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong>Target Date Chosen:</strong> {formattedTargetDate}. (You can update or reset this anytime together).
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong>Notice:</strong> 2032 is our dream year. The exact date is waiting for us to decide, InshaAllah. ❤️
                      <div className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                        Countdown is currently set to 1 January 2032 (the beginning of our dream year, not the confirmed Nikah date).
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Countdown Grid */}
              <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 text-center">
                
                {/* Years */}
                <div className={`p-3 rounded-xl flex flex-col justify-center border ${
                  isDarkMode ? 'bg-[#1e0d19]/60 border-amber-500/20' : 'bg-white/95 border-amber-200/70 shadow-xs'
                }`}>
                  <div className={`font-mono tabular-nums text-2xl sm:text-3xl font-bold ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}>
                    {countdown.years}
                  </div>
                  <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                    isDarkMode ? 'text-rose-300/70' : 'text-slate-500'
                  }`}>
                    Years
                  </div>
                </div>

                {/* Months */}
                <div className={`p-3 rounded-xl flex flex-col justify-center border ${
                  isDarkMode ? 'bg-[#1e0d19]/60 border-amber-500/20' : 'bg-white/95 border-amber-200/70 shadow-xs'
                }`}>
                  <div className={`font-mono tabular-nums text-2xl sm:text-3xl font-bold ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}>
                    {countdown.months}
                  </div>
                  <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                    isDarkMode ? 'text-rose-300/70' : 'text-slate-500'
                  }`}>
                    Months
                  </div>
                </div>

                {/* Days */}
                <div className={`p-3 rounded-xl flex flex-col justify-center border ${
                  isDarkMode ? 'bg-[#1e0d19]/60 border-amber-500/20' : 'bg-white/95 border-amber-200/70 shadow-xs'
                }`}>
                  <div className={`font-mono tabular-nums text-2xl sm:text-3xl font-bold ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}>
                    {countdown.days}
                  </div>
                  <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                    isDarkMode ? 'text-rose-300/70' : 'text-slate-500'
                  }`}>
                    Days
                  </div>
                </div>

                {/* Hours */}
                <div className={`p-3 rounded-xl flex flex-col justify-center border ${
                  isDarkMode ? 'bg-[#1e0d19]/60 border-amber-500/20' : 'bg-white/95 border-amber-200/70 shadow-xs'
                }`}>
                  <div className={`font-mono tabular-nums text-2xl sm:text-3xl font-bold ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}>
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                    isDarkMode ? 'text-rose-300/70' : 'text-slate-500'
                  }`}>
                    Hours
                  </div>
                </div>

                {/* Minutes */}
                <div className={`p-3 rounded-xl flex flex-col justify-center border ${
                  isDarkMode ? 'bg-[#1e0d19]/60 border-amber-500/20' : 'bg-white/95 border-amber-200/70 shadow-xs'
                }`}>
                  <div className={`font-mono tabular-nums text-2xl sm:text-3xl font-bold ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}>
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                    isDarkMode ? 'text-rose-300/70' : 'text-slate-500'
                  }`}>
                    Mins
                  </div>
                </div>

                {/* Seconds */}
                <div className={`p-3 rounded-xl flex flex-col justify-center border ${
                  isDarkMode ? 'bg-[#2b1022]/80 border-amber-400/40 text-amber-400' : 'bg-amber-100/70 border-amber-300 text-amber-800 shadow-xs'
                }`}>
                  <div className="font-mono tabular-nums text-2xl sm:text-3xl font-bold">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className={`text-[11px] uppercase tracking-wider mt-0.5 ${
                    isDarkMode ? 'text-amber-300/80' : 'text-amber-800'
                  }`}>
                    Secs
                  </div>
                </div>

              </div>

              {/* CTA Button: Dream Nikah Date — Set It Together */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-amber-600 via-rose-600 to-pink-600 text-white shadow-lg shadow-amber-900/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Dream Nikah Date — Set It Together</span>
                </button>

                {isCustomDateSet && (
                  <button
                    onClick={handleResetToDefault}
                    className="px-3.5 py-2 text-xs font-medium rounded-full text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-colors flex items-center gap-1.5"
                    title="Reset to 1 Jan 2032 default baseline"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Date</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Date Picker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl border ${
            isDarkMode ? 'bg-[#230f1d] border-amber-500/30 text-rose-100' : 'bg-white border-rose-200 text-slate-800'
          }`}>
            
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Personalize Our Future</span>
            </div>

            <h3 className="font-serif text-2xl font-bold">
              Set Our Dream Nikah Date 💍
            </h3>

            <p className="text-xs text-rose-300/80 mt-2 leading-relaxed">
              When Nummu and Shaisuu pick the exact special day in 2032 (or any date you desire), save it here together!
            </p>

            <div className="mt-5 space-y-3">
              <label className="block text-xs font-medium text-rose-200">
                Choose Intended Nikah Date:
              </label>
              <input
                type="date"
                min="2026-10-15"
                max="2035-12-31"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  isDarkMode
                    ? 'bg-rose-950/40 border-rose-900/40 text-rose-100'
                    : 'bg-rose-50 border-rose-200 text-slate-800'
                }`}
              />
              <p className="text-[11px] text-rose-300/60 italic">
                * Note: The exact wedding date has not been finalized yet. Setting this updates the countdown for your personal dream vision.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-rose-500/20 text-rose-300 hover:bg-rose-500/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustomDate}
                className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Together</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
