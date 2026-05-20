// // import { api } from './api';
// // import { API_CONFIG } from '../config/apiConfig';

// // export interface SaveSentenceRequest {
// //   selectedText: string;
// //   imageUrl: string;
// //   fontFamily: string;
// //   fontSize: number;
// //   startOffset: number;
// //   endOffset: number;
// // }

// // const MOCK_SAVE_RESPONSE = {
// //   success: true,
// // };

// // export const sentenceService = {
// //   saveSentence: async (
// //     sessionId: number,
// //     data: SaveSentenceRequest
// //   ) => {
// //     // ✅ MOCK 모드
// //     if (API_CONFIG.USE_MOCK) {
// //       console.log(
// //         '🧪 MOCK 문장 저장'
// //       );

// //       return MOCK_SAVE_RESPONSE;
// //     }

// //     // ✅ 실제 서버
// //     const response = await api.post(
// //       `/reading/${sessionId}/saved-sentences`,
// //       data
// //     );

// //     return response.data;
// //   },
// // };

// import { api } from './api';
// import { API_CONFIG } from '../config/apiConfig';

// // Swagger 18페이지: 문장 저장 요청 스펙 [cite: 345, 346]
// export interface SaveSentenceRequest {
//   selectedText: string; // [cite: 347]
//   imageUrl: string;     // [cite: 348]
//   fontFamily: string;   // [cite: 349]
//   fontSize: number;     // [cite: 350]
//   startOffset: number;  // [cite: 351]
//   endOffset: number;    // [cite: 352]
// }

// // Swagger 19페이지: 문장 저장 성공 시 백엔드가 주는 Response 스펙 
// export interface SavedSentenceResponse {
//   id: number;
//   sentenceId: number;
//   sessionId: number;
//   content: string;
//   imageUrl: string;
//   fontFamily: string;
//   fontSize: number;
//   bookTitle: string;
//   author: string;
//   savedAt: string;
// }
// export interface SavedSentenceItem {
//   id: number;         // 저장 매핑 ID
//   sentenceId: number; // 원본 문장 ID
//   sessionId: number;  // 읽은 독서 세션 ID
//   content: string;    // 문장 본문
//   imageUrl: string;   // 배경 이미지 URL
//   fontFamily: string; // 폰트 종류
//   fontSize: number;   // 폰트 크기
//   bookTitle: string;  // 책 제목
//   author: string;     // 작가 이름
//   savedAt: string;    // 저장된 시간
// }

// // 백엔드 공통 응답 포맷
// export interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   code: string;
//   message: string;
// }

// // 💡 [추가] 마이페이지 보관함용 가짜 데이터
// const MOCK_MY_SENTENCES: SavedSentenceItem[] = [
//   {
//     id: 15,
//     sentenceId: 7,
//     sessionId: 3,
//     content: "책은 마음을 비추는 거울이다.",
//     imageUrl: "https://picsum.photos/400/600",
//     fontFamily: "NANUM_MYEONGJO",
//     fontSize: 18,
//     bookTitle: "어린 왕자",
//     author: "앙투안 드 생텍쥐페리",
//     savedAt: "2026-05-19T10:32:47.418Z"
//   }
// ];

// const MOCK_SAVE_RESPONSE = {
//   success: true,
//   data: {
//     id: 15,
//     sentenceId: 7,
//     sessionId: 3,
//     content: "책은 마음을 비추는 거울이다.",
//     imageUrl: "https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png",
//     fontFamily: "NANUM_MYEONGJO",
//     fontSize: 18,
//     bookTitle: "어린 왕자",
//     author: "앙투안 드 생텍쥐페리",
//     savedAt: "2026-05-19T10:32:47.476Z"
//   }
// };

// export const sentenceService = {
//   // 독서 중 선택한 문장 저장 기능 (POST /reading/{sessionId}/saved-sentences) [cite: 332]
//   saveSentence: async (
//     sessionId: number,
//     data: SaveSentenceRequest
//   ): Promise<ApiResponse<SavedSentenceResponse>> => {
    
//     // ✅ MOCK 모드 분기 처리
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 문장 저장 모드가 작동 중입니다.');
//       return MOCK_SAVE_RESPONSE as any;
//     }

//     // ✅ 실제 서버 통신 가동
//     // 💡 api.ts의 응답 인터셉터가 이미 response.data를 추출해서 반환하므로,
//     // 여기서 받는 response 변수 자체가 { success, data, code, message } 형태의 ApiResponse 객체입니다!
//     const response = await api.post<any, ApiResponse<SavedSentenceResponse>>(
//       `/reading/${sessionId}/saved-sentences`,
//       data
//     );

//     return response;
//   },
//   // 독서 중 선택한 문장 저장 기능 (POST /reading/{sessionId}/saved-sentences) [cite: 332]
//   saveSentence: async (
//     sessionId: number,
//     data: SaveSentenceRequest
//   ): Promise<ApiResponse<SavedSentenceResponse>> => {
    
//     // ✅ MOCK 모드 분기 처리
//     if (API_CONFIG.USE_MOCK) {
//       console.log('🧪 MOCK 문장 저장 모드가 작동 중입니다.');
//       return MOCK_SAVE_RESPONSE as any;
//     }

//     // ✅ 실제 서버 통신 가동
//     // 💡 api.ts의 응답 인터셉터가 이미 response.data를 추출해서 반환하므로,
//     // 여기서 받는 response 변수 자체가 { success, data, code, message } 형태의 ApiResponse 객체입니다!
//     const response = await api.post<any, ApiResponse<SavedSentenceResponse>>(
//       `/reading/${sessionId}/saved-sentences`,
//       data
//     );

