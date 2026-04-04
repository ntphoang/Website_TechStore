// Đây là file giúp tự động chèn token mỗi khi có request gửi đi
import axios from 'axios';

// Tạo 1 anh shipper
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000', // Địa chỉ của json server
  headers: {
    'Content-Type': 'application/json', // Báo cho server biết mình gửi data chuẩn Json
  },
  timeout: 10000, // Nếu gọi API quá 10s mà kh thấy phản hồi thì tự hủy request
});

//Trạm kiểm soát lúc đi(Interceptor)
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token trong local ra
    const token = localStorage.getItem('token');
    // Nếu có token thì tự động gắn vào header để gửi đi
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Nếu chưa kịp đi đã lỗi thì báo lỗi
    return Promise.reject(error);
  }
);

// Trạm kiểm soát lúc về
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // Chỉ lấy data vì response trả về rất nhiều file rác
  },
  (error) => {
    // Nếu có lỗi 401 thì xóa token và logout
    if (error.response && error.response.status === 401) {
      console.warn('Token hết hạn hoặc khong hợp lệ. Vui lòng đăng nhập lại.');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.href = '/login';
    }
    return Promise.reject(error); // Gửi lỗi về cho component
  }
);

export default axiosClient;
