pipeline {
    // 1. 실행 환경 정의 (모든 가용 노드에서 실행)
    agent any

    environment {
        GIT_REPO_URL    = 'https://github.com/ljsuuuu/skala.git'
        GIT_BRANCH      = 'main'

        APP_NAME        = 'skala-vue-app'
        IMAGE_NAME      = 'skala-vue-app'
        IMAGE_TAG       = "${BUILD_NUMBER}"
        CONTAINER_NAME  = 'skala-vue-app'

        // Nginx 기본 포트에 맞춰 APP_PORT를 80으로 유지
        APP_PORT        = '80'  
        // 젠킨스(8080)와의 포트 충돌을 피하기 위해 로컬 호스트 포트를 8081로 수정
        HOST_PORT       = '8081'
    } 

    // 2. 전체 작업 단계 정의
    stages {
        stage('Checkout from GitHub') {
            steps {
                git branch: "${GIT_BRANCH}",
                    url: "${GIT_REPO_URL}"
            }
        }
        
        // 요구사항 반영: 멀티 스테이지 Dockerfile을 통한 코드 빌드 및 이미지 빌드 통합
        stage('Code & Docker Image Build') {
            steps {
                echo 'Building the Code and Docker Image...'
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        // 배포 단계: 도커 컨테이너를 실제로 띄우는 로직 (컨테이너 Up)
        stage('Deploy Container') {
            steps {
                echo 'Deploying the container...'
                sh '''
                    # 기존에 돌고 있는 동일한 이름의 컨테이너가 있으면 삭제
                    docker rm -f $CONTAINER_NAME || true

                    # 새 도커 컨테이너 백그라운드 실행
                    docker run -d \
                      --name $CONTAINER_NAME \
                      -p $HOST_PORT:$APP_PORT \
                      $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }
    
    // 추가: 빌드 결과에 따른 후속 작업
    post {
        success {
            echo "Build and Deployment Successful! Deployed to port ${HOST_PORT}"
        }
        failure {
            echo 'Build Failed. Please check the Jenkins logs.'
        }
    }
}