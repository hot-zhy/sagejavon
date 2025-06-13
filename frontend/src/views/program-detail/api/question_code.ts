// src/components/api/question.ts
import javaRequest from '@/utils/request';
import type { AxiosResponse } from 'axios';

export interface Request {
  answer: string;
  id: number;
  submitNum: number;
  [property: string]: any;
}

function questionCode(query: Request): Promise<AxiosResponse> {
  const { answer, id, submitNum, ...rest } = query;

  const params: Record<string, string> = {
    id: id.toString(),
    submitNum: submitNum.toString(),
    ...Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [key, value?.toString() || ''])
    )
  };

  return javaRequest.post('/question/code', { answer }, {
    params,
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json'
    }
  });
}

export { questionCode };
