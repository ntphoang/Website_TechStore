import React from 'react';
import { HiX, HiPlus, HiMinus, HiOutlineShoppingCart } from 'react-icons/hi';
import Button from './Button';
import type { Product } from '../types/product.type'; // Đã thống nhất dùng import type

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  // Tính tổng tiền
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Overlay - Lớp nền mờ */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-2xl transition-transform duration-500 ease-in-out">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-6 sm:px-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HiOutlineShoppingCart className="w-6 h-6 text-blue-600" />
                Giỏ hàng của bạn
              </h2>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-500 transition">
                <HiX className="h-6 w-6" />
              </button>
            </div>

            {/* List Items */}
            <div className="flex-1 px-4 py-6 sm:px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <HiOutlineShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                  <p>Giỏ hàng đang trống</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-4 border-b border-slate-50 last:border-0">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-bold text-slate-800">
                            <h3 className="line-clamp-1">{item.name}</h3>
                            <p className="ml-4">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          {/* Bộ điều khiển số lượng [+] [-] */}
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.productId, -1)}
                              className="p-1 hover:bg-slate-50 text-slate-600 transition"
                            >
                              <HiMinus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-medium text-slate-700 bg-slate-50/50">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.productId, 1)}
                              className="p-1 hover:bg-slate-50 text-slate-600 transition"
                            >
                              <HiPlus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemove(item.productId)}
                            className="font-medium text-red-500 hover:text-red-600 transition"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer - Tổng tiền & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 px-4 py-6 sm:px-6 bg-slate-50/50">
                <div className="flex justify-between text-base font-bold text-slate-900 mb-4">
                  <p>Tổng cộng</p>
                  <p className="text-xl text-blue-600">{formatPrice(totalAmount)}</p>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 mb-6 italic">
                  * Phí vận chuyển và thuế sẽ được tính khi thanh toán.
                </p>
                <Button className="w-full py-4 rounded-xl shadow-lg shadow-blue-100">
                  Thanh toán ngay
                </Button>
                <div className="mt-6 flex justify-center text-center text-sm text-slate-500">
                  <button
                    onClick={onClose}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Tiếp tục mua sắm &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
