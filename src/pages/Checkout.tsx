import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    toast.success('Đặt hàng thành công! Đơn hàng đang được xử lý.');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-slate-800 mb-4">Giỏ hàng của bạn đang trống</h2>
        <Button onClick={() => navigate('/')} className="w-auto px-10">
          Quay lại mua sắm
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
      <div className="lg:col-span-7">
        <div className="bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-pastel-teal rounded-full"></div>
            Thông tin giao hàng
          </h2>

          <div className="space-y-2">
            <Input label="Họ và tên người nhận" placeholder="Nhập đầy đủ họ tên" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Số điện thoại" placeholder="090x xxx xxx" />
              <Input label="Email (Không bắt buộc)" placeholder="techstore@email.com" />
            </div>
            <Input label="Địa chỉ nhận hàng" placeholder="Số nhà, tên đường, phường/xã..." />
            <TextArea
              label="Ghi chú thêm"
              placeholder="Lời nhắn cho nhân viên giao hàng (nếu có)..."
            />
          </div>
        </div>

        <div className="mt-6 bg-pastel-ice/30 p-6 rounded-2xl border border-pastel-ice/50">
          <p className="text-xs font-bold text-pastel-teal uppercase tracking-widest mb-2">
            Phương thức thanh toán
          </p>
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-pastel-teal">
            <div className="w-5 h-5 rounded-full border-4 border-pastel-teal"></div>
            <span className="font-bold text-slate-800">Thanh toán khi nhận hàng (COD)</span>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
      <div className="lg:col-span-5">
        <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-xl sticky top-24">
          <h2 className="text-xl font-black mb-8 border-b border-white/10 pb-4">
            Tóm tắt đơn hàng
          </h2>

          <div className="max-h-[300px] overflow-y-auto space-y-4 mb-8 pr-2 custom-scrollbar">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl p-1 flex-shrink-0">
                    <img src={item.imageUrl} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xs font-bold line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-white/50">Số lượng: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-xs font-black">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    item.price * item.quantity
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-white/10 pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Tạm tính</span>
              <span className="font-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  totalAmount
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Phí vận chuyển</span>
              <span className="text-pastel-mint font-bold text-xs uppercase">Miễn phí</span>
            </div>
            <div className="flex justify-between text-xl font-black pt-4 border-t border-white/10 mt-4">
              <span>Tổng cộng</span>
              <span className="text-pastel-yellow">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  totalAmount
                )}
              </span>
            </div>
          </div>

          <Button
            onClick={handleOrder}
            className="mt-10 bg-pastel-teal hover:bg-[#326e6e] py-4 text-base"
          >
            Xác nhận đặt hàng
          </Button>
          <p className="text-[10px] text-center text-white/30 mt-4 font-medium uppercase tracking-widest">
            Bằng cách đặt hàng, bạn đồng ý với điều khoản của TechStore
          </p>
        </div>
      </div>
    </div>
  );
}
