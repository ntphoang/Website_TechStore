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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Header onOpenCart={() => setIsCartOpen(true)} onOpenMenu={() => setIsMenuOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        <SlideBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

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
