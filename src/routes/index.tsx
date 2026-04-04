// Đây là nơi vẽ ra toàn bộ bản đồ (điều hướng) của trang web

import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';

const router = createBrowserRouter([
  // 1.Các phòng mở cửa tự do(ai vào cũng được)
  {
    path: '/login',
    element: <Login />,
  },

  // 2. Các phòng vip chỉ có admin mới được vào
  {
    // Đặt 1 vệ sĩ đứng canh gác ở đây
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '/admin/dashboard',
        element: <AdminLayout />,
      },
      // Các đường dẫn tới các trang khác của admin thì bỏ vào đây
    ],
  },

  // 3. Các phòng chung cho admin và user
  {
    element: <ProtectedRoute allowedRoles={['admin', 'user']} />,
    children: [
      {
        path: '/profile',
        element: <div>Trang hồ sơ cá nhân</div>,
      },
    ],
  },
]);

export default router;
