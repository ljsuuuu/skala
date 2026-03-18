<template>
  <div class="form-layer signup-layer">
    <div class="auth-container">
      <h2 class="auth-title">회원가입</h2>

      <form @submit.prevent="handleSignup" class="auth-form">
        <div class="input-group">
          <label for="new-username">아이디</label>
          <input
            id="new-username"
            type="text"
            v-model="username"
            required
            placeholder="사용할 아이디를 입력하세요"
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label for="new-password">비밀번호</label>
          <input
            id="new-password"
            type="password"
            v-model="password"
            required
            placeholder="비밀번호를 입력하세요"
            :disabled="isLoading"
          />
        </div>

        <button type="submit" class="auth-btn" :disabled="isLoading">
          {{ isLoading ? "가입 처리 중..." : "계정 만들기" }}
        </button>
      </form>

      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

      <div class="auth-footer">
        이미 계정이 있으신가요?
        <router-link to="/" class="auth-link">돌아가기</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 🚀 apiCall.js에서 signupApi 임포트
import { signupApi } from "../../api/apiCall";

const emit = defineEmits(["signup-success"]);

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleSignup = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    // 🚀 실제 API 호출
    const response = await signupApi(username.value, password.value);

    if (response.ok) {
      emit("signup-success");
    } else {
      errorMessage.value = "회원가입에 실패했습니다.";
    }
  } catch (error) {
    errorMessage.value = "이미 존재하는 아이디입니다.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* 기존 스타일 복사 + error-msg 스타일 추가 */
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
.signup-layer {
  background-color: #fcfcfc;
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
  background-color: #1a1a1a;
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
  background-color: #f47725;
}
.auth-btn:disabled {
  background-color: #ced4da;
  cursor: default;
}

/* 🚀 로그인 폼에서 가져온 에러 메시지 스타일 */
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
  color: #1a1a1a;
  font-weight: bold;
  text-decoration: none;
}
.auth-link:hover {
  text-decoration: underline;
  color: #f47725;
}
</style>
