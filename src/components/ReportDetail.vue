<template>
  <div class="report-detail" v-if="data">
    <header class="report-header">
      <h1>{{ data.title }}</h1>
    </header>

    <div class="pdf-container" v-if="data.pdfUrl">
      <div v-if="isLoading" class="pdf-loading">
        <div class="loading-spinner"></div>
        <p>PDF 문서를 불러오는 중입니다...</p>
      </div>

      <vue-pdf-embed
        :source="data.pdfUrl"
        class="pdf-document"
        @rendered="handlePdfRendered"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VuePdfEmbed from "vue-pdf-embed";

defineProps(["data"]);
const isLoading = ref(true);

const handlePdfRendered = () => {
  isLoading.value = false;
};
</script>

<style scoped>
.report-detail {
  width: 100%;
  height: 100%;
}

.report-header h1 {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 25px;
  line-height: 1.3;
  color: #1a1a1a;
  border-bottom: 1px solid #e0e4e9;
  padding-bottom: 15px;
}

.pdf-container {
  width: 100%;
  position: relative;
}

/* 🚀 PDF 문서 너비 100% 강제 적용 */
.pdf-document {
  width: 100% !important;
  background-color: #ffffff;
  border: 1px solid #e0e4e9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 🚀 vue-pdf-embed 내부 캔버스가 부모 영역을 가득 채우게 설정 */
:deep(.vue-pdf-embed > div) {
  width: 100% !important;
}
:deep(.vue-pdf-embed canvas) {
  width: 100% !important;
  height: auto !important;
}

.pdf-loading {
  padding: 50px 0;
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
</style>
