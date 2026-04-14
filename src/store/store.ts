import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import productsReducer from './productSlice';

// Khởi tạo Ngân hàng (Store)
export const store = configureStore({
  reducer: {
    auth: authReducer, // Đăng ký quầy Auth vào ngân hàng
    cart: cartReducer,
    product: productsReducer,
  },
});

// Export RootState as a const for importing without "type"
export const RootState = {} as ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
