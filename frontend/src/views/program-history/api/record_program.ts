import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

export interface Request {
    pageNum: number;
    pageSize: number;
    [property: string]: any;
}

function recordProgram(query: Request): Promise<AxiosResponse> {
  const { pageNum, pageSize, ...rest } = query;

  const params = new URLSearchParams({
    pageNum: pageNum.toString(),
    pageSize: pageSize.toString(),
    ...rest,
  }).toString();

  const config = {
    method: 'get',
    url: `https://api.xhpolaris.com/sagejavon/question/record/list?${params}`,
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

export { recordProgram };