//     return response;
//   },
//   // 💡 [추가] 3. 저장한 문장 보관함에서 삭제 (DELETE /my/sentences/{savedSentenceId})
//   deleteMySentence: async (savedSentenceId: number): Promise<boolean> => {
//     if (API_CONFIG.USE_MOCK) {
//       console.log(`🧪 MOCK 저장 문장 삭제 완료 (ID: ${savedSentenceId})`);
//       return true;
//     }

//     const response = await api.delete<any, ApiResponse<any>>(`/my/sentences/${savedSentenceId}`);
//     return response.success; // 성공 여부 (true/false) 반환
//   }
// };
import { api } from './api';
import { API_CONFIG } from '../config/apiConfig';

// Swagger 18페이지: 문장 저장 요청 스펙
export interface SaveSentenceRequest {
  selectedText: string;
  imageUrl: string;
  fontFamily: string;
  fontSize: number;
  startOffset: number;
  endOffset: number;
}

// Swagger 19페이지: 문장 저장 성공 시 백엔드가 주는 Response 스펙 
export interface SavedSentenceResponse {
  id: number;
  sentenceId: number;
  sessionId: number;
  content: string;
  imageUrl: string;
  fontFamily: string;
  fontSize: number;
  bookTitle: string;
  author: string;
  savedAt: string;
}

export interface SavedSentenceItem {
  id: number;         // 저장 매핑 ID
  groupId: number;
  type: 'image' | 'text',
  sentenceId: number; // 원본 문장 ID
  sessionId: number;  // 읽은 독서 세션 ID
  content: string;    // 문장 본문
  imageUrl: string;   // 배경 이미지 URL
  fontFamily: string; // 폰트 종류
  fontSize: number;   // 폰트 크기
  bookTitle: string;  // 책 제목
  author: string;     // 작가 이름
  savedAt: string;    // 저장된 시간
}

// 백엔드 공통 응답 포맷
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  code: string;
  message: string;
}

// 💡 마이페이지 보관함용 가짜 데이터
const MOCK_MY_SENTENCES: SavedSentenceItem[] = [
  {
    id: 15,
    groupId: 15,
    type: 'image',
    sentenceId: 7,
    sessionId: 3,
    content: "책은 마음을 비추는 거울이다.",
    imageUrl: "https://picsum.photos/400/600",
    fontFamily: "NANUM_MYEONGJO",
    fontSize: 18,
    bookTitle: "어린 왕자",
    author: "앙투안 드 생텍쥐페리",
    savedAt: "2026-05-19T10:32:47.418Z"
  }
];

const MOCK_SAVE_RESPONSE = {
  success: true,
  data: {
    id: 15,
    sentenceId: 7,
    sessionId: 3,
    content: "책은 마음을 비추는 거울이다.",
    imageUrl: "https://storage.googleapis.com/deepflow-image-storage/background-image/image_1.png",
    fontFamily: "NANUM_MYEONGJO",
    fontSize: 18,
    bookTitle: "어린 왕자",
    author: "앙투안 드 생텍쥐페리",
    savedAt: "2026-05-19T10:32:47.476Z"
  }
};

export const sentenceService = {
  // 1. 독서 중 선택한 문장 저장 기능 (POST /reading/{sessionId}/saved-sentences)
  saveSentence: async (
    sessionId: number,
    data: SaveSentenceRequest
  ): Promise<ApiResponse<SavedSentenceResponse>> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('🧪 MOCK 문장 저장 모드가 작동 중입니다.');
      return MOCK_SAVE_RESPONSE as any;
    }

    const response = await api.post<any, ApiResponse<SavedSentenceResponse>>(
      `/reading/${sessionId}/saved-sentences`,
      data
    );
    return response;
  },
  // 세션 ID가 필요 없는 홈 피드 전용 API입니다.
  toggleSentenceSave: async (sentenceId: number): Promise<ApiResponse<boolean>> => {
    if (API_CONFIG.USE_MOCK) {
      console.log(`🧪 [MOCK] 문장 피드 토글 완료 (문장 ID: ${sentenceId})`);
      return { success: true, data: true, code: "200", message: "성공" };
    }

    // 명세서에 따르면 응답으로 true(boolean) 값이 반환됩니다.
    const response = await api.post<any, ApiResponse<boolean>>(`/sentences/${sentenceId}/save`);
    return response;
  },

  // 💡 [누락 복구] 2. 내가 저장한 문장 목록 조회 (GET /my/sentences)
  getMySentences: async (type: string = 'all', sort: string = 'latest'): Promise<SavedSentenceItem[]> => {
    if (API_CONFIG.USE_MOCK) {
      console.log('🧪 MOCK 저장한 문장 목록 조회');
      return MOCK_MY_SENTENCES;
    }
    const response = await api.get<any, ApiResponse<SavedSentenceItem[]>>('/my/sentences', {
      params: { type, sort }
    });
    return response.data;
  },

  // 3. 저장한 문장 보관함에서 삭제 (DELETE /my/sentences/{savedSentenceId})
  deleteMySentence: async (savedSentenceId: number): Promise<boolean> => {
    if (API_CONFIG.USE_MOCK) {
      console.log(`🧪 MOCK 저장 문장 삭제 완료 (ID: ${savedSentenceId})`);
      return true;
    }

    const response = await api.delete<any, ApiResponse<any>>(`/my/sentences/${savedSentenceId}`);
    return response.success;
  }
};