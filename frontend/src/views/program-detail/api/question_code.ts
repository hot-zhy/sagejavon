import axios, { AxiosError, AxiosResponse } from 'axios';

export interface Request {
    /**
     * 代码
     */
    answer: string;
    /**
     * 题目id
     */
    id: number;
    /**
     * 提交次数
     */
    submitNum: number;
    [property: string]: any;
}


function questionCode(query: Request): Promise<AxiosResponse> {
  const { answer, id,submitNum, ...rest } = query;

  const params = new URLSearchParams();
	params.append('id', id.toString());
  params.append('submitNum', submitNum.toString())
  
  const data = {
    'answer':answer
  }

  // Append additional properties from `rest`
  for (const key in rest) {
    if (Object.prototype.hasOwnProperty.call(rest, key)) {
      params.append(key, rest[key]?.toString() || '');
    }
  }

  const config = {
    method: 'post',
    url: `http://localhost:8080/question/code?${params.toString()}`,
    headers: {
      'X-Xh-Env': 'prod',
      'X-Xh-Lane': '',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('user-token') || '',
    },
    data
  };

  return axios(config)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
}

export { questionCode };
