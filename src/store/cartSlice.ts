import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartItemExtended } from '../types/cart.type';

interface CartState {
  items: CartItemExtended[];
}

const initialState: CartState = {
  items: [], // Khởi tạo giỏ hàng trống
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm hoặc tăng số lượng nếu đã tồn tại
    addToCart: (state, action: PayloadAction<CartItemExtended>) => {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    // Cập nhật số lượng (+1 hoặc -1)
    updateQuantity: (state, action: PayloadAction<{ productId: number; delta: number }>) => {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        item.quantity += action.payload.delta;
        // Nếu số lượng về 0 thì xóa khỏi giỏ
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== action.payload.productId);
        }
      }
    },
    // Xóa hẳn sản phẩm
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    // Reset giỏ hàng (sau khi thanh toán)
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
