import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CalendarSection } from './components/CalendarSection';
import { NikahCountdown } from './components/NikahCountdown';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { FamilyVisionSection } from './components/FamilyVisionSection';
import { PrayerJournalSection } from './components/PrayerJournalSection';
import { LoveNotesSection } from './components/LoveNotesSection';
import { MonkeyMascot } from './components/MonkeyMascot';
import { Footer } from './components/Footer';

export default function App() {
  // Soft light romantic mode as default, user can toggle to dark romantic mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('romantic_theme_mode');
      if (saved) return saved === 'dark';
      return false; // Default to gentle, lighter romantic mode
    } catch {
      return false;
    }
  });

  const [isSecretLetterOpen, setIsSecretLetterOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('romantic_theme_mode', isDarkMode ? 'dark' : 'light');
    } catch {
      // storage error
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-rose-500 selection:text-white ${
      isDarkMode
        ? 'bg-[#12070e] text-rose-100'
        : 'bg-[#fffcf9] text-slate-800'
    }`}>
      
      {/* Delicate floating background stars / atmospheric tint */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute top-0 inset-x-0 h-96 bg-gradient-to-b ${
          isDarkMode ? 'from-rose-950/20 via-pink-950/10 to-transparent' : 'from-rose-100/30 via-pink-50/20 to-transparent'
        }`} />
        <div className={`absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t ${
          isDarkMode ? 'from-rose-950/30 to-transparent' : 'from-rose-100/20 to-transparent'
        }`} />
      </div>

      {/* Primary Application Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onOpenSecretLetter={() => setIsSecretLetterOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Section 1: Hero — Our Forever & Live Elapsed Timer */}
          <HeroSection isDarkMode={isDarkMode} />

          {/* Section 2: Special Calendar — Every 15th is Ours */}
          <CalendarSection isDarkMode={isDarkMode} />

          {/* Section 3: Live Countdown to Dream Nikah 2032 */}
          <NikahCountdown isDarkMode={isDarkMode} />

          {/* Section 4: Our Love Story — Interactive Timeline & Memory Journal */}
          <TimelineSection isDarkMode={isDarkMode} />

          {/* Section 5: Long-Distance Map (Bihar ↔ Warangal) & Future Family Vision (Dua, Nuh, 3rd) */}
          <FamilyVisionSection isDarkMode={isDarkMode} />

          {/* Section 6: Private Photo Gallery — Our Little Universe 📸 */}
          <GallerySection isDarkMode={isDarkMode} />

          {/* Section 7: Islamic Prayer Journal & Sacred Duas */}
          <PrayerJournalSection isDarkMode={isDarkMode} />

          {/* Section 8: "Open When..." Secret Love Letters & Couple Nicknames */}
          <LoveNotesSection
            isDarkMode={isDarkMode}
            isExternalOpenModal={isSecretLetterOpen}
            onCloseExternalModal={() => setIsSecretLetterOpen(false)}
          />
        </main>

        {/* Interactive Floating Monkey Mascot 🙈🙉🙊 */}
        <MonkeyMascot isDarkMode={isDarkMode} />

        {/* Footer */}
        <Footer isDarkMode={isDarkMode} />

      </div>

    </div>
  );
}
