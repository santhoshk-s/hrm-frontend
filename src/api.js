import axios from 'axios';
// import { BASE_URL } from './constant'; // Remove this line if not needed

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000', // Use import.meta.env to access the environment variable
});

// Log to confirm the value of the environment variable
console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
