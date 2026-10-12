import React, { useState } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MonkeyMascotProps {
  isDarkMode: boolean;
}

const MONKEY_EMOJIS = ['🙈', '🙉', '🙊'];
const MONKEY_MESSAGES = [
  {
    emoji: '🙈',
    title: 'Shaisuu is shy! Cutieee alert!',
    desc: 'Whenever Madam Ji blushes, Nummu smiles from 1,320 km away. Begum, don’t hide!',
  },
  {
    emoji: '🙉',
    title: 'Nummu only listens to his Wifeyy!',
    desc: 'From sweet voice notes to late-night reminders, Hubby is always tuned in to you.',
  },
  {
    emoji: '🙊',
    title: 'Our secrets are sealed with a ring 💍',
    desc: 'Every memory, nickname, and dua between Warangal & Bihar is safe in our forever story.',
  },
  {
    emoji: '🦋',
    title: 'A butterfly just flew from Warangal to Bihar!',
    desc: 'Carrying endless love, smiles, and warm hugs from Nummu straight to Shaisuu’s heart.',
  },
];

export const MonkeyMascot: React.FC<MonkeyMascotProps> = ({ isDarkMode }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  const handleMascotClick = () => {
    setBubbleOpen(!bubbleOpen);
    setCurrentIdx((prev) => (prev + 1) % MONKEY_MESSAGES.length);

    // Sprinkle subtle gentle hearts
    try {
      confetti({
        particleCount: 18,
        spread: 40,
        origin: { x: 0.9, y: 0.88 },
        colors: ['#fb7185', '#f43f5e', '#fbcfe8'],
      });
    } catch {
      // quiet
    }
  };

  const currentItem = MONKEY_MESSAGES[currentIdx];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Speech Bubble / Sweet Whisper Card */}
      {bubbleOpen && (
        <div className={`mb-3 max-w-xs p-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-fadeIn relative ${
          isDarkMode
            ? 'bg-[#230d1c]/95 border-rose-500/40 text-rose-100 shadow-rose-950/60'
            : 'bg-white/95 border-rose-200 text-slate-800 shadow-rose-200/50'
        }`}>
          <button
            onClick={() => setBubbleOpen(false)}
            aria-label="Close message"
            className="absolute top-2 right-2 p-1 text-rose-400 hover:text-rose-200 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{currentItem.emoji}</span>
            <span className="text-xs font-serif font-bold text-rose-400">
              {currentItem.title}
            </span>
          </div>

          <p className="text-xs text-rose-200/90 leading-relaxed font-sans pl-1">
            {currentItem.desc}
          </p>

          <div className="mt-2.5 pt-2 border-t border-rose-500/20 flex items-center justify-between text-[10px] text-rose-300/70">
            <span>Tap monkey for next smile</span>
            <span className="flex items-center gap-0.5 text-pink-400">
              <Heart className="w-2.5 h-2.5 fill-pink-400" />
              <span>Nummu ❤️ Shaisuu</span>
            </span>
          </div>
        </div>
      )}

      {/* Floating Monkey Button */}
      <button
        onClick={handleMascotClick}
        aria-label="Click for cute monkey reaction"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-tr from-rose-900 via-pink-700 to-amber-500 text-white shadow-xl shadow-rose-950/40 ring-2 ring-rose-400/30 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="text-2xl transform group-hover:scale-115 transition-transform select-none">
          {MONKEY_EMOJIS[currentIdx % MONKEY_EMOJIS.length]}
        </span>

        {/* Little pulsing indicator badge */}
        <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full ring-2 flex items-center justify-center ${
          isDarkMode ? 'ring-[#150a10]' : 'ring-white'
        }`}>
          <Sparkles className="w-2 h-2 text-white" />
        </span>
      </button>

    </div>
  );
};
