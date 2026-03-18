// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../views/AuthView.vue";
import Dashboard from "../views/DashBoard.vue";
// 🚀 apiCall에서 검증 함수 임포트
import { checkAuthApi } from "../api/apiCall";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: AuthView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: AuthView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    // 🚀 이 라우트는 인증이 필요하다는 메타 데이터 추가
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 🚀 Navigation Guard (전역 라우터 가드)
router.beforeEach(async (to, from, next) => {
  // 1. 이동하려는 라우트가 인증을 요구하는지 확인
  if (to.meta.requiresAuth) {
    try {
      // 2. 백엔드에 쿠키 검증 API 호출
      const authData = await checkAuthApi();

      if (authData.ok && authData.username) {
        // 3. 인증 성공 시, 컴포넌트에서 쓸 수 있도록 meta 객체에 username 저장 후 통과
        to.meta.username = authData.username;
        next();
      } else {
        // alert("로그인이 필요합니다.");
        next("/login"); // 로그인 페이지로 튕겨냄
      }
    } catch (error) {
      console.error("인증 가드 에러:", error);
      alert("세션이 만료되었거나 접근 권한이 없습니다.");
      next("/login"); // 에러 발생 시 로그인 페이지로 튕겨냄
    }
  } else {
    // 인증이 필요 없는 페이지(로그인, 회원가입 등)는 그냥 통과
    next();
  }
});

export default router;
