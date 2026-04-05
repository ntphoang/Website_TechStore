import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Vẫn giữ lại hàm lấy data từ kho để chống F5
const getInitialAuthState = (): AuthState => {
  try {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (token && userString) {
      return { isAuthenticated: true, user: JSON.parse(userString), token };
    }
  } catch (error) {
    console.error('Lỗi parse data:', error);
  }
  return { isAuthenticated: false, user: null, token: null };
};

// TẠO SLICE (Quầy giao dịch Auth)
const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    // Hành động 1: Đăng nhập thành công (Gửi kèm Payload là user và token)
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Hành động 2: Đăng xuất (Không cần gửi kèm data gì cả)
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

// Xuất các "Phiếu yêu cầu" để các file khác gọi
export const { loginSuccess, logoutAction } = authSlice.actions;

// Xuất Quầy giao dịch này cho Ngân hàng trung ương
export default authSlice.reducer;
