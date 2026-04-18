import { useOrders } from '../../hooks/useOrder';
import Badge from '../../components/Badge';
import LoadingSpinner from '../../components/LoadingSpinner';
import { HiOutlineCheck, HiOutlineTruck, HiOutlineX } from 'react-icons/hi';

import type { Order } from '../../types';

export default function OrderList() {
  const { orders, isLoading, updateStatus, isUpdating } = useOrders();

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const renderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Badge variant="yellow">Chờ duyệt</Badge>;
      case 'processing': return <Badge variant="ice">Đang giao</Badge>;
      case 'delivered': return <Badge variant="mint">Hoàn thành</Badge>;
      case 'cancelled': return <Badge variant="peach">Đã hủy</Badge>;
      default: return null;
    }
  };

  if (isLoading) return <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-4 bg-white p-6 rounded-[32px] shadow-sm border border-slate-50">
        <div className="w-12 h-12 bg-pastel-yellow/30 rounded-2xl flex items-center justify-center text-yellow-700 font-black text-xl">
          {orders.length}
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800">Quản lý Đơn hàng</h1>
          <p className="text-slate-500 text-sm font-medium">Theo dõi đơn hàng từ hệ thống</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                <th className="px-8 py-5">Mã đơn</th>
                <th className="px-8 py-5">Khách hàng</th>
                <th className="px-8 py-5">Tổng tiền</th>
                <th className="px-8 py-5">Trạng thái</th>
                <th className="px-8 py-5 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {orders.map((order: Order) => (
                <tr key={order.id} className="hover:bg-pastel-ice/10 transition-colors group">
                  <td className="px-8 py-4 font-bold text-slate-800">{order.id}</td>
                  <td className="px-8 py-4">
                    <p className="font-semibold text-slate-700">{order.customerName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{order.phone}</p>
                  </td>
                  <td className="px-8 py-4 font-black text-slate-900">{formatPrice(order.totalAmount)}</td>
                  <td className="px-8 py-4">{renderStatusBadge(order.status)}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Nút Duyệt đơn */}
                      {order.status === 'pending' && (
                        <button 
                          disabled={isUpdating}
                          onClick={() => updateStatus({ id: order.id, status: 'processing' })}
                          className="p-2 bg-pastel-mint/20 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
                          title="Duyệt đơn"
                        >
                          <HiOutlineCheck className="w-5 h-5" />
                        </button>
                      )}
                      {/* Nút Xác nhận đã giao */}
                      {order.status === 'processing' && (
                        <button 
                          disabled={isUpdating}
                          onClick={() => updateStatus({ id: order.id, status: 'delivered' })}
                          className="p-2 bg-pastel-ice text-pastel-teal hover:bg-pastel-teal hover:text-white rounded-xl transition-all"
                          title="Xác nhận đã giao"
                        >
                          <HiOutlineTruck className="w-5 h-5" />
                        </button>
                      )}
                      {/* Nút Hủy đơn */}
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button 
                          disabled={isUpdating}
                          onClick={() => updateStatus({ id: order.id, status: 'cancelled' })}
                          className="p-2 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                          title="Hủy đơn"
                        >
                          <HiOutlineX className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}