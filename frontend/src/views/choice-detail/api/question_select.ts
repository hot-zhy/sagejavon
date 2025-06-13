// src/components/api/question.ts
import javaRequest from '@/utils/request';
import type { AxiosResponse } from 'axios';

export interface Request {
  choice: string;
  id: number;
  [property: string]: any;
}

function questionSelect(query: Request): Promise<AxiosResponse> {
  const { choice, id, ...rest } = query;

  const params = new URLSearchParams();
  params.append('choice', choice?.toString() || '');
  params.append('id', id.toString());

  // 追加其他属性
  for (const key in rest) {
    if (Object.prototype.hasOwnProperty.call(rest, key)) {
      params.append(key, rest[key]?.toString() || '');
    }
  }

  return javaRequest.post(`/question/select?${params.toString()}`, null, {
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json'
    }
  });
}

export { questionSelect };
