import type { Router } from 'vue-router'
// import { useAuthStoreWithout } from '@/store/modules/auth'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth)
      next('/login')
    else
      next()

    // next('/')
    // const authStore = useAuthStoreWithout()
    // if (!authStore.session) {
    //   try {
    //     const data = await authStore.getSession()
    //     if (String(data.auth) === 'false' && authStore.token)
    //       authStore.removeToken()
    //     next()
    //   }
    //   catch (error) {
    //     if (from.path !== '/500')
    //       next({ name: '500' })
    //     else
    //       next()
    //   }
    // }
    // else {
    //   next()
    // }
  })
}
