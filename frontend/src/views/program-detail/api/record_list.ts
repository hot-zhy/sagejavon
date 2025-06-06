import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

export interface Request {
    pageNum: number;
    pageSize: number;
    [property: string]: any;
}

function recordList(query: number): Promise<AxiosResponse> {
  const config = {
    method: 'get',
    url: `http://localhost:8080/question/code/record/list?questionId=${query}`,
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

export { recordList };
