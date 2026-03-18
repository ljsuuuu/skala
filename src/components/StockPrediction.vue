<template>
  <div class="prediction-container">
    <div class="stock-tabs">
      <button class="tab active">삼성전자 005930</button>
      <button class="tab">SK하이닉스 000660</button>
      <button class="tab">한미반도체 042700</button>
      <button class="tab">리노공업 058470</button>
    </div>

    <div class="chart-header">
      <div class="header-left">
        <h2>삼성전자 <span class="ticker">005930</span></h2>
      </div>
      <div class="header-right">
        <div class="status-badge buy">매수 (+3.2%)</div>
      </div>
    </div>

    <div class="chart-area">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="주가 예측 그래프"
        class="prediction-graph"
      />
      <div class="chart-placeholder" v-else>
        <div class="loading-spinner"></div>
        <p>AI가 가격 예측 데이터를 분석 중입니다...</p>
      </div>
    </div>

    <section class="signals-section">
      <h3 class="section-title">📌 관련 종목 AI 시그널</h3>
      <div class="stock-grid">
        <StockSignalCard
          v-for="stock in relatedStocks"
          :key="stock.ticker"
          :stock="stock"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StockSignalCard from "./StockSignalCard.vue"; // 🚀 분리했던 카드 컴포넌트 불러오기

defineProps({
  imageUrl: {
    type: String,
    default: "",
  },
});

// 더미 데이터
const relatedStocks = ref([
  {
    name: "레인보우로보틱스",
    ticker: "277810",
    status: "매수",
    change: "+6.3%",
  },
  { name: "두산로보틱스", ticker: "454910", status: "매수", change: "+4.1%" },
  { name: "하이비젼시스템", ticker: "126700", status: "중립", change: "+2.2%" },
  { name: "에스피지", ticker: "058610", status: "중립", change: "+1.8%" },
]);
</script>

<style scoped>
.prediction-container {
  width: 100%;
}

/* 🚀 탭 디자인 모던화 및 오렌지 테마 적용 */
.stock-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  overflow-x: auto;
  padding-bottom: 5px;
}
.stock-tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  padding: 8px 18px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  transition: all 0.2s ease;
}
.tab:hover {
  border-color: #f47725;
  color: #f47725;
}
.tab.active {
  background: #f47725;
  color: #fff;
  border-color: #f47725;
}

/* 🚀 차트 헤더 폰트 및 실선 통일 */
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e4e9;
}
.chart-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: #1a1a1a;
}
.ticker {
  color: #868e96;
  font-size: 0.65em;
  font-weight: 500;
  margin-left: 8px;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 15px;
}
.status-badge.buy {
  background: #fff5f5;
  color: #e03131;
  border: 1px solid #ffa8a8;
}

/* 🚀 차트 영역 보더라인 깔끔하게 통일 */
.chart-area {
  width: 100%;
  background: #f8f9fa;
  border: 1px solid #e0e4e9;
  border-radius: 12px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 40px;
}
.prediction-graph {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

/* 🚀 로딩 스피너 색상 오렌지로 변경 */
.chart-placeholder {
  text-align: center;
  color: #868e96;
  font-weight: 500;
}
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e4e9;
  border-top: 4px solid #f47725;
  border-radius: 50%;
  margin: 0 auto 15px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 🚀 관련 종목 섹션 레이아웃 (ReportDetail과 동일하게 auto-fit 적용) */
.signals-section {
  margin-top: 40px;
}
.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1a1a1a;
}
.stock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}
</style>
