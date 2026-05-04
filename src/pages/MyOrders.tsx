import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { orderApi } from '../api/orderApi';
import type { RootState } from '../store/store';
import type { Order } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Badge from '../components/Badge';

export default function MyOrders() {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['myOrders', user?.id],
    queryFn: async () => {
      const allOrders = await orderApi.getAll();
      return allOrders.filter((order: Order) => order.userId === user?.id);
    },
    enabled: !!user?.id,
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const renderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="yellow">Chờ duyệt</Badge>;
      case 'processing':
        return <Badge variant="ice">Đang giao</Badge>;
      case 'delivered':
        return <Badge variant="mint">Hoàn thành</Badge>;
      case 'cancelled':
        return <Badge variant="peach">Đã hủy</Badge>;
      default:
        return null;
    }
  };

  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col mb-8 gap-2">
        <h1 className="text-3xl font-black text-slate-800">Đơn hàng của tôi</h1>
        <p className="text-slate-500">Quản lý và theo dõi trạng thái các đơn hàng bạn đã đặt.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold text-lg">Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <p className="text-sm font-bold text-slate-400">
                    Mã đơn: <span className="text-slate-800">{order.id}</span>
                  </p>
                  <p className="text-xs font-medium text-slate-400 mt-1">Đặt ngày: {order.date}</p>
                </div>
                {renderStatusBadge(order.status)}
              </div>

              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 line-clamp-1">{item.name}</p>
                      <p className="text-sm text-slate-500">x{item.quantity}</p>
                    </div>
                    <p className="font-bold text-pastel-teal">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-6 mt-4 border-t border-slate-100">
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">Tổng số tiền</p>
                  <p className="text-2xl font-black text-slate-900">
                    {formatPrice(order.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
