import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import toast from 'react-hot-toast';

import type { User } from '../types';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string | number; status: 'active' | 'banned' }) => 
      userApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Cập nhật trạng thái tài khoản thành công!');
    },
    onError: () => {
      toast.error('Lỗi khi cập nhật tài khoản.');
    }
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};