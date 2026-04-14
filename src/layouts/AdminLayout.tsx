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

  // Chỉ lấy items từ cartSlice, không cần productSlice nữa
  const items = useSelector((state: typeof RootState) => state.cart.items);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Header onOpenCart={handleOpenCart} />

      <div className="flex flex-1 overflow-hidden">
        <SlideBar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items} // Truyền trực tiếp items vào
        onUpdateQuantity={(id, delta) => {
          // Gọi action cập nhật số lượng lên Redux
          dispatch(updateQuantity({ productId: id, delta }));
        }}
        onRemove={(id) => {
          // Gọi action xóa sản phẩm khỏi giỏ hàng
          dispatch(removeFromCart(id));
        }}
      />
    </div>
  );
}
