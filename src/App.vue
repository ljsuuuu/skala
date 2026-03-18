<template>
  <div class="app-root">
    <router-view v-slot="{ Component }">
      <transition name="split-door">
        <component :is="Component" class="page-layer" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
// App.vue는 이제 라우팅 출력을 위한 진입점 역할만 수행합니다.
</script>

<style>
/* style.css에 있는 전역 스타일 외에 App.vue 전용 스타일이 필요하다면 이곳에 작성 */

.app-root {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden; /* 애니메이션 도중 가로 스크롤 생성 방지 */
}

/* 🚀 트랜지션(화면 전환)이 진행 중일 때만 두 화면을 강제로 겹침 */
.split-door-enter-active,
.split-door-leave-active {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  /* 화면이 즉시 사라지지 않고 애니메이션 시간(0.8초) 동안 유지되도록 생명 연장 */
  transition: all 0.8s ease;
}

/* 🚀 기존에 있던 z-index 속성 강제 부여 삭제 
   (이제 AuthView가 스스로 z-index 100을 가져가서 대시보드 위를 덮으며 문을 닫습니다) */
</style>
