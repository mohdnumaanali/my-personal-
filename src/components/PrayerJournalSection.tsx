import React, { useState } from 'react';
import { Sparkles, Heart, Plus, BookOpen, X, Check } from 'lucide-react';
import { DuaItem } from '../types';
import { INITIAL_DUAS } from '../data/initialData';

interface PrayerJournalSectionProps {
  isDarkMode: boolean;
}

export const PrayerJournalSection: React.FC<PrayerJournalSectionProps> = ({ isDarkMode }) => {
  const [duas, setDuas] = useState<DuaItem[]>(() => {
    try {
      const saved = localStorage.getItem('nummu_shaisuu_duas');
      if (saved) return JSON.parse(saved);
      return INITIAL_DUAS;
    } catch {
      return INITIAL_DUAS;
    }
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArabic, setNewArabic] = useState('');
  const [newTransliteration, setNewTransliteration] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newTag, setNewTag] = useState('Our Personal Dua');

  const saveDuas = (updated: DuaItem[]) => {
    setDuas(updated);
    try {
      localStorage.setItem('nummu_shaisuu_duas', JSON.stringify(updated));
    } catch {
      // storage quota
    }
  };

  const handleSayAmeen = (id: string) => {
    const updated = duas.map((d) =>
      d.id === id ? { ...d, ameenCount: d.ameenCount + 1 } : d
    );
    saveDuas(updated);
  };

  const handleAddDua = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTranslation.trim()) return;

    const newDua: DuaItem = {
      id: `dua-${Date.now()}`,
      title: newTitle,
      arabic: newArabic.trim() || undefined,
      transliteration: newTransliteration.trim() || undefined,
      translation: newTranslation,
      tag: newTag,
      ameenCount: 1,
    };

    saveDuas([...duas, newDua]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewArabic('');
    setNewTransliteration('');
    setNewTranslation('');
  };

  return (
    <section id="duas" className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-rose-500/15 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Prayers & Barakah</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
              isDarkMode ? 'text-rose-100' : 'text-slate-900'
            }`}>
              Islamic Prayer Journal 🌙
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl ${
              isDarkMode ? 'text-rose-300/80' : 'text-slate-600'
            }`}>
              The duas that keep Nummu & Shaisuu grounded, protect our love across the distance, and guide us to our 2032 Nikah.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md hover:brightness-110 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Personal Dua</span>
          </button>
        </div>

        {/* Dua Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {duas.map((dua) => (
            <div
              key={dua.id}
              className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                isDarkMode ? 'glass-panel-dark hover:border-amber-500/30' : 'glass-panel-light hover:border-amber-300'
              }`}
            >
              <div>
                {/* Tag & Icon */}
                <div className={`flex items-center justify-between text-xs mb-3 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-700 font-medium'
                }`}>
                  <span className="font-semibold uppercase tracking-wider">{dua.tag}</span>
                  <BookOpen className="w-4 h-4 opacity-70" />
                </div>

                {/* Title */}
                <h3 className={`font-serif text-lg sm:text-xl font-bold mb-3 ${
                  isDarkMode ? 'text-rose-100' : 'text-slate-800'
                }`}>
                  {dua.title}
                </h3>

                {/* Arabic Script (if present) */}
                {dua.arabic && (
                  <div className={`my-3 p-4 rounded-2xl border text-right font-serif text-xl sm:text-2xl leading-loose ${
                    isDarkMode ? 'bg-amber-500/10 border-amber-500/20 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950 shadow-xs'
                  }`} dir="rtl">
                    {dua.arabic}
                  </div>
                )}

                {/* Transliteration */}
                {dua.transliteration && (
                  <p className={`text-xs sm:text-sm italic mb-2 font-mono ${
                    isDarkMode ? 'text-amber-300/80' : 'text-amber-800'
                  }`}>
                    {dua.transliteration}
                  </p>
                )}

                {/* Translation */}
                <p className={`text-sm leading-relaxed font-serif ${
                  isDarkMode ? 'text-rose-200/90' : 'text-slate-600'
                }`}>
                  {dua.translation}
                </p>
              </div>

              {/* Card Footer: Ameen Button & Counter */}
              <div className="mt-6 pt-4 border-t border-rose-500/15 flex items-center justify-between">
                <span className={`text-xs ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
                  Recited together with love
                </span>

                <button
                  onClick={() => handleSayAmeen(dua.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 active:scale-95 group ${
                    isDarkMode
                      ? 'bg-rose-500/15 text-rose-300 hover:bg-rose-500/30 border-rose-500/30'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200 shadow-xs'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 group-hover:scale-110 transition-transform" />
                  <span>Say Ameen ({dua.ameenCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Dua Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl border ${
            isDarkMode ? 'bg-[#230f1d] border-amber-500/30 text-rose-100' : 'bg-white border-rose-200 text-slate-800'
          }`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <h3 className="font-serif text-2xl font-bold">
                Add Our Dua 🌙
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-500/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDua} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Dua Intention / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dua for peace in exams, Dua for meeting..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Arabic Text (Optional)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  placeholder="اللَّهُمَّ..."
                  value={newArabic}
                  onChange={(e) => setNewArabic(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Transliteration / Pronunciation (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Allahumma..."
                  value={newTransliteration}
                  onChange={(e) => setNewTransliteration(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Meaning & Heartfelt Prayer
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write the English meaning or your personal prayer for Nummu and Shaisuu..."
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div className="pt-3 border-t border-rose-500/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-full border border-rose-500/20 text-rose-300 hover:bg-rose-500/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow hover:brightness-110 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Dua</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
