import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8002', 
  headers: {
    'Content-Type': 'application/json', 
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Token hết hạn hoặc khong hợp lệ. Vui lòng đăng nhập lại.');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.href = '/login';
    }
    return Promise.reject(error); 
  }
);

export default axiosClient;
