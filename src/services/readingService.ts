

// import { api } from './api';
// import { API_CONFIG } from '../config/apiConfig';

// export interface TodayReading {
//   bookId: number;
//   title: string;
//   author: string;
//   coverImageUrl: string;
//   content: string;
//   characterCount: number;
// }

// export interface HighlightItem {
//   id: number;
//   sessionId: number;
//   startOffset: number;
//   endOffset: number;
//   highlightedText: string;
// }

// export interface ReadingSession {
//   id: number;
//   currentOffset: number;
//   maxOffset: number;
// }

// export interface FocusAnalysisResponse {
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

// // 백엔드 공통 Response 타입
// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   code: string;
//   message: string;
// }

// // ======================
// // MOCK DATA
// // ======================

// const MOCK_TODAY: TodayReading = {
//   bookId: 1,
//   title: '어린 왕자',
//   author: '앙투안 드 생텍쥐페리',
//   coverImageUrl: 'https://picsum.photos/300/400',
//   content: `사막은 아름다워. 어딘가에 샘을 숨기고 있으니까.

// 사람들은 별을 보지만 각자 다른 의미를 찾는다.

// 어른들은 숫자를 좋아한다. 하지만 정말 중요한 것은 눈에 보이지 않는다.

// 너는 네 장미꽃에 시간을 들였기 때문에 그 꽃이 소중해진 거야.

// 길게 이어지는 Mock 데이터입니다. ReaderScreen 페이지 자동 분할 테스트용입니다.

// Deepflow는 집중 독서 데이터를 기반으로 사용자의 몰입 패턴을 분석합니다.

// 문장을 길게 이어붙여서 700자 이상이 되도록 만드는 중입니다. 이렇게 해야 페이지가 자동으로 여러 장 생성되는지 UI를 확인할 수 있습니다.

// 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다.`,
//   characterCount: 1200,
// };

// const MOCK_SESSION: ReadingSession = {
//   id: 1,
//   currentOffset: 0,
//   maxOffset: 540,
// };

// const MOCK_HIGHLIGHTS: HighlightItem[] = [
//   {
//     id: 1,
//     sessionId: 1,
//     startOffset: 120,
//     endOffset: 156,
//     highlightedText: '문장 하나가 마음에 남았다.',
//   },
// ];

// const MOCK_ANALYSIS: FocusAnalysisResponse = {
//   totalReadingTime: 450,
//   pageTimes: { 1: 60, 2: 72, 3: 120, 4: 35, 5: 80 },
//   pageOrder: [1, 2, 3, 4, 5],
//   movedBackPages: [2],
//   highlights: [
//     { page: 3, sentenceIndex: 0, text: '성공은 결국 우연이 아니다.' },
//     { page: 5, sentenceIndex: 1, text: '진정한 창의성은 한계 속에서 피어난다.' },
//   ],
//   readingData: [
//     { page: 1, textLength: 240 },
//     { page: 2, textLength: 310 },
//     { page: 3, textLength: 450 },
//     { page: 4, textLength: 120 },
//     { page: 5, textLength: 380 },
//   ],
// };

// // ======================
// // SERVICE
// // ======================

// export const readingService = {

//   // 오늘의 읽기 조회
//   getTodayReading: async (): Promise<TodayReading> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 오늘의 읽기 조회');
//       return MOCK_TODAY;
//     }

//     console.log('🔥 TODAY 요청:', `${API_CONFIG.BASE_URL}/reading/today`);
    
//     // 💡 api.ts 인터셉터가 response.data를 알아서 처리하므로 결과는 바로 ApiResponse 객체입니다.
//     const response = await api.get<any, ApiResponse<TodayReading>>('/reading/today');
//     return response.data;
//   },

//   // 독서 시작
//   startReading: async (bookId: number): Promise<ReadingSession> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 독서 시작');
//       return MOCK_SESSION;
//     }

