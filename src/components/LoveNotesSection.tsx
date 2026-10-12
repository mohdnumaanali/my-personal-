import React, { useState } from 'react';
import { Mail, Sparkles, Heart, X, Plus, Send } from 'lucide-react';
import { LoveNote } from '../types';
import { INITIAL_LOVE_NOTES, COUPLE_NICKNAMES } from '../data/initialData';

interface LoveNotesSectionProps {
  isDarkMode: boolean;
  isExternalOpenModal?: boolean;
  onCloseExternalModal?: () => void;
}

export const LoveNotesSection: React.FC<LoveNotesSectionProps> = ({
  isDarkMode,
  isExternalOpenModal,
  onCloseExternalModal,
}) => {
  const [notes, setNotes] = useState<LoveNote[]>(() => {
    try {
      const saved = localStorage.getItem('nummu_shaisuu_notes');
      if (saved) return JSON.parse(saved);
      return INITIAL_LOVE_NOTES;
    } catch {
      return INITIAL_LOVE_NOTES;
    }
  });

  const [activeLetter, setActiveLetter] = useState<LoveNote | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCondition, setFormCondition] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSender, setFormSender] = useState<LoveNote['sender']>('Nummu');
  const [formIcon, setFormIcon] = useState('💌');

  const saveNotes = (updated: LoveNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem('nummu_shaisuu_notes', JSON.stringify(updated));
    } catch {
      // quota
    }
  };

  const handleOpenLetter = (note: LoveNote) => {
    setActiveLetter(note);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formMessage.trim()) return;

    const newNote: LoveNote = {
      id: `note-${Date.now()}`,
      title: formTitle,
      condition: formCondition || 'Open whenever your heart desires',
      message: formMessage,
      sender: formSender,
      icon: formIcon,
    };

    saveNotes([...notes, newNote]);
    setIsWriteModalOpen(false);
    setFormTitle('');
    setFormCondition('');
    setFormMessage('');
  };

  return (
    <section id="notes" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-2 ${
            isDarkMode ? 'text-pink-400' : 'text-pink-600'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Words of Love</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isDarkMode ? 'text-rose-100' : 'text-slate-900'
          }`}>
            “Open When...” Love Letters 💌
          </h2>
          <p className={`mt-2 text-sm sm:text-base max-w-xl mx-auto ${
            isDarkMode ? 'text-rose-300/80' : 'text-slate-600'
          }`}>
            Sealed digital envelopes written for every mood, distance ache, monthly milestone, and sweet dream.
          </p>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleOpenLetter(note)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg relative group ${
                isDarkMode
                  ? 'bg-gradient-to-b from-[#240e1b] to-[#1a0a14] border-rose-950 hover:border-pink-500/40'
                  : 'bg-white border-rose-200/70 hover:border-rose-400 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{note.icon}</span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  isDarkMode
                    ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                    : 'text-rose-700 bg-rose-50 border-rose-200'
                }`}>
                  From: {note.sender}
                </span>
              </div>

              <h3 className={`font-serif text-lg font-bold transition-colors ${
                isDarkMode ? 'text-rose-100 group-hover:text-rose-400' : 'text-slate-800 group-hover:text-rose-600'
              }`}>
                {note.title}
              </h3>

              <p className={`mt-2 text-xs font-sans italic line-clamp-2 ${
                isDarkMode ? 'text-rose-300/70' : 'text-slate-500'
              }`}>
                “{note.condition}”
              </p>

              <div className={`mt-5 pt-3 border-t border-rose-500/15 flex items-center justify-between text-xs font-medium ${
                isDarkMode ? 'text-rose-400' : 'text-rose-600'
              }`}>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Tap to open wax seal</span>
                </span>
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}

          {/* "+ Write a New Love Note" Card */}
          <div
            onClick={() => setIsWriteModalOpen(true)}
            className={`p-6 rounded-3xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center text-center transition-all hover:scale-[1.01] ${
              isDarkMode
                ? 'border-rose-500/30 hover:border-rose-400 hover:bg-rose-950/20 text-rose-300'
                : 'border-rose-200 hover:border-rose-400 hover:bg-rose-50/50 text-slate-600'
            }`}
          >
            <div className="p-3 rounded-full bg-rose-500/15 text-rose-500 mb-3">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className={`font-serif text-lg font-bold ${isDarkMode ? 'text-rose-100' : 'text-slate-800'}`}>
              Write a New Love Letter
            </h4>
            <p className={`text-xs mt-1 max-w-xs ${isDarkMode ? 'text-rose-300/70' : 'text-slate-500'}`}>
              Leave a sweet letter for your Begum or Hubby to open whenever they need your love.
            </p>
          </div>
        </div>

        {/* Couple Nicknames Showcase */}
        <div className={`p-6 sm:p-8 rounded-3xl border ${
          isDarkMode ? 'glass-panel-dark' : 'glass-panel-light'
        }`}>
          <div className="text-center mb-6">
            <span className={`text-xs font-semibold uppercase tracking-widest ${
              isDarkMode ? 'text-amber-400' : 'text-amber-700'
            }`}>
              Our Affectionate Pet Names
            </span>
            <h3 className={`font-serif text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-rose-100' : 'text-slate-800'
            }`}>
              Words We Whisper to Each Other 🙈
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {COUPLE_NICKNAMES.map((nick) => (
              <div
                key={nick.label}
                className={`p-3.5 rounded-2xl border text-center transition-all hover:scale-105 ${
                  isDarkMode ? 'bg-rose-950/30 border-rose-900/30' : 'bg-rose-50/70 border-rose-200 shadow-xs'
                }`}
              >
                <div className={`font-serif font-bold text-base ${
                  isDarkMode ? 'text-rose-200' : 'text-rose-800'
                }`}>
                  {nick.label}
                </div>
                <div className={`text-[10px] mt-1 leading-tight ${
                  isDarkMode ? 'text-rose-400/80' : 'text-slate-500'
                }`}>
                  {nick.note}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Letter Reading Modal */}
      {(activeLetter || (isExternalOpenModal && notes[0])) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          {(() => {
            const currentLetter = activeLetter || notes[0];
            return (
              <div className={`max-w-lg w-full p-6 sm:p-8 rounded-3xl shadow-2xl border relative ${
                isDarkMode ? 'bg-[#210c1b] border-pink-500/40 text-rose-100' : 'bg-[#fffdf9] border-rose-200 text-slate-800'
              }`}>
                
                {/* Close Button */}
                <button
                  onClick={() => {
                    setActiveLetter(null);
                    if (onCloseExternalModal) onCloseExternalModal();
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-rose-400 hover:text-rose-200 hover:bg-rose-500/20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Wax seal effect header */}
                <div className="text-center mb-5">
                  <div className="inline-flex w-12 h-12 rounded-full bg-gradient-to-br from-rose-600 to-pink-700 text-white items-center justify-center text-xl shadow-lg ring-4 ring-rose-500/30 mb-2">
                    {currentLetter.icon}
                  </div>
                  <div className="text-xs uppercase tracking-widest font-semibold text-rose-400">
                    From: {currentLetter.sender}
                  </div>
                  <h3 className="font-serif text-2xl font-bold mt-1">
                    {currentLetter.title}
                  </h3>
                  <div className="text-xs text-rose-300/70 font-sans italic mt-1">
                    Condition: {currentLetter.condition}
                  </div>
                </div>

                {/* Handwritten Romantic Letter Content */}
                <div className={`p-5 sm:p-6 rounded-2xl border my-4 leading-relaxed font-serif ${
                  isDarkMode ? 'bg-black/30 border-rose-950 text-rose-100' : 'bg-rose-50/50 border-rose-100 text-slate-800'
                }`}>
                  <p className="text-sm sm:text-base leading-relaxed italic">
                    {currentLetter.message}
                  </p>
                </div>

                {/* Letter Signature */}
                <div className="text-right pt-2">
                  <p className="font-script text-2xl text-rose-400">
                    Forever & Always, {currentLetter.sender === 'Nummu' ? 'Your Nummu ❤️' : currentLetter.sender === 'Shaisuu' ? 'Your Begum Shaisuu 🌸' : 'Nummu & Shaisuu 💍'}
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      setActiveLetter(null);
                      if (onCloseExternalModal) onCloseExternalModal();
                    }}
                    className="px-6 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md hover:brightness-110"
                  >
                    Seal Letter Back With Love ❤️
                  </button>
                </div>

              </div>
            );
          })()}
        </div>
      )}

      {/* Write New Note Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl border ${
            isDarkMode ? 'bg-[#230f1d] border-rose-500/30 text-rose-100' : 'bg-white border-rose-200 text-slate-800'
          }`}>
            
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <h3 className="font-serif text-2xl font-bold">
                Write a Love Letter ✍️
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-500/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Envelope Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Open when you feel tired..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                    Written By
                  </label>
                  <select
                    value={formSender}
                    onChange={(e) => setFormSender(e.target.value as LoveNote['sender'])}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      isDarkMode ? 'bg-rose-950 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                    }`}
                  >
                    <option value="Nummu">Nummu (Hubby)</option>
                    <option value="Shaisuu">Shaisuu (Begum)</option>
                    <option value="Together">Together</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                    Seal Icon
                  </label>
                  <select
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      isDarkMode ? 'bg-rose-950 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                    }`}
                  >
                    <option value="💌">💌 Letter</option>
                    <option value="🌙">🌙 Moon</option>
                    <option value="🙈">🙈 Shy Monkey</option>
                    <option value="💍">💍 Ring</option>
                    <option value="🦋">🦋 Butterfly</option>
                    <option value="🌸">🌸 Rose</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  When Should This Be Opened?
                </label>
                <input
                  type="text"
                  placeholder="e.g. When you miss my voice..."
                  value={formCondition}
                  onChange={(e) => setFormCondition(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
                  Your Letter Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write from the depth of your heart..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    isDarkMode ? 'bg-rose-950/40 border-rose-900/40' : 'bg-rose-50 border-rose-200'
                  }`}
                />
              </div>

              <div className="pt-3 border-t border-rose-500/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-full border border-rose-500/20 text-rose-300 hover:bg-rose-500/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow hover:brightness-110 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Seal & Save</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
