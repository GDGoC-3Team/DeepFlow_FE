
import { api } from './api';
import { API_CONFIG } from '../config/apiConfig';

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

export interface FocusAnalysisResponse {
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

// 백엔드 공통 Response 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  code: string;
  message: string;
}

// ======================
// MOCK DATA
// ======================

const MOCK_TODAY: TodayReading = {
  bookId: 1,
  title: '어린 왕자',
  author: '앙투안 드 생텍쥐페리',
  coverImageUrl: 'https://picsum.photos/300/400',
  content: `사막은 아름다워. 어딘가에 샘을 숨기고 있으니까.

사람들은 별을 보지만 각자 다른 의미를 찾는다.

어른들은 숫자를 좋아한다. 하지만 정말 중요한 것은 눈에 보이지 않는다.

너는 네 장미꽃에 시간을 들였기 때문에 그 꽃이 소중해진 거야.

길게 이어지는 Mock 데이터입니다. ReaderScreen 페이지 자동 분할 테스트용입니다.

Deepflow는 집중 독서 데이터를 기반으로 사용자의 몰입 패턴을 분석합니다.

문장을 길게 이어붙여서 700자 이상이 되도록 만드는 중입니다. 이렇게 해야 페이지가 자동으로 여러 장 생성되는지 UI를 확인할 수 있습니다.

문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다. 문장이 계속 이어집니다.`,
  characterCount: 1200,
};

const MOCK_SESSION: ReadingSession = {
  id: 1,
  currentOffset: 0,
  maxOffset: 540,
};

const MOCK_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 1,
    sessionId: 1,
    startOffset: 120,
    endOffset: 156,
    highlightedText: '문장 하나가 마음에 남았다.',
  },
];

const MOCK_ANALYSIS: FocusAnalysisResponse = {
  totalReadingTime: 450,
  pageTimes: { 1: 60, 2: 72, 3: 120, 4: 35, 5: 80 },
  pageOrder: [1, 2, 3, 4, 5],
  movedBackPages: [2],
  highlights: [
    { page: 3, sentenceIndex: 0, text: '성공은 결국 우연이 아니다.' },
    { page: 5, sentenceIndex: 1, text: '진정한 창의성은 한계 속에서 피어난다.' },
  ],
  readingData: [
    { page: 1, textLength: 240 },
    { page: 2, textLength: 310 },
    { page: 3, textLength: 450 },
    { page: 4, textLength: 120 },
    { page: 5, textLength: 380 },
  ],
};

// ======================
// SERVICE
// ======================

export const readingService = {

  // 오늘의 읽기 조회
  getTodayReading: async (): Promise<TodayReading> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('MOCK 오늘의 읽기 조회');
      return MOCK_TODAY;
    }

    console.log('TODAY 요청:', `${API_CONFIG.BASE_URL}/reading/today`);
    
    // api.ts 인터셉터가 response.data를 알아서 처리하므로 결과는 바로 ApiResponse 객체입니다.
    const response = await api.get<any, ApiResponse<TodayReading>>('/reading/today');
    return response.data;
  },

  // 독서 시작
  startReading: async (bookId: number): Promise<ReadingSession> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('MOCK 독서 시작');
      return MOCK_SESSION;
    }

    const response = await api.post<any, ApiResponse<ReadingSession>>('/reading/start', { bookId });
    console.log('독서 시작 응답:', response);
    return response.data;
  },

  // 형광펜 생성
  createHighlight: async (
    sessionId: number,
    highlightedText: string,
    startOffset: number,
    endOffset: number
  ): Promise<any> => {
    if (API_CONFIG.USE_MOCK) {
      console.log(' MOCK 형광펜 저장');
      return true;
    }

    const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/highlights`, {
      highlightedText,
      startOffset,
      endOffset,
    });
    return response;
  },

  // 형광펜 조회
  getHighlights: async (sessionId: number): Promise<HighlightItem[]> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('MOCK 형광펜 조회');
      return MOCK_HIGHLIGHTS;
    }

    const response = await api.get<any, ApiResponse<HighlightItem[]>>(`/reading/${sessionId}/highlights`);
    return response.data;
  },
  //  [추가] 5. 형광펜 삭제 (DELETE /reading/{sessionId}/highlights/{highlightId})
  deleteHighlight: async (sessionId: number, highlightId: number): Promise<boolean> => {
    if (API_CONFIG.USE_MOCK) {
      console.log(`[MOCK] 형광펜 삭제 완료 (ID: ${highlightId})`);
      return true;
    }

   
    const response = await api.delete<any, ApiResponse<any>>(
      `/reading/${sessionId}/highlights/${highlightId}`
    );
    return response.success;
  },

  // 페이지별 읽기 시간 저장
  savePageTime: async (
  sessionId: number,
  startOffset: number,
  endOffset: number,
  elapsedSeconds: number
): Promise<any> => {

  if (API_CONFIG.USE_MOCK) {

    console.log(
      'MOCK 페이지 시간 저장'
    );

    return true;
  }

  const response = await api.post<
    any,
    ApiResponse<any>
  >('/reading/page-time', {

    sessionId,

    startOffset,

    endOffset,

    elapsedSeconds,
  });

  return response;
},

  // 문장 저장
  saveSentence: async (sessionId: number, sentence: string): Promise<any> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('MOCK 문장 저장');
      return true;
    }

    const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/saved-sentences`, {
      sentence,
    });
    return response;
  },

  // 독서 완료 처리
  completeReading: async (sessionId: number, payload: any): Promise<any> => {
    if (API_CONFIG.USE_MOCK) {
      console.log(' MOCK 독서 완료');
      return { success: true, sessionId };
    }

    const response = await api.post<any, ApiResponse<any>>(`/reading/${sessionId}/complete`, payload);
    return response.data;
  },

  // 집중도 분석 조회
  getFocusAnalysis: async (sessionId: number): Promise<FocusAnalysisResponse> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('MOCK 집중도 분석 조회');
      return MOCK_ANALYSIS;
    }

    const response = await api.get<any, ApiResponse<FocusAnalysisResponse>>(`/reading/focus-analysis/${sessionId}`);
    return response.data;
  },
};