import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Calendar as CalendarIcon, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getAnniversaryMilestoneInfo, getTotalAnniversariesReached } from '../utils/time';

interface CalendarSectionProps {
  isDarkMode: boolean;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({ isDarkMode }) => {
  // Current time context is October 2026
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedMilestone, setSelectedMilestone] = useState<{
    dateStr: string;
    info: ReturnType<typeof getAnniversaryMilestoneInfo>;
  } | null>(null);

  const totalAnniversaries = getTotalAnniversariesReached(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayWeekday = new Date(year, month, 1).getDay(); // 0 is Sunday

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const jumpToToday = () => {
    setCurrentDate(new Date());
  };

  const jumpToMay2026 = () => {
    setCurrentDate(new Date(2026, 4, 1));
  };

  const handleDayClick = (dayNumber: number) => {
    if (dayNumber === 15) {
      const info = getAnniversaryMilestoneInfo(year, month);
      setSelectedMilestone({
        dateStr: `15 ${monthNames[month]} ${year}`,
        info,
      });

      // Fire romantic confetti celebration
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24'],
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  const now = new Date();
  const isCurrentMonthActual = now.getFullYear() === year && now.getMonth() === month;
  const todayDate = now.getDate();

  return (
    <section id="calendar" className="py-16 md:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Monthly Love Tracker</span>
            <span aria-hidden="true">·</span>
            <span>Every 15th Is Ours</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Our Special Calendar ❤️
          </h2>
          <p className={`mt-2 text-sm sm:text-base max-w-xl mx-auto text-balance ${
            isDarkMode ? 'text-rose-300/80' : 'text-slate-600'
          }`}>
            Every 15th of the month marks another milestone in Nummu & Shaisuu’s journey. Click on the 15th to celebrate each chapter!
          </p>

          {/* Anniversary Counter Summary */}
          <div className={`mt-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-medium ${
            isDarkMode
              ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
              : 'bg-rose-50 border-rose-200 text-rose-700 shadow-xs'
          }`}>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span>
              <strong>{totalAnniversaries}</strong> Monthly Anniversaries Cherished So Far
            </span>
          </div>
        </div>

        {/* Calendar Card */}
        <div className={`p-6 sm:p-8 rounded-3xl shadow-lg backdrop-blur-xl border transition-all ${
          isDarkMode ? 'glass-panel-dark' : 'glass-panel-light'
        }`}>
          
          {/* Calendar Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-rose-500/15 gap-4">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-rose-500" />
              <h3 className={`font-serif text-2xl font-bold ${isDarkMode ? 'text-rose-100' : 'text-slate-800'}`}>
                {monthNames[month]} {year}
              </h3>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={jumpToMay2026}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'text-rose-300 hover:bg-rose-500/10 border-rose-500/20'
                    : 'text-rose-700 hover:bg-rose-100/70 border-rose-200 bg-rose-50/50'
                }`}
                title="Jump to where our story started"
              >
                May 2026
              </button>
              <button
                onClick={jumpToToday}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'text-rose-300 hover:bg-rose-500/10 border-rose-500/20'
                    : 'text-rose-700 hover:bg-rose-100/70 border-rose-200 bg-rose-50/50'
                }`}
              >
                Today
              </button>
              <div className="flex items-center gap-1 ml-1">
                <button
                  onClick={prevMonth}
                  aria-label="Previous month"
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isDarkMode
                      ? 'text-rose-300 hover:bg-rose-500/20 border-rose-500/20'
                      : 'text-slate-600 hover:bg-rose-100/70 border-rose-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextMonth}
                  aria-label="Next month"
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isDarkMode
                      ? 'text-rose-300 hover:bg-rose-500/20 border-rose-500/20'
                      : 'text-slate-600 hover:bg-rose-100/70 border-rose-200'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Weekday headers */}
          <div className={`grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold uppercase tracking-wider ${
            isDarkMode ? 'text-rose-300/60' : 'text-slate-500'
          }`}>
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayWeekday }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12 sm:h-14 opacity-10" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const is15th = day === 15;
              const isToday = isCurrentMonthActual && todayDate === day;

              // Check milestone status if 15th
              const milestoneInfo = is15th ? getAnniversaryMilestoneInfo(year, month) : null;
              const isCompletedMilestone = milestoneInfo?.status === 'completed';
              const isCurrentMilestone = milestoneInfo?.status === 'current';
              const isFutureMilestone = milestoneInfo?.status === 'future';

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => handleDayClick(day)}
                  className={`h-12 sm:h-14 relative rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer group ${
                    is15th
                      ? isDarkMode
                        ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-100 font-bold shadow-md shadow-rose-500/30 hover:scale-105'
                        : 'bg-rose-50 border-2 border-rose-400 text-rose-700 font-bold shadow-xs hover:scale-105 hover:bg-rose-100/60'
                      : isToday
                      ? isDarkMode
                        ? 'bg-amber-500/20 border border-amber-400 text-amber-200 font-semibold'
                        : 'bg-amber-50 border border-amber-300 text-amber-800 font-semibold'
                      : isDarkMode
                      ? 'hover:bg-rose-950/40 text-rose-100/80 border border-transparent hover:border-rose-900/30'
                      : 'hover:bg-rose-50/80 text-slate-700 border border-transparent hover:border-rose-200'
                  }`}
                >
                  <span className="text-sm sm:text-base">{day}</span>

                  {/* 15th glowing heart marker */}
                  {is15th && (
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-gentle-pulse" />
                      <span className={`hidden sm:inline text-[9px] font-bold ${
                        isDarkMode ? 'text-rose-300' : 'text-rose-600'
                      }`}>
                        {isCompletedMilestone ? 'Anniversary' : isCurrentMilestone ? 'This Month' : 'Forever'}
                      </span>
                    </div>
                  )}

                  {/* Indicator for today */}
                  {isToday && !is15th && (
                    <span className={`text-[9px] font-medium ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>Today</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className={`mt-8 pt-4 border-t border-rose-500/15 flex flex-wrap items-center justify-center gap-5 text-xs ${
            isDarkMode ? 'text-rose-300/70' : 'text-slate-600'
          }`}>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-300 flex items-center justify-center">
                <Heart className="w-2 h-2 fill-white text-white" />
              </span>
              <span>The 15th — Our Monthly Anniversary (Click to view!)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full border ${
                isDarkMode ? 'bg-amber-400/40 border-amber-400' : 'bg-amber-100 border-amber-400'
              }`} />
              <span>Current Date</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full border ${
                isDarkMode ? 'bg-rose-900/40 border-rose-800' : 'bg-slate-100 border-slate-300'
              }`} />
              <span>Standard Day</span>
            </div>
          </div>

        </div>

        {/* Anniversary Modal / Card Popup */}
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className={`max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-2xl border transition-all ${
              isDarkMode ? 'bg-[#230f1d] border-rose-500/40 text-rose-100' : 'bg-white border-rose-200 text-slate-800'
            }`}>
              
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 mb-3 animate-gentle-pulse">
                  <PartyPopper className="w-7 h-7" />
                </div>
                
                <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  {selectedMilestone.dateStr}
                </div>

                <h3 className="font-serif text-2xl font-bold mt-1 text-rose-300">
                  {selectedMilestone.info.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-rose-200/90 font-serif italic">
                  {selectedMilestone.info.description}
                </p>

                {/* Status indicator */}
                <div className="mt-4 pt-4 border-t border-rose-500/20 text-xs">
                  {selectedMilestone.info.status === 'completed' && (
                    <span className="text-emerald-400 font-medium flex items-center justify-center gap-1">
                      <span>✓ Completed Milestone — In our hearts forever ❤️</span>
                    </span>
                  )}
                  {selectedMilestone.info.status === 'current' && (
                    <span className="text-amber-300 font-medium flex items-center justify-center gap-1">
                      <span>✨ Our current monthly milestone! Happy Anniversary!</span>
                    </span>
                  )}
                  {selectedMilestone.info.status === 'future' && (
                    <span className="text-rose-400 font-medium flex items-center justify-center gap-1">
                      <span>⏳ Awaiting this beautiful future chapter, InshaAllah!</span>
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      confetti({
                        particleCount: 70,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#e11d48', '#f43f5e', '#fb7185', '#fbbf24', '#fbcfe8'],
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md hover:from-rose-500 hover:to-pink-500 transition-all flex items-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Send Love & Confetti 🎉</span>
                  </button>

                  <button
                    onClick={() => setSelectedMilestone(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-full border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
