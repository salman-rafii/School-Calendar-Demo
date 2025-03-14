import { create } from 'zustand';

export interface Event {
  id: string;
  day: string;
  classNumber: number;
  name: string;
  type: 'homework' | 'quiz';
}

interface TimetableState {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  removeEvent: (id: string) => void;
}

export const TIMETABLE = {
  monday: ['Chinese', 'Chinese', 'Scientific reading', 'Scientific reading', 'English', 'Club', 'Club'],
  tuesday: ['Science and Creative Thinking', 'Science and Creative Thinking', 'English', 'English', 'Chemistry', 'Society', 'Biology', 'Biology'],
  wednesday: ['Math', 'Math', 'Living Technology', 'Living Technology', 'English', 'Society', 'Chinese'],
  thursday: ['Chemistry', 'Biology', 'Alternative Learning', 'Alternative Learning', 'History', 'Taiwanese', 'Chinese'],
  friday: ['PE', 'PE', 'Math', 'Math', 'Chinese', 'Elective Subjects', 'Elective Subjects']
};

export const CLASS_TIMES = [
  { start: '08:05', end: '08:55' },
  { start: '09:05', end: '09:55' },
  { start: '10:15', end: '11:05' },
  { start: '11:15', end: '12:05' },
  { start: '13:10', end: '14:00' },
  { start: '14:10', end: '15:00' },
  { start: '15:10', end: '16:00' },
  { start: '16:10', end: '17:00' }
];

export const useTimetableStore = create<TimetableState>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: Math.random().toString() }],
    })),
  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));