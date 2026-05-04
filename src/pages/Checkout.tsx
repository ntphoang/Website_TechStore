import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { HiOutlineCheck } from 'react-icons/hi';

import { checkoutSchema } from '../schemas/checkout.schema';
import { orderApi } from '../api/orderApi';
import { clearCart } from '../store/cartSlice';

import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

import type { RootState } from '../store/store';
import type { CheckoutFormValues } from '../schemas/checkout.schema';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      note: '',
    },
    mode: 'onChange', // Validate Real-time
  });

  const createOrderMutation = useMutation({
    mutationFn: orderApi.create,
    onSuccess: (_, variables) => {
      dispatch(clearCart());
      setCreatedOrderId(variables.id as string);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!');
    },
  });

  const onSubmit = (formData: CheckoutFormValues) => {
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      shippingAddress: formData.address,
      note: formData.note,
      date: new Date().toLocaleDateString('vi-VN'),
      totalAmount: totalAmount,
      status: 'pending' as const,
      paymentMethod: 'COD',
      items: items,
      userId: user?.id || null,
    };

    createOrderMutation.mutate(newOrder);
  };

  // 1. Màn hình Thành công
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-lg">
          <HiOutlineCheck className="w-12 h-12" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4 tracking-tight">
          Đặt hàng thành công!
        </h2>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8">
          <p className="text-slate-500 mb-2 font-medium">Mã đơn hàng của bạn</p>
          <p className="text-2xl font-black text-pastel-teal">#{createdOrderId}</p>
          <div className="h-px w-16 bg-slate-100 mx-auto my-4"></div>
          <p className="text-sm text-slate-500">
            Chúng tôi sẽ sớm liên hệ với bạn để xác nhận và giao hàng.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate('/products')}
            className="bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            Tiếp tục mua sắm
          </Button>
          <Button
            onClick={() => navigate('/my-orders')}
            className="shadow-lg shadow-pastel-teal/20"
          >
            Xem đơn hàng của tôi
          </Button>
        </div>
      </div>
    );
  }

  // 2. Màn hình Giỏ hàng trống
  if (items.length === 0) {
    return (
      <div className="text-center py-20 animate-in fade-in duration-500">
        <h2 className="text-2xl font-black text-slate-800 mb-4">Giỏ hàng của bạn đang trống</h2>
        <div className="flex justify-center mt-6">
          <Button onClick={() => navigate('/products')} className="w-auto px-10">
            Quay lại Cửa hàng
          </Button>
        </div>
      </div>
    );
  }

  // 3. Màn hình Đặt hàng
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="lg:col-span-7">
        <form
          id="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm"
        >
          <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-pastel-teal rounded-full"></div>
            Thông tin giao hàng
          </h2>

          <div className="space-y-2">
            <Input
              label="Họ và tên người nhận"
              placeholder="Nhập đầy đủ họ tên"
              {...register('customerName')}
              error={errors.customerName?.message}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Số điện thoại"
                placeholder="0901234567"
                {...register('phone')}
                error={errors.phone?.message}
              />
              <Input
                label="Email (Không bắt buộc)"
                placeholder="techstore@email.com"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            <Input
              label="Địa chỉ nhận hàng"
              placeholder="Số nhà, tên đường, phường/xã..."
              {...register('address')}
              error={errors.address?.message}
            />
            <TextArea
              label="Ghi chú thêm (Không bắt buộc)"
              placeholder="Lời nhắn cho nhân viên giao hàng (nếu có)..."
              {...register('note')}
              error={errors.note?.message}
            />
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
        </form>
      </div>

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
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
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
            type="submit"
            form="checkout-form"
            isLoading={createOrderMutation.isPending}
            className="mt-10 bg-pastel-teal hover:bg-[#326e6e] py-4 text-base shadow-lg shadow-pastel-teal/30"
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
