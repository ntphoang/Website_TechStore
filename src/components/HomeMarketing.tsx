import { HiStar } from 'react-icons/hi';
import toast from 'react-hot-toast';

const TESTIMONIALS = [
  { id: 1, name: 'Nguyễn Trần Phi Hoàng', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=11', comment: 'Sản phẩm tuyệt vời, giao hàng cực kỳ nhanh chóng. UI/UX trang web làm rất tốt, trải nghiệm mua sắm mượt mà!', rating: 5 },
  { id: 2, name: 'Trần Văn Hải', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=12', comment: 'Chất lượng đóng gói rất cẩn thận. Hoàn toàn hài lòng với dịch vụ hỗ trợ.', rating: 5 },
  { id: 3, name: 'Lê Viết Sỹ', role: 'Gamer', avatar: 'https://i.pravatar.cc/150?img=13', comment: 'Săn được deal tai nghe gaming giá cực hời trong đợt Flash Sale.', rating: 4 },
];

export default function HomeMarketing() {
  return (
    <div className="space-y-20">
      {/* 1. Promo Banner */}
      <section className="bg-slate-900 rounded-[40px] p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl lg:text-5xl font-black text-white">Đăng ký thành viên mới</h2>
          <p className="text-pastel-teal text-xl font-medium">Nhận ngay voucher giảm giá lên đến 50%</p>
        </div>
        <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-pastel-teal hover:text-white transition-all shadow-xl hover:-translate-y-1">Đăng ký ngay</button>
      </section>

      {/* 2. Testimonials */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-800">Khách hàng nói gì về TechStore?</h2>
          <p className="text-slate-500 mt-2 font-medium">Hơn 10,000+ khách hàng đã tin tưởng trải nghiệm</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(item => (
            <div key={item.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative pt-12 mt-8">
              <img src={item.avatar} alt={item.name} className="w-16 h-16 rounded-full border-4 border-white shadow-md absolute -top-8 left-8" />
              <div className="flex gap-1 text-yellow-400 mb-4">{[...Array(5)].map((_, i) => <HiStar key={i} className={i < item.rating ? 'text-yellow-400' : 'text-slate-200'} />)}</div>
              <p className="text-slate-600 font-medium italic mb-6">"{item.comment}"</p>
              <div><h4 className="font-black text-slate-800">{item.name}</h4><p className="text-xs text-pastel-teal font-bold">{item.role}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Newsletter */}
      <section className="bg-pastel-ice/30 border border-pastel-ice/50 rounded-[40px] p-10 lg:p-20 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-4">Đừng bỏ lỡ tin tức công nghệ!</h2>
        <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3 mt-8" onSubmit={(e) => { e.preventDefault(); toast.success('Cảm ơn bạn đã đăng ký!'); }}>
          <input type="email" placeholder="Nhập email của bạn..." required className="flex-1 px-6 py-4 rounded-2xl border-none shadow-sm focus:ring-4 focus:ring-pastel-teal/20 outline-none" />
          <button type="submit" className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-900 transition-all shadow-xl">Đăng ký</button>
        </form>
      </section>
    </div>
  );
}