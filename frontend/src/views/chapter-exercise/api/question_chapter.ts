import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

interface Request {
  difficulty?: number;
  knowledgeId?: string;
  pageNum: number;
  pageSize: number;
  chapter: string;
  [property: string]: any;
}

function questionChapter(query: Request): Promise<AxiosResponse> {
  const { difficulty, knowledgeId, pageNum, pageSize, chapter, ...rest } = query;

  const params = new URLSearchParams({
    difficulty: difficulty?.toString() || '',
    knowledgeId: knowledgeId || '',
    pageNum: pageNum.toString(),
    pageSize: pageSize.toString(),
    chapter: chapter.toString(),
    ...rest,
  }).toString();

  const config = {
    method: 'get',
    url: `http://localhost:8080/question/list?${params}`,
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

export { questionChapter };
