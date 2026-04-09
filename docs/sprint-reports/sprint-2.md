# 🎯 SPRINT 2: CORE E-COMMERCE FEATURES (PRODUCTS, CATEGORIES, CARTS)

**Thời gian:** 10/4/2026 - 14/4/2026
**Mục tiêu:** Hoàn thiện luồng hiển thị, quản lý Sản phẩm/Danh mục và Thao tác Giỏ hàng.
**Chiến thuật:** Contract-First Development (Ưu tiên chốt kiểu dữ liệu trước khi code logic/UI).

---

## 👤 1. HẢI: DATA LAYER (DATABASE & TYPES)

**Nhánh Git:** `feature/data-layer`
**Deadline chốt Type:** 11/04/2026 _(Quan trọng: Phải xong sớm để team có "Hợp đồng" làm việc)._

- [ ] **Task 1.1: Thiết kế & Mock Database**
  - **File:** `db.json`
  - **Mô tả:** - Khởi tạo mảng `"categories": []` chứa ít nhất 3 danh mục.
    - Khởi tạo mảng `"products": []` chứa ít nhất 10 sản phẩm (có liên kết `categoryId`).
    - Khởi tạo mảng `"carts": []` chứa 1 giỏ hàng mẫu của user (bao gồm mảng `cartItems`).
  - **Acceptance Criteria (Tiêu chí hoàn thành):** `npm run server` chạy thành công, gọi API `http://localhost:8000/products` trả về đủ data.

- [ ] **Task 1.2: Định nghĩa TypeScript Interfaces (Contract)**
  - **File:** `src/types/category.type.ts`, `src/types/product.type.ts`, `src/types/cart.type.ts`
  - **Mô tả:** Viết các `interface` xuất ra để Sỹ và Hoàng sử dụng. Ví dụ: `Product` phải có `id`, `name`, `price`, `description`, `imageUrl`, `categoryId`, `stock`.
  - **Acceptance Criteria:** Các file không báo lỗi TypeScript, export đầy đủ.

---

## 👤 2. SỸ: LOGIC LAYER (API & CUSTOM HOOKS)

**Nhánh Git:** `feature/logic-layer`
**Lưu ý:** Import các Type do Hải viết để làm kiểu trả về cho API.

- [ ] **Task 2.1: Xây dựng API Services**
  - **File:** `src/features/products/api/productApi.ts`, `src/features/carts/api/cartApi.ts`
  - **Mô tả:** Viết các hàm sử dụng `axiosClient` để gọi các phương thức GET, POST, PUT, DELETE cho Products, Categories và Carts.
  - **Acceptance Criteria:** Test console.log trả về đúng cục data từ server.

- [ ] **Task 2.2: Xây dựng Hooks cho Products & Categories**
  - **File:** `src/features/products/hooks/useProducts.ts`, `useProductMutation.ts`
  - **Mô tả:** Dùng `useQuery` để lấy danh sách sản phẩm/danh mục. Dùng `useMutation` để Thêm/Sửa/Xóa sản phẩm (Nhớ `invalidateQueries` để cập nhật lại UI).

- [ ] **Task 2.3: Xây dựng Hooks cho Carts**
  - **File:** `src/features/carts/hooks/useCart.ts`
  - **Mô tả:** Chứa logic gọi API để Thêm sản phẩm vào giỏ, Tăng/Giảm số lượng, Xóa khỏi giỏ. Cung cấp thêm 1 hàm `calculateTotal()` để tính tổng tiền.

---

## 👤 3. HOÀNG: UI/UX LAYER (PAGES & COMPONENTS)

**Nhánh Git:** `feature/ui-layer`
**Lưu ý:** Tạo Mock data tĩnh bằng các Type của Hải để dựng UI trước, không cần chờ Sỹ viết xong Hook.

- [ ] **Task 3.1: Dựng UI Trang chủ (Home)**
  - **File:** `src/pages/Home.tsx`, `src/components/ProductCard.tsx`
  - **Mô tả:**
    - Cắt layout thành 2 phần: Sidebar (Danh mục) và Main Content (Lưới sản phẩm).
    - Render mảng fake data sản phẩm ra dạng Grid Responsive.
  - **Acceptance Criteria:** Giao diện đẹp, chuẩn thiết kế, reponsive tốt trên Mobile/PC.

- [ ] **Task 3.2: Dựng UI Bảng quản lý Admin**
  - **File:** `src/pages/admin/products/ProductList.tsx`
  - **Mô tả:** Dựng bảng Table hiển thị Cột Ảnh, Tên, Giá, Danh mục, Kho, Hành động (Sửa/Xóa). Thêm nút "Thêm sản phẩm mới".

- [ ] **Task 3.3: Dựng UI Form Sản phẩm (Validation)**
  - **File:** `src/pages/admin/products/ProductForm.tsx`, `src/schemas/product.schema.ts`
  - **Mô tả:** Dùng `react-hook-form` dựng form Thêm/Sửa. Dùng Zod bắt lỗi (Tên không được trống, Giá > 0).

- [ ] **Task 3.4: Dựng UI Giỏ hàng**
  - **File:** `src/features/carts/components/CartDrawer.tsx` (hoặc `CartPage.tsx`)
  - **Mô tả:** Giao diện hiển thị các món hàng đã chọn, có nút [+] [-] để đổi số lượng và hiển thị Tổng tiền.

---

## 🤝 4. INTEGRATION (GHÉP CODE CUỐI TUẦN)

**Phụ trách:** Hoàng (Tech Lead) & Toàn Team

- [ ] **Task 4.1: Code Review & Merge**
  - Merge nhánh `data-layer` vào `develop`.
  - Review và Merge `logic-layer` vào `develop`.
  - Review và Merge `ui-layer` vào `develop`.
- [ ] **Task 4.2: Data Binding**
  - Vào các file UI của Hoàng, xóa fake data.
  - Cắm các hooks (`useProducts`, `useCart`) của Sỹ vào UI.
  - Test toàn bộ luồng: Thêm SP -> Hiển thị Trang chủ -> Thêm vào giỏ -> Tính tổng tiền.
