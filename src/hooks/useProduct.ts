import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/productApi';
import axiosClient from '../lib/axiosClient';
import toast from 'react-hot-toast';

// TUÂN THỦ QUY TẮC MỚI: Dùng import type
import type { Category } from '../types';

// Hook lấy dữ liệu cho trang Cửa hàng (Products + Categories)
export const useStoreData = () => {
  return useQuery({
    queryKey: ['storeData'],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        productApi.getAll(),
        axiosClient.get<any, Category[]>('/categories'),
      ]);
      return { products, categories };
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Hook lấy chi tiết 1 sản phẩm
export const useProductDetail = (id: string | number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id, // Chỉ gọi API nếu id tồn tại
  });
};

// Hook xử lý các hành động Thêm/Sửa/Xóa (Mutations) dùng cho Admin
export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storeData'] });
      toast.success('Thêm sản phẩm thành công!');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) => productApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storeData'] });
      toast.success('Cập nhật thành công!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storeData'] });
      toast.success('Đã xóa sản phẩm!');
    },
  });

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
};
