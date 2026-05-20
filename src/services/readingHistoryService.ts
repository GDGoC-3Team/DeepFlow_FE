// // // import { api } from './api';

// // // import { API_CONFIG }
// // // from '../config/apiConfig';

// // // export interface CalendarResponse {
// // //   completedDates: string[];
// // // }

// // // export interface ReadingHistoryItem {
// // //   sessionId: number;

// // //   date: string;

// // //   bookTitle: string;

// // //   author: string;

// // //   imageUrl: string;
// // // }

// // // export interface ReadingResult {
// // //   totalReadingTime: number;

// // //   pageTimes: Record<number, number>;

// // //   pageOrder: number[];

// // //   movedBackPages: number[];

// // //   highlights: {
// // //     page: number;
// // //     sentenceIndex: number;
// // //     text: string;

// // //   }[];

// // //   readingData: {
// // //     page: number;
// // //     textLength: number;
// // //   }[];
// // // }

// // // // ✅ MOCK 데이터
// // // const MOCK_CALENDAR: CalendarResponse = {
// // //   completedDates: [
// // //     '2026-05-01',
// // //     '2026-05-03',
// // //     '2026-05-04',
// // //     '2026-05-05',
// // //     '2026-05-06',
// // //     '2026-05-10',
// // //     '2026-05-11',
// // //     '2026-05-14',
// // //     '2026-05-15',
// // //     '2026-05-18',
// // //     '2026-05-20',
// // //     '2026-05-25',
// // //     '2026-05-26',
// // //     '2026-05-27',
// // //     '2026-05-30',
// // //   ],
// // // };

// // // const MOCK_HISTORY: ReadingHistoryItem = {
// // //   sessionId: 1,

// // //   date: '2026-05-18',

// // //   bookTitle: '세상을 움직인 문장들',

// // //   author: '마크 트웨인',

// // //   imageUrl:
// // //     'https://picsum.photos/200/300',
// // // };

// // // const MOCK_RESULT: ReadingResult = {
// // //   totalReadingTime: 450,

// // //   pageTimes: {
// // //     1: 60,
// // //     2: 72,
// // //     3: 120,
// // //     4: 35,
// // //     5: 80,
// // //   },

// // //   pageOrder: [
// // //     1,
// // //     2,
// // //     3,
// // //     4,
// // //     5,
// // //   ],

// // //   movedBackPages: [],

// // //   highlights: [
// // //   {
// // //     page: 2,
// // //     sentenceIndex: 0,
// // //     text: '성공은 결국 우연이 아니다...',
    
// // //   },
// // //     {
// // //         page: 3,
// // //         sentenceIndex: 1,
// // //         text: '진정한 창의성은 한계 속에서 피어난다...',
// // //     },
// // // ],

// // //   readingData: [
// // //     { page:1, textLength: 240 },
// // //     { page: 2, textLength: 310 },
// // //     { page: 3, textLength: 450 },
// // //     { page: 4, textLength: 120 },
// // //     { page: 5, textLength: 380 },
// // //   ],
// // // };

// // // export const readingHistoryService = {

// // //   // 캘린더 조회
// // // getCalendarHistory:
// // //   async (
// // //     year: number,
// // //     month: number
// // //   ): Promise<CalendarResponse> => {

// // //     if (API_CONFIG.USE_MOCK) {

// // //       console.log(
// // //         '🧪 MOCK 캘린더 조회'
// // //       );

// // //       return MOCK_CALENDAR;
// // //     }

// // //     const response =
// // //       await api.get(
// // //         `/reading/history/calendar?year=${year}&month=${month}`
// // //       );

// // //     return {
// // //       completedDates:
// // //         response.data.data.days
// // //           .filter(
// // //             (item: any) =>
// // //               item.completed
// // //           )
// // //           .map(
// // //             (item: any) =>
// // //               item.date
// // //           ),
// // //     };
// // //   },

