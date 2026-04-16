import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../store/store';

interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'user'>;
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
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

  // TH3: Hợp lệ → cho phép truy cập render các Route con
  return <Outlet />;
}
