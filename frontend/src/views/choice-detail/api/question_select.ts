import axios, { AxiosError, AxiosResponse } from 'axios';

export interface Request {
    choice: string;
    /**
     * 选择题id
     */
    id: number;
    [property: string]: any;
}

function questionSelect(query: Request): Promise<AxiosResponse> {
  const { choice, id, ...rest } = query;

  const params = new URLSearchParams();
  params.append('choice', choice?.toString() || '');
  params.append('id', id.toString());

  // Append additional properties from `rest`
  for (const key in rest) {
    if (Object.prototype.hasOwnProperty.call(rest, key)) {
      params.append(key, rest[key]?.toString() || '');
    }
  }

  const config = {
    method: 'post',
    url: `https://api.xhpolaris.com/sagejavon/question/select?${params.toString()}`,
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

export { questionSelect };
