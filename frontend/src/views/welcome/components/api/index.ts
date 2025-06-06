// src/components/api/index.ts
import axios from 'axios';

const baseURL = 'http://localhost:8080'; // 根据你的实际后端接口路径调整

export async function login(phone: string, password: string) {
  return axios.post(`${baseURL}/login`, {
    phone,
    password,
  });
}

export async function register(phone: string, password: string) {
  return axios.post(`${baseURL}/register`, {
    phone,
    password,
  });
}
