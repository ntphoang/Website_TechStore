import { useState, useEffect } from 'react';
import { HiOutlineAdjustments, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import axiosClient from '../lib/axiosClient';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Product } from '../types/product.type';
import type { Category } from '../types/category.type';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State cho Lọc và Phân trang
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          axiosClient.get('/products'),
          axiosClient.get('/categories'),
        ]);
        setProducts(productsData as unknown as Product[]);
        setCategories(categoriesData as unknown as Category[]);
      } catch (error) {
        console.error('Lỗi tải dữ liệu cửa hàng');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Logic lọc sản phẩm
  const filteredProducts = products.filter(
    (p) => selectedCategory === 'all' || p.categoryId === selectedCategory
  );

  // Logic phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="animate-in fade-in duration-700">
      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
          Trang chủ / Sản phẩm
        </p>
        <h1 className="text-3xl font-black text-slate-800">Tất cả sản phẩm</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR LỌC */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm">
            <h3 className="flex items-center gap-2 font-black text-slate-800 mb-6">
              <HiOutlineAdjustments className="text-pastel-teal" />
              Bộ lọc
            </h3>

            {/* Lọc theo danh mục */}
            <div className="space-y-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Danh mục
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === 'all' ? 'bg-pastel-teal text-white shadow-md shadow-pastel-teal/20' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Tất cả
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-pastel-teal text-white shadow-md shadow-pastel-teal/20' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* LƯỚI SẢN PHẨM */}
        <div className="lg:col-span-9">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* PHÂN TRANG (Pagination UI) */}
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
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">Không tìm thấy sản phẩm nào phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
