import { create } from 'zustand';

type SavedSentence = {
  id: number;
  type: 'image' | 'text';
  text: string;
  author?: string;
  bookTitle?: string;
  createdAt: string;
  background: number;
  font: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize: number;
};

type SentenceStore = {
  savedSentences: SavedSentence[];
  addSentence: (sentence: SavedSentence) => void;
  removeSentenceByText: (text: string) => void; 
};

export const useSentenceStore = create<SentenceStore>((set) => ({
  savedSentences: [],

  addSentence: (sentence) =>
    set((state) => ({
      savedSentences: [
        ...state.savedSentences,
        sentence,
      ],
    })),

 
  removeSentenceByText: (text) =>
    set((state) => ({
      savedSentences: state.savedSentences.filter(
        (item) => item.text !== text
      ),
    })),
}));