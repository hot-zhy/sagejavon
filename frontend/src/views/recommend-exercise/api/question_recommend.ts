// src/components/api/question.ts
import javaRequest from '@/utils/request';
import type { AxiosResponse } from 'axios';

function questionRecommend(num: string): Promise<AxiosResponse> {
  return javaRequest.get('/question/recommend', {
    params: {
      questionNum: num,
      difficultyOrder: 0
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export { questionRecommend };
