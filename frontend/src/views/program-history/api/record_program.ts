// src/components/api/record.ts
import  javaRequest  from '@/utils/request';
import type { AxiosResponse } from 'axios';

export interface Request {
  pageNum: number;
  pageSize: number;
  [property: string]: any;
}

function recordProgram(query: Request): Promise<AxiosResponse> {
  return javaRequest.get('/question/record/list', {
    params: query,
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json'
    }
  });
}

export { recordProgram };
