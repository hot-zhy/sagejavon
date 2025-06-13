// src/components/api/question.ts
import  javaRequest  from '@/utils/request';
import type { AxiosResponse } from 'axios';

function choiceDetails(query: number): Promise<AxiosResponse> {
  return javaRequest.get('/question/select/detail', {
    params: { id: query },
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': ''
    }
  });
}

export { choiceDetails };
