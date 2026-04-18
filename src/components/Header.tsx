import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingCart, HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';

import type { RootState } from '../store/store';

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-pastel-teal rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:scale-105 transition-transform">
            T
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">TechStore</h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Digital Life</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={onOpenCart} className="relative p-2 text-slate-500 hover:text-pastel-teal transition-colors">
            <HiOutlineShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-700 hidden sm:block">
                Chào, {user.name.split(' ').pop()}
              </span>
              <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <HiOutlineLogout className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="flex items-center gap-2 text-sm font-bold text-pastel-teal hover:text-[#326e6e] transition-colors">
              <HiOutlineUserCircle className="w-6 h-6" />
              <span className="hidden sm:block">Đăng nhập</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}