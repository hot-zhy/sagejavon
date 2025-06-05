import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

interface ReportEventParams {
  data: {
    eventName: string;
    tags: string;
  }[];
}

function reportEvent(params: ReportEventParams): Promise<AxiosResponse> {
  const { data } = params;

  //   // 创建一个 Blob 对象来保存数据
  //   const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

  //   // 创建一个下载链接并点击以下载文件
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'report-events.json'; // 指定文件名
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);

  const config = {
    method: 'post',
    url: `https://api.xhpolaris.com/platform/report_event`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('user-token') || '',
    },
    data: {
      'data': data
    }
  }

  return axios(config)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {
      throw error
    })
}

export { reportEvent }
