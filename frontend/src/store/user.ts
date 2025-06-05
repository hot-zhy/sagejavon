import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null | undefined,
    type: null as 'student' | 'teacher' | null | undefined,
    id: null as string | null | undefined,
    gender: null as Number | null | undefined,
    nickname: null as string | null | undefined,
    portrait: null as string | null | undefined,
  }),
  actions: {
    /**
     * 检查是否有可用的 token，若有则尝试登录。
     * @returns
     * Token 是否可用
     */
    async checkToken() {
      // this.token ??= localStorage.getItem('user-token')
      // if (!this.token)
      //   return false

      // this.type = localStorage.getItem('user-type') as any
      // this.id = localStorage.getItem('user-id')
      return true
    },
  },
})
