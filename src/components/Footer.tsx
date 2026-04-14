import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold text-white">TechStore</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
              Cửa hàng công nghệ cho sinh viên và người dùng phổ thông. Mua sắm tiện lợi, giao hàng
              nhanh và hỗ trợ tận tình.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Khám phá</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <Link to="/" className="transition hover:text-white">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="transition hover:text-white">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition hover:text-white">
                  Đăng nhập
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Liên hệ</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Email: support@techstore.com</li>
              <li>Hotline: 1900 1234</li>
              <li>Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 TechStore. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  );
}
