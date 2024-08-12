import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
