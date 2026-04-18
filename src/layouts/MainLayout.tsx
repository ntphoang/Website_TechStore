import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// TUÂN THỦ: Dùng import type
import type { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import SlideBar from '../components/SlideBar'; // BƯỚC 1: IMPORT SLIDEBAR VÀO ĐÂY

export default function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart.items);

  const handleOpenCart = () => setIsCartOpen(true);

  return (
    // BƯỚC 2: Đổi min-h-screen thành h-screen (chiều cao cố định bằng màn hình)
    // Cắt bỏ phần cuộn của trang web gốc để nhường lại cho phần nội dung (main) tự cuộn
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-300">
      
      {/* Header luôn cố định ở trên cùng */}
      <Header onOpenCart={handleOpenCart} />

      {/* BƯỚC 3: Tạo một khung chứa nằm ngang bao gồm Sidebar (trái) và Nội dung (phải) */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Thanh điều hướng bên trái */}
        <SlideBar />

        {/* Nội dung chính bên phải - Cho phép cuộn dọc (overflow-y-auto) */}
        <main className="flex-1 flex flex-col overflow-y-auto relative animate-in fade-in duration-500">
          <div className="flex-1 w-full mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Outlet />
          </div>
          
          {/* Footer nằm ở cuối phần nội dung cuộn */}
          <Footer />
        </main>
      </div>

      {/* Ngăn kéo giỏ hàng */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={(id, delta) => dispatch(updateQuantity({ productId: id, delta }))}
        onRemove={(id) => dispatch(removeFromCart(id))}
      />
    </div>
  );
}