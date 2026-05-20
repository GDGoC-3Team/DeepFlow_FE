// import { api } from './api';

// import { API_CONFIG }
// from '../config/apiConfig';

// export interface CalendarResponse {
//   completedDates: string[];
// }

// export interface ReadingHistoryItem {
//   sessionId: number;

//   date: string;

//   bookTitle: string;

//   author: string;

//   imageUrl: string;
// }

// export interface ReadingResult {
//   totalReadingTime: number;

//   pageTimes: Record<number, number>;

//   pageOrder: number[];

//   movedBackPages: number[];

//   highlights: {
//     page: number;
//     sentenceIndex: number;
//     text: string;

//   }[];

//   readingData: {
//     page: number;
//     textLength: number;
//   }[];
// }

// // ✅ MOCK 데이터
// const MOCK_CALENDAR: CalendarResponse = {
//   completedDates: [
//     '2026-05-01',
//     '2026-05-03',
//     '2026-05-04',
//     '2026-05-05',
//     '2026-05-06',
//     '2026-05-10',
//     '2026-05-11',
//     '2026-05-14',
//     '2026-05-15',
//     '2026-05-18',
//     '2026-05-20',
//     '2026-05-25',
//     '2026-05-26',
//     '2026-05-27',
//     '2026-05-30',
//   ],
// };

// const MOCK_HISTORY: ReadingHistoryItem = {
//   sessionId: 1,

//   date: '2026-05-18',

//   bookTitle: '세상을 움직인 문장들',

//   author: '마크 트웨인',

//   imageUrl:
//     'https://picsum.photos/200/300',
// };

// const MOCK_RESULT: ReadingResult = {
//   totalReadingTime: 450,

//   pageTimes: {
//     1: 60,
//     2: 72,
//     3: 120,
//     4: 35,
//     5: 80,
//   },

//   pageOrder: [
//     1,
//     2,
//     3,
//     4,
//     5,
//   ],

//   movedBackPages: [],

//   highlights: [
//   {
//     page: 2,
//     sentenceIndex: 0,
//     text: '성공은 결국 우연이 아니다...',
    
//   },
//     {
//         page: 3,
//         sentenceIndex: 1,
//         text: '진정한 창의성은 한계 속에서 피어난다...',
//     },
// ],

//   readingData: [
//     { page:1, textLength: 240 },
//     { page: 2, textLength: 310 },
//     { page: 3, textLength: 450 },
//     { page: 4, textLength: 120 },
//     { page: 5, textLength: 380 },
//   ],
// };

// export const readingHistoryService = {

//   // 캘린더 조회
// getCalendarHistory:
//   async (
//     year: number,
//     month: number
//   ): Promise<CalendarResponse> => {

//     if (API_CONFIG.USE_MOCK) {

//       console.log(
//         '🧪 MOCK 캘린더 조회'
//       );

//       return MOCK_CALENDAR;
//     }

//     const response =
//       await api.get(
//         `/reading/history/calendar?year=${year}&month=${month}`
//       );

//     return {
//       completedDates:
//         response.data.data.days
//           .filter(
//             (item: any) =>
//               item.completed
//           )
//           .map(
//             (item: any) =>
//               item.date
//           ),
//     };
//   },

//   // 날짜별 기록 조회
// getHistoryByDate:
//   async (
//     date: string
//   ): Promise<ReadingHistoryItem> => {

//     if (API_CONFIG.USE_MOCK) {

//       console.log(
//         '🧪 MOCK 날짜별 기록 조회'
//       );

//       return MOCK_HISTORY;
//     }

//     const response =
//       await api.get(
//         `/reading/history/${date}`
//       );

//     const bookData =
//       response.data.data.books?.[0];

//     return {
//       sessionId:
//         bookData?.sessionId || 0,

//       date:
//         response.data.data.date,

//       bookTitle:
//         bookData?.book?.title || '',

//       author:
//         bookData?.book?.author || '',

//       imageUrl:
//         bookData?.book?.coverImageUrl || '',
//     };
//   },

//   // 결과 다시보기
//   getReadingResult:
//     async (
//       sessionId: number
//     ): Promise<ReadingResult> => {

