<template>
  <div class="auth-left">
    <div class="brand-logo">AI-Fin<span class="highlight">Report</span></div>
    <h1 class="catchphrase">
      모든 도메인의 전문가가 될 수 없다면,<br />
      실시간 AI리포터로 투자의 해답을 찾으세요.
    </h1>
    <p class="description">
      AI가 복잡한 산업의 전망을 분석하고,<br />
      어려운 도메인 지식의 장벽을 넘어 유망 주식을 전문가 수준으로 안내합니다.
    </p>
  </div>
</template>

<style scoped>
/* 좌측 브랜딩 영역 전용 스타일 */
.auth-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8%;
  background-color: #f8f9fa;
  /* 🚀 스플래시 애니메이션을 위한 부드러운 전환 효과 적용 */
  transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 10; /* 로그인 폼 위로 지나가도록 설정 */
}

.brand-logo {
  font-size: 28px;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 40px;
}
.brand-logo .highlight {
  color: #f47725;
}

.catchphrase {
  font-size: 38px;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.4;
  margin-bottom: 24px;
}

.description {
  font-size: 18px;
  color: #495057;
  line-height: 1.6;
  font-weight: 500;
}

@media (max-width: 992px) {
  .auth-left {
    flex: none;
    padding: 60px 5%;
    text-align: center;
    border-bottom: 1px solid #e0e4e9;
  }
  .catchphrase {
    font-size: 28px;
  }
  .description {
    font-size: 15px;
  }
}
</style>
