// src/components/api/chat.ts
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'

function newChat(): Promise<AxiosResponse> {
  return request.post('/chat', null, {
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
    }
  })
}

export { newChat }
