import React from 'react';
import { Sparkles, Heart, Compass, MapPin, Users, Moon } from 'lucide-react';

interface FamilyVisionSectionProps {
  isDarkMode: boolean;
}

export const FamilyVisionSection: React.FC<FamilyVisionSectionProps> = ({ isDarkMode }) => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Future Dream Board</span>
            <span aria-hidden="true">·</span>
            <span>Bihar ↔ Warangal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Two Hearts, One Future InshaAllah 🌙
          </h2>
          <p className="mt-2 text-sm sm:text-base text-rose-300/80 max-w-2xl mx-auto text-balance">
            From overcoming miles of distance to welcoming our future blessings. Everything we pray for side by side.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Long Distance Connection Map (Warangal ↔ Bihar) */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-lg flex flex-col justify-between transition-all ${
            isDarkMode ? 'glass-panel-dark' : 'glass-panel-light'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-rose-500/15 mb-5">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-rose-500" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    Warangal ↔ Bihar Connection
                  </h3>
                </div>
                <span className="text-xs font-mono text-rose-700 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                  ~1,320 km
                </span>
              </div>

              {/* Constellation Illustration */}
              <div className="rounded-2xl overflow-hidden border border-rose-500/20 shadow-sm relative group mb-5">
                <img
                  src="/src/assets/images/distance_connected_hearts_1791767016438.jpg"
                  alt="Celestial alignment of two hearts connecting Warangal and Bihar"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-script text-xl sm:text-2xl text-rose-100">
                    “Different coordinates, identical heartbeats.”
                  </p>
                </div>
              </div>

              {/* Two Cities Cards: Nummu in Warangal & Shaisuu in Bihar */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`p-3.5 rounded-xl border text-center ${
                  isDarkMode ? 'bg-rose-950/40 border-rose-900/30' : 'bg-rose-50/70 border-rose-200/80 shadow-xs'
                }`}>
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold uppercase text-rose-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Warangal, TS</span>
                  </div>
                  <div className={`font-serif font-bold text-base sm:text-lg mt-1 ${isDarkMode ? 'text-rose-100' : 'text-slate-800'}`}>
                    Nummu’s Home
                  </div>
                  <div className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                    Mohammed Numaan Ali
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border text-center ${
                  isDarkMode ? 'bg-rose-950/40 border-rose-900/30' : 'bg-rose-50/70 border-rose-200/80 shadow-xs'
                }`}>
                  <div className="flex items-center justify-center gap-1 text-xs font-semibold uppercase text-rose-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Bihar</span>
                  </div>
                  <div className={`font-serif font-bold text-base sm:text-lg mt-1 ${isDarkMode ? 'text-rose-100' : 'text-slate-800'}`}>
                    Shaisuu’s Home
                  </div>
                  <div className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                    Shaistah Khan (Begum)
                  </div>
                </div>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${isDarkMode ? 'text-rose-200/80' : 'text-slate-600'}`}>
                Though states separate us right now, our timezone is one (IST), our qibla is one, and every dua we whisper at night rises under the exact same crescent moon.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-500/15 flex items-center justify-between text-xs text-rose-300/70">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Zero miles in spirit</span>
              </span>
              <span>Nikah Destination: Our Forever Home 💍</span>
            </div>
          </div>

          {/* Card 2: Dream Future Family Vision */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col justify-between transition-all ${
            isDarkMode ? 'glass-panel-dark' : 'glass-panel-light'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-5">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    Our Dream Family Vision 👶
                  </h3>
                </div>
                <span className="text-xs font-medium text-pink-300 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
                  Three Blessings
                </span>
              </div>

              <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-sans mb-6">
                We have envisioned our future home filled with peace, laughter, little footsteps, and barakah. Here are the sweet names we hold close to our hearts:
              </p>

              {/* Children Cards */}
              <div className="space-y-3.5">
                
                {/* 1st Daughter: Dua */}
                <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
                  isDarkMode ? 'bg-rose-950/40 border-pink-500/20' : 'bg-rose-50/70 border-rose-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center text-xs font-bold text-pink-600 dark:text-pink-300">
                        1
                      </span>
                      <div>
                        <div className={`font-serif font-bold text-lg flex items-center gap-1.5 ${isDarkMode ? 'text-rose-100' : 'text-slate-800'}`}>
                          <span>Dua</span>
                          <span className="text-xs font-sans font-normal text-pink-600 dark:text-pink-300">(First Daughter 🌸)</span>
                        </div>
                        <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-rose-300/80' : 'text-slate-600'}`}>
                          Meaning: “Our prayer answered” — gentle, loving, and the light of our eyes.
                        </div>
                      </div>
                    </div>
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  </div>
                </div>

                {/* 2nd Son: Nuh */}
                <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
                  isDarkMode ? 'bg-rose-950/40 border-amber-500/20' : 'bg-amber-50/60 border-amber-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300">
                        2
                      </span>
                      <div>
                        <div className={`font-serif font-bold text-lg flex items-center gap-1.5 ${isDarkMode ? 'text-rose-100' : 'text-slate-800'}`}>
                          <span>Nuh</span>
                          <span className="text-xs font-sans font-normal text-amber-700 dark:text-amber-300">(Second Son 🌙)</span>
                        </div>
                        <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-rose-300/80' : 'text-slate-600'}`}>
                          Named after Prophet Nuh (AS) — steadfast, calm, honorable, and righteous.
                        </div>
                      </div>
                    </div>
                    <Moon className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                </div>

                {/* 3rd Child: To be decided together */}
                <div className={`p-4 rounded-2xl border border-dashed transition-all ${
                  isDarkMode ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/40 border-rose-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-600 dark:text-rose-300">
                        3
                      </span>
                      <div>
                        <div className={`font-serif font-bold text-lg flex items-center gap-1.5 ${isDarkMode ? 'text-rose-100' : 'text-slate-800'}`}>
                          <span>Our Third Blessing</span>
                          <span className="text-xs font-sans font-normal text-rose-600 dark:text-rose-400">(Together ❤️)</span>
                        </div>
                        <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-rose-300/80' : 'text-slate-600'}`}>
                          Name to be chosen lovingly together by Nummu & Shaisuu when the time comes.
                        </div>
                      </div>
                    </div>
                    <Sparkles className="w-4 h-4 text-rose-500 animate-spin-slow" />
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-500/15 text-center">
              <p className={`font-script text-xl sm:text-2xl ${isDarkMode ? 'text-rose-300' : 'text-rose-700'}`}>
                “May Allah make our future home full of Quran, smiles, and sakina.”
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
