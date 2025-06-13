// src/components/api/user.js
import javaRequest from '@/utils/request'

function getUserInfo() {
  return javaRequest.get('/information', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export { getUserInfo }
