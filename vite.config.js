import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '100.81.196.103',
    port: 5001, // 원하는 포트 번호로 설정 (예: 3000)
    // strictPort: true, // 설정한 포트가 이미 사용 중일 때 자동으로 다른 포트를 찾지 않고 에러를 냅니다.
  }
})
