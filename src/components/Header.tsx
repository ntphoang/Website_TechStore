import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiOutlineShoppingCart, HiOutlineSearch } from 'react-icons/hi';
import type { RootState } from '../store/store';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onOpenCart?: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { logout } = useAuth();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pastel-teal text-white font-black shadow-lg shadow-pastel-teal/30 group-hover:rotate-12 transition-transform">
            T
          </div>
          <div className="hidden sm:block">
            <p className="text-base font-black text-slate-900 leading-none">TechStore</p>
            <p className="text-[10px] text-pastel-teal font-bold uppercase tracking-tighter">
              Digital Life
            </p>
          </div>
        </Link>

        {/* Thanh Tìm Kiếm (Thay thế Navigation) */}
        <div className="flex-1 max-w-2xl hidden sm:block">
          <div className="relative group">
            <input
              type="text"
              placeholder="Tìm kiếm điện thoại, laptop, phụ kiện..."
              className="w-full bg-slate-50 border border-slate-100 text-slate-800 text-sm rounded-full pl-12 pr-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-pastel-ice focus:bg-white transition-all duration-300"
            />
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-pastel-teal transition-colors" />
          </div>
        </div>

        {/* Actions (Giỏ hàng & User) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => onOpenCart?.()}
            className="relative p-2.5 text-slate-600 hover:bg-pastel-ice rounded-xl transition-all group"
          >
            <HiOutlineShoppingCart className="w-6 h-6 group-hover:text-pastel-teal" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pastel-peach text-[10px] font-black text-amber-900 border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden lg:block text-xs font-bold text-slate-500">
                Chào, <span className="text-slate-900">{user?.name}</span>
              </span>
              <button
                onClick={logout}
                className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors"
              >
                Thoát
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl bg-pastel-yellow text-yellow-900 text-xs font-bold shadow-sm hover:shadow-md transition-all"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
