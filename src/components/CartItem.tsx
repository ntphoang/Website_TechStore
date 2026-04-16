import { HiPlus, HiMinus, HiOutlineTrash } from 'react-icons/hi';

interface CartItemProps {
  item: {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  };
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-slate-50 group animate-in fade-in slide-in-from-right-4">
      <div className="h-20 w-20 rounded-2xl bg-pastel-ice/30 p-2 flex-shrink-0 group-hover:bg-pastel-ice/50 transition-colors">
        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{item.name}</h4>
          <button
            onClick={() => onRemove(item.productId)}
            className="text-slate-300 hover:text-red-400 transition-colors"
          >
            <HiOutlineTrash className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm font-black text-pastel-teal">{formatPrice(item.price)}</p>

          <div className="flex items-center bg-slate-100 rounded-lg p-1 scale-90">
            <button
              onClick={() => onUpdateQuantity(item.productId, -1)}
              className="p-1 hover:bg-white rounded-md text-slate-500 transition-colors"
            >
              <HiMinus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-xs font-black text-slate-700">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.productId, 1)}
              className="p-1 hover:bg-white rounded-md text-slate-500 transition-colors"
            >
              <HiPlus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
