// src/utils/request.ts
import axios from 'axios';
// config.ts
export const BASE_URL = 'http://localhost:8080';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

service.interceptors.request.use(config => {
  config.headers['token'] = localStorage.getItem('user-token') || '';
  return config;
});


export default service;
