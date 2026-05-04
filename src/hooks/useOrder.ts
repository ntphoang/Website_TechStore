import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../api/orderApi';
import toast from 'react-hot-toast';

import type { Order } from '../types';

export const useOrders = () => {
  const queryClient = useQueryClient();

  // Hook lấy danh sách đơn hàng
  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.getAll,
  });

  // Hook cập nhật trạng thái đơn hàng
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order['status'] }) => 
      orderApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Cập nhật trạng thái thành công!');
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật trạng thái.');
    }
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};