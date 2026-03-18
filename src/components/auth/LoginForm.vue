<template>
  <div class="form-layer">
    <div class="auth-container">
      <h2 class="auth-title">로그인</h2>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="input-group">
          <label for="username">아이디</label>
          <input
            id="username"
            type="text"
            v-model="username"
            required
            autocomplete="username"
            placeholder="아이디를 입력하세요"
            :disabled="isExiting || isLoading"
          />
        </div>

        <div class="input-group">
          <label for="password">비밀번호</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            autocomplete="current-password"
            placeholder="비밀번호를 입력하세요"
            :disabled="isExiting || isLoading"
          />
        </div>

        <button
          type="submit"
          class="auth-btn"
          :disabled="isExiting || isLoading"
        >
          {{
            isExiting ? "환영합니다..." : isLoading ? "로그인 중..." : "로그인"
          }}
        </button>
      </form>

      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

      <div class="auth-footer">
        아직 계정이 없으신가요?
        <router-link to="/signup" class="auth-link">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 🚀 apiCall.js에서 loginApi 임포트 (경로는 프로젝트 구조에 맞게 조절)
import { loginApi } from "../../api/apiCall";

defineProps(["isExiting"]);
const emit = defineEmits(["login-success"]);

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false); // 통신 중 상태

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    // 🚀 실제 API 호출
    const response = await loginApi(username.value, password.value);

    if (response.ok) {
      // 서버에서 로그인 성공 응답이 오면 (쿠키는 브라우저가 알아서 저장함)
      emit("login-success", username.value);
    } else {
      errorMessage.value = "로그인에 실패했습니다.";
    }
  } catch (error) {
    // 서버가 4xx, 5xx 에러를 뱉었을 때 처리
    errorMessage.value = "아이디 또는 비밀번호가 올바르지 않습니다.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 (생략) */
.form-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
}
.auth-container {
  width: 100%;
  max-width: 420px;
}
.auth-title {
  font-size: 28px;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 40px;
}
.input-group {
  margin-bottom: 24px;
}
.input-group label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #343a40;
  margin-bottom: 8px;
}
.input-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}
.input-group input:focus {
  border-color: #f47725;
}
.input-group input:disabled {
  background-color: #f1f3f5;
  color: #adb5bd;
}
.auth-btn {
  width: 100%;
  padding: 16px;
  background-color: #f47725;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}
.auth-btn:hover:not(:disabled) {
  background-color: #d8641a;
}
.auth-btn:disabled {
  background-color: #ced4da;
  cursor: default;
}
.error-msg {
  color: #e03131;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
  font-weight: 600;
}
.auth-footer {
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
  color: #868e96;
}
.auth-link {
  color: #f47725;
  font-weight: bold;
  text-decoration: none;
}
.auth-link:hover {
  text-decoration: underline;
}
</style>
