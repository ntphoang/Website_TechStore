import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard';
import { addToCart } from '../store/cartSlice';

import type { Product } from '../types';

export default function HomeFlashSale({ products }: { products: Product[] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State quản lý thời gian đếm ngược
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 45, seconds: 30 });

  // Hook đếm ngược chạy mỗi 1 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, productId: product.id, quantity: 1 }));
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const handleViewDetail = (product: Product) => navigate(`/products/${product.id}`);

  // Nếu không có sản phẩm nào thì ẩn luôn khu vực này
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-red-50/50 rounded-[40px] p-8 lg:p-10 border border-red-100 relative overflow-hidden">
      {/* Hiệu ứng ánh sáng nền */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-400/10 blur-3xl rounded-full"></div>
      
      {/* Tiêu đề & Đồng hồ đếm ngược */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm animate-pulse">
            <HiOutlineLightningBolt className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Flash Sale</h2>
            <p className="text-slate-500 font-medium">Kết thúc trong:</p>
          </div>
        </div>
        
        {/* Bộ số đếm ngược */}
        <div className="flex gap-3 text-white font-black text-xl">
          <div className="bg-slate-800 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg">{String(timeLeft.hours).padStart(2, '0')}</div>
          <span className="text-slate-800 self-center">:</span>
          <div className="bg-slate-800 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <span className="text-slate-800 self-center">:</span>
          <div className="bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</div>
        </div>
      </div>
      
      {/* Lưới sản phẩm đang sale */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {products.map((product) => (
          <div key={product.id} className="relative">
            {/* Nhãn giảm giá */}
            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Sale 15%
            </div>
            <ProductCard product={product} onAddToCart={handleAddToCart} onViewDetail={handleViewDetail} />
          </div>
        ))}
      </div>
    </section>
  );
}