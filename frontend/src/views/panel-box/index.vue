<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import PanelBox from './components/PanelBox.vue'

const isCodeQuestion = ref(true)
const showChat = ref(false)
const containerWidth = ref(0)
const boxWidth = reactive([100, 0, 0])
const maxWidth = computed(() => {
  const blank = 400
  if (isCodeQuestion.value) {
    if (showChat.value) {
      const x = containerWidth.value - boxWidth[2] - blank
      const y = containerWidth.value - boxWidth[0] - blank
      return [x, y]
    }
    else {
      const x = containerWidth.value - blank
      return [x, x]
    }
  }
  else {
    return [containerWidth.value - blank, 0]
  }
})

// 重置盒子宽度
function resetBoxWidth() {
  // 是选择题
  if (!isCodeQuestion.value) {
    if (showChat.value) {
      boxWidth[0] = containerWidth.value / 2
      boxWidth[2] = containerWidth.value - boxWidth[0]
    }
    else { boxWidth[0] = containerWidth.value }
  }
  // 是代码题
  else {
    if (showChat.value) {
      boxWidth[0] = containerWidth.value / 3
      boxWidth[1] = containerWidth.value / 3
      boxWidth[2] = containerWidth.value - boxWidth[0] - boxWidth[1]
    }
    else {
      boxWidth[0] = containerWidth.value / 2
      boxWidth[1] = containerWidth.value - boxWidth[0]
    }
  }
}

// 切换聊天窗口的显示状态
function toggleChat() {
  resetBoxWidth()
  showChat.value = !showChat.value
  resetBoxWidth()
}

// 由于某个盒子宽度的变动，响应式调整其余盒子的宽度
function resize(index) {
  if (isCodeQuestion.value) {
    let usingWidth = 0
    if (index === 0) {
      if (showChat.value) {
        usingWidth = boxWidth[0] + boxWidth[2]
      }
      else {
        usingWidth = boxWidth[0]
      }
      boxWidth[1] = containerWidth.value - usingWidth
    }
    else if (index === 1 && showChat.value) {
      usingWidth = boxWidth[0] + boxWidth[1]
      boxWidth[2] = containerWidth.value - usingWidth
    }
  }
  else {
    if (index === 0) {
      boxWidth[2] = containerWidth.value - boxWidth[0]
    }
  }
}

// 组件挂载完成后，获取container的宽度并初始化盒子宽度
onMounted(() => {
  // 获取container的宽度
  const container = document.querySelector('.container')
  containerWidth.value = container.offsetWidth - 2 * 12 - 2
  resetBoxWidth()
})

// 防抖函数
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// 窗口发生变动，重新设置盒子宽度
window.onresize = debounce(() => {
  const container = document.querySelector('.container');
  if (container) {
    containerWidth.value = container.offsetWidth - 2 * 12 - 2;
    resetBoxWidth();
  } else {
    console.warn('Container element not found');
  }
}, 200); // 200毫秒的防抖延迟

</script>

<template>
  <div class="container">
    <PanelBox :maxWidth="maxWidth[0]" :isLast="!isCodeQuestion && !showChat" v-model="boxWidth[0]" @resize="resize(0)">
      <slot name="question"></slot>
    </PanelBox>
    <PanelBox :isShow="isCodeQuestion" :maxWidth="maxWidth[1]" :isLast="!showChat" v-model="boxWidth[1]" @resize="resize(1)">
      <slot name="code"></slot>
    </PanelBox>
    <PanelBox :isShow="showChat" :isLast="true" v-model="boxWidth[2]">
      <slot name="chat"></slot>
    </PanelBox>
  </div>
  <!-- <div class="AIchat">
    <button @click="toggleChat">Toggle Chat</button>
  </div> -->
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.AIchat {
  width: 80px;
  height: 80px;
  position: fixed;
  bottom: 12px;
  right: 12px;
}

.AIchat button {
  width: 100%;
  height: 100%;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.3rem;
  cursor: pointer;
}

.container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>
