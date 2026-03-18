<template>
  <div class="chatbot-container">
    <div class="chat-header">
      <div class="ai-profile">
        <span class="ai-icon">🤖</span>
        <div>
          <h3>AI Report Assistant</h3>
          <p class="status">Online</p>
        </div>
      </div>
    </div>

    <div class="chat-messages" ref="chatContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :class="message.role === 'ai' ? 'ai-message' : 'user-message'"
      >
        <p>{{ message.text }}</p>
        <span class="time">{{ message.time }}</span>
      </div>
    </div>

    <div class="chat-input-area">
      <input
        type="text"
        placeholder="질문을 입력하세요..."
        class="chat-input"
        v-model="inputText"
        @keyup.enter="sendMessage"
      />
      <button class="send-btn" @click="sendMessage" :disabled="isTyping">
        <span>➤</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const messages = ref([
  {
    role: "ai",
    text: "안녕하세요! 현재 열람 중인 리포트에 대해 무엇이든 물어보세요.",
    time: "방금 전",
  },
]);

const inputText = ref("");
const isTyping = ref(false);
const chatContainer = ref(null);

// 🚀 Req 1: 스크롤이 가장 밑에 있는지 확인 후 작동하는 스마트 스크롤 로직
const scrollToBottomIfAtBottom = async () => {
  if (!chatContainer.value) return;

  const container = chatContainer.value;
  // 현재 스크롤이 맨 아래에 근접해 있는지 확인 (여유 오차 10px 허용)
  const isAtBottom =
    container.scrollHeight - container.scrollTop <= container.clientHeight + 10;

  await nextTick(); // DOM 업데이트 대기

  // 원래 맨 아래에 있었을 때만 최하단으로 강제 이동
  if (isAtBottom) {
    container.scrollTop = container.scrollHeight;
  }
};

const sendMessage = () => {
  const text = inputText.value.trim();
  if (!text || isTyping.value) return;

  messages.value.push({
    role: "user",
    text: text,
    time: "방금 전",
  });
  inputText.value = "";

  // 사용자 입력 시에는 항상 하단으로 스크롤
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });

  isTyping.value = true;

  setTimeout(() => {
    messages.value.push({
      role: "ai",
      text: "질문하신 내용에 대한 답변을 생성 중입니다. 실제 API 연결 후 정확한 답변이 제공될 예정입니다.",
      time: "방금 전",
    });
    isTyping.value = false;

    // 🚀 AI 답변 추가 시 조건부 스크롤 실행
    scrollToBottomIfAtBottom();
  }, 1000);
};
</script>

<style scoped>
.chatbot-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
  border-left: 1px solid #e0e4e9;
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid #e0e4e9;
  background-color: #f8f9fa;
}

.ai-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai-icon {
  font-size: 24px;
  background: #f47725;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.ai-profile h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #1a1a1a;
}
.ai-profile .status {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #2b8a3e;
  font-weight: 600;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #ffffff;
}

.message {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

/* AI 말풍선 스타일 */
.ai-message {
  align-items: flex-start;
}
.ai-message p {
  background-color: #f1f3f5;
  color: #1a1a1a;
  padding: 12px 16px;
  border-radius: 0 12px 12px 12px;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  width: fit-content;
  max-width: 90%;
}

/* 🚀 새롭게 추가된 사용자 말풍선 스타일 */
.user-message {
  align-items: flex-end;
}
.user-message p {
  background-color: #f47725;
  color: white;
  padding: 12px 16px;
  border-radius: 12px 0 12px 12px;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  width: fit-content;
  max-width: 90%;
}

.time {
  font-size: 11px;
  color: #adb5bd;
  margin-top: 6px;
}

.chat-input-area {
  padding: 20px;
  border-top: 1px solid #e0e4e9;
  display: flex;
  gap: 10px;
  background-color: #ffffff;
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: #f47725;
}

.send-btn {
  background-color: #f47725;
  color: white;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background-color 0.2s;
}
.send-btn:hover:not(:disabled) {
  background-color: #d8641a;
}
.send-btn:disabled {
  background-color: #ced4da;
  cursor: not-allowed;
}
</style>
