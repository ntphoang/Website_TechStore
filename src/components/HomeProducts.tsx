import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import ProductCard from './ProductCard';
import { addToCart } from '../store/cartSlice';
import type { Product } from '../types';

export default function HomeProducts({ products }: { products: Product[] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, productId: product.id, quantity: 1 }));
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const handleViewDetail = (product: Product) => navigate(`/products/${product.id}`);

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl font-black text-slate-800 border-l-8 border-pastel-teal pl-4">Sản phẩm nổi bật</h2>
        <button onClick={() => navigate('/products')} className="hidden sm:flex items-center gap-2 text-pastel-teal font-bold hover:text-[#326e6e] group">
          Xem tất cả <HiOutlineArrowNarrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onViewDetail={handleViewDetail} />
        ))}
      </div>
      
      <button onClick={() => navigate('/products')} className="mt-8 w-full py-4 bg-white text-slate-700 rounded-2xl font-bold sm:hidden border border-slate-200">
        Xem tất cả sản phẩm
      </button>
    </section>
  );
}