import React, { useState, useEffect } from 'react';
import SlideBar from '../components/SlideBar';
import ProductCard, { type Product } from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosClient from '../lib/axiosClient';
import toast from 'react-hot-toast';
import CartDrawer from '../components/CartDrawer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { addToCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
}

const HomeContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          axiosClient.get('/products'),
          axiosClient.get('/categories'),
        ]);

        const typedCategories = categoriesData as unknown as Category[];
        setCategories(typedCategories);

        const productsWithCategory: Product[] = (productsData as unknown as any[]).map(
          (product: any) => ({
            ...product,
            category:
              typedCategories.find((cat) => cat.id === product.categoryId)?.name || 'Unknown',
          })
        );

        setProducts(productsWithCategory);
        setError('');
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Lỗi khi tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      })
    );
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const handleViewDetail = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="flex bg-slate-50/50 min-h-screen">
      {/* Sidebar */}
      <SlideBar />

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 animate-in fade-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-pastel-teal rounded-full"></div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Sản phẩm nổi bật
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center font-semibold">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const Home: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  // Đã sửa typeof RootState -> RootState
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <div className="flex-1">
        <HomeContent />
      </div>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={(id, delta) => dispatch(updateQuantity({ productId: id, delta }))}
        onRemove={(id) => dispatch(removeFromCart(id))}
      />
    </div>
  );
};

export default Home;
