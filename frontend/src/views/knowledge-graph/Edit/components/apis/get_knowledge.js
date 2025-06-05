import axios from 'axios';

function getKnowledge() {
  const token = localStorage.getItem('user-token');
  const userId= localStorage.getItem('user-id');
  const config = {
    method: 'get',
    url: 'https://api.xhpolaris.com/sagejavon/knowledge?studentId='+userId,
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    }
  };

  try {
    const response = axios(config);
    return response;
  } catch (error) {
    throw error;
  }
}

export { getKnowledge };
