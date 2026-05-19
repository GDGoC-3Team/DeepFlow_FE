import api from './api';
import { API_CONFIG } from '../config/apiConfig';

// 💡 Swagger 명세서 기반 응답 타입 정의
export interface UserSettingResponse {
  id: number;
  notificationEnabled: boolean;
  notificationTime: string;
  fontFamily: string;
  fontFamilyDisplayName: string;
  fontSize: number;
}

export interface FontSizeResponse {
  fontSize: number;
}

export interface FontFamilyResponse {
  fontFamily: string;
  fontFamilyDisplayName: string;
}

export interface NotificationPreferenceResponse {
  notificationEnabled: boolean;
}

// 🧪 로컬 개발 및 시연을 위한 휘발성 MOCK 저장소
let mockSettingStorage: UserSettingResponse = {
  id: 1,
  notificationEnabled: true,
  notificationTime: "08:00",
  fontFamily: "NANUM_MYEONGJO",
  fontFamilyDisplayName: "나눔 명조",
  fontSize: 18,
};

export const settingService = {
  /**
   * 🌐 1. 통합 사용자 설정 조회 (GET /settings)
   */
  getSettings: async (): Promise<{ success: boolean; data: UserSettingResponse }> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('🧪 [MOCK] 통합 설정 데이터 로드완료');
      return { success: true, data: { ...mockSettingStorage } };
    }
    
    // 💡 [해결] AxiosResponse 내부의 진짜 백엔드 데이터 알맹이(.data)를 파싱해서 반환하도록 동기화!
    const response = await api.get<{ success: boolean; data: UserSettingResponse }>('/settings');
    return response.data;
  },

  /**
   * 🌐 2. 글자 크기 변경 (PATCH /settings/font-size)
   */
  updateFontSize: async (fontSize: number): Promise<{ success: boolean; data: FontSizeResponse }> => {
    if (API_CONFIG.USE_MOCK) {
      mockSettingStorage.fontSize = fontSize; 
      console.log(`🧪 [MOCK] 글자 크기 ${fontSize}px로 로컬 저장 완료`);
      return { success: true, data: { fontSize } };
    }

    // 💡 [해결] .data 파싱 처리로 Axios 껍데기 시비 차단!
    const response = await api.patch<{ success: boolean; data: FontSizeResponse }>('/settings/font-size', { fontSize });
    return response.data;
  },

  /**
   * 🌐 3. 글꼴 변경 (PATCH /settings/font-family)
   */
  updateFontFamily: async (fontFamily: string): Promise<{ success: boolean; data: FontFamilyResponse }> => {
    if (API_CONFIG.USE_MOCK) {
      mockSettingStorage.fontFamily = fontFamily;
      
      let displayName = '나눔 명조';
      if (fontFamily === 'KOPUB_BATANG') displayName = 'KoPub 바탕';
      if (fontFamily === 'NOTO_SANS') displayName = '노토 산스';
      
      mockSettingStorage.fontFamilyDisplayName = displayName;
      console.log(`🧪 [MOCK] 글꼴 ${displayName}로 로컬 저장 완료`);
      
      return { 
        success: true, 
        data: { fontFamily, fontFamilyDisplayName: displayName } 
      };
    }

    // 💡 [해결] .data 파싱 처리로 Axios 껍데기 시비 차단!
    const response = await api.patch<{ success: boolean; data: FontFamilyResponse }>('/settings/font-family', { fontFamily });
    return response.data;
  },

  /**
   * 🌐 4. 알림 수신 여부 변경 (PATCH /settings/notification)
   */
  updateNotificationPreference: async (notificationEnabled: boolean): Promise<{ success: boolean; data: NotificationPreferenceResponse }> => {
    if (API_CONFIG.USE_MOCK) {
      mockSettingStorage.notificationEnabled = notificationEnabled;
      console.log(`🧪 [MOCK] 알림 상태 ${notificationEnabled ? 'ON' : 'OFF'} 로컬 저장 완료`);
      return { success: true, data: { notificationEnabled } };
    }

    // 💡 [해결] .data 파싱 처리로 Axios 껍데기 시비 차단!
    const response = await api.patch<{ success: boolean; data: NotificationPreferenceResponse }>('/settings/notification', { notificationEnabled });
    return response.data;
  }
};