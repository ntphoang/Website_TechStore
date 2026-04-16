import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';

export default function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  // Đã sửa lỗi: RootState thay vì typeof RootState
  const items = useSelector((state: RootState) => state.cart.items);

  const handleOpenCart = () => setIsCartOpen(true);

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col font-sans text-slate-900 transition-colors duration-300">
      <Header onOpenCart={handleOpenCart} />

      {/* flex-1 giúp đẩy Footer xuống dưới cùng nếu nội dung trang ngắn */}
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in duration-500">
        <Outlet />
      </main>

      <Footer />

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
