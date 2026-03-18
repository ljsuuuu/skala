<template>
  <div class="sidebar-report-list">
    <div class="list-header">
      <h3 class="header-title">Recent Reports</h3>

      <div class="create-report-container">
        <button
          class="create-btn"
          @click="toggleDomainSelect"
          :disabled="isCreating"
        >
          {{ isCreating ? "생성 중..." : "+ 보고서 생성" }}
        </button>

        <div v-if="showDomainSelect" class="domain-dropdown">
          <div class="domain-option" @click="handleGenerateReport('AI')">
            AI 도메인
          </div>
          <div class="domain-option" @click="handleGenerateReport('semicon')">
            반도체 도메인
          </div>
        </div>
      </div>
    </div>

    <transition-group name="list" tag="div" class="report-items">
      <div
        v-for="report in reports"
        :key="report.id"
        class="report-item"
        :class="{
          'loading-item': report.isLoading,
          'new-report': report.isNew,
          'fetching-detail': fetchingId === report.id,
        }"
        @click="!report.isLoading && goToDetail($event, report)"
      >
        <template v-if="report.isLoading">
          <div class="spinner-small"></div>
          <span class="loading-text">보고서를 생성하고 있습니다...</span>
        </template>

        <template v-else>
          <div class="item-top">
            <span class="report-domain">{{ report.domain }}</span>
            <span class="report-title">
              {{ fetchingId === report.id ? "파일 로드 중..." : report.title }}
            </span>
          </div>
          <div class="item-bottom">
            <span class="report-date">{{ report.date }}</span>
          </div>
        </template>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue"; // 🚀 computed, watch 추가
import { useRoute } from "vue-router";
import {
  fetchReportListApi,
  fetchReportDetailApi,
  createAiReportApi,
  createSemiconReportApi,
} from "../api/apiCall";

const route = useRoute();

// 🚀 [중요 수정] 반응형으로 userID를 가져옵니다.
// route.meta가 변경될 때 자동으로 반응하도록 처리합니다.
const userID = computed(() => route.meta.username);

const reports = ref([]);
const isCreating = ref(false);
const showDomainSelect = ref(false);
const fetchingId = ref(null);
const emit = defineEmits(["select-report"]);

const toggleDomainSelect = () => {
  if (isCreating.value) return;
  showDomainSelect.value = !showDomainSelect.value;
};

// 🚀 보고서 생성 로직
const handleGenerateReport = async (domain) => {
  if (!userID.value) {
    // alert("인증 정보가 없습니다. 다시 로그인 해주세요.");
    return;
  }

  showDomainSelect.value = false;
  isCreating.value = true;

  const loadingId = "loading-" + Date.now();
  reports.value.unshift({ id: loadingId, isLoading: true });

  try {
    if (domain === "AI") {
      await createAiReportApi(userID.value);
    } else {
      await createSemiconReportApi(userID.value);
    }
    await fetchReports();
  } catch (error) {
    console.error("보고서 생성 실패:", error);
    reports.value.shift();
  } finally {
    isCreating.value = false;
  }
};

// 🚀 리포트 목록 조회 로직
const fetchReports = async () => {
  if (!userID.value) return; // 🚀 .value 사용

  try {
    const response = await fetchReportListApi(userID.value);
    if (response && response.body && response.body.reportList) {
      reports.value = response.body.reportList.map((item) => ({
        id: item.id,
        title: item.filename,
        domain: item.type.toUpperCase(),
        date: item.date.split(" ")[0].replace(/-/g, "."),
      }));
    }
  } catch (error) {
    console.error("목록 로드 에러:", error);
  }
};

// 🚀 특정 리포트 파일 로드 로직
const goToDetail = async (event, report) => {
  if (fetchingId.value) return;
  if (!userID.value) {
    // alert("인증 정보가 없습니다. 다시 로그인 해주세요.");
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  const clickX = rect.left + rect.width / 2;
  const clickY = rect.top + rect.height / 2;

  fetchingId.value = report.id;

  try {
    const detailData = await fetchReportDetailApi(userID.value, report.id);

    const blob = new Blob([detailData], { type: "application/pdf" });
    const realPdfUrl = URL.createObjectURL(blob);

    emit("select-report", {
      id: report.id,
      clickX,
      clickY,
      title: report.title,
      pdfUrl: realPdfUrl,
      detailInfo: detailData,
    });
  } catch (error) {
    alert("상세 보고서 파일을 가져오지 못했습니다.");
    console.error(error);
  } finally {
    fetchingId.value = null;
  }
};

// 🚀 [핵심 로직] userID가 비동기적으로 채워질 수 있으므로 watch를 걸어줍니다.
watch(
  userID,
  (newVal) => {
    if (newVal) {
      fetchReports();
    }
  },
  { immediate: true },
);

onMounted(() => {
  fetchReports();
});
</script>

<style scoped>
/* 스타일 변동 없음 */
.sidebar-report-list {
  background: transparent;
  padding: 0;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1f3f5;
}
.header-title {
  font-size: 18px;
  font-weight: 800;
  margin: 0;
  color: #1a1a1a;
}
.create-report-container {
  position: relative;
}
.create-btn {
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
}
.create-btn:hover:not(:disabled) {
  background-color: #f47725;
}
.create-btn:disabled {
  background-color: #ced4da;
  cursor: default;
}
.domain-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 100;
  width: 120px;
}
.domain-option {
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #495057;
  cursor: pointer;
  transition: background-color 0.2s;
}
.domain-option:hover {
  background-color: #f8f9fa;
  color: #f47725;
}
.report-items {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}
.report-item {
  padding: 15px 0;
  border-bottom: 1px solid #f1f3f5;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: white;
  width: 100%;
  height: 95px;
  box-sizing: border-box;
}
.report-item.fetching-detail {
  background-color: #fff4ed;
}
.spinner-small {
  width: 20px;
  height: 20px;
  border: 3px solid #e0e4e9;
  border-top: 3px solid #f47725;
  border-radius: 50%;
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
.report-item:not(.loading-item):hover .report-title {
  color: #f47725;
}
.item-top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 6px;
}
.report-domain {
  background-color: #f1f3f5;
  color: #495057;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
}
.report-title {
  font-size: 15px;
  font-weight: 600;
  color: #343a40;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}
.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #868e96;
}
.list-move {
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.list-enter-active,
.list-leave-active {
  transition:
    transform 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.6s ease;
}
.list-leave-active {
  position: absolute;
  width: 100%;
  left: 0;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
