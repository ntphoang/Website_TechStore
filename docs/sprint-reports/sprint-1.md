# 🎯 KẾ HOẠCH SPRINT 1 (TUẦN 1): KHỞI TẠO NỀN TẢNG & AUTHENTICATION

**Mục tiêu cốt lõi:** Dựng thành công bộ khung dự án (Layout), có Mock API cung cấp JWT Token, và hoàn thiện luồng Đăng nhập/Phân quyền (Admin/User).

---

## 👨‍💻 PHÂN CÔNG CÔNG VIỆC CHI TIẾT

### 👑 1. Hoàng (Tech Lead) - Lõi hệ thống & Logic

_Nhánh làm việc (Branch):_ `feature/setup-core-auth`

- [ ] **Task 1.1:** Cài đặt state management & data fetching (`recoil`, `@tanstack/react-query`). Cấu hình bọc ngoài App tại `main.tsx`.
- [ ] **Task 1.2:** Tạo `store/authAtom.ts` để lưu thông tin User và Token (nhớ lấy từ localStorage để giữ phiên đăng nhập).
- [ ] **Task 1.3:** Cấu hình `lib/axiosClient.ts`. Viết Interceptors tự động nhét Token vào Request Header và bắt lỗi 401.
- [ ] **Task 1.4:** Cấu hình `react-router-dom` tại `routes/index.tsx`. Viết component `ProtectedRoute.tsx` để chặn người lạ vào trang Admin.
- [ ] **Task 1.5:** Viết custom hook `hooks/useAuth.ts` chứa logic gọi API login và xử lý lưu/xóa token, chuyển trang.

### 🎨 2. Hải (Frontend/UI) - Giao diện & Form

_Nhánh làm việc (Branch):_ `feature/setup-layout-form`

- [ ] **Task 2.1:** Cài đặt và cấu hình `tailwindcss`, `react-router-dom` (đã xong).
- [ ] **Task 2.2:** Dựng các UI Component dùng chung tại `components/`: `Button`, `Input`, `LoadingSpinner`.
- [ ] **Task 2.3:** Dựng `MainLayout` (có Header/Footer) và `AdminLayout` (có Sidebar/Topbar).
- [ ] **Task 2.4:** Cài đặt `react-hook-form`, `@hookform/resolvers`, `zod`, `react-hot-toast`.
- [ ] **Task 2.5:** Dựng giao diện trang `/login`. Cấu hình validate bằng Zod (bắt buộc nhập email, mật khẩu). Tích hợp hook `useAuth` của Hoàng để submit.

### 🔌 3. Sỹ (Mock API) - Dữ liệu & Endpoints

_Nhánh làm việc (Branch):_ `feature/setup-mock-api`

- [ ] **Task 3.1:** Cài đặt `json-server@0.17.4` và `json-server-auth` (đã xong).
- [ ] **Task 3.2:** Thiết kế cấu trúc database vào file `db.json`. Tạo sẵn 2 account mẫu: 1 Admin và 1 User thường để test đăng nhập. Thêm sẵn 5-10 sản phẩm mẫu.
- [ ] **Task 3.3:** Viết các hàm gọi API tại `features/auth/api/authApi.ts` (sử dụng instance `axiosClient` của Hoàng) cho các endpoint `/login`, `/register`.
- [ ] **Task 3.4:** Viết một file Markdown nhỏ vào `docs/api-spec.md` liệt kê các endpoint API hiện có để team dễ tra cứu.

---

## 🚨 QUY TẮC LÀM VIỆC SPRINT 1 (BẮT BUỘC)

1. **Không code trên nhánh `develop`**: Tất cả task phải được làm trên nhánh riêng (VD: `git checkout -b feature/ten-task`).
2. **Commit rõ ràng**: Dùng tiếng Việt có tiền tố. (VD: `feat: hoàn thành form đăng nhập`, `fix: sửa lỗi header bị lệch`).
3. **Review code trước khi gộp**: Làm xong task phải đẩy nhánh lên GitHub, mở **Pull Request (PR)** và báo Hoàng vào review. Hoàng Approve mới được Merge vào `develop`.
4. **Luôn cập nhật code mới**: Sau khi bất kỳ ai merge code thành công, tất cả thành viên phải gõ `git checkout develop` và `git pull origin develop` để đồng bộ máy mình.

---

## ✅ DEFINITION OF DONE (Tiêu chí hoàn thành Tuần 1)

- [ ] Giao diện có Layout chuẩn, chuyển trang mượt mà không load lại trang.
- [ ] Bấm đăng nhập -> Trúng API giả -> Có Token lưu vào LocalStorage -> Chuyển hướng đúng trang (User về Home, Admin về Dashboard).
- [ ] F5 (Refresh) trang không bị văng ra bắt đăng nhập lại.
- [ ] Chưa đăng nhập mà gõ url `/admin/dashboard` trên thanh địa chỉ sẽ bị đá văng về `/login`.