//     const response = await api.post<any, ApiResponse<ReadingSession>>('/reading/start', { bookId });
//     console.log('🔥 독서 시작 응답:', response);
//     return response.data;
//   },

//   // 형광펜 생성
//   createHighlight: async (
//     sessionId: number,
//     highlightedText: string,
//     startOffset: number,
//     endOffset: number
//   ): Promise<any> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 형광펜 저장');
//       return true;
//     }

//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/highlights`, {
//       highlightedText,
//       startOffset,
//       endOffset,
//     });
//     return response;
//   },

//   // 형광펜 조회
//   getHighlights: async (sessionId: number): Promise<HighlightItem[]> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 형광펜 조회');
//       return MOCK_HIGHLIGHTS;
//     }

//     const response = await api.get<any, ApiResponse<HighlightItem[]>>(`/reading/${sessionId}/highlights`);
//     return response.data;
//   },
//   // 💡 [추가] 5. 형광펜 삭제 (DELETE /reading/{sessionId}/highlights/{highlightId})
//   deleteHighlight: async (sessionId: number, highlightId: number): Promise<boolean> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log(`🧪 [MOCK] 형광펜 삭제 완료 (ID: ${highlightId})`);
//       return true;
//     }

//     // Swagger 22페이지 명세 반영
//     const response = await api.delete<any, ApiResponse<any>>(
//       `/reading/${sessionId}/highlights/${highlightId}`
//     );
//     return response.success;
//   },

//   // 페이지별 읽기 시간 저장
//   savePageTime: async (
//     sessionId: number,
//     pageNumber: number,
//     elapsedSeconds: number
//   ): Promise<any> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 페이지 시간 저장');
//       return true;
//     }

//     const response = await api.post<any, ApiResponse<any>>('/reading/page-time', {
//       sessionId,
//       pageNumber,
//       elapsedSeconds,
//     });
//     return response;
//   },

//   // 문장 저장
//   saveSentence: async (sessionId: number, sentence: string): Promise<any> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 문장 저장');
//       return true;
//     }

//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/saved-sentences`, {
//       sentence,
//     });
//     return response;
//   },

//   // 독서 완료 처리
//   completeReading: async (sessionId: number, payload: any): Promise<any> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 독서 완료');
//       return { success: true, sessionId };
//     }

//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/complete`, payload);
//     return response.data;
//   },

//   // 집중도 분석 조회
//   getFocusAnalysis: async (sessionId: number): Promise<FocusAnalysisResponse> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 집중도 분석 조회');
//       return MOCK_ANALYSIS;
//     }

//     const response = await api.get<any, ApiResponse<FocusAnalysisResponse>>(`/reading/focus-analysis/${sessionId}`);
//     return response.data;
//   },
// };
// import { api } from './api';
// import { API_CONFIG } from '../config/apiConfig';

// export interface TodayReading {
//   bookId: number;
//   title: string;
//   author: string;
//   coverImageUrl: string;
//   content: string;
//   characterCount: number;
// }

// export interface HighlightItem {
//   id: number;
//   sessionId: number;
//   startOffset: number;
//   endOffset: number;
//   highlightedText: string;
// }

// export interface ReadingSession {
//   id: number;
//   currentOffset: number;
//   maxOffset: number;
// }

// export interface FocusAnalysisResponse {
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

// // 백엔드 공통 Response 타입
// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   code: string;
//   message: string;
// }

// // ======================
// // MOCK DATA (유지)
// // ======================
// const MOCK_TODAY: TodayReading = {
//   bookId: 1,
//   title: '어린 왕자',
//   author: '앙투안 드 생텍쥐페리',
//   coverImageUrl: 'https://picsum.photos/300/400',
//   content: `사막은 아름다워. 어딘가에 샘을 숨기고 있으니까. 사람들은 별을 보지만 각자 다른 의미를 찾는다. 어른들은 숫자를 좋아한다. 하지만 정말 중요한 것은 눈에 보이지 않는다.`,
//   characterCount: 1200,
// };

