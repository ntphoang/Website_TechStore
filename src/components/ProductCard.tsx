import React from 'react';
import Badge from './Badge';

import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetail?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative w-full h-48 sm:h-56 bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {product.discount && (
          <Badge variant="peach" className="absolute top-3 left-3 animate-pulse">-{product.discount}%</Badge>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-[10px] font-black uppercase tracking-widest text-pastel-teal mb-1">{product.category}</p>
        <h3 className="text-sm sm:text-base font-bold text-slate-800 line-clamp-2 mb-3 min-h-[2.5rem]">{product.name}</h3>

        <div className="mt-auto">
          <p className="text-lg font-black text-slate-900 mb-4">{formatPrice(product.price)}</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => onViewDetail?.(product)} className="py-2.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-pastel-ice hover:text-pastel-teal transition-colors border border-slate-100">
              Chi tiết
            </button>
            <button onClick={() => onAddToCart?.(product)} className="py-2.5 rounded-xl bg-pastel-teal text-white text-xs font-bold shadow-md shadow-pastel-teal/20 hover:bg-[#326e6e] transition-colors">
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;