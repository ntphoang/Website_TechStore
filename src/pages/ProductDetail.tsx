import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  HiOutlineArrowLeft,
  HiPlus,
  HiMinus,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from 'react-icons/hi';
import axiosClient from '../lib/axiosClient';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Product } from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await axiosClient.get(`/products/${id}`);
        setProduct(data as unknown as Product);
      } catch (error) {
        toast.error('Không tìm thấy sản phẩm!');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity,
      })
    );
    toast.success('Đã thêm vào giỏ hàng!');
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (!product) return null;

  return (
    <div className="animate-in fade-in duration-700">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-pastel-teal font-bold text-sm mb-8 transition-colors group"
      >
        <HiOutlineArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery ảnh */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-50 aspect-square flex items-center justify-center shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full object-contain mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col">
          <span className="text-pastel-teal font-black uppercase tracking-[0.2em] text-xs mb-3">
            {product.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-black text-slate-900">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                product.price
              )}
            </span>
            {product.discount && (
              <span className="bg-pastel-peach/30 text-amber-900 px-3 py-1 rounded-full text-xs font-black">
                TIẾT KIỆM {product.discount}%
              </span>
            )}
          </div>

          <p className="text-slate-500 leading-relaxed mb-10 font-medium">
            Sản phẩm công nghệ chính hãng, bảo hành 12 tháng. Thiết kế hiện đại, tinh tế phù hợp với
            phong cách sống tối giản.
          </p>

          <div className="space-y-6 bg-slate-50/50 p-6 rounded-[24px] mb-8 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Số lượng</span>
              <div className="flex items-center bg-white border border-slate-100 rounded-xl p-1.5 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-pastel-ice rounded-lg transition-colors text-slate-500"
                >
                  <HiMinus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-black text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-pastel-ice rounded-lg transition-colors text-slate-500"
                >
                  <HiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="py-4 text-base shadow-xl shadow-pastel-teal/20"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-50">
              <div className="p-2 bg-pastel-ice rounded-xl text-pastel-teal">
                <HiOutlineShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-600">Bảo hành 12T</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-50">
              <div className="p-2 bg-pastel-ice rounded-xl text-pastel-teal">
                <HiOutlineTruck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-600">Giao nhanh 2h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
