import React from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetail?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  const handleViewDetail = () => {
    onViewDetail?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex flex-col">
      {/* Container của ảnh - Ép bo góc ở đây để an toàn tuyệt đối */}
      <div className="relative flex-shrink-0 overflow-hidden bg-slate-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            const fallback = 'https://dummyimage.com/400x300/f1f5f9/64748b.png&text=No+Image';
            if (target.src !== fallback) target.src = fallback;
          }}
        />

        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-0.5 rounded-lg text-xs font-bold shadow-sm">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Nội dung sản phẩm */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">
          {product.category}
        </p>
        <h3 className="text-sm sm:text-base font-bold text-slate-800 line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="mt-auto">
          <div className="mb-4">
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleViewDetail}
              className="w-full bg-gray-200 hover:bg-gray-400 text-gray-700 py-2 rounded-xl transition-colors duration-200 text-xs sm:text-sm font-bold"
            >
              Chi tiết
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-colors duration-200 text-xs sm:text-sm font-bold shadow-sm shadow-blue-100"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