// const MOCK_SESSION: ReadingSession = { id: 1, currentOffset: 0, maxOffset: 540 };
// const MOCK_HIGHLIGHTS: HighlightItem[] = [{ id: 1, sessionId: 1, startOffset: 120, endOffset: 156, highlightedText: '문장 하나가 마음에 남았다.' }];
// const MOCK_ANALYSIS: FocusAnalysisResponse = {
//   totalReadingTime: 450,
//   pageTimes: { 1: 60, 2: 72, 3: 120, 4: 35, 5: 80 },
//   pageOrder: [1, 2, 3, 4, 5],
//   movedBackPages: [2],
//   highlights: [{ page: 3, sentenceIndex: 0, text: '성공은 결국 우연이 아니다.' }],
//   readingData: [{ page: 1, textLength: 240 }, { page: 2, textLength: 310 }],
// };

// // ======================
// // SERVICE (스웨거 매스 수술 존)
// // ======================
// export const readingService = {

//   // 1. 오늘의 글 조회 (스웨거 15p 완벽 매핑)
//   getTodayReading: async (): Promise<TodayReading> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 오늘의 읽기 조회');
//       return MOCK_TODAY;
//     }
//     const response = await api.get<any, ApiResponse<TodayReading>>('/reading/today');
//     // 🎯 인터셉터 스펙 계층에 맞춰 response.data 본문을 안전하게 리턴 [cite: 281]
//     return response.data;
//   },

//   // 2. 독서 시작 (스웨거 14p 완벽 매핑)
//   startReading: async (bookId: number): Promise<ReadingSession> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 독서 시작');
//       return MOCK_SESSION;
//     }
//     const response = await api.post<any, ApiResponse<ReadingSession>>('/reading/start', { bookId });
//     return response.data; // 🎯 .data 계층 매핑 일치 [cite: 273]
//   },

//   // 3. 형광펜 생성 (스웨거 20p 완벽 매핑)
//   createHighlight: async (
//     sessionId: number,
//     highlightedText: string,
//     startOffset: number,
//     endOffset: number
//   ): Promise<any> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 형광펜 저장');
//       return true;
//     }
//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/highlights`, {
//       startOffset,   // 💡 스웨거 명세서 변수명 순서 정렬 [cite: 395]
//       endOffset,     // 💡 스웨거 명세서 변수명 순서 정렬 [cite: 399]
//       highlightedText, // [cite: 400]
//     });
//     return response.data;
//   },

//   // 4. 형광펜 목록 조회 (스웨거 19p 완벽 매핑)
//   getHighlights: async (sessionId: number): Promise<HighlightItem[]> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 형광펜 조회');
//       return MOCK_HIGHLIGHTS;
//     }
//     const response = await api.get<any, ApiResponse<HighlightItem[]>>(`/reading/${sessionId}/highlights`);
//     return response.data; // [cite: 377]
//   },

//   // 5. 형광펜 삭제 (스웨거 22p 완벽 매핑)
//   deleteHighlight: async (sessionId: number, highlightId: number): Promise<boolean> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log(`🧪 [MOCK] 형광펜 삭제 완료 (ID: ${highlightId})`);
//       return true;
//     }
//     const response = await api.delete<any, ApiResponse<any>>(`/reading/${sessionId}/highlights/${highlightId}`);
//     return response.success; // [cite: 435]
//   },

//   // 6. 페이지 구간 읽기 시간 기록 (스웨거 21p 완벽 매핑)
//   savePageTime: async (
//     sessionId: number,
//     pageNumber: number,
//     elapsedSeconds: number
//   ): Promise<any> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 페이지 시간 저장');
//       return true;
//     }
//     // 🎯 바디에 데이터 규격을 순서대로 깔끔하게 실어서 송출 
//     const response = await api.post<any, ApiResponse<any>>('/reading/page-time', {
//       sessionId,
//       pageNumber,
//       elapsedSeconds,
//     });
//     return response;
//   },

