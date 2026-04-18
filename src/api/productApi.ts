import axiosClient from '../lib/axiosClient';
import type { Product } from '../types/product.type';

export const productApi = {
  // Định nghĩa rõ kiểu trả về để không bị lỗi 'any'
  getAll: () => axiosClient.get<any, Product[]>('/products'),
  
  getById: (id: string | number) => axiosClient.get<any, Product>(`/products/${id}`),
  
  create: (data: Omit<Product, 'id'>) => axiosClient.post<any, Product>('/products', data),
  
  update: (id: string | number, data: Partial<Product>) => axiosClient.patch<any, Product>(`/products/${id}`, data),
  
  delete: (id: string | number) => axiosClient.delete(`/products/${id}`),
};