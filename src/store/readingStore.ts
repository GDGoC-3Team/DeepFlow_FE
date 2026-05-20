import { create } from 'zustand';

type ReadingStore = {

  hasCompletedToday: boolean;

  lastCompletedDate: string | null;

  readingDates: string[];

  completeToday:
    (date: string) => void;

  resetToday: () => void;
};

export const useReadingStore =
  create<ReadingStore>((set) => ({

    hasCompletedToday: false,

    lastCompletedDate: null,

    readingDates: [],

    completeToday: (date) =>
      set((state) => ({

        hasCompletedToday: true,

        lastCompletedDate: date,

        readingDates:
          state.readingDates.includes(date)
            ? state.readingDates
            : [
                ...state.readingDates,
                date,
              ],

      })),

    resetToday: () =>
      set({
        hasCompletedToday: false,
      }),

  }));