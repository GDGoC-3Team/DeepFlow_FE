// import { create } from 'zustand';

// type SavedSentence = {
//   id: number;
//   groupId: number;
//   type: 'image' | 'text';
//   text: string;
//   author?: string;
//   bookTitle?: string;
//   createdAt: string;
//   background: number;
//   font: string;
//   textAlign: 'left' | 'center' | 'right';
//   fontSize: number;
// };

// type SentenceStore = {
//   savedSentences: SavedSentence[];
//   addSentence: (sentence: SavedSentence) => void;
//   //removeSentenceByText: (text: string) => void; 
//   removeSentenceByGroupId: (groupId: number) => void;
// };

// // export const useSentenceStore = create<SentenceStore>((set) => ({
// //   savedSentences: [],

// //   addSentence: (sentence) =>
// //     set((state) => ({
// //       savedSentences: [
// //         ...state.savedSentences,
// //         sentence,
// //       ],
// //     })),
// //     removeSentenceByGroupId: (groupId) => {
// //       set((state) => ({
// //         savedSentences: state.savedSentences.filter((s)=> s.groupId !== groupId),
// //       }))
// //     },
// export const useSentenceStore = create<SentenceStore>()(
//   persist(
//     (set) => ({
//       savedSentences: [],
//       addSentence: (sentence) =>
//         set((state) => ({
//           savedSentences: [...state.savedSentences, sentence],
//         })),
//       removeSentenceByGroupId: (groupId) =>
//         set((state) => ({
//           savedSentences: state.savedSentences.filter((s) => s.groupId !== groupId),
//         })),
//     }),
//     {
//       name: 'sentence-storage', // 로컬 스토리지에 저장될 이름
//       storage: createJSONStorage(() => AsyncStorage), // AsyncStorage 사용
//     }
//   )
// );

 
//   // removeSentenceByText: (text) =>
//   //   set((state) => ({
//   //     savedSentences: state.savedSentences.filter(
//   //       (item) => item.text !== text
//   //     ),
//   //   })),
// }));

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. 타입 정의
type SavedSentence = {
  id: number;
  groupId: number;
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
  removeSentenceByGroupId: (groupId: number) => void;
};

// 2. Persist 미들웨어를 적용한 스토어 생성
export const useSentenceStore = create<SentenceStore>()(
  persist(
    (set) => ({
      savedSentences: [],

      addSentence: (sentence) =>
        set((state) => ({
          savedSentences: [...state.savedSentences, sentence],
        })),

      removeSentenceByGroupId: (groupId) =>
        set((state) => ({
          savedSentences: state.savedSentences.filter((s) => s.groupId !== groupId),
        })),
    }),
    {
      name: 'sentence-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);