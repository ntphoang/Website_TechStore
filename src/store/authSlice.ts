import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type  User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const getInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      return { isAuthenticated: true, user: JSON.parse(user), token };
    }
  } catch (error) {
    console.error('Auth sync error:', error);
  }
  return { isAuthenticated: false, user: null, token: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logoutAction } = authSlice.actions;
export default authSlice.reducer;