// // //   // 날짜별 기록 조회
// // // getHistoryByDate:
// // //   async (
// // //     date: string
// // //   ): Promise<ReadingHistoryItem> => {

// // //     if (API_CONFIG.USE_MOCK) {

// // //       console.log(
// // //         '🧪 MOCK 날짜별 기록 조회'
// // //       );

// // //       return MOCK_HISTORY;
// // //     }

// // //     const response =
// // //       await api.get(
// // //         `/reading/history/${date}`
// // //       );

// // //     const bookData =
// // //       response.data.data.books?.[0];

// // //     return {
// // //       sessionId:
// // //         bookData?.sessionId || 0,

// // //       date:
// // //         response.data.data.date,

// // //       bookTitle:
// // //         bookData?.book?.title || '',

// // //       author:
// // //         bookData?.book?.author || '',

// // //       imageUrl:
// // //         bookData?.book?.coverImageUrl || '',
// // //     };
// // //   },

// // //   // 결과 다시보기
// // //   getReadingResult:
// // //     async (
// // //       sessionId: number
// // //     ): Promise<ReadingResult> => {

// // //       if (API_CONFIG.USE_MOCK) {
// // //         console.log(
// // //           '🧪 MOCK 결과 조회'
// // //         );

// // //         return MOCK_RESULT;
// // //       }

// // //       const response =
// // //         await api.get(
// // //           `/reading/result/${sessionId}`
// // //         );

// // //       return response.data.data;
// // //     },
// // // };
// // import { api } from './api';
// // import { API_CONFIG } from '../config/apiConfig';

// // export interface CalendarResponse {
// //   completedDates: string[];
// // }

// // export interface ReadingHistoryItem {
// //   sessionId: number;
// //   date: string;
// //   bookTitle: string;
// //   author: string;
// //   imageUrl: string;
// // }

// // export interface ReadingResult {
// //   totalReadingTime: number;
// //   pageTimes: Record<number, number>;
// //   pageOrder: number[];
// //   movedBackPages: number[];
// //   highlights: {
// //     page: number;
// //     sentenceIndex: number;
// //     text: string;
// //   }[];
// //   readingData: {
// //     page: number;
// //     textLength: number;
// //   }[];
// // }

// // // ✅ MOCK 데이터
// // const MOCK_CALENDAR: CalendarResponse = {
// //   completedDates: [
// //     '2026-05-01',
// //     '2026-05-03',
// //     '2026-05-04',
// //     '2026-05-05',
// //     '2026-05-06',
// //     '2026-05-10',
// //     '2026-05-11',
// //     '2026-05-14',
// //     '2026-05-15',
// //     '2026-05-18',
// //     '2026-05-20',
// //     '2026-05-25',
// //     '2026-05-26',
// //     '2026-05-27',
// //     '2026-05-30',
// //   ],
// // };

// // const MOCK_HISTORY: ReadingHistoryItem = {
// //   sessionId: 1,
// //   date: '2026-05-18',
// //   bookTitle: '세상을 움직인 문장들',
// //   author: '마크 트웨인',
// //   imageUrl: 'https://picsum.photos/200/300',
// // };

// // const MOCK_RESULT: ReadingResult = {
// //   totalReadingTime: 450,
// //   pageTimes: { 1: 60, 2: 72, 3: 120, 4: 35, 5: 80 },
// //   pageOrder: [1, 2, 3, 4, 5],
// //   movedBackPages: [],
// //   highlights: [
// //     {
// //       page: 2,
// //       sentenceIndex: 0,
// //       text: '성공은 결국 우연이 아니다...',
// //     },
// //     {
// //       page: 3,
// //       sentenceIndex: 1,
// //       text: '진정한 창의성은 한계 속에서 피어난다...',
// //     },
// //   ],
// //   readingData: [
// //     { page: 1, textLength: 240 },
// //     { page: 2, textLength: 310 },
// //     { page: 3, textLength: 450 },
// //     { page: 4, textLength: 120 },
// //     { page: 5, textLength: 380 },
// //   ],
// // };

