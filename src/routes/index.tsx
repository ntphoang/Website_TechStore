// Đây là nơi vẽ ra toàn bộ bản đồ (điều hướng) của trang web
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home';

// --- BỔ SUNG IMPORT CÁC TRANG CLIENT TẠI ĐÂY ---
import ProductsPage from '../pages/ProductsPage';
// import ProductDetail from '../pages/ProductDetail'; // Mở comment khi bạn tạo file này
// import Checkout from '../pages/Checkout'; // Mở comment khi bạn tạo file này

// --- CÁC TRANG ADMIN ---
import ProductList from '../pages/admin/products/ProductList';
import ProductForm from '../pages/admin/products/ProductForm';
import Dashboard from '../pages/admin/Dashboard';
import OrderList from '../pages/admin/OrderList';
import UserList from '../pages/admin/UserList';

const router = createBrowserRouter([
  // ==========================================
  // 1. CÁC PHÒNG MỞ CỬA TỰ DO (Xác thực)
  // ==========================================
  {
    path: '/login',
    element: <AuthPage />,
  },

  // ==========================================
  // 2. CÁC PHÒNG VIP CHỈ CÓ ADMIN MỚI ĐƯỢC VÀO
  // ==========================================
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        // Layout chung bọc bên ngoài toàn bộ trang Admin
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
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
          {
            path: 'orders',
            element: <OrderList />,
          },
          {
            path: 'users',
            element: <UserList />,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 3. CÁC PHÒNG CHUNG CHO ADMIN VÀ USER
  // ==========================================
  {
    path: '/',
    // LƯU Ý: Hiện tại bạn đang yêu cầu phải đăng nhập (admin/user) mới được vào trang chủ và xem sản phẩm.
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
      // THÊM MỚI: Khai báo đường dẫn cho trang Sản phẩm
      {
        path: 'products',
        element: <ProductsPage />,
      },
      // {
      //   path: 'products/:id',
      //   element: <ProductDetail />,
      // },
      // {
      //   path: 'checkout',
      //   element: <Checkout />,
      // },
    ],
  },

  // ==========================================
  // 4. FALLBACK ROUTE (Đường dẫn không hợp lệ)
  // ==========================================
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export default router;