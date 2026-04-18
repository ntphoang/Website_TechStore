import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axiosClient from '../lib/axiosClient';
import { loginSuccess, logoutAction } from '../store/authSlice';

import type { User } from '../types';

interface AuthResponse {
  accessToken: string;
  user: User;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ĐĂNG NHẬP
  const loginMutation = useMutation({
    mutationFn: async (credentials: any): Promise<AuthResponse> => {
      // Lưu ý: Tùy backend của bạn, nếu dùng json-server-auth thì route là /login
      return await axiosClient.post('/login', credentials);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(loginSuccess({ user: data.user, token: data.accessToken }));
      
      const from = location.state?.from?.pathname || (data.user.role === 'admin' ? '/admin/dashboard' : '/');
      navigate(from, { replace: true });
      toast.success('Đăng nhập thành công!');
    },
    onError: () => toast.error('Email hoặc mật khẩu không chính xác!'),
  });

  // ĐĂNG KÝ
  const registerMutation = useMutation({
    mutationFn: async (userData: any): Promise<AuthResponse> => {
      // Gắn thêm role mặc định là user khi tạo tài khoản mới
      const newUser = {
        ...userData,
        role: 'user',
        status: 'active',
        joinDate: new Date().toLocaleDateString('vi-VN')
      };
      // Gửi data lên bảng users
      const response = await axiosClient.post('/users', newUser);
      
      // Giả lập token trả về (vì json-server thuần không tự tạo token)
      return { accessToken: 'fake-jwt-token-123', user: response as any };
    },
    onSuccess: (data) => {
      // Tự động đăng nhập luôn sau khi đăng ký thành công
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(loginSuccess({ user: data.user, token: data.accessToken }));
      
      toast.success('Đăng ký tài khoản thành công!');
      navigate('/');
    },
    onError: () => toast.error('Đăng ký thất bại, email có thể đã tồn tại!'),
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutAction());
    navigate('/login', { replace: true });
    toast.success('Đã đăng xuất!');
  };

  return {
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    logout,
  };
};