// // export const readingHistoryService = {

// //   // 1. 캘린더 조회 (GET /reading/history/calendar)
// // //   getCalendarHistory: async (
// // //     year: number,
// // //     month: number
// // //   ): Promise<CalendarResponse> => {
// // //     if (API_CONFIG.USE_MOCK) {
// // //       console.log('🧪 MOCK 캘린더 조회');
// // //       return MOCK_CALENDAR;
// // //     }

// // //     // 💡 api.ts 인터셉터가 response.data를 알아서 반환하므로 response는 바로 공통 응답 포맷이 됩니다.
// // //     const response = await api.get<any, any>(
// // //       `/reading/history/calendar?year=${year}&month=${month}`
// // //     );

// // //     // 다현님의 완벽한 데이터 필터 체인 연동 구조 적용
// // //     return {
// // //       completedDates: (response.data?.days || [])
// // //         .filter((item: any) => item.completed)
// // //         .map((item: any) => item.date),
// // //     };
// // //   },
// // // 1. 캘린더 조회 (GET /reading/history/calendar)
// //   // 📝 src/services/readingHistoryService.ts 내부 getCalendarHistory 최종 마스터피스

// //   getCalendarHistory: async (
// //     year: number,
// //     month: number
// //   ): Promise<CalendarResponse> => {
// //     if (API_CONFIG.USE_MOCK) {
// //       console.log('🧪 MOCK 캘린더 조회');
// //       return MOCK_CALENDAR;
// //     }

// //     const formattedMonth = String(month).padStart(2, '0');

// //     const response = await api.get<any, any>(
// //       `/reading/history/calendar?year=${year}&month=${formattedMonth}`
// //     );

// //     // 💡 인터셉터가 벗겨준 진짜 알맹이 배열 낚아채기
// //     const rawDays = response?.data?.days || response?.days || response?.data || response || [];

// //     const processedDates = (rawDays || []).map((item: any) => {
// //       // 🎯 [경우의 수 1] 백엔드가 객체가 아니라 그냥 "2026-05-20" 문자열 자체를 배열에 담아 던졌을 때
// //       if (typeof item === 'string') return item;

// //       // 🎯 [경우의 수 2] 객체로 던졌다면, completed 여부와 상관없이 일단 존재하는 날짜 필드를 다 긁어옵니다!
// //       // (백엔드가 true/false 대신 완료된 날짜 객체만 리스트에 넣었을 수도 있으므로 안전하게 유연 필터 가동)
// //       if (item && (item.completed || item.isCompleted || item.completed === undefined)) {
// //         return item.date || item.day || item.readingDate;
// //       }
// //       return null;
// //     }).filter(Boolean); // null이나 유효하지 않은 값 깔끔하게 청소

// //     console.log('🎯 [프론트 최종 매핑 완료된 날짜 리스트]:', processedDates);

// //     return {
// //       completedDates: processedDates,
// //     };
// //   },
// //   // 2. 날짜별 기록 조회 (GET /reading/history/{date})
// //   getHistoryByDate: async (
// //     date: string
// //   ): Promise<ReadingHistoryItem> => {
// //     if (API_CONFIG.USE_MOCK) {
// //       console.log('🧪 MOCK 날짜별 기록 조회');
// //       return MOCK_HISTORY;
// //     }

// //     const response = await api.get<any, any>(
// //       `/reading/history/${date}`
// //     );

// //     const bookData = response.data?.books?.[0];

// //     return {
// //       sessionId: bookData?.sessionId || 0,
// //       date: response.data?.date || date,
// //       bookTitle: bookData?.book?.title || '',
// //       author: bookData?.book?.author || '',
// //       imageUrl: bookData?.book?.coverImageUrl || '',
// //     };
// //   },

