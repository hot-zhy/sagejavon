import axios from 'axios';

async function postKnowledge(nodes) {
  const token = localStorage.getItem('user-token');
  const config = {
    method: 'post',
    url: 'http://localhost:8080/knowledge',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    data: nodes
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
}

export { postKnowledge };
