import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-pastel-teal text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <p className="text-2xl font-black text-white">TechStore</p>
            <p className="text-sm leading-relaxed text-pastel-ice/80 font-medium">
              Kiến tạo phong cách sống số tối giản và hiện đại. Chúng tôi cung cấp những trải nghiệm
              công nghệ tinh tế nhất.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-pastel-yellow">
                Khám phá
              </p>
              <ul className="space-y-2 text-sm font-bold">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="hover:text-white transition-colors">
                    Sản phẩm
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-pastel-yellow">
                Hỗ trợ
              </p>
              <ul className="space-y-2 text-sm font-bold">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bảo hành
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-pastel-yellow">
              Liên hệ
            </p>
            <div className="text-sm font-bold space-y-1">
              <p>ntphoang205@gmail.com</p>
              <p>Hotline: 0896368408</p>
              <p className="text-pastel-ice/60 font-medium mt-4">
                12 Nguyễn Văn Bảo, Gò vấp, Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-pastel-ice/40">
          © 2026 TechStore Project.
        </div>
      </div>
    </footer>
  );
}
