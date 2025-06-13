// src/components/api/chat.ts
import request from '@/utils/request';
import type { AxiosResponse } from 'axios';

async function deleteChat(chatId: number): Promise<AxiosResponse> {
  try {
    const response = await request.delete('/chat', {
      params: { chatId }, // ✅ 将 chatId 放在 params 中
      headers: {
        'Content-Type': 'application/json', // 可保留或略去，视后端需求
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export { deleteChat };
