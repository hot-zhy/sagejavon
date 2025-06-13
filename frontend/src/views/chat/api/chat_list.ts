// src/components/api/chat.ts
import request from '@/utils/request' // 如无路径别名用 ../../utils/request
import type { AxiosResponse } from 'axios'

function chatList(): Promise<AxiosResponse> {
  return request.get('/chat/list', {
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
    }
  })
}

export { chatList }
