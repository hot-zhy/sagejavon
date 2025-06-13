// src/components/api/question.ts
import javaRequest from '@/utils/request';
import type { AxiosResponse } from 'axios';

interface Request {
  difficulty?: number;
  knowledgeId?: string;
  pageNum: number;
  pageSize: number;
  type: number;
  [property: string]: any;
}

function questionProgram(query: Request): Promise<AxiosResponse> {
  return javaRequest.get('/question/list', {
    params: query,
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json'
    }
  });
}

export { questionProgram };
