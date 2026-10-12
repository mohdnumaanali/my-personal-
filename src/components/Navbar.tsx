import React, { useState } from 'react';
import { Heart, Moon, Sun, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onOpenSecretLetter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, setIsDarkMode, onOpenSecretLetter }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMusic = () => {
    const active = romanticAudio.toggle();
    setIsPlayingMusic(active);
  };

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Calendar', href: '#calendar' },
    { label: 'Nikah 2032', href: '#nikah' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Duas', href: '#duas' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 backdrop-blur-md border-b ${
      isDarkMode
        ? 'bg-[#150a10]/85 border-rose-950/40 text-rose-100'
        : 'bg-white/85 border-rose-200/60 text-slate-800'
    }`}>
      {/* Strict 3-zone Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-5 Nav Links) - Zone 3 (Primary Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-rose-500 group-hover:text-rose-400 transition-colors flex items-center gap-1.5">
            <span>Nummu</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline-block animate-pulse" />
            <span>Shaisuu</span>
          </span>
        </a>

        {/* Zone 2: Clean 4-5 Navigation Links (Single-line, unboxed) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`whitespace-nowrap shrink-0 transition-colors hover:text-rose-500 ${
                isDarkMode ? 'text-rose-200/80 hover:text-rose-300' : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Ambient Music Toggle */}
          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Mute romantic chimes' : 'Play romantic chimes'}
            aria-label="Toggle ambient chimes"
            className={`p-2 rounded-full transition-all duration-200 ${
              isDarkMode
                ? 'bg-rose-950/60 text-rose-300 hover:bg-rose-900/60 border border-rose-900/40'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80'
            }`}
          >
            {isPlayingMusic ? <Volume2 className="w-4 h-4 animate-spin-slow" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dark / Light Romance Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Switch to Light Romance' : 'Switch to Dark Romance'}
            aria-label="Toggle theme mode"
            className={`p-2 rounded-full transition-all duration-200 ${
              isDarkMode
                ? 'bg-rose-950/60 text-amber-300 hover:bg-rose-900/60 border border-rose-900/40'
                : 'bg-rose-50 text-amber-700 hover:bg-rose-100 border border-rose-200/80'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button: Open Love Letter */}
          <button
            onClick={onOpenSecretLetter}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm hover:from-rose-500 hover:to-pink-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Love Letters 💌</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-rose-400 hover:text-rose-300 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 pt-2 pb-4 border-t ${
          isDarkMode ? 'bg-[#1a0a13] border-rose-950 text-rose-100' : 'bg-white border-rose-100 text-slate-800'
        }`}>
          <div className="flex flex-col space-y-2.5 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-rose-500/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSecretLetter();
              }}
              className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Read Our Love Letters 💌</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
