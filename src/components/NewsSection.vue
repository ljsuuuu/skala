<template>
  <div class="news-section">
    <div class="main-news">
      <div class="hero-article">
        <img
          src="../assets/image.png"
          alt="메인 뉴스"
          class="hero-img"
        />
        <h1 class="hero-title">
          2월 고용지표 발표 임박: 시장이 주목하는 관전 포인트는?
        </h1>
        <p class="hero-desc">
          지난해 부진했던 데이터 이후, 노동 시장이 안정화 단계에 접어들었는지
          혹은 침체로 돌아섰는지를 가늠할 결정적 단서에 이목이 쏠리고 있습니다.
        </p>
        <span class="news-source">AI-금융리포트 • 33분 전</span>
      </div>

      <div class="sub-articles">
        <div class="sub-article left-sub">
          <img
            src="../assets/oracle.jpeg"
            alt="서브 뉴스"
            class="sub-img"
          />
          <h3 class="sub-title">
            오라클, AI 투자 자금 압박 속에 수천 명 규모 감원 계획
          </h3>
        </div>
        <div class="sub-article right-sub">
          <img
            src="../assets/rus_crude.jpg"
            alt="서브 뉴스"
            class="sub-img"
          />
          <h3 class="sub-title">
            미국, 인도의 러시아산 원유 추가 구매 일시적 허용 방침
          </h3>
        </div>
      </div>
    </div>

    <div class="latest-news">
      <h3 class="latest-title">최신 뉴스</h3>
      <ul class="latest-list">
        <li
          class="latest-item"
          v-for="(news, index) in latestNews"
          :key="index"
        >
          <h4 class="item-title">{{ news.title }}</h4>
          <span class="item-source">{{ news.source }} • {{ news.time }}</span>
          <div class="item-tickers" v-if="news.tickers">
            <span
              v-for="ticker in news.tickers"
              :key="ticker.name"
              :class="['ticker', ticker.up ? 'up' : 'down']"
            >
              {{ ticker.name }} {{ ticker.val }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const latestNews = ref([
  {
    title: "중국 규제 당국, 선전 거래소 '차이넥스트(ChiNext)' 개혁 강화 발표",
    source: "로이터",
    time: "12분 전",
  },
  {
    title: "마벨 테크, AI 칩 부문의 장기적 성장 전망에 주가 랠리",
    source: "로이터",
    time: "32분 전",
    tickers: [
      { name: "MRVL", val: "-3.09%", up: false },
      { name: "AVGO", val: "+4.80%", up: true },
    ],
  },
  {
    title:
      "카타르 경고: 전쟁 지속 시 '며칠 내' 걸프 지역 에너지 수출 중단 불가피",
    source: "블룸버그",
    time: "52분 전",
  },
  {
    title: "앤스로픽, 미 국방부를 상대로 한 법적 대응 불가피 입장 표명",
    source: "블룸버그",
    time: "6시간 전",
  },
]);
</script>

<style scoped>
/* 기존 스타일 소스 유지 */
.news-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0;
}
.main-news {
  border-right: 1px solid #e0e4e9;
  padding-right: 25px;
}
.hero-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
  margin-bottom: 15px;
}
.hero-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 1.2;
  cursor: pointer;
  transition: color 0.2s;
}
.hero-title:hover {
  color: #f47725;
}
.hero-desc {
  font-size: 16px;
  color: #495057;
  margin-bottom: 10px;
}
.news-source {
  font-size: 12px;
  color: #868e96;
  display: block;
  margin-bottom: 20px;
}
.sub-articles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-top: 15px;
  border-top: 1px solid #e0e4e9;
  padding-top: 15px;
}
.left-sub {
  padding-right: 12px;
  border-right: 1px solid #e0e4e9;
}
.right-sub {
  padding-left: 12px;
}
.sub-img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
  margin-bottom: 10px;
}
.sub-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  cursor: pointer;
  transition: color 0.2s;
}
.sub-title:hover {
  color: #f47725;
}
.latest-news {
  padding-left: 25px;
}
.latest-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #dee2e6;
}
.latest-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.latest-item {
  margin-bottom: 20px;
}
.item-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
  line-height: 1.4;
  color: #212529;
  cursor: pointer;
  transition: color 0.2s;
}
.item-title:hover {
  color: #f47725;
}
.item-source {
  font-size: 12px;
  color: #868e96;
  display: block;
  margin-bottom: 5px;
}
.item-tickers {
  display: flex;
  gap: 10px;
  font-size: 12px;
  font-weight: bold;
}
.ticker {
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
}
.ticker.up {
  color: #2b8a3e;
}
.ticker.down {
  color: #e03131;
}

@media (max-width: 768px) {
  .news-section {
    grid-template-columns: 1fr;
  }
  .main-news {
    border-right: none;
    padding-right: 0;
    border-bottom: 1px solid #e0e4e9;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .latest-news {
    padding-left: 0;
  }
  .left-sub {
    padding-right: 0;
    border-right: none;
    padding-bottom: 15px;
    border-bottom: 1px solid #e0e4e9;
    margin-bottom: 15px;
  }
  .right-sub {
    padding-left: 0;
  }
  .sub-articles {
    grid-template-columns: 1fr;
  }
}
</style>
