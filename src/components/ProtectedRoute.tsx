// Đây là component dùng để bảo vệ route (giống như "vệ sĩ đứng canh cửa")
// Ai muốn vào trang phải qua kiểm tra ở đây

import { useSelector } from 'react-redux';
// Hook để lấy dữ liệu từ Redux store (state toàn cục)

import { Navigate, Outlet, useLocation } from 'react-router-dom';
// Navigate: dùng để chuyển hướng (redirect)
// Outlet: dùng để render component con (nếu được phép vào)
// useLocation: lấy thông tin route hiện tại (người dùng đang muốn vào đâu)

import type { RootState } from '../store';
// Kiểu dữ liệu của Redux store (dùng cho TypeScript để biết state có gì)

// Interface định nghĩa props truyền vào component
interface ProtectedRouteProps {
  // allowedRoles là mảng chứa các role được phép truy cập
  // Ví dụ: ['admin'] hoặc ['admin', 'user']
  allowedRoles?: Array<'admin' | 'user'>;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // Lấy state auth từ Redux store
  // auth thường chứa: isAuthenticated, user, token,...
  const auth = useSelector((state: RootState) => state.auth);

  // Lấy thông tin route hiện tại (URL người dùng đang cố truy cập)
  const location = useLocation();

  // =========================
  // TH1: Người chưa đăng nhập
  // =========================
  if (!auth.isAuthenticated) {
    // Nếu chưa login → đá về trang login
    // state={{ from: location }} để lưu lại trang ban đầu
    // (sau khi login có thể quay lại trang này)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ==========================================
  // TH2: Đã login nhưng không đủ quyền (role)
  // ==========================================
  if (allowedRoles && auth.user && !allowedRoles.includes(auth.user.role)) {
    // Nếu:
    // - Route có yêu cầu role (allowedRoles)
    // - Và user KHÔNG thuộc role được phép
    // → đá về trang chủ
    return <Navigate to="/" replace />;
  }

  // ==================================
  // TH3: Hợp lệ → cho phép truy cập
  // ==================================
  // Outlet sẽ render component con (trang mà user muốn vào)
  return <Outlet />;
};

export default ProtectedRoute;
