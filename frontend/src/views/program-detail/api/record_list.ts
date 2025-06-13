// src/components/api/question.ts
import  javaRequest  from '@/utils/request';
import type { AxiosResponse } from 'axios';

function recordList(questionId: number): Promise<AxiosResponse> {
  return javaRequest.get('/question/code/record/list', {
    params: { questionId },
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json'
    }
  });
}

export { recordList };
