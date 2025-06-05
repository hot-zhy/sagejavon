<template>
  <div class="container1">
    <div class="box1">
      <div class="greeting">
        {{ userInfo.nickname }}，{{ greetingMessage }}！🥰
      </div>
      <div class="recommend">今日为您推荐共计 3 道题目。😗加油😙</div>
    </div>
    <div class="box2">
      <div class="flushed" @click="changeQuestion">
        <img
          src="./images/flush.png"
          alt=""
          style="margin: 20px auto"
          width="50px"
          height="50px"
        />
        <div class="flushed-text">不喜欢？换一批吧！</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 获取用户信息
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

// 计算问候语
const currentTime = new Date()
const hours = currentTime.getHours()

const greetingMessage = computed(() => {
  if (hours < 12) {
    return '早上好'
  } else if (hours < 14) {
    return '中午好'
  } else if (hours < 18) {
    return '下午好'
  } else {
    return '晚上好'
  }
})

// 定义 emit 事件
const emit = defineEmits<{
  (e: 'change-question', payload: any): void
}>()

function changeQuestion() {
  console.log('换一批题')
  emit('change-question', { message: '换一批题' })
}
</script>

<style scoped>
.container1 {
  display: flex;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
}

.box1 {
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 4px 4px 16px 0px #00000014;
  border-radius: 10px;
  width: 100%;
  letter-spacing: 1px;
}

.box2 {
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 4px 4px 16px 0px #00000014;
  border-radius: 10px;
  margin-left: 30px;
  width: 25%;
  letter-spacing: 1px;
}

.box2:hover {
  cursor: pointer;
}

.flushed-text {
  text-align: center;
  font-size: 15px;
  margin-top: -5px;
  font-weight: bold;
  padding-left: 8px;
}

.greeting {
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 20px;
}

.recommend {
  font-size: 15px;
  margin-top: 20px;
  padding: 0 20px;
  font-weight: 500;
}
</style>
