<script lang="ts" setup>
import { ref } from 'vue'
import { NImage } from 'naive-ui'

import defaultAvatar from '@/assets/avatar.jpg'
import defaultModel from '@/assets/sagejavon.png'

interface Props {
  image?: boolean
}
defineProps<Props>()
const user = ref(JSON.parse(localStorage.getItem('userInfo')))
const defaultPortrait = ref("https://tse4-mm.cn.bing.net/th/id/OIP-C.IJqR74BwudERFnq5R-h92AAAAA?rs=1&pid=ImgDetMain")
</script>

<template>
  <template v-if="image">
    <img style="border-radius: 100%" v-if="user&&user.portrait" :src="user.portrait" :fallback-src="defaultAvatar" />
    <img style="border-radius: 100%" v-if="user.portrait==''" :src="defaultPortrait" :fallback-src="defaultAvatar" />
  </template>
  <div v-else>
    <img :src="defaultModel" />
  </div>
</template>
