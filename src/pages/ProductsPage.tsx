import { useState } from 'react';
import { 
  HiOutlineAdjustments, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight,
  HiOutlineChevronDown // Thêm icon này cho Dropdown
} from 'react-icons/hi';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStoreData } from '../hooks/useProduct';

export default function ProductsPage() {
  const { data, isLoading, isError } = useStoreData();

  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State để đóng/mở Dropdown
  
  const productsPerPage = 8; // Hoặc bạn có thể tăng lên 12 vì không gian giờ đã rộng hơn

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

  const { products, categories } = data;

  const filteredProducts = products.filter(
    (p: any) => selectedCategory === 'all' || p.categoryId === selectedCategory
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Lấy tên danh mục đang được chọn để hiển thị trên nút Dropdown
  const currentCategoryName = selectedCategory === 'all' 
    ? 'Tất cả danh mục' 
    : categories.find((c: any) => c.id === selectedCategory)?.name;

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* KHU VỰC TIÊU ĐỀ & DROPDOWN LỌC */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Trang chủ / Sản phẩm
          </p>
          <h1 className="text-3xl font-black text-slate-800">
            {currentCategoryName}
          </h1>
        </div>

        {/* Dropdown Bộ Lọc */}
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-3 bg-white border border-slate-200 px-5 py-3 rounded-xl font-bold text-slate-700 hover:border-pastel-teal hover:text-pastel-teal transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-pastel-teal/10"
          >
            <HiOutlineAdjustments className="w-5 h-5 text-pastel-teal" />
            <span>{currentCategoryName}</span>
            <HiOutlineChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Menu Dropdown */}
          {isFilterOpen && (
            <>
              {/* Lớp phủ vô hình để bắt sự kiện click ra ngoài menu */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsFilterOpen(false)}
              ></div>

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

      {/* LƯỚI SẢN PHẨM (Đã dàn full màn hình) */}
      {currentProducts.length > 0 ? (
        <>
          {/* Lưới mở rộng từ 1 -> 2 -> 3 -> 4 cột tùy kích thước màn hình */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* PHÂN TRANG */}
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
          <p className="text-slate-400 font-bold text-lg">Không tìm thấy sản phẩm nào trong danh mục này.</p>
        </div>
      )}
    </div>
  );
}