//       if (API_CONFIG.USE_MOCK) {
//         console.log(
//           '🧪 MOCK 결과 조회'
//         );

//         return MOCK_RESULT;
//       }

//       const response =
//         await api.get(
//           `/reading/result/${sessionId}`
//         );

//       return response.data.data;
//     },
// };
import { api } from './api';
import { API_CONFIG } from '../config/apiConfig';

export interface CalendarResponse {
  completedDates: string[];
}

export interface ReadingHistoryItem {
  sessionId: number;
  date: string;
  bookTitle: string;
  author: string;
  imageUrl: string;
}

export interface ReadingResult {
  totalReadingTime: number;
  pageTimes: Record<number, number>;
  pageOrder: number[];
  movedBackPages: number[];
  highlights: {
    page: number;
    sentenceIndex: number;
    text: string;
  }[];
  readingData: {
    page: number;
    textLength: number;
  }[];
}

// ✅ MOCK 데이터
const MOCK_CALENDAR: CalendarResponse = {
  completedDates: [
    '2026-05-01',
    '2026-05-03',
    '2026-05-04',
    '2026-05-05',
    '2026-05-06',
    '2026-05-10',
    '2026-05-11',
    '2026-05-14',
    '2026-05-15',
    '2026-05-18',
    '2026-05-20',
    '2026-05-25',
    '2026-05-26',
    '2026-05-27',
    '2026-05-30',
  ],
};

const MOCK_HISTORY: ReadingHistoryItem = {
  sessionId: 1,
  date: '2026-05-18',
  bookTitle: '세상을 움직인 문장들',
  author: '마크 트웨인',
  imageUrl: 'https://picsum.photos/200/300',
};

const MOCK_RESULT: ReadingResult = {
  totalReadingTime: 450,
  pageTimes: { 1: 60, 2: 72, 3: 120, 4: 35, 5: 80 },
  pageOrder: [1, 2, 3, 4, 5],
  movedBackPages: [],
  highlights: [
    {
      page: 2,
      sentenceIndex: 0,
      text: '성공은 결국 우연이 아니다...',
    },
    {
      page: 3,
      sentenceIndex: 1,
      text: '진정한 창의성은 한계 속에서 피어난다...',
    },
  ],
  readingData: [
    { page: 1, textLength: 240 },
    { page: 2, textLength: 310 },
    { page: 3, textLength: 450 },
    { page: 4, textLength: 120 },
    { page: 5, textLength: 380 },
  ],
};

export const readingHistoryService = {

  // 1. 캘린더 조회 (GET /reading/history/calendar)
  getCalendarHistory: async (
    year: number,
    month: number
  ): Promise<CalendarResponse> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('🧪 MOCK 캘린더 조회');
      return MOCK_CALENDAR;
    }

    // 💡 api.ts 인터셉터가 response.data를 알아서 반환하므로 response는 바로 공통 응답 포맷이 됩니다.
    const response = await api.get<any, any>(
      `/reading/history/calendar?year=${year}&month=${month}`
    );

    // 다현님의 완벽한 데이터 필터 체인 연동 구조 적용
    return {
      completedDates: (response.data?.days || [])
        .filter((item: any) => item.completed)
        .map((item: any) => item.date),
    };
  },

  // 2. 날짜별 기록 조회 (GET /reading/history/{date})
  getHistoryByDate: async (
    date: string
  ): Promise<ReadingHistoryItem> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('🧪 MOCK 날짜별 기록 조회');
      return MOCK_HISTORY;
    }

    const response = await api.get<any, any>(
      `/reading/history/${date}`
    );

    const bookData = response.data?.books?.[0];

    return {
      sessionId: bookData?.sessionId || 0,
      date: response.data?.date || date,
      bookTitle: bookData?.book?.title || '',
      author: bookData?.book?.author || '',
      imageUrl: bookData?.book?.coverImageUrl || '',
    };
  },

  // 3. 결과 다시보기 (GET /reading/result/{sessionId})
  getReadingResult: async (
    sessionId: number
  ): Promise<ReadingResult> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('🧪 MOCK 결과 조회');
      return MOCK_RESULT;
    }

    const response = await api.get<any, any>(
      `/reading/result/${sessionId}`
    );

    return response.data;
  },
};