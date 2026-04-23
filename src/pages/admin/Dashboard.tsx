import React, { useMemo } from 'react';
import { ArrowUpRight, Banknote, ShoppingCart, Users } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useOrders } from '../../hooks/useOrder';
import { useUsers } from '../../hooks/useUser';
import LoadingSpinner from '../../components/LoadingSpinner';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: 'ice' | 'mint' | 'peach' | 'yellow';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

const Dashboard: React.FC = () => {
  const { orders, isLoading: isOrdersLoading } = useOrders();
  const { users, isLoading: isUsersLoading } = useUsers();

  const { stats, revenueData, orderStatusData, productSalesData } = useMemo(() => {
    if (!orders || !users) {
      return { stats: null, revenueData: [], orderStatusData: [], productSalesData: [] };
    }

    const deliveredOrders = orders.filter((o: any) => o.status === 'delivered');
    const totalRevenue = deliveredOrders.reduce(
      (sum: number, order: any) => sum + order.totalAmount,
      0
    );

    const productCounts: Record<string, number> = {};
    orders.forEach((order: any) => {
      if (order.items) {
        order.items.forEach((item: any) => {
          productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
        });
      }
    });

    let topProduct = 'Chưa có';
    let maxCount = 0;
    Object.entries(productCounts).forEach(([name, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topProduct = name;
      }
    });

    const calculatedStats = [
      {
        title: 'Tổng doanh thu',
        value: formatCurrency(totalRevenue),
        icon: <Banknote className="w-6 h-6" />,
        color: 'ice' as const,
      },
      {
        title: 'Tổng đơn hàng',
        value: orders.length,
        icon: <ShoppingCart className="w-6 h-6" />,
        color: 'mint' as const,
      },
      {
        title: 'Khách hàng',
        value: users.filter((u: any) => u.role === 'user').length,
        icon: <Users className="w-6 h-6" />,
        color: 'peach' as const,
      },
      {
        title: 'Sản phẩm bán chạy',
        value: topProduct,
        icon: <div className="w-6 h-6 font-bold text-sm flex items-center justify-center">TOP</div>,
        color: 'yellow' as const,
      },
    ];

    const revenueByDate = deliveredOrders.reduce((acc: any, order: any) => {
      const date = order.date;
      acc[date] = (acc[date] || 0) + order.totalAmount;
      return acc;
    }, {});

    const chartRevenue = Object.entries(revenueByDate).map(([date, total]) => ({
      date,
      total,
    }));

    const statusCounts = { pending: 0, processing: 0, delivered: 0, cancelled: 0 };
    orders.forEach((o: any) => {
      if (statusCounts[o.status as keyof typeof statusCounts] !== undefined) {
        statusCounts[o.status as keyof typeof statusCounts]++;
      }
    });

    const chartOrderStatus = [
      { name: 'Chờ duyệt', value: statusCounts.pending, color: '#facc15' },
      { name: 'Đang giao', value: statusCounts.processing, color: '#38bdf8' },
      { name: 'Hoàn thành', value: statusCounts.delivered, color: '#34d399' },
      { name: 'Đã hủy', value: statusCounts.cancelled, color: '#f87171' },
    ];

    const chartProductSales = Object.entries(productCounts)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      stats: calculatedStats,
      revenueData: chartRevenue,
      orderStatusData: chartOrderStatus,
      productSalesData: chartProductSales,
    };
  }, [orders, users]);

  if (isOrdersLoading || isUsersLoading || !stats) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-10 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Tổng quan</h1>
        <p className="text-slate-500 mt-1">Báo cáo thống kê trực tiếp từ cơ sở dữ liệu hệ thống.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-6">Doanh thu theo thời gian</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip
                  formatter={(value: any) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Doanh thu"
                  stroke="#2dd4bf"
                  strokeWidth={4}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Trạng thái đơn hàng</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6">Top 5 Sản phẩm bán chạy nhất</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productSalesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Bar
                dataKey="quantity"
                name="Số lượng bán"
                fill="#818cf8"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
