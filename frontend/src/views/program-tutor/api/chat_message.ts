// src/components/api/chat.ts
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'

interface ChatMessageParams {
  chatId: number
  role: number
  content: string
}

function chatMessage(params: ChatMessageParams): Promise<AxiosResponse> {
  const { chatId, role, content } = params

  return request.post(`/chat/message`, [
    { role, content }
  ], {
    params: { chatId }, // ✅ query 参数写在 params 中
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export { chatMessage }
