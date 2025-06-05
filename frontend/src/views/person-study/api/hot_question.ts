import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

interface Request {
  difficulty?: number;
  knowledgeId?: string;
  pageNum: number;
  pageSize: number;
  type: number;
  [property: string]: any;
}

function hotChoice(query: Request): Promise<AxiosResponse> {
  const { difficulty, knowledgeId, pageNum, pageSize, type, ...rest } = query;

  const params = new URLSearchParams({
    difficulty: difficulty?.toString() || '',
    knowledgeId: knowledgeId || '',
    pageNum: pageNum.toString(),
    pageSize: pageSize.toString(),
    type: type.toString(),
    ...rest,
  }).toString();

  const config = {
    method: 'get',
    url: `https://api.xhpolaris.com/sagejavon/question/list?${params}`,
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('user-token') || '',
    },
  };

  return axios(config)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
}

export { hotChoice };
