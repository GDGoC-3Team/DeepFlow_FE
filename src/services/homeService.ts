
import { api } from './api';
import { API_CONFIG } from '../config/apiConfig';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  code: string;
  message: string;
}

export interface HomeSentenceItem {
  id: number;         // (items 내 id) 
  content: string;    // 문장 본문 
  imageUrl: string;   // 배경 이미지 URL 
  bookTitle: string;  // 책 제목 
  author: string;     // 작가 이름 
  createdAt?: string; // 생성일 
}

export interface HomeFeedResponse {
  date: string;       // 피드 날짜 
  items: HomeSentenceItem[]; // 추천 문장 배열 
}

// 백엔드가 보내주는 공통 Response 틀 정의
export interface ApiResponseHomeFeed {
  success: boolean;
  data: HomeFeedResponse;
  code: string;
  message: string;
}

// USE_MOCK용 데이터 구조 유지
const MOCK_HOME_FEED: HomeFeedResponse = {
  date: '2026-05-19', 
  items: [
    {
      id: 15, // [cite: 324]
      content: '책은 마음을 비추는 거울이다.', 
      imageUrl: 'https://picsum.photos/400/600',
      bookTitle: '어린 왕자', 
      author: '앙투안 드 생텍쥐페리', 
    },
    {
      id: 16,
      content: '사막이 아름다운 건 어딘가에 샘이 숨겨져 있기 때문이야.',
      imageUrl: 'https://picsum.photos/400/601',
      bookTitle: '어린 왕자',
      author: '앙투안 드 생텍쥐페리',
    }
  ]
};
// 가짜 데이터 세팅 (MOCK 모드용)
const MOCK_STATS = {
  success: true,
  data: {
    streakDays: 5,          // 5일 연속 독서 중!
    totalReadingTime: 1240,
    totalBooksCount: 14,
  }
};
export interface UserMeResponse {
  id: number;
  email: string;
  nickname: string;
}
export interface UserStatsResponse {
  streakDays: number;       //  연속 독서 일수 (스트릭)
  totalReadingTime: number; //  총 독서 시간 (분 또는 초)
  totalBooksCount: number;  //  지금까지 완독한 총 권수
}

export const homeService = {
  // 오늘의 홈 피드 데이터 랜덤 조회 (GET /sentences/feed) 
  getUserMe: async (): Promise<{ success: boolean; data: UserMeResponse }> => {
    // api.ts 인터셉터가 response.data를 알아서 꺼내주므로 타입 매핑만 해줍니다.
    return api.get('/users/me');
  },
  // [추가] 마이페이지 상단 프로필 스트릭 통계 조회 (GET /my/stats)
  getUserStats: async (): Promise<ApiResponse<UserStatsResponse>> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('MOCK 유저 독서 통계/스트릭 조회');
      return MOCK_STATS as any;
    }
    
    
    const response = await api.get<any, ApiResponse<UserStatsResponse>>('/my/stats');
    return response;
  },
  getHomeFeed: async (size: number = 10): Promise<HomeFeedResponse> => {
    
    //  [1] MOCK 모드 분기 처리
    if (API_CONFIG.USE_MOCK) {
      console.log(' [homeService] MOCK 모드가 켜져 있습니다.');
      return MOCK_HOME_FEED;
    }

    // [2] 실제 서버 모드 가동
    console.log('[homeService] 랜덤 서버 모드 가동: 날짜 파라미터를 제외하고 무작위 피드를 요청합니다.');
    
    // [인터셉터 반영] api.ts에서 이미 response.data를 리턴하므로,
    // 여기서 받는 결과물은 AxiosResponse가 아니라 백엔드의 ApiResponseHomeFeed 객체가 됩니다! [cite: 320]
    const response = await api.get<any, ApiResponseHomeFeed>('/sentences/feed', {
      params: { 
        size // 반환할 문장 개수(Default: 10) [cite: 305]
      }
    });

    console.log('랜덤 홈피드 서버 응답 원본:', JSON.stringify(response, null, 2));

    // response 자체가 이미 { success, data, code, message } 구조입니다.
    if (response && response.success) {
      return response.data; // HomeFeedResponse 리턴
    } else {
      throw new Error(response?.message || '홈 피드를 가져오지 못했습니다.');
    }
  },
};