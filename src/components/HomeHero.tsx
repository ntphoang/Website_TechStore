import { useNavigate } from 'react-router-dom';
import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineChatAlt2,
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiOutlineMusicNote,
  HiOutlineClock,
  HiOutlinePuzzle,
  HiOutlineCamera,
} from 'react-icons/hi';

const FEATURES = [
  { id: 1, icon: HiOutlineTruck, title: 'Giao hàng hỏa tốc', desc: 'Nhận hàng trong 2 giờ' },
  { id: 2, icon: HiOutlineShieldCheck, title: 'Chính hãng 100%', desc: 'Bảo hành uy tín' },
  { id: 3, icon: HiOutlineRefresh, title: 'Đổi trả miễn phí', desc: 'Trong vòng 7 ngày' },
  { id: 4, icon: HiOutlineChatAlt2, title: 'Hỗ trợ 24/7', desc: 'Luôn sẵn sàng giải đáp' },
];

const CATEGORIES = [
  { id: 1, name: 'Điện thoại', icon: HiOutlineDeviceMobile },
  { id: 2, name: 'Laptop', icon: HiOutlineDesktopComputer },
  { id: 3, name: 'Tai nghe', icon: HiOutlineMusicNote },
  { id: 4, name: 'Đồng hồ', icon: HiOutlineClock },
  { id: 5, name: 'Gaming Gear', icon: HiOutlinePuzzle },
  { id: 6, name: 'Phụ kiện', icon: HiOutlineCamera },
];

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div className="space-y-20">
      {/* 1. Hero Banner */}
      <section className="relative bg-gradient-to-br from-pastel-ice/80 via-white to-pastel-teal/10 rounded-[40px] p-8 lg:p-16 border border-white shadow-sm mt-4">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-2 rounded-full bg-white text-pastel-teal font-black text-xs uppercase tracking-widest shadow-sm">
              ✨ Bộ sưu tập mùa hè 2026
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-800 leading-tight">
              Nâng tầm cuộc sống <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-teal to-emerald-400">
                Công nghệ đỉnh cao
              </span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-lg">
              Khám phá hệ sinh thái thiết bị thông minh thế hệ mới tại TechStore. Cam kết chính
              hãng, hậu mãi chuẩn 5 sao.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-4 bg-pastel-teal text-white rounded-2xl font-black hover:bg-[#326e6e] transition-all shadow-xl shadow-pastel-teal/30 hover:-translate-y-1"
              >
                Mua sắm ngay
              </button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800"
              alt="Tech"
              className="w-full max-w-md aspect-square object-cover rounded-[40px] shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 2. Quick Features */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {FEATURES.map((f) => (
          <div
            key={f.id}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 hover:border-pastel-teal/30 transition-all group"
          >
            <div className="w-14 h-14 bg-pastel-ice/50 text-pastel-teal rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-pastel-teal group-hover:text-white transition-all">
              <f.icon className="w-7 h-7" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-slate-800">{f.title}</h3>
              <p className="text-xs text-slate-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Categories */}
      <section>
        <h2 className="text-2xl font-black text-slate-800 mb-8 border-l-8 border-pastel-teal pl-4">
          Danh mục hot
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('/products')}
              className="bg-white border border-slate-100 rounded-[24px] p-6 flex flex-col items-center gap-4 hover:border-pastel-teal hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-pastel-teal group-hover:text-white transition-colors">
                <cat.icon className="w-8 h-8" />
              </div>
              <span className="font-bold text-slate-700">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
