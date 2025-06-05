<script setup lang="ts">
import { ref } from 'vue'

const user = JSON.parse(localStorage.getItem('userInfo') || '{}')
let displayName = ref('无')

// 根据用户昵称设置显示内容
if (user.nickname) {
  const firstChar = user.nickname[0]
  const isChinese = /[\u4e00-\u9fa5]/.test(firstChar)
  displayName.value = isChinese
    ? firstChar
    : user.nickname.slice(0, 2).toUpperCase()
}

console.log(displayName.value)
</script>

<template>
  <div v-if="user" class="items-center">
    <div class="h-10 items-center-item">
      <div class="avatar-placeholder">{{ displayName }}</div>
    </div>
    <div class="flex-1 min-w-0 items-center-item">
      <h2
        style="color: #9cacc0"
        class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap"
      >
        {{ user.nickname }}
      </h2>
    </div>
  </div>
</template>

<style>
.items-center-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.avatar-placeholder {
  width: 40px; /* 你可以根据需要调整宽度和高度 */
  height: 40px; /* 你可以根据需要调整宽度和高度 */
  border-radius: 50%;
  background-color: #e0e0e0; /* 默认背景颜色 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px; /* 字体大小 */
  color: #9cacc0; /* 字体颜色 */
}
</style>
