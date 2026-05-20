import { api } from './api';
import { API_CONFIG } from '../config/apiConfig';

// 공통 API 응답 규격
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  code: string;
  message: string;
}

// 1. 내 프로필 기본 정보 데이터 타입
export interface UserMeResponse {
  id: number;
  email: string;
  nickname: string;
}

// 2. Swagger 8페이지 독서 습관 지표 스펙 반영 데이터 타입
export interface UserStatsResponse {
  streak_days: number;     // 🔥 백엔드 진짜 Key값: 연속 독서 일수
  display_blocks: number;  // 🧱 백엔드 진짜 Key값: 잔디 블록 수
}

// 🧪 MOCK 모드용 가짜 데이터 세팅
const MOCK_STATS: ApiResponse<UserStatsResponse> = {
  success: true,
  code: "COMMON_200",
  message: "성공",
  data: {
    streak_days: 5,        // 5일 연속 독서 중!
    display_blocks: 14,    // 심은 잔디 14개
  }
};

export const userService = {
  // 👤 내 프로필 기본 정보 조회 (GET /users/me)
  getUserMe: async (): Promise<{ success: boolean; data: UserMeResponse }> => {
    return api.get('/users/me');
  },

  // 📊 마이페이지 하단 독서 통계/스트릭 조회 (GET /reading/habbit)
  getUserStats: async (): Promise<ApiResponse<UserStatsResponse>> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('🧪 [MOCK] 유저 독서 통계/스트릭 조회 완료');
      return MOCK_STATS;
    }
    
    // 🎯 기존의 잘못된 '/mystats' 대신 Swagger 진짜 규격으로 전면 수정 완료!
    const response = await api.get<any, ApiResponse<UserStatsResponse>>('/reading/habbit');
    return response;
  },
};