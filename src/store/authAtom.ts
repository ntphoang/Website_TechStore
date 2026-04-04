// Đây là kho lưu trữ các dữ liệu dạng global state
import { atom } from 'recoil';

// Định nghĩa kiểu dữ liệu cho các thuộc tính của User
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

// Định nghĩa kiểu dữ liệu cho AuthState(Trạng thái đăng nhập)
export interface AuthState {
  isAuthenticated: boolean; // Đã đăng nhập hay chưa
  user: User | null; // Thông tin user
  token: string | null; // Chìa khóa để gọi API
}

// Hàm lấy dữ liêu ban đầu từ LocalStorage
const getInitialAuthState = (): AuthState => {
  try {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    if (token && userString) {
      return {
        isAuthenticated: true,
        user: JSON.parse(userString),
        token: token,
      };
    }
  } catch (error) {
    console.error('Lỗi khi đọc Auth State từ LocalStorage: ', error);
  }
  return { isAuthenticated: false, user: null, token: null };
};

// State toàn cục
export const authAtom = atom<AuthState>({
  key: 'authAtom',
  default: getInitialAuthState(),
});
