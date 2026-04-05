// Đây là custom hook dùng để xử lý đăng nhập, đăng xuất,
// lưu thông tin user vào Redux Toolkit và điều hướng

import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import axiosClient from '../lib/axiosClient';
import { loginSuccess, logoutAction, type User } from '../store/authSlice';

// ==========================
// Kiểu dữ liệu gửi lên server
// ==========================
interface LoginCredentials {
  email: string;
  password: string; // ❗ sửa String -> string (chuẩn TS)
}

// ==========================
// Kiểu dữ liệu server trả về
// ==========================
interface LoginResponse {
  accessToken: string;
  user: User;
}

export const useAuth = () => {
  // ==========================
  // Lấy các công cụ cần thiết
  // ==========================
  const dispatch = useDispatch(); // dùng để cập nhật Redux
  const navigate = useNavigate(); // chuyển trang
  const location = useLocation(); // biết user muốn vào trang nào trước đó

  // ==========================
  // Xử lý login bằng React Query
  // ==========================
  const loginMutation = useMutation({
    // Hàm gọi API login
    mutationFn: async (credential: LoginCredentials): Promise<LoginResponse> => {
      const response = await axiosClient.post('/login', credential);
      return response as unknown as LoginResponse;
    },

    // ==========================
    // Khi login thành công
    // ==========================
    onSuccess: (data) => {
      // 1. Lưu vào localStorage (để reload không mất login)
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 2. Cập nhật Redux store
      dispatch(
        loginSuccess({
          user: data.user,
          token: data.accessToken,
        })
      );

      // 3. Điều hướng về trang ban đầu hoặc theo role
      const originPage = location.state?.from?.pathname;

      const targetPage = originPage || (data.user.role === 'admin' ? '/admin/dashboard' : '/');

      navigate(targetPage, { replace: true });
    },

    // ==========================
    // Khi login thất bại
    // ==========================
    onError: (error) => {
      console.error('Đăng nhập thất bại', error);
    },
  });

  // ==========================
  // Logout (đăng xuất)
  // ==========================
  const logout = () => {
    // Xóa localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Reset Redux store
    dispatch(logoutAction());

    // Chuyển về login
    navigate('/login', { replace: true });
  };

  // ==========================
  // Trả ra cho component dùng
  // ==========================
  return {
    login: loginMutation.mutate, // gọi login(data)
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    logout,
  };
};
