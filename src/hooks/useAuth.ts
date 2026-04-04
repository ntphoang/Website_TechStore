// Đây là custom hook dùng để xử lý đăng nhập, đăng xuất, lưu thông tin user, điều hướng sau khi login

import { useSetRecoilState } from 'recoil';
import { authAtom, type User } from '../store/authAtom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axiosClient from '../lib/axiosClient';

// Ràng buộc kiểu dữ liệu nhập vào
interface LoginCredentials {
  email: string;
  password: String;
}

// Ràng buộc kiểu dữ liệu server trả về
interface LoginResponse {
  accessToken: string;
  user: User;
}

export const useAuth = () => {
  // Lấy các công cụ cần thiết
  const setAuth = useSetRecoilState(authAtom); // Đổi state toàn cục
  const navigate = useNavigate(); // Dùng để chuyển trang
  const location = useLocation(); // Định vị xem user đang đứng đâu

  // Làm máy tự động xử lý đăng nhập bằng React Query
  const loginMutation = useMutation({
    // Gửi request đi
    mutationFn: async (credential: LoginCredentials): Promise<LoginResponse> => {
      const response = await axiosClient.post('/login', credential);
      return response as unknown as LoginResponse;
    },

    // Khi đăng nhập thành công
    onSuccess: (data) => {
      // Lưu vào localStorage
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Cập nhật state toàn cục
      setAuth({
        isAuthenticated: true,
        user: data.user,
        token: data.accessToken,
      });

      // Điều hướng
      const originPage = location.state?.from?.pathname;
      const targetPage = originPage || (data.user.role === 'admin' ? '/admin/dashboard' : '/');
      navigate(targetPage, { replace: true });
    },

    // Khi đăng nhập thất bại
    onError: (error) => {
      console.error('Đăng nhập thất bại', error);
    },
  });

  // Logout (đăng xuất)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ isAuthenticated: false, user: null, token: null });
    navigate('/login', { replace: true });
  };

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    logout,
  };
};
