import { useState } from 'react';
import { HiOutlineEye, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import type { Order } from '../../types/order.type';
import Badge from '../../components/Badge';

// Dữ liệu mẫu tạm thời để test UI
const mockOrders: Order[] = [
  { id: 'ORD-2026-001', customerName: 'Nguyễn Văn A', date: '16/04/2026', totalAmount: 32000000, status: 'pending', paymentMethod: 'COD' },
  { id: 'ORD-2026-002', customerName: 'Trần Thị B', date: '15/04/2026', totalAmount: 1250000, status: 'processing', paymentMethod: 'Momo' },
  { id: 'ORD-2026-003', customerName: 'Lê Hoàng C', date: '12/04/2026', totalAmount: 45000000, status: 'delivered', paymentMethod: 'Credit Card' },
  { id: 'ORD-2026-004', customerName: 'Phạm D', date: '10/04/2026', totalAmount: 550000, status: 'cancelled', paymentMethod: 'COD' },
];

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const renderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Badge variant="yellow">Chờ duyệt</Badge>;
      case 'processing': return <Badge variant="ice">Đang giao</Badge>;
      case 'delivered': return <Badge variant="mint">Hoàn thành</Badge>;
      case 'cancelled': return <Badge variant="peach">Đã hủy</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[32px] shadow-sm border border-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pastel-yellow/30 rounded-2xl flex items-center justify-center text-yellow-700 font-black text-xl">
            {orders.length}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Quản lý Đơn hàng</h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium">Theo dõi và cập nhật trạng thái</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-widest">
                <th className="px-8 py-5 font-bold">Mã đơn</th>
                <th className="px-8 py-5 font-bold">Khách hàng</th>
                <th className="px-8 py-5 font-bold">Ngày đặt</th>
                <th className="px-8 py-5 font-bold">Tổng tiền</th>
                <th className="px-8 py-5 font-bold">Trạng thái</th>
                <th className="px-8 py-5 font-bold text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-pastel-ice/10 transition-colors group">
                  <td className="px-8 py-4 font-bold text-slate-800">{order.id}</td>
                  <td className="px-8 py-4 font-semibold text-slate-700">{order.customerName}</td>
                  <td className="px-8 py-4 text-sm font-medium text-slate-500">{order.date}</td>
                  <td className="px-8 py-4 font-black text-slate-900">{formatPrice(order.totalAmount)}</td>
                  <td className="px-8 py-4">{renderStatusBadge(order.status)}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 bg-slate-50 text-slate-500 hover:bg-pastel-ice hover:text-pastel-teal rounded-xl" title="Xem">
                        <HiOutlineEye className="w-5 h-5" />
                      </button>
                      {order.status === 'pending' && (
                        <button className="p-2 bg-slate-50 text-slate-500 hover:bg-pastel-mint hover:text-emerald-700 rounded-xl" title="Duyệt">
                          <HiOutlineCheck className="w-5 h-5" />
                        </button>
                      )}
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button className="p-2 bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-xl" title="Hủy">
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