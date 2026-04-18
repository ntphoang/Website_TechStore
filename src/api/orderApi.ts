import axiosClient from '../lib/axiosClient';
import type { Order } from '../types';

export const orderApi = {
  getAll: () => axiosClient.get<any, Order[]>('/orders'),
  create: (orderData: any) => axiosClient.post<any, Order>('/orders', orderData),
};
