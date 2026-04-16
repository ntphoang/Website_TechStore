import React from 'react';
// Gợi ý: cài thêm thư viện `lucide-react` để có bộ icon đẹp và đồng bộ
import { ArrowUpRight, Banknote, ShoppingCart, Users } from 'lucide-react';

// Interface cho Stat Card props
interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: 'ice' | 'mint' | 'peach' | 'yellow';
}

// Một component Card thống kê có thể tái sử dụng
const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  // Ánh xạ màu props sang class của Tailwind
  const colorClasses = {
    ice: 'bg-pastel-ice/60 text-pastel-teal',
    mint: 'bg-pastel-mint/60 text-green-800',
    peach: 'bg-pastel-peach/60 text-orange-800',
    yellow: 'bg-pastel-yellow/60 text-yellow-800',
  };

  const iconBgClasses = {
    ice: 'bg-pastel-ice',
    mint: 'bg-pastel-mint',
    peach: 'bg-pastel-peach',
    yellow: 'bg-pastel-yellow',
  };

  return (
    <div
      className={`p-6 rounded-3xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colorClasses[color]}`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-slate-700">{title}</h3>
        <div className={`p-3 rounded-2xl ${iconBgClasses[color]}`}>{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-black text-slate-800 mt-4">{value}</p>
        {change && (
          <div className="flex items-center gap-1 text-xs mt-1 font-semibold">
            <ArrowUpRight className="w-3 h-3" />
            <span>{change} so với tháng trước</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Component Dashboard chính
const Dashboard: React.FC = () => {
  // Dữ liệu giả để hiển thị
  const stats = [
    {
      title: 'Tổng doanh thu',
      value: '1.25 Tỷ',
      change: '+12.5%',
      icon: <Banknote className="w-6 h-6" />,
      color: 'ice',
    },
    {
      title: 'Tổng đơn hàng',
      value: '3,450',
      change: '+8.2%',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'mint',
    },
    {
      title: 'Khách hàng mới',
      value: '189',
      change: '+21',
      icon: <Users className="w-6 h-6" />,
      color: 'peach',
    },
    {
      title: 'Sản phẩm bán chạy',
      value: 'iPhone 17',
      icon: <div className="w-6 h-6 font-bold text-sm flex items-center justify-center">TOP</div>,
      color: 'yellow',
    },
  ];

  return (
    <div className="p-6 md:p-8 lg:p-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Tổng quan</h1>
        <p className="text-slate-500 mt-1">
          Chào mừng trở lại, Admin! Đây là báo cáo nhanh trong 30 ngày qua.
        </p>
      </div>

      {/* Lưới thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <StatCard key={index} {...(stat as StatCardProps)} />
        ))}
      </div>

      {/* Lưới biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Thống kê doanh thu (12 tháng)</h3>
          <div className="bg-slate-50 rounded-2xl w-full h-80 flex items-center justify-center">
            <p className="text-slate-400 font-medium">
              Biểu đồ đường (Line Chart) sẽ được hiển thị ở đây
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Tỷ trọng danh mục</h3>
          <div className="flex flex-col gap-6 h-80">
            <div className="flex-1 bg-pastel-ice/80 rounded-2xl flex items-center justify-center">
              <p className="text-pastel-teal font-bold">Laptop (45%)</p>
            </div>
            <div className="flex-1 bg-pastel-mint/80 rounded-2xl flex items-center justify-center">
              <p className="text-green-800 font-bold">Điện thoại (35%)</p>
            </div>
            <div className="flex-1 bg-pastel-peach/80 rounded-2xl flex items-center justify-center">
              <p className="text-orange-800 font-bold">Phụ kiện (20%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
