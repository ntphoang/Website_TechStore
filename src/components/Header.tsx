import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RootState } from '../store/store';
import { useAuth } from '../hooks/useAuth';

// Định nghĩa Interface cho Props
interface HeaderProps {
  onOpenCart?: () => void; // Dấu ? giúp trang Admin vẫn dùng được Header mà không bắt buộc mở giỏ hàng
}

export default function Header({ onOpenCart }: HeaderProps) {
  // 1. Lấy trạng thái Auth từ Redux
  const { isAuthenticated, user } = useSelector((state: typeof RootState) => state.auth);

  // 2. Lấy dữ liệu giỏ hàng để tính toán CartCount
  const cartItems = useSelector((state: typeof RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 3. Lấy hàm logout
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            T
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 leading-tight">TechStore</p>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              Gadget & accessories
            </p>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link to="/" className="transition hover:text-blue-600">
            Trang chủ
          </Link>
          <Link to="/products" className="transition hover:text-blue-600">
            Sản phẩm
          </Link>
          {/* Chỉ Admin mới thấy link Quản trị */}
          {isAuthenticated && user?.role === 'admin' && (
            <Link
              to="/admin/dashboard"
              className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
            >
              Quản trị
            </Link>
          )}
        </nav>

        {/* Action Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Nút Giỏ hàng - Luôn hiển thị nếu muốn, hoặc chỉ hiện khi login tùy bạn */}
          <button
            onClick={() => {
              onOpenCart?.();
            }}
            className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-all group"
          >
            <HiOutlineShoppingCart className="w-6 h-6 group-hover:text-blue-600" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden lg:block text-sm font-semibold text-slate-700">
                Chào, {user?.name || 'Bạn'}
              </span>
              <button
                onClick={logout}
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 hover:shadow-blue-200"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
