<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import NavigationBar from "../components/NavigationBar.vue";
import NewsSection from "../components/NewsSection.vue";
import ReportList from "../components/ReportList.vue";
import ReportDetail from "../components/ReportDetail.vue";
import StockPrediction from "../components/StockPrediction.vue";
import AIChatbot from "../components/AIChatbot.vue";

const currentView = ref("home");
const stockPredictionUrl = ref("");

const isModalOpen = ref(false);
const selectedReport = ref(null);

const originX = ref("50%");
const originY = ref("50%");

const fetchReportDetail = async (payload) => {
  const { id, clickX, clickY, title, pdfUrl } = payload;

  if (clickX !== undefined && clickY !== undefined) {
    originX.value = `${clickX}px`;
    originY.value = `${clickY}px`;
  }

  selectedReport.value = {
    id: id,
    title: title,
    pdfUrl: pdfUrl,
  };

  isModalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = "";
  setTimeout(() => {
    selectedReport.value = null;
  }, 400);
};

const handleKeydown = (e) => {
  if (e.key === "Escape" && isModalOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const handleNavChange = (view) => {
  currentView.value = view;
  if (view === "prediction") {
    stockPredictionUrl.value = "";
    setTimeout(() => {
      stockPredictionUrl.value =
        "https://via.placeholder.com/800x500?text=Stock+Prediction+Graph";
    }, 500);
  }
};
</script>

<template>
  <div class="app-container">
    <NavigationBar :current-view="currentView" @change-view="handleNavChange" />

    <div class="layout-wrapper" :class="{ 'scaled-back': isModalOpen }">
      <main class="main-layout">
        <section class="left-column">
          <NewsSection v-if="currentView === 'home'" />
          <StockPrediction
            v-if="currentView === 'prediction'"
            :imageUrl="stockPredictionUrl"
          />
        </section>

        <aside class="right-column">
          <ReportList @select-report="fetchReportDetail" />
        </aside>
      </main>
    </div>

    <Transition name="modal">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div
          class="modal-animator"
          :style="{ transformOrigin: `${originX} ${originY}` }"
          @click.self="closeModal"
        >
          <div class="modal-content">
            <button class="close-btn" @click="closeModal">✕</button>
            <div class="modal-grid">
              <div class="modal-left-pdf">
                <ReportDetail :data="selectedReport" />
              </div>
              <div class="modal-right-chat">
                <AIChatbot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f8f9fa;
  position: relative;
}

.layout-wrapper {
  flex: 1;
  transition: filter 0.4s ease;
}

.layout-wrapper.scaled-back {
  filter: brightness(0.6) blur(1px);
  pointer-events: none;
  user-select: none;
}

.main-layout {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0;
  background-color: #ffffff;
  border-left: 1px solid #e0e4e9;
  border-right: 1px solid #e0e4e9;
  min-height: 100vh;
}
.left-column {
  padding: 30px;
  border-right: 1px solid #e0e4e9;
  height: max-content;
}
.right-column {
  padding: 30px;
  display: block;
  position: relative;
  height: max-content;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: block;
}

.modal-animator {
  width: 100%;
  height: 100%;
  /* 🚀 [수정] 플렉스 컨테이너 설정 제거. 이것이 중앙 배치를 방해했습니다. */
  /* display: flex; align-items: center; justify-content: center; */
  padding: 30px;
}

/* =========================================
   🚀 [핵심 수정] 완벽한 중앙 배치 및 애니메이션
   ========================================= */

/* 전체 배경(오버레이) Fade In/Out (변경 없음) */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 내부 모달 컨텐츠 스케일 In/Out */
.modal-enter-active .modal-content, /* 🚀 animator가 아닌 content에 직접 적용 */
.modal-leave-active .modal-content {
  /* scale과 함께 원래의 translate 값을 유지해야 합니다. */
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  /* scale과 함께 원래의 translate 값을 유지해야 합니다. */
  transform: translate(-50%, -50%) scale(0.05); /* 🚀 원래 translate 값 + scale(0.05) */
}

/* 🚀 [핵심 추가] .modal-content를 중앙에 완벽하게 배치합니다. */
.modal-content {
  background: #ffffff;
  width: calc(
    100% - 60px
  ); /* 🚀 모달 자체의 좌우 여백 확보 (padding: 30px * 2) */
  max-width: 1400px;
  height: 90vh;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: absolute; /* 🚀 절대 좌표 배치 */
  top: 50%; /* 🚀 상단 50% */
  left: 50%; /* 🚀 왼쪽 50% */
  /* 🚀 자신의 크기만큼 상하좌우로 이동하여 완벽하게 중앙 배치 */
  transform: translate(-50%, -50%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 이하 CSS 코드 (변경 없음) */
.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: rgba(255, 255, 255, 0.8);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 20px;
  color: #868e96;
  cursor: pointer;
  z-index: 1000;
  transition:
    background-color 0.2s,
    color 0.2s;
}
.close-btn:hover {
  background-color: #e03131;
  color: white;
}

.modal-grid {
  display: grid;
  grid-template-columns: 7fr 3fr;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.modal-left-pdf {
  height: 100%;
  overflow-y: auto;
  padding: 40px;
}
.modal-right-chat {
  height: 100%;
  background: #f8f9fa;
  overflow: hidden;
}

@media (max-width: 992px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
  .left-column {
    border-right: none;
    border-bottom: 1px solid #e0e4e9;
  }
  .modal-grid {
    grid-template-columns: 1fr;
  }
  .modal-right-chat {
    display: none;
  }
}
</style>
