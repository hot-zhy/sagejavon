<script setup lang="ts">
import "@/assets/text/text.css"
import { NConfigProvider } from 'naive-ui'
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'

const { theme } = useTheme()
const { language } = useLanguage()

const themeOverrides = {
  common: {
    primaryColor: 'rgba(3, 34, 81, 1)',
  }
}
</script>

<template>
  <NConfigProvider class="h-full" :theme="theme" :theme-overrides="themeOverrides" :locale="language">
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>

<style>
* {
  font-family: var(--sj-font-family);
  font-size: 16px;
  --sj-font-family: "Microsoft YaHei UI", "Punctuation SC", "Inter", ui-sans-serif, system-ui, "PingFang SC", "Noto Sans CJK SC", "Noto Sans SC", "Heiti SC", "Microsoft YaHei", "DengXian", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --theme-orange: #FF6100;
  --theme-orange-hover: #DD5A09;
  --first-text-color: #1A1A1A;
  --second-text-color: #808080;
  --third-text-color: #B3B3B3;
  --fourth-text-color: #D9D9D9;
  --fifth-text-color: #E6E6E6;
}
</style>