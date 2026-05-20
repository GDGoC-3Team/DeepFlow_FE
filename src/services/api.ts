// import axios from 'axios';
// import { API_CONFIG } from '../config/apiConfig';

// export const api = axios.create({
//   baseURL: API_CONFIG.BASE_URL,

//   headers: {
//     'Content-Type': 'application/json',

//     // 💡 임시 인증 헤더 강제 삽입
//     Authorization: 'Bearer mock-token',
//   },
// });

// export default api;
import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 💡 임시 인증 헤더 강제 삽입
    Authorization: 'Bearer mock-token',
  },
});

// 🌟 백엔드 공통 응답(ApiResponse) 처리를 위한 인터셉터 추가!
api.interceptors.response.use(
  (response) => {
    // 백엔드가 준 { success, data, code, message } 중 프론트가 쓸 알맹이(data)만 전달
    return response.data;
  },
  (error) => {
    console.error('API 요청 에러 발생:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;