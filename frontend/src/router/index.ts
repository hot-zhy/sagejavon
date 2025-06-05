import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { ChatLayout } from '@/views/chat/layout'
import { reportEvent } from './report_event'
import { usePageStore, useEventStore } from '@/store/page_store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/views/welcome/index.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatLayout,
    redirect: '/chat',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
        component: () => import('@/views/chat/index.vue'),
      },
      {
        path: '/person/study',
        name: 'personStudy',
        component: () => import('@/views/person-study/index.vue'),
      },
      {
        path: '/program/tutor',
        name: 'programTutor',
        component: () => import('@/views/program-tutor/index.vue'),
      },
      {
        path: '/knowledge/skills',
        name: 'knowledgeSkills',
        component: () => import('@/views/knowledge-skills/index.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
  },
  {
    path: '/program/list',
    name: 'programList',
    component: () => import('@/views/program-list/index.vue'),
  },
  {
    path: '/program/detail',
    name: 'programDetail',
    component: () => import('@/views/program-detail/index.vue'),
  },
  {
    path: '/choice/exercise',
    name: 'choiceExercise',
    component: () => import('@/views/choice-exercise/index.vue'),
  },
  {
    path: '/chapter/exercise',
    name: 'chapterExercise',
    component: () => import('@/views/chapter-exercise/index.vue'),
  },
  {
    path: '/program/exercise',
    name: 'programExercise',
    component: () => import('@/views/program-exercise/index.vue'),
  },
  {
    path: '/recommend/exercise',
    name: 'recommendExercise',
    component: () => import('@/views/recommend-exercise/index.vue'),
  },
  {
    path: '/choice/detail',
    name: 'choiceDetail',
    component: () => import('@/views/choice-detail/index.vue'),
  },
  {
    path: '/program/history',
    name: 'programHistory',
    component: () => import('@/views/program-history/index.vue'),
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/history/index.vue')
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from, next) => {
  const pageStore = usePageStore()
  const eventStore = useEventStore()
  const currentPage = to.name as string
  pageStore.updatePage(currentPage)
  const previousPage = pageStore.previousPage.substring(0, pageStore.previousPage.lastIndexOf('.'))

  // TODO: 用户首次使用无LocalStorage，导致报错，待修复
  // 页面切换埋点事件

  // 检查路由是否需要身份验证
  if (to.meta.requiresAuth) {
    // 如果需要验证身份，则检查用户是否已登录
    if (isLoggedIn()) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
      const tags = JSON.stringify(
        {
          previous_page: previousPage,
          current_page: to.name,
          client_name: new Date().toISOString(),
          from_page: from.name || "",
          nickname: userInfo.nickname || localStorage.getItem('user-id')
        }
      )
      // 界面切换事件保存到pinias
      eventStore.addEvent('page_load', tags)
      // 用户已登录，继续导航
      startEventReporting()
      next()
    }
    else {
      // 用户未登录，重定向到登录页面
      next('/login')
    }
  }
  else {
    // 路由不需要验证身份，继续导航
    next()
  }
})

function startEventReporting() {
  const eventStore = useEventStore();
  let isReporting = false;

  setInterval(async () => {
    if (isReporting) return;
    isReporting = true;

    const events = eventStore.getEvents();
    if (events.length > 0) {
      try {
        console.log(events)
        const response = await reportEvent({ data: events });
        console.log('Report event response:', response);
        eventStore.clearEvents();
      } catch (error) {
        console.error('Error reporting events:', error);
      } finally {
        isReporting = false;
      }
    } else {
      isReporting = false;
    }
  }, 5000);  // 每 5 秒检查一次
}

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}

export function isLoggedIn(): boolean {
  return localStorage.getItem('user-token') !== null
}