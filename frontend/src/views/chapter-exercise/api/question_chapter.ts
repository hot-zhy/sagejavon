// src/components/api/question.ts
import request from '@/utils/request'; // 如果你没配置路径别名，就用相对路径
import type { AxiosResponse } from 'axios';

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
  });

  return request.get(`/question/list`, {
    params,
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
    }
  });
}

export { questionChapter };
