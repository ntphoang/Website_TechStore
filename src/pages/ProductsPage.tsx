import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  HiOutlineAdjustments,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineSearch,
} from 'react-icons/hi';

import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStoreData } from '../hooks/useProduct';
import { addToCart } from '../store/cartSlice';
import type { Product } from '../types';

export default function ProductsPage() {
  const { data, isLoading, isError } = useStoreData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'newest' | 'priceAsc' | 'priceDesc'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const productsPerPage = 9;

  const processedProducts = useMemo(() => {
    if (!data) return [];

    let result = [...data.products];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(lowerQuery));
    }

    switch (sortOption) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    return result;
  }, [data, selectedCategory, searchQuery, sortOption]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, productId: product.id, quantity: 1 }));
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const handleViewDetail = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="h-96 flex items-center justify-center text-red-500 font-bold">
        Đã có lỗi xảy ra khi tải dữ liệu cửa hàng.
      </div>
    );
  }

  const { categories } = data;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = processedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(processedProducts.length / productsPerPage);

  const currentCategoryName =
    selectedCategory === 'all'
      ? 'Tất cả danh mục'
      : categories.find((c: any) => c.id === selectedCategory)?.name;

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col mb-8 gap-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Trang chủ / Sản phẩm
          </p>
          <h1 className="text-3xl font-black text-slate-800">{currentCategoryName}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiOutlineSearch className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-pastel-teal/10 focus:border-pastel-teal transition-all"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-white border border-slate-200 px-4 py-3 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-pastel-teal/10 appearance-none cursor-pointer"
            >
              <option value="newest">Mới nhất</option>
              <option value="priceAsc">Giá: Thấp đến Cao</option>
              <option value="priceDesc">Giá: Cao đến Thấp</option>
            </select>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center h-full gap-3 bg-white border border-slate-200 px-5 py-3 rounded-xl font-bold text-slate-700 hover:border-pastel-teal hover:text-pastel-teal transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-pastel-teal/10"
              >
                <HiOutlineAdjustments className="w-5 h-5 text-pastel-teal" />
                <span className="hidden sm:block">{currentCategoryName}</span>
                <HiOutlineChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 py-2 animate-in fade-in slide-in-from-top-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setCurrentPage(1);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors ${selectedCategory === 'all' ? 'text-pastel-teal bg-pastel-ice/30 border-l-4 border-pastel-teal' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                    >
                      Tất cả danh mục
                    </button>

                    {categories.map((cat: any) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage(1);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors ${selectedCategory === cat.id ? 'text-pastel-teal bg-pastel-ice/30 border-l-4 border-pastel-teal' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={handleViewDetail}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-3 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-pastel-teal hover:border-pastel-teal transition-all disabled:opacity-30"
              >
                <HiOutlineChevronLeft className="w-5 h-5" />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-11 h-11 rounded-xl text-sm font-black transition-all ${currentPage === i + 1 ? 'bg-pastel-teal text-white shadow-lg shadow-pastel-teal/20 scale-110' : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-3 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-pastel-teal hover:border-pastel-teal transition-all disabled:opacity-30"
              >
                <HiOutlineChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-32 bg-white rounded-[32px] border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
        </div>
      )}
    </div>
  );
}
