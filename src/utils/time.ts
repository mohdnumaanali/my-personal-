/**
 * Date and time utilities for Nummu & Shaisuu's relationship
 * Timezone: Asia/Kolkata (IST = UTC+5:30)
 */

export interface ElapsedTime {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
}

export const START_DATE_MS = new Date('2026-05-15T00:00:00+05:30').getTime();

export function getElapsedTime(currentDate: Date = new Date()): ElapsedTime {
  const startDate = new Date('2026-05-15T00:00:00+05:30');
  const now = currentDate;

  if (now.getTime() < startDate.getTime()) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const diffMs = now.getTime() - startDate.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const seconds = totalSeconds % 60;
  const minutes = totalMinutes % 60;
  const hours = totalHours % 24;

  // Calendar year/month calculation in IST
  let y = now.getFullYear() - startDate.getFullYear();
  let m = now.getMonth() - startDate.getMonth();
  let d = now.getDate() - startDate.getDate();

  if (d < 0) {
    m -= 1;
    // get days in previous month
    const prevMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
    d += prevMonthDate.getDate();
  }

  if (m < 0) {
    y -= 1;
    m += 12;
  }

  return {
    years: Math.max(0, y),
    months: Math.max(0, m),
    days: Math.max(0, d),
    totalDays,
    hours,
    minutes,
    seconds,
  };
}

export function getCountdownTime(targetDateIso: string, currentDate: Date = new Date()): CountdownTime {
  const target = new Date(targetDateIso).getTime();
  const now = currentDate.getTime();
  const diffMs = target - now;

  if (diffMs <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isPast: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);

  // Approximate years, months, days
  const years = Math.floor(totalDays / 365.25);
  const remainingDaysAfterYears = totalDays - Math.floor(years * 365.25);
  const months = Math.floor(remainingDaysAfterYears / 30.44);
  const days = Math.floor(remainingDaysAfterYears - Math.floor(months * 30.44));

  return {
    years,
    months,
    days: Math.max(0, days),
    hours,
    minutes,
    seconds,
    totalSeconds,
    isPast: false,
  };
}

export function getAnniversaryMilestoneInfo(year: number, monthIndex: number) {
  // Month is 0-indexed (0 = Jan, 4 = May, etc.)
  const targetDate = new Date(year, monthIndex, 15, 0, 0, 0);
  const startDate = new Date('2026-05-15T00:00:00+05:30');
  const now = new Date();

  // Months diff from May 2026
  const monthsDiff = (year - 2026) * 12 + (monthIndex - 4);

  if (monthsDiff < 0) {
    return {
      isAnniversary: false,
      milestoneNumber: 0,
      title: 'Before Our Story Began',
      description: 'The time before Allah brought our paths together.',
      status: 'before' as const,
    };
  }

  if (monthsDiff === 0) {
    return {
      isAnniversary: true,
      milestoneNumber: 0,
      title: 'The Beginning of Our Story ❤️',
      description: '15 May 2026 — The day our hearts connected online and our beautiful forever story started.',
      status: 'completed' as const,
    };
  }

  const isCompleted = now.getTime() >= targetDate.getTime();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === monthIndex;

  const milestoneTitles: Record<number, { title: string; desc: string }> = {
    1: {
      title: 'Our First Monthly Milestone 🌸',
      desc: '15 June 2026 — One month of endless sweet conversations, nicknames, and growing closer every day.',
    },
    2: {
      title: 'Two Months of Heart-to-Heart 💕',
      desc: '15 July 2026 — Deepening trust, late-night laughs, and realizing this is something truly special.',
    },
    3: {
      title: 'Three Months of Pure Barakah 🌙',
      desc: '15 August 2026 — Sharing prayers, making duas for our future, and bridging Bihar and Warangal in heart.',
    },
    4: {
      title: 'Four Months of Endless Care 🦋',
      desc: '15 September 2026 — Hubby & Wifeyy dreams taking root, supporting each other through distance with patience.',
    },
    5: {
      title: 'Five Months of Love & Dua ✨',
      desc: '15 October 2026 — Another milestone in our journey, thanking Allah for every moment together.',
    },
  };

  const specific = milestoneTitles[monthsDiff];
  const title = specific ? specific.title : `${monthsDiff}th Monthly Milestone 💍`;
  const description = specific
    ? specific.desc
    : `Another chapter of our forever story. InshaAllah, step by step closer to our dream Nikah.`;

  return {
    isAnniversary: true,
    milestoneNumber: monthsDiff,
    title,
    description,
    status: isCompleted ? ('completed' as const) : isCurrentMonth ? ('current' as const) : ('future' as const),
  };
}

export function getTotalAnniversariesReached(now: Date = new Date()): number {
  const startDate = new Date('2026-05-15T00:00:00+05:30');
  if (now.getTime() < startDate.getTime()) return 0;

  let count = 0;
  let cursor = new Date(2026, 4, 15, 0, 0, 0); // May 15, 2026

  while (cursor.getTime() <= now.getTime()) {
    count++;
    // Move to next month's 15th
    const nextMonth = cursor.getMonth() + 1;
    const nextYear = cursor.getFullYear() + Math.floor(nextMonth / 12);
    cursor = new Date(nextYear, nextMonth % 12, 15, 0, 0, 0);
  }

  // The start itself is month 0, so completed monthly anniversaries reached (1 month, 2 month...) = count - 1
  return Math.max(0, count - 1);
}
