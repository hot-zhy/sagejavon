import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import enUS from './en-US'
import koKR from './ko-KR'
import zhCN from './zh-CN'
import zhTW from './zh-TW'
import ruRU from './ru-RU'
import { useAppStoreWithOut } from '@/store/modules/app'
import type { Language } from '@/store/modules/app/helper'
const STORAGE_KEY = 'app-language'
const savedLocale = localStorage.getItem(STORAGE_KEY) || 'en-US'
const appStore = useAppStoreWithOut()
appStore.setLanguage(savedLocale as Language) // 同步 Vuex 状态

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en-US',
  allowComposition: true,
  messages: {
    'en-US': enUS,
    'ko-KR': koKR,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'ru-RU': ruRU,
  },
})


export const t = i18n.global.t

export function setLocale(locale: Language) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale) // ✅ 语言切换时保存
}

export function setupI18n(app: App) {
  app.use(i18n)
}

export default i18n
