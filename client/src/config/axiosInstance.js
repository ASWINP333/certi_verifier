import axios from 'axios';
import { getItemFromLocalStorage } from '../functions/localStorage';

const API_BASE_URL = 'http://localhost:4000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add an interceptor to automatically attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItemFromLocalStorage('certi-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
