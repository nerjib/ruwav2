import axios from 'axios';

export const baseUrl = 'http://localhost:5001/api/v1/ruwassa';
export const baseUrl1 = 'https://ruwassa-69889b243ddb.herokuapp.com/api/v1/ruwassa';

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
