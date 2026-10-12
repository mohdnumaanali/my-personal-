export interface TimelineMemory {
  id: string;
  date: string; // e.g. "2026-05-15" or display string
  displayDate: string;
  title: string;
  description: string;
  category: 'Milestone' | 'Conversations' | 'Special Moments' | 'Long Distance' | 'Future Dreams';
  photoUrl?: string;
  isInitial?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  date: string;
  category: 'Memories' | 'Special Days' | 'Dreams' | 'Funny Moments';
  imageUrl: string;
  caption: string;
}

export interface DuaItem {
  id: string;
  title: string;
  arabic?: string;
  transliteration?: string;
  translation: string;
  tag: string;
  ameenCount: number;
}

export interface LoveNote {
  id: string;
  title: string;
  condition: string;
  message: string;
  sender: 'Nummu' | 'Shaisuu' | 'Together';
  icon: string;
}

export const RELATIONSHIP_START = '2026-05-15T00:00:00+05:30'; // 15 May 2026 Asia/Kolkata
export const DEFAULT_NIKAH_TARGET = '2032-01-01T00:00:00+05:30'; // Dream year baseline
