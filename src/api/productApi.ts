import { api } from '../lib/api';
import type { Product } from '../types/product.type';

export const productApi = {
  // Định nghĩa rõ kiểu trả về để không bị lỗi 'any'
  getAll: () => api.get<any, Product[]>('/products'),

  getById: (id: string | number) => api.get<any, Product>(`/products/${id}`),

  create: (data: Omit<Product, 'id'>) => api.post<any, Product>('/products', data),

  update: (id: string | number, data: Partial<Product>) =>
    api.patch<any, Product>(`/products/${id}`, data),

  delete: (id: string | number) => api.delete(`/products/${id}`),
};
