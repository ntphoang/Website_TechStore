// Đây là nơi vẽ ra toàn bộ bản đồ (điều hướng) của trang web

import { createBrowserRouter, Navigate } from 'react-router-dom';
//import Login from '../pages/Login';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home';

const router = createBrowserRouter([
  // 1. Các phòng mở cửa tự do (ai vào cũng được)
  {
    path: '/login',
    element: <AuthPage />,
  },

  // 2. Các phòng vip chỉ có admin mới được vào
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: 'dashboard',
        element: <AdminLayout />,
      },
      // Các đường dẫn tới các trang khác của admin thì bỏ vào đây
    ],
  },

  // 3. Các phòng chung cho admin và user
  {
    path: '/',
    element: <ProtectedRoute allowedRoles={['admin', 'user']} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },

  // 4. Nếu vào đường dẫn không hợp lệ thì chuyển về đăng nhập
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
