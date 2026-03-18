<template>
  <div
    class="auth-wrapper"
    :class="{
      'split-door-leave-active': isExiting,
      'split-door-enter-from': isEnteringFromLogout,
      'is-splash-active': isSplash,
    }"
  >
    <AuthBanner
      class="auth-banner-anim"
      :class="{ 'splash-center': isSplash }"
    />

    <div class="auth-right" :class="{ 'splash-hidden': isSplash }">
      <transition :name="transitionName">
        <LoginForm
          v-if="isLogin"
          :isExiting="isExiting"
          @login-success="onLoginSuccess"
        />
        <SignupForm v-else @signup-success="onSignupSuccess" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthBanner from "../components/AuthBanner.vue";
import LoginForm from "../components/auth/LoginForm.vue";
import SignupForm from "../components/auth/SignupForm.vue";

const route = useRoute();
const router = useRouter();

// URL이 /login 이면 true, /signup 이면 false
const isLogin = computed(() => route.path !== "/signup");

// 로그아웃 버튼을 통해 진입했는지 여부 파악
const isFromLogout = route.query.logout === "true";
const hasSeenSplash = sessionStorage.getItem("splashShown");

// 스플래시 상태 관리 (로그아웃으로 진입한 게 아니고, 이전에 스플래시를 본 적 없을 때만 활성화)
const isSplash = ref(!isFromLogout && !hasSeenSplash);

// 퇴장(대시보드 이동) 애니메이션 상태 관리
const isExiting = ref(false);

// 입장(로그아웃 후 진입 시 문 닫힘) 애니메이션 상태 관리
const isEnteringFromLogout = ref(isFromLogout);

// 슬라이드 애니메이션 방향 (slide-in: 덮기, slide-out: 빠지기)
const transitionName = ref("slide-in");

// 라우터 이동 감지하여 애니메이션 방향 설정
watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/signup") {
      transitionName.value = "slide-in"; // 회원가입으로 갈 땐 덮기
    } else {
      transitionName.value = "slide-out"; // 로그인으로 갈 땐 빠지기
    }
  },
);

onMounted(() => {
  // 1. 로그아웃으로 진입했을 경우 (문 닫힘 애니메이션)
  if (isEnteringFromLogout.value) {
    // 50ms 지연 후 클래스를 제거하여 열린 상태에서 가운데로 닫히게 동작
    setTimeout(() => {
      isEnteringFromLogout.value = false;
      router.replace({ path: "/login" }); // URL에서 ?logout=true 쿼리 정리
    }, 50);
  }
  // 2. 초기 접속일 경우 (스플래시 애니메이션)
  else if (isSplash.value) {
    setTimeout(() => {
      isSplash.value = false;
      sessionStorage.setItem("splashShown", "true");
    }, 500);
  }
});

// 로그인 성공 처리
const onLoginSuccess = (userID) => {
  sessionStorage.setItem("userID", userID);
  isExiting.value = true;

  // 지연 없이 즉시 이동 (App.vue의 트랜지션이 0.8초간 화면을 잡아줌)
  router.push("/dashboard");
};

// 회원가입 성공 처리
const onSignupSuccess = () => {
  // alert("회원가입이 완료되었습니다! 로그인해주세요.");
  router.push("/login");
};
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: transparent;
  overflow: hidden;
  position: relative;
  /* 🚀 배경색이 바뀔 때 부드럽게 전환되도록 애니메이션 추가 */
  transition: background-color 0.8s ease;
  /* 🚀 네비게이션 바(1000)보다 높게 설정하여 애니메이션 중 가려지는 현상 방지 */
  z-index: 9999;
}

/* 🚀 스플래시 상태일 때 전체 배경을 AuthBanner의 색상으로 채움 */
.auth-wrapper.is-splash-active {
  background-color: #f8f9fa;
}

.auth-banner-anim {
  transition:
    transform 0.8s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.8s ease !important;
  z-index: 2;
}

/* 🚀 우측 영역: 내부 폼들이 Absolute로 겹칠 수 있도록 Relative 설정 */
.auth-right {
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border-left: 1px solid #e0e4e9;
  transition:
    transform 0.8s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.8s ease;
  z-index: 1;
}

/* =========================================
   대시보드 퇴장 애니메이션 (문 열림)
   ========================================= */
.auth-wrapper.split-door-leave-active {
  pointer-events: none;
}
.auth-wrapper.split-door-leave-active .auth-banner-anim {
  transform: translateX(-100%) !important;
  opacity: 0 !important;
}
.auth-wrapper.split-door-leave-active .auth-right {
  transform: translateX(100%) !important;
  opacity: 0 !important;
}

/* =========================================
   로그아웃 진입 애니메이션 (문 닫힘) 초기 상태
   ========================================= */
.auth-wrapper.split-door-enter-from .auth-banner-anim {
  transform: translateX(-100%) !important;
  opacity: 0 !important;
}
.auth-wrapper.split-door-enter-from .auth-right {
  transform: translateX(100%) !important;
  opacity: 0 !important;
}

/* =========================================
   스플래시 애니메이션
   ========================================= */
.splash-center {
  transform: translateX(42%);
}
.splash-hidden {
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
}

/* =========================================
   🚀 회원가입 덮기 (slide-in) 애니메이션
   ========================================= */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-in-enter-from {
  transform: translateX(100%);
  z-index: 10;
}
.slide-in-enter-to {
  transform: translateX(0);
  z-index: 10;
}
.slide-in-leave-from,
.slide-in-leave-to {
  transform: translateX(0);
  z-index: 1;
}

/* =========================================
   🚀 회원가입 빠지기 (slide-out) 애니메이션
   ========================================= */
.slide-out-enter-active,
.slide-out-leave-active {
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-out-enter-from,
.slide-out-enter-to {
  transform: translateX(0);
  z-index: 1;
}
.slide-out-leave-from {
  transform: translateX(0);
  z-index: 10;
}
.slide-out-leave-to {
  transform: translateX(100%);
  z-index: 10;
}

@media (max-width: 992px) {
  .auth-wrapper {
    flex-direction: column;
  }
  .auth-right {
    border-left: none;
  }
  .splash-center {
    transform: translateY(20%);
  }
  .splash-hidden {
    transform: translateY(-20%);
  }
  .auth-wrapper.split-door-leave-active .auth-banner-anim {
    transform: translateY(-100%) !important;
  }
  .auth-wrapper.split-door-leave-active .auth-right {
    transform: translateY(100%) !important;
  }
  .auth-wrapper.split-door-enter-from .auth-banner-anim {
    transform: translateY(-100%) !important;
  }
  .auth-wrapper.split-door-enter-from .auth-right {
    transform: translateY(100%) !important;
  }
}
</style>
