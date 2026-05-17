import { create } from 'zustand';

type SavedSentence = {
  id: number;

  text: string;

  background: number;

  font: string;

  textAlign:
    | 'left'
    | 'center'
    | 'right';

  fontSize: number;
};

type SentenceStore = {
  savedSentences: SavedSentence[];

  addSentence: (
    sentence: SavedSentence
  ) => void;
};

export const useSentenceStore =
  create<SentenceStore>((set) => ({

    savedSentences: [],

    addSentence: (sentence) =>
      set((state) => ({
        savedSentences: [
          ...state.savedSentences,
          sentence,
        ],
      })),

  }));