// //   // 3. 결과 다시보기 (GET /reading/result/{sessionId})
// //   getReadingResult: async (
// //     sessionId: number
// //   ): Promise<ReadingResult> => {
// //     if (API_CONFIG.USE_MOCK) {
// //       console.log('🧪 MOCK 결과 조회');
// //       return MOCK_RESULT;
// //     }

// //     const response = await api.get<any, any>(
// //       `/reading/result/${sessionId}`
// //     );

// //     return response.data;
// //   },
// // };

// import { api } from './api';
// import { API_CONFIG } from '../config/apiConfig';
// import axios from 'axios';

// export interface CalendarResponse {
//   completedDates: string[];
// }

// // 🎯 [수정] 단일 아이템이 리스트(배열) 형태로 화면에 나열되므로 데이터 구조 정의
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

// // 백엔드 공통 Response 타입 정의
// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   code: string;
//   message: string;
// }

// // ✅ MOCK 데이터 (배열 형태로 포맷 통일)
// const MOCK_CALENDAR: CalendarResponse = {
//   completedDates: [
//     '2026-05-01', '2026-05-03', '2026-05-04', '2026-05-05', '2026-05-06',
//     '2026-05-10', '2026-05-11', '2026-05-14', '2026-05-15', '2026-05-18',
//     '2026-05-20', '2026-05-25', '2026-05-26', '2026-05-27', '2026-05-30',
//   ],
// };

// const MOCK_HISTORY_LIST: ReadingHistoryItem[] = [
//   {
//     sessionId: 1,
//     date: '2026-05-20',
//     bookTitle: '가신어머니',
//     author: '김동인',
//     imageUrl: 'https://storage.googleapis.com/deepflow-image-storage/book-cover-image/default.png',
//   }
// ];

// const MOCK_RESULT: ReadingResult = {
//   totalReadingTime: 450,
//   pageTimes: { 1: 60, 2: 72, 3: 120, 4: 35, 5: 80 },
//   pageOrder: [1, 2, 3, 4, 5],
//   movedBackPages: [],
//   highlights: [
//     { page: 2, sentenceIndex: 0, text: '성공은 결국 우연이 아니다...' },
//     { page: 3, sentenceIndex: 1, text: '진정한 창의성은 한계 속에서 피어난다...' },
//   ],
//   readingData: [
//     { page: 1, textLength: 240 }, { page: 2, textLength: 310 },
//     { page: 3, textLength: 450 }, { page: 4, textLength: 120 }, { page: 5, textLength: 380 },
//   ],
// };

// export const readingHistoryService = {

// //   // 1. 월간 독서 캘린더 조회 (스웨거 7-8p 초정밀 타격)
// //   getCalendarHistory: async (
// //     year: number,
// //     month: number
// //   ): Promise<CalendarResponse> => {
// //     if (API_CONFIG.USE_MOCK) {
// //       console.log('🧪 MOCK 캘린더 조회');
// //       return MOCK_CALENDAR;
// //     }

// //     const response = await api.get<any, ApiResponse<any>>(
// //       `/reading/history/calendar?year=${year}&month=${month}`
// //     );

// //     const daysList = response?.data?.days || [];

// //     return {
// //       completedDates: daysList
// //         .filter((item: any) => item && item.completed) 
// //         .map((item: any) => item.date), 
// //     };
// //   },

// //   // 2. 지정한 날짜의 독서 기록 조회 (스웨거 5-6p 확장 개조 🛠️)
// //   // 🎯 [대완치] 단일 객체 리턴 기믹을 완전히 깨부수고, books 배열 전체를 매핑하여 나열형 배열로 반환합니다!
// //   getHistoryByDate: async (
// //     date: string
// //   ): Promise<ReadingHistoryItem[]> => {
// //     if (API_CONFIG.USE_MOCK) {
// //       console.log('🧪 MOCK 날짜별 기록 조회');
// //       return MOCK_HISTORY_LIST;
// //     }

