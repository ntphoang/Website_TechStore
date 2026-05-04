import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import SlideBar from '../components/SlideBar';

export default function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-300">
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenMenu={() => setIsMenuOpen(true)} 
      />

      <div className="flex flex-1 overflow-hidden relative">
        <SlideBar 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />

        <main className="flex-1 flex flex-col overflow-y-auto relative animate-in fade-in duration-500">
          <div className="flex-1 w-full mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Outlet />
          </div>
          <Footer />
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