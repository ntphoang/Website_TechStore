import axiosClient from '../lib/axiosClient';
import type { User } from '../types';

export const userApi = {
  // Lấy danh sách toàn bộ người dùng
  getAll: () => axiosClient.get<any, User[]>('/users'),
  
  // Cập nhật trạng thái tài khoản (Khóa hoặc Mở khóa)
  updateStatus: (id: string | number, status: 'active' | 'banned') => 
    axiosClient.patch<any, User>(`/users/${id}`, { status }),
};