//   // 7. 독서 중 선택한 문장 저장 (스웨거 18p 초정밀 수술)
//   saveSentence: async (sessionId: number, sentence: string): Promise<any> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 문장 저장');
//       return true;
//     }
//     // 🚨 [대완치] 명세서 규격에 맞춰 Key 이름을 sentence에서 'selectedText'로 교정 송출합니다! 
//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/saved-sentences`, {
//       selectedText: sentence, 
//       imageUrl: 'https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png', // [cite: 348]
//       fontFamily: 'nanum_myeongjo', // 🎯 소문자로 강제 하향 조정
//       fontSize: 18, 
//       startOffset: 0, 
//       endOffset: 0 
//     });
//     return response.data;
//   },

//   // 8. 진행 중인 독서 세션 완료 처리 (스웨거 13p 초정밀 수술)
//   completeReading: async (sessionId: number): Promise<any> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 독서 완료');
//       return { success: true, sessionId };
//     }
//     // 🚨 [대완치] 스웨거 명세대로 불필요한 바디 payload를 원천 삭제하고 깔끔하게 Path 변수만 타격합니다! [cite: 248, 253]
//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/complete`);
//     return response.data; // [cite: 257]
//   },

//   // 9. 집중도 분석 결과 조회 (스웨거 5p 완벽 매핑)
//   getFocusAnalysis: async (sessionId: number): Promise<FocusAnalysisResponse> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 집중도 분석 조회');
//       return MOCK_ANALYSIS;
//     }
//     const response = await api.get<any, ApiResponse<FocusAnalysisResponse>>(`/reading/focus-analysis/${sessionId}`);
//     return response.data; // [cite: 89]
//   },
// };
// import { api } from './api';
// import { API_CONFIG } from '../config/apiConfig';

// // --- 인터페이스 정의 ---
// export interface TodayReading {
//   bookId: number;
//   title: string;
//   author: string;
//   coverImageUrl: string;
//   content: string;
//   characterCount: number;
// }

// export interface HighlightItem {
//   id: number;
//   sessionId: number;
//   startOffset: number;
//   endOffset: number;
//   highlightedText: string;
// }

// export interface ReadingSession {
//   id: number;
//   currentOffset: number;
//   maxOffset: number;
// }

// export interface FocusAnalysisResponse {
//   totalReadingTime: number;
//   pageTimes: Record<number, number>;
//   pageOrder: number[];
//   movedBackPages: number[];
//   highlights: { page: number; sentenceIndex: number; text: string; }[];
//   readingData: { page: number; textLength: number; }[];
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   code: string;
//   message: string;
// }

// // --- 서비스 로직 ---
// export const readingService = {
//   // 1. 오늘의 글 조회
//   getTodayReading: async (): Promise<TodayReading> => {
//     if (API_CONFIG.USE_MOCK) return {
//       bookId: 1,
//       title: '어린 왕자',
//       author: '앙투안 드 생텍쥐페리',
//       coverImageUrl: 'https://picsum.photos/300/400',
//       content: '사막은 아름다워. 어딘가에 샘을 숨기고 있으니까. 사람들은 별을 보지만 각자 다른 의미를 찾는다. 어른들은 숫자를 좋아한다. 하지만 정말 중요한 것은 눈에 보이지 않는다.',
//       characterCount: 1200,
//     };
//     const response = await api.get<any, ApiResponse<TodayReading>>('/reading/today');
//     return response.data;
//   },

//   // 2. 독서 시작
//   startReading: async (bookId: number): Promise<ReadingSession> => {
//     if (API_CONFIG.USE_MOCK) return { id: 1, currentOffset: 0, maxOffset: 540 };
//     const response = await api.post<any, ApiResponse<ReadingSession>>('/reading/start', { bookId });
//     return response.data;
//   },

