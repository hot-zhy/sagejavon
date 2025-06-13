// src/components/api/index.ts
import request from '@/utils/request'; // 注意路径别名，如果没配置 @，用相对路径

export async function login(phone: string, password: string) {
  return request.post('/login', {
    phone,
    password,
  });
}

export async function register(phone: string, password: string) {
  return request.post('/register', {
    phone,
    password,
  });
}
