import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import axiosClient from '../lib/axiosClient';
import { loginSuccess, logoutAction } from '../store/authSlice';
import { type User } from '../types';

interface LoginResponse {
  accessToken: string;
  user: User;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginMutation = useMutation({
    mutationFn: async (credentials: any): Promise<LoginResponse> => {
      return await axiosClient.post('/login', credentials);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(loginSuccess({ user: data.user, token: data.accessToken }));

      const from = location.state?.from?.pathname || (data.user.role === 'admin' ? '/admin/dashboard' : '/');
      navigate(from, { replace: true });
    },
  });

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutAction());
    navigate('/login', { replace: true });
  };

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    logout,
  };
};