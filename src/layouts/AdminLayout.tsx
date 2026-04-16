import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

import SlideBar from '../components/SlideBar';
import Header from '../components/Header';
import CartDrawer from '../components/CartDrawer';

export default function AdminLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  // Đã sửa lỗi: RootState thay vì typeof RootState
  const items = useSelector((state: RootState) => state.cart.items);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Header */}
      <Header onOpenCart={handleOpenCart} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <SlideBar />

        {/* Nội dung chính của Admin - Cuộn độc lập */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8 bg-slate-50/50 animate-in fade-in duration-500">
          <div className="mx-auto max-w-7xl pb-10">
            <Outlet />
          </div>
        </main>
      </div>

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