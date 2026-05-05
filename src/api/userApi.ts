import { api } from '../lib/api';
import type { User } from '../types';

export const userApi = {
  // Lấy danh sách toàn bộ người dùng
  getAll: () => api.get<any, User[]>('/users'),

  // Cập nhật trạng thái tài khoản (Khóa hoặc Mở khóa)
  updateStatus: (id: string | number, status: 'active' | 'banned') =>
    api.patch<any, User>(`/users/${id}`, { status }),
};
