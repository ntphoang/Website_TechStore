import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axiosClient from '../lib/axiosClient';
import { loginSuccess, logoutAction } from '../store/authSlice';
import { clearCart } from '../store/cartSlice';
import type { User } from '../types';

interface AuthResponse {
  accessToken: string;
  user: User;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: any): Promise<AuthResponse> => {
      return await axiosClient.post('/login', credentials);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(loginSuccess({ user: data.user, token: data.accessToken }));

      const from =
        location.state?.from?.pathname || (data.user.role === 'admin' ? '/admin/dashboard' : '/');
      navigate(from, { replace: true });
      toast.success('Đăng nhập thành công!');
    },
    onError: () => toast.error('Email hoặc mật khẩu không chính xác!'),
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any): Promise<AuthResponse> => {
      const newUser = {
        ...userData,
        role: 'user',
        status: 'active',
        joinDate: new Date().toLocaleDateString('vi-VN'),
      };

      return await axiosClient.post('/register', newUser);
    },
    onSuccess: (data) => {
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
    dispatch(clearCart());
    queryClient.clear();
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
