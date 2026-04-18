import axiosClient from '../lib/axiosClient';
import type { Order } from '../types';

export const orderApi = {
  // Lấy toàn bộ danh sách đơn hàng cho Admin
  getAll: () => axiosClient.get<any, Order[]>('/orders'),
  
  // Cập nhật trạng thái đơn hàng (Ví dụ: từ pending sang processing)
  updateStatus: (id: string, status: Order['status']) => 
    axiosClient.patch<any, Order>(`/orders/${id}`, { status }),

  // Xóa đơn hàng (Nếu cần)
  delete: (id: string) => axiosClient.delete(`/orders/${id}`),
};