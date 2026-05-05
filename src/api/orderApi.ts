import { api } from '../lib/api';
import type { Order } from '../types';

export const orderApi = {
  getAll: () => api.get<any, Order[]>('/orders'),

  create: (data: Partial<Order>) => api.post<any, Order>('/orders', data),

  updateStatus: (id: string, status: Order['status']) =>
    api.patch<any, Order>(`/orders/${id}`, { status }),

  delete: (id: string) => api.delete(`/orders/${id}`),
};
