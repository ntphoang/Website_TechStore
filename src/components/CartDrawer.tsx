import { HiX, HiPlus, HiMinus, HiOutlineShoppingCart, HiOutlineTrash } from 'react-icons/hi';
import Button from './Button';

import type { CartItemExtended } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemExtended[];
  onUpdateQuantity: (id: number | string, delta: number) => void;
  onRemove: (id: number | string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-2xl transition-transform duration-500">
          <div className="flex h-full flex-col overflow-y-scroll bg-white">
            <div className="flex items-center justify-between border-b border-slate-50 px-4 py-6 sm:px-6">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-pastel-ice rounded-xl text-pastel-teal">
                  <HiOutlineShoppingCart className="w-6 h-6" />
                </div>
                Giỏ hàng của bạn
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-50 rounded-xl transition-all">
                <HiX className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 px-4 py-6 sm:px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <HiOutlineShoppingCart className="w-16 h-16 text-slate-200 mb-4" />
                  <p className="font-bold">Giỏ hàng đang trống</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-4 py-4 border-b border-slate-50 last:border-0 group">
                      <div className="h-20 w-20 flex-shrink-0 rounded-2xl bg-pastel-ice/30 p-2">
                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{item.name}</h3>
                          <button onClick={() => onRemove(item.productId)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-end justify-between">
                          <p className="text-base font-black text-pastel-teal">{formatPrice(item.price)}</p>
                          <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1">
                            <button onClick={() => onUpdateQuantity(item.productId, -1)} className="p-1 hover:bg-white rounded-lg text-slate-500 transition-colors">
                              <HiMinus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-black text-slate-700">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.productId, 1)} className="p-1 hover:bg-white rounded-lg text-slate-500 transition-colors">
                              <HiPlus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-slate-50 px-4 py-6 sm:px-6 bg-slate-50/50">
                <div className="flex justify-between items-end mb-6">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tổng cộng</p>
                  <p className="text-2xl font-black text-slate-900">{formatPrice(totalAmount)}</p>
                </div>
                <Button className="w-full py-4 text-base shadow-lg shadow-pastel-teal/30">Thanh toán ngay</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}