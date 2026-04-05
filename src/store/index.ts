import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Khởi tạo Ngân hàng (Store)
export const store = configureStore({
  reducer: {
    auth: authReducer, // Đăng ký quầy Auth vào ngân hàng
    // Sau này có thêm giỏ hàng thì viết: cart: cartReducer
  },
});

// Xuất ra 2 cái Type cực kỳ quan trọng cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
