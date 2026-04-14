// Đây là nơi vẽ ra toàn bộ bản đồ (điều hướng) của trang web

import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home';
import ProductList from '../pages/admin/products/ProductList';
import ProductForm from '../pages/admin/products/ProductForm';

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
        // Layout chung bọc bên ngoài
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: <div>Trang Dashboard chính thức</div>,
          },
          {
            path: 'products',
            // Nhóm các trang liên quan đến Product lại với nhau
            children: [
              { index: true, element: <ProductList /> }, // Khớp với: /admin/products
              { path: 'add', element: <ProductForm /> }, // Khớp với: /admin/products/add
              { path: 'edit/:id', element: <ProductForm /> }, // Khớp với: /admin/products/edit/1
            ],
          },
        ],
      },
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
