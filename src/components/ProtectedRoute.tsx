// Đây là component dùng để bảo vệ route (giống như "vệ sĩ đứng canh cửa")
// Ai muốn vào trang phải qua kiểm tra ở đây

import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../store/store';

// Interface định nghĩa props truyền vào component
interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'user'>;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  // TH1: Người chưa đăng nhập
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // TH2: Đã login nhưng không đủ quyền (role)
  if (allowedRoles && auth.user && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/" replace />;
  }

  // TH3: Hợp lệ → cho phép truy cập
  return <Outlet />;
};

export default ProtectedRoute;
