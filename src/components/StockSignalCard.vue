<template>
  <div
    class="stock-card"
    :class="{
      'buy-card': stock.status === '매수',
      'neutral-card': stock.status === '중립',
    }"
    @click="$emit('click')"
  >
    <div class="card-top">
      <span class="stock-name">{{ stock.name }}</span>
      <span class="stock-ticker">{{ stock.ticker }}</span>
    </div>
    <div class="card-bottom">
      <div class="status-tag">{{ stock.status }}</div>
      <div class="change-rate">{{ stock.change }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stock: {
    type: Object,
    required: true,
  },
});
defineEmits(["click"]);
</script>

<style scoped>
.stock-card {
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
}

/* 🚀 호버 시 그림자와 떠오르는 높이를 대시보드 테마에 맞게 정제 */
.stock-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
}

/* 매수/중립 스타일 */
.buy-card {
  background-color: #fff5f5;
  border-color: #ffe3e3;
}
.neutral-card {
  background-color: #f8f9fa;
  border-color: #e9ecef;
}

.card-top {
  margin-bottom: 15px;
}
.stock-name {
  display: block;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.buy-card .stock-name {
  color: #e03131;
}
.neutral-card .stock-name {
  color: #212529;
}

.stock-ticker {
  font-size: 0.85rem;
  color: #868e96;
  font-weight: 500;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-tag {
  border: 1px solid;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}
.buy-card .status-tag {
  color: #e03131;
  border-color: #ffa8a8;
  background: #fff;
}
.neutral-card .status-tag {
  color: #495057;
  border-color: #dee2e6;
  background: #fff;
}

.change-rate {
  font-size: 1.05rem;
  font-weight: 800;
  color: #e03131;
}
</style>
