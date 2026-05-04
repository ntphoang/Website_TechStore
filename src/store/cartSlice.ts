import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type CartItemExtended } from '../types';

interface CartState {
  items: CartItemExtended[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemExtended>) => {
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number | string; delta: number }>) => {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        item.quantity += action.payload.delta;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== action.payload.productId);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;