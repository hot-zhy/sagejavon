import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

interface ChatMessageParams {
  chatId: number;
  role: number;
  content: string;
}

function chatMessage(params: ChatMessageParams): Promise<AxiosResponse> {
  const { chatId, role, content } = params;

  const config = {
    method: 'post',
    url: `http://localhost:8080/chat/message?chatId=${chatId}`,
    headers: {
      'Content-Type': 'application/json',
      'token': localStorage.getItem('user-token') || '',
    },
    data: [
      {
        role,
        content
      }
    ]
  }

  return axios(config)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      throw error
    })
}

export { chatMessage }
