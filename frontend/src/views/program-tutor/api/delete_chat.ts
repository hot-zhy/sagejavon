import axios, { AxiosError, AxiosResponse } from 'axios';

async function deleteChat(chatId: number): Promise<AxiosResponse> {
  const token = localStorage.getItem('user-token');

  try {
    const response = await axios.delete(`https://api.xhpolaris.com/sagejavon/chat?chatId=${chatId}`, {
      headers: {
        'token': token,
        'Content-Type': 'application/json', // 可选，如果服务端要求
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export { deleteChat };
