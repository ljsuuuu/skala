<template>
  <header class="yahoo-header">
    <div class="header-top">
      <div class="logo" @click="handleNavClick('home')">
        AI-Fin<span class="highlight">Report</span>
      </div>

      <div class="search-container">
        <input
          type="text"
          placeholder="Search for news, tickers or companies"
          class="search-input"
        />
        <button class="search-btn">🔍</button>
      </div>

      <div class="header-actions">
        <button class="action-btn log-out-btn" @click="handleLogout">
          로그아웃
        </button>
      </div>
    </div>

    <nav class="header-bottom">
      <ul class="nav-links">
        <li
          :class="{ active: currentView === 'home' }"
          @click="handleNavClick('home')"
        >
          News
        </li>
        <!-- <li
          :class="{ active: currentView === 'prediction' }"
          @click="handleNavClick('prediction')"
        >
          Stock Prediction
        </li> -->
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
// 🚀 logoutApi 임포트 (경로 확인 필요)
import { logoutApi } from "../api/apiCall";

defineProps({
  currentView: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["change-view"]);
const router = useRouter();

// 대시보드 내부 뷰 전환 (뉴스 <-> 주식 예측)
const handleNavClick = (view) => {
  window.scrollTo(0, 0);
  emit("change-view", view);
};

// 🚀 실제 로그아웃 처리 로직
const handleLogout = async () => {
  try {
    await logoutApi();
  } catch (error) {
    console.error("로그아웃 에러:", error);
  } finally {
    sessionStorage.removeItem("userID");

    // 🚀 /login으로 이동할 때 logout 쿼리 파라미터를 붙여서 보냄
    router.push({ path: "/login", query: { logout: "true" } });
  }
};
</script>

<style scoped>
.yahoo-header {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e4e9;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.header-top {
  max-width: 1280px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.logo {
  font-size: 24px;
  font-weight: 900;
  cursor: pointer;
  color: #1a1a1a;
}
.logo .highlight {
  color: #f47725;
}

.search-container {
  flex: 1;
  max-width: 600px;
  display: flex;
  align-items: center;
}
.search-input {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #ced4da;
  border-right: none;
  border-radius: 24px 0 0 24px;
  font-size: 15px;
  background-color: #f8f9fa;
  outline: none;
}
.search-input:focus {
  background-color: #fff;
  border-color: #f47725;
}
.search-btn {
  padding: 12px 24px;
  background-color: #f47725;
  color: white;
  border: 1px solid #f47725;
  border-radius: 0 24px 24px 0;
  cursor: pointer;
  transition: background-color 0.2s;
}
.search-btn:hover {
  background-color: #d8641a;
  border-color: #d8641a;
}

/* 🚀 버튼들을 나란히 배치 */
.header-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 20px;
  border: 1px solid #ced4da;
  background: white;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.action-btn:hover {
  border-color: #f47725;
  color: #f47725;
}

.log-out-btn {
  background-color: #f47725;
  color: white;
  border-color: #f47725;
}
.log-out-btn:hover {
  background-color: #d8641a;
  border-color: #d8641a;
  color: white;
}

.header-bottom {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 25px;
}
.nav-links li {
  padding: 12px 0;
  font-weight: 600;
  font-size: 15px;
  color: #495057;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.nav-links li:hover,
.nav-links li.active {
  color: #f47725;
  border-bottom: 3px solid #f47725;
}
</style>