// //     const response = await api.get<any, ApiResponse<any>>(
// //       `/reading/history/${date}`
// //     );

// //     const historyData = response?.data;
// //     // 🎯 백엔드가 던져준 오늘 읽은 도서 세션 배열 전체를 안전하게 획득 
// //     const booksArray = historyData?.books || []; 

// //     // 🎯 쪼르르 나열할 수 있도록 각각의 세션 카드를 객체 배열로 전원 변환 
// //     return booksArray.map((item: any) => ({
// //       sessionId: item?.sessionId || 0, 
// //       date: historyData?.date || date, 
// //       bookTitle: item?.book?.title || '오늘의 도서', 
// //       author: item?.book?.author || '지은이', 
// //       imageUrl: item?.book?.coverImageUrl || 'https://storage.googleapis.com/deepflow-image-storage/book-cover-image/default.png', 
// //     }));
// //   },

// //   // 3. 독서 세션 결과 조회 (스웨거 4-5p 초정밀 타격 - 결과 다시보기 인터페이스)
// //   getReadingResult: async (
// //     sessionId: number
// //   ): Promise<ReadingResult> => {
// //     if (API_CONFIG.USE_MOCK) {
// //       console.log('🧪 MOCK 결과 조회');
// //       return MOCK_RESULT;
// //     }

// //     const response = await api.get<any, ApiResponse<any>>(
// //       `/reading/result/${sessionId}`
// //     );

// //     return response.data;
// //   },
// // 캘린더 달력 데이터 (실서버 100% 지향)
//   async getCalendarHistory(year: number, month: number) {
//     try {
//       const response = await axios.get(`${API_CONFIG.BASE_URL}/history/calendar?year=${year}&month=${month}`);
//       return response.data;
//     } catch (error) {
//       console.error('캘린더 조회 실패, 빈 데이터 리턴');
//       return { completedDates: [] };
//     }
//   },

//   // 날짜별 독서 기록 (Mock 완전 제거, 실서버 전용)
//   async getHistoryByDate(date: string) {
//     try {
//       const response = await axios.get(`${API_CONFIG.BASE_URL}/history/date?date=${date}`);
//       return response.data; // 서버에서 오는 진짜 데이터 배열 반환
//     } catch (error) {
//       console.error('기록 조회 API 에러, 프론트 가드 대기중');
//       return []; // 에러 시 빈 배열 반환하여 컴포넌트의 방어 로직 호출
//     }
//   },

//   // 결과 다시보기 (실서버 찐 데이터)
//   async getReadingResult(sessionId: number) {
//     const response = await axios.get(`${API_CONFIG.BASE_URL}/reading/result/${sessionId}`);
//     return response.data;
//   }
// };
import { api } from './api';
import { API_CONFIG } from '../config/apiConfig';

export const readingHistoryService = {
  getCalendarHistory: async (year: number, month: number) => {
    if (API_CONFIG.USE_MOCK) return { completedDates: ['2026-05-20'] };
    const res = await api.get(`/reading/history/calendar?year=${year}&month=${month}`);
    const daysList = res?.data?.data?.days || res?.data?.days || [];
    return { completedDates: daysList.filter((i: any) => i.completed).map((i: any) => i.date) };
  },

  getHistoryByDate: async (date: string) => {
    if (API_CONFIG.USE_MOCK) return [];
    const res = await api.get(`/reading/history/${date}`);
    const books = res?.data?.data?.books || res?.data?.books || [];
    return books.map((item: any) => ({
      sessionId: item.sessionId,
      date: res.data?.data?.date || date,
      bookTitle: item.book.title,
      author: item.book.author,
      imageUrl: item.book.coverImageUrl,
    }));
  },

  getReadingResult: async (sessionId: number) => {
    const res = await api.get(`/reading/result/${sessionId}`);
    return res.data?.data || res.data;
  }
};

