// src/api/apiCall.js
import axios from "axios";

// 1. Axios 인스턴스 생성 (기본 설정)
// vite.config.js에서 '/api' 프록시를 설정했다면 baseURL을 '/api'로 지정합니다.
// 설정하지 않았다면 'http://localhost:8080/api' 처럼 BE의 전체 주소를 적어줍니다.
const springApiClient = axios.create({
  baseURL: "http://100.81.196.103:8008/api", // 프로젝트 설정에 맞게 변경하세요
  timeout: 5000, // 5초 이상 응답이 없으면 에러 처리
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const fastApiClient = axios.create({
  baseURL: "http://100.81.196.103:3381", // 프로젝트 설정에 맞게 변경하세요
  timeout: 120000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const jwtApiClient = axios.create({
  baseURL: "http://100.81.196.103:8080/api",
  withCredentials: true,
});
/**
 * 1. 특정 보고서 상세 조회 API (PDF 바이너리 데이터 수신)
 */
export const fetchReportDetailApi = async (userID, id) => {
  try {
    const response = await springApiClient.get(
      `/report_list/${userID}/${id}/file`,
      {
        // 🚀 핵심: 서버에서 PDF 파일(바이너리)을 직접 주므로 blob으로 설정
        responseType: "blob",
      },
    );
    return response.data;
  } catch (error) {
    console.error(`보고서 ${id} 상세 로드 실패:`, error);
    throw error;
  }
};

/**
 * 2. 리포트 목록 전체 조회 API (페이징 제거)
 * GET /report_list/{user}
 * @param {string} userID - 회원가입 시 입력한 userID
 * @returns {Promise} List[Report]
 */
export const fetchReportListApi = async (userID) => {
  try {
    const response = await springApiClient.get(`/report_list/${userID}`);
    return response.data;
  } catch (error) {
    console.error("보고서 목록 로드 실패:", error);
    throw error;
  }
};

// /**
//  * 2. 리포트 목록 조회 API (페이징)
//  * GET /report_list/{user}
//  * @param {string} userID - 회원가입 시 입력한 userID
//  * @param {number} page - 현재 페이지 번호
//  * @param {number} size - 페이지별 보고서 갯수
//  * @returns {Promise} List[Report]
//  */
// export const fetchReportListApi = async (userID, page, size) => {
//   try {
//     // GET 요청 시 파라미터는 params 객체에 담아 보냅니다. (?page=1&size=10 형태로 자동 변환됨)
//     const response = await apiClient.get(`/report_list/${userID}`, {
//       params: {
//         page: page,
//         size: size,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("보고서 목록 로드 실패:", error);
//     throw error;
//   }
// };

// /**
//  * 3. 전체 리포트 갯수(또는 Max ID) 조회 API
//  * GET /report/len
//  * @returns {Promise} 보고서 리스트의 Max(Id) (int)
//  */
// export const fetchReportLengthApi = async () => {
//   try {
//     const response = await apiClient.get("/report/len");
//     return response.data;
//   } catch (error) {
//     console.error("보고서 전체 길이 로드 실패:", error);
//     throw error;
//   }
// };

/**
 * 4. AI 도메인 보고서 생성 API
 * POST /ai_report
 * @param {string} userID - 회원가입 시 입력한 userID
 * @returns {Promise}
 */
export const createAiReportApi = async (userID) => {
  try {
    const response = await fastApiClient.post("/ai_report", {
      user: userID,
    });
    return response.data;
  } catch (error) {
    console.error("AI 보고서 생성 실패:", error);
    throw error;
  }
};

/**
 * 5. 반도체 도메인 보고서 생성 API
 * POST /semicon_report
 * @param {string} userID - 회원가입 시 입력한 userID
 * @returns {Promise}
 */
export const createSemiconReportApi = async (userID) => {
  try {
    const response = await fastApiClient.post("/semicon_report", {
      user: userID,
    });
    return response.data;
  } catch (error) {
    console.error("반도체 보고서 생성 실패:", error);
    throw error;
  }
};

/**
 * [추가] 6. 로그인 API
 * POST /api/login
 */
export const loginApi = async (username, password) => {
  try {
    const response = await jwtApiClient.post("/login", {
      username: username,
      password: password,
    });
    return response.data; // ApiResponseDto 반환
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};

/**
 * [추가] 7. 회원가입 API
 * POST /api/signup
 */
export const signupApi = async (username, password) => {
  try {
    const response = await jwtApiClient.post("/signup", {
      username: username,
      password: password,
    });
    return response.data; // ApiResponseDto 반환
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

/**
 * [추가] 8. 로그아웃 API (나중에 대시보드에서 사용)
 * POST /api/logout
 */
export const logoutApi = async () => {
  try {
    const response = await jwtApiClient.post("/logout");
    return response.data;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};

/**
 * 🚀 [추가] 9. 인증 확인 (쿠키 검증) API
 * 대시보드 진입 시 호출하여 유저 이름을 리턴받습니다.
 */
export const checkAuthApi = async () => {
  try {
    const response = await jwtApiClient.get("/auth/check");
    return response.data;
  } catch (error) {
    console.error("인증 확인 실패:", error);
    throw error;
  }
};
