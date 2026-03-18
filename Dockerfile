# ==========================================
# Stage 1: Build stage (Node.js 환경에서 빌드)
# ==========================================
FROM node:20-alpine as build-stage

# 작업 폴더 지정
WORKDIR /app

# 패키지 정보 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 전체 복사 및 Vite 빌드 실행 (dist 폴더 생성)
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Production stage (Nginx 서버로 배포)
# ==========================================
FROM nginx:stable-alpine as production-stage

# Stage 1에서 빌드된 완성본(dist)을 Nginx의 기본 서빙 폴더로 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 우리가 만든 nginx 설정 파일 덮어쓰기
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80번 포트 개방
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]