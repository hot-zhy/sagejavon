import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

interface ChatMessageParams {
  chatId: number;
  role: number;
  content: string;
}

function chatTutor(params: ChatMessageParams): Promise<AxiosResponse> {
  const { chatId, role, content } = params;

  const config = {
    method: 'post',
    url: `https://api.xhpolaris.com/sagejavon/chat/tutor?chatId=${chatId}`,
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

export { chatTutor }
