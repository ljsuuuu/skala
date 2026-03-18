import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 🚀 라우터 임포트
import "./style.css"; // 전역 스타일 초기화

const app = createApp(App);

app.use(router); // 🚀 앱에 라우터 장착
app.mount("#app");
