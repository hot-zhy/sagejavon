<script lang="ts" setup>
import { ref } from 'vue'
import { NButton, NInput, useMessage, NModal } from 'naive-ui'
import { getUserInfo } from './api/info/get_user_info'
import { updateUserInfoAPI } from '@/views/chat/api/update_user_info'
const avatar = ref('')
const name = ref('')
const gender = ref('')
function getUserInfoF() {
  getUserInfo().then((userInfoRes) => {
    if (userInfoRes.status === 200)
      avatar.value = userInfoRes.data.data.portrait
    name.value = userInfoRes.data.data.nickname
    gender.value = userInfoRes.data.data.gender
    console.log(gender.value)
  }).catch((err) => {
    // 在这里处理获取用户信息失败的情况
    console.log(err)
  })
}

getUserInfoF() // 页面onShow时调用接口获取用户信息
const message = useMessage()
const showModal = ref(false)
function updateUserInfo(field, value) {
  const userInfo = {
    nickname: name.value,
    portrait: avatar.value,
    gender: Number(gender.value),
  }
  updateUserInfoAPI(userInfo)
    .then((res) => {
      if (res.status === 200) {
        // 更新成功，更新本地存储中的用户信息
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        message.info('修改成功', { duration: 2000 })
        // window.location.reload()
        console.log(res)
      }
      else {
        // 更新失败

      }
    })
    .catch((err) => {
      console.error('更新用户信息失败:', err)
    })
}

function onNegativeClick() {
  showModal.value = false
}

function onPositiveClick() {
  localStorage.removeItem('user-token')
  localStorage.removeItem('user-id')
  window.location.href = '/'
}

</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="退出登录" content="是否确认退出登录？"
      positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick" />
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">头像链接</span>
        <div class="flex-1">
          <NInput v-model:value="avatar" placeholder="" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateUserInfo('portrait', avatar)">
          保存
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">昵称</span>
        <div class="w-[200px]">
          <NInput v-model:value="name" placeholder="" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateUserInfo('nickname', name)">
          保存
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">性别</span>
        <div class="flex items-center space-x-2">
          <input id="male" v-model="gender" type="radio" value="1" @click="gender = '1'">
          <label for="male">男</label>

          <input id="female" v-model="gender" type="radio" value="0" @click="gender = '0'">
          <label for="female">女</label>

        </div>
        <NButton size="tiny" text type="primary" @click="updateUserInfo('gender', gender)">
          保存
        </NButton>
      </div>
      <n-button type="primary" @click="showModal = true">
        退出登录
      </n-button>
    </div>
  </div>
</template>
