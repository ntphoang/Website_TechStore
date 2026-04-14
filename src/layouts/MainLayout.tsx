import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/cartSlice'; // Import actions
import CartDrawer from '../components/CartDrawer';

export default function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  // 1. Chỉ cần lấy items từ cart là đủ, vì nó đã có name, price, imageUrl
  const items = useSelector((state: typeof RootState) => state.cart.items);

  const handleOpenCart = () => setIsCartOpen(true);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header onOpenCart={handleOpenCart} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items} // 2. Truyền thẳng items vào đây
        onUpdateQuantity={(id, delta) => {
          // 3. Dispatch action cập nhật số lượng
          dispatch(updateQuantity({ productId: id, delta }));
        }}
        onRemove={(id) => {
          // 4. Dispatch action xóa
          dispatch(removeFromCart(id));
        }}
      />
    </div>
  );
}
