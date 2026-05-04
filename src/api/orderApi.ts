import axiosClient from '../lib/axiosClient';
import type { Order } from '../types';

export const orderApi = {
  getAll: () => axiosClient.get<any, Order[]>('/orders'),

  create: (data: Partial<Order>) => axiosClient.post<any, Order>('/orders', data),

  updateStatus: (id: string, status: Order['status']) =>
    axiosClient.patch<any, Order>(`/orders/${id}`, { status }),

  delete: (id: string) => axiosClient.delete(`/orders/${id}`),
};
