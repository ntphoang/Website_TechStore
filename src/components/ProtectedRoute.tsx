// Đây là nơi kiểm duyệt quyền truy cập vào 1 trang nào đó(tạo 1 vệ sĩ đứng canh cửa)

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../store/authAtom';

// Mảng này chứa những chức vụ có thể đi qua
interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'user'>;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // Nhìn vào Recoil xem người vào là ai, có mang token không?
  const auth = useRecoilValue(authAtom);

  // Lấy vị trí nơi người này muốn vào
  const location = useLocation();

  // TH1: người lạ(chưa login)
  if (!auth.isAuthenticated) {
    // trả về trang login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // TH2: có token nhưng không được phép truy cập vào nơi này
  if (allowedRoles && auth.user && !allowedRoles.includes(auth.user.role)) {
    // trả về trang chủ
    return <Navigate to="/" replace />;
  }

  // TH3: hợp lệ, có token và được phép truy cập
  return <Outlet />; // mở cửa
};

export default ProtectedRoute;
