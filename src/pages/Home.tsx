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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Vì axiosClient giờ đã trả thẳng về data, ta nhận trực tiếp mảng dữ liệu luôn
        const [productsData, categoriesData] = await Promise.all([
          axiosClient.get('/products'),
          axiosClient.get('/categories'),
        ]);

        // Cập nhật state với categoriesData (ép kiểu để TypeScript không báo lỗi)
        const typedCategories = categoriesData as unknown as Category[];
        setCategories(typedCategories);

        // Map category name to products
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

  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id, // Khớp với interface CartItemExtended
        productId: product.id,
        name: product.name, // Gửi kèm Tên
        price: product.price, // Gửi kèm Giá
        imageUrl: product.imageUrl, // Gửi kèm Ảnh
        quantity: 1,
      })
    );

    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const navigate = useNavigate();

  const handleViewDetail = (product: Product) => {
    navigate(`/products/${product.id}`);
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <SlideBar />

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Sản phẩm nổi bật
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-32 sm:h-48 md:h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-sm sm:text-base md:text-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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

  // Chỉ lấy items từ cartSlice
  const items = useSelector((state: typeof RootState) => state.cart.items);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header onOpenCart={handleOpenCart} />

      {/* Component HomeContent đã được sửa ở bước trước */}
      <HomeContent />

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items} // Truyền trực tiếp items
        onUpdateQuantity={(id, delta) => {
          dispatch(updateQuantity({ productId: id, delta }));
        }}
        onRemove={(id) => {
          dispatch(removeFromCart(id));
        }}
      />
    </div>
  );
};

export default Home;