//   // 3. 형광펜 생성
//   createHighlight: async (sessionId: number, highlightedText: string, startOffset: number, endOffset: number) => {
//     if (API_CONFIG.USE_MOCK) return { id: Date.now() };
//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/highlights`, {
//       startOffset, endOffset, highlightedText,
//     });
//     return response.data;
//   },

//   // 4. 페이지 시간 기록 (강제 보정 추가)
//   savePageTime: async (sessionId: number, pageNumber: number, elapsedSeconds: number) => {
//     if (API_CONFIG.USE_MOCK) return true;
//     const response = await api.post<any, ApiResponse<any>>('/reading/page-time', {
//       sessionId,
//       pageNumber: Math.max(1, pageNumber), // 💡 0 이하 방지 (Validation Error 예방)
//       elapsedSeconds,
//     });
//     return response.data;
//   },

//   // 5. 문장 저장
//   saveSentence: async (sessionId: number, sentence: string) => {
//     if (API_CONFIG.USE_MOCK) return true;
//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/saved-sentences`, {
//       selectedText: sentence,
//       imageUrl: 'https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png',
//       fontFamily: 'nanum_myeongjo',
//       fontSize: 18,
//       startOffset: 0,
//       endOffset: 0
//     });
//     return response.data;
//   },

//   // 6. 독서 완료 (바디 없음!)
//   completeReading: async (sessionId: number) => {
//     if (API_CONFIG.USE_MOCK) return { success: true };
//     const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/complete`);
//     return response.data;
//   },

//   // 7. 형광펜 삭제
//   deleteHighlight: async (sessionId: number, highlightId: number) => {
//     if (API_CONFIG.USE_MOCK) return true;
//     const response = await api.delete<any, ApiResponse<any>>(`/reading/${sessionId}/highlights/${highlightId}`);
//     return response.success;
//   }
// };

import { api } from './api';
import { API_CONFIG } from '../config/apiConfig';

// 1. 인터페이스 먼저 정의 (이게 있어야 아래에서 에러가 안 납니다)
export interface TodayReading {
  bookId: number;
  title: string;
  author: string;
  coverImageUrl: string;
  content: string;
  characterCount: number;
}

export interface HighlightItem {
  id: number;
  sessionId: number;
  startOffset: number;
  endOffset: number;
  highlightedText: string;
}

export interface ReadingSession {
  id: number;
  currentOffset: number;
  maxOffset: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  code: string;
  message: string;
}

// 2. 서비스 로직 정의
export const readingService = {
  getTodayReading: async (): Promise<TodayReading> => {
    const response = await api.get<any, ApiResponse<TodayReading>>('/reading/today');
    return response.data;
  },

  startReading: async (bookId: number): Promise<ReadingSession> => {
    const response = await api.post<any, ApiResponse<ReadingSession>>('/reading/start', { bookId });
    return response.data;
  },

  savePageTime: async (sessionId: number, pageNumber: number, elapsedSeconds: number) => {
    return await api.post('/reading/page-time', {
      sessionId,
      pageNumber: Math.max(1, pageNumber),
      elapsedSeconds,
    });
  },

  saveSentence: async (sessionId: number, sentence: string) => {
    return await api.post(`/reading/${sessionId}/saved-sentences`, {
      selectedText: sentence,
      imageUrl: 'https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png',
      fontFamily: 'nanum_myeongjo',
      fontSize: 18,
      startOffset: 0,
      endOffset: 0
    });
  },

  completeReading: async (sessionId: number) => {
    return await api.post(`/reading/${sessionId}/complete`);
  },

  createHighlight: async (sessionId: number, highlightedText: string, startOffset: number, endOffset: number) => {
    return await api.post(`/reading/${sessionId}/highlights`, { startOffset, endOffset, highlightedText });
  },

  deleteHighlight: async (sessionId: number, highlightId: number) => {
    const res = await api.delete(`/reading/${sessionId}/highlights/${highlightId}`);
    return res.data;
  }
};