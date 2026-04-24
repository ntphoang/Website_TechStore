import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../store/store';

interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'user'>;
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && auth.user && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
