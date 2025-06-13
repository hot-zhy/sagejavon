// src/components/api/program.ts
import javaRequest from '@/utils/request';
import type { AxiosResponse } from 'axios';

function programDetails(query: number): Promise<AxiosResponse> {
  return javaRequest.get('/question/code/detail', {
    params: { id: query },
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json'
    }
  });
}

export { programDetails };
