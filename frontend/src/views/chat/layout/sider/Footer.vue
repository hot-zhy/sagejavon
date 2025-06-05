<script setup lang='ts'>
import { defineAsyncComponent, ref } from 'vue'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
// import { useUserStore } from '@/stores'
const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))

const show = ref(false)
// const user = useUserStore()
</script>

<template>
  <footer class="items-center justify-between min-w-0 p-4 overflow-hidden dark:border-neutral-800">
    <div class="flex-shrink-0 overflow-hidden">
      <UserAvatar />
    </div>

    <div style="display:flex;width:100%;justify-content: center;">
      <HoverButton @click="show = true">
        <span class="text-xl text-[#4f555e] dark:text-white">
          <SvgIcon icon="ri:settings-4-line" />
        </span>
      </HoverButton>
    </div>

    <Setting v-if="show" v-model:visible="show" />
  </footer>
</template>
