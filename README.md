# 🛍️ TechStore - E-commerce Platform

> Ứng dụng web thương mại điện tử tích hợp đầy đủ: khách hàng mua sắm, thanh toán, quản lý đơn hàng + admin dashboard quản lý kho, sản phẩm, người dùng.

---

## 1. Project Overview 📋

**TechStore** là một nền tảng thương mại điện tử hiện đại cho các sản phẩm công nghệ, xây dựng bằng **React + Vite + TypeScript** với backend nhẹ (**JSON Server**).

### Mục tiêu

- ✅ Xây dựng MVP đầy đủ chức năng (auth, CRUD, search, dashboard)
- ✅ Áp dụng best practices React: component tách lớp, state management, custom hooks
- ✅ Ensure code quality: TypeScript, ESLint, Prettier, Zod validation
- ✅ Deploy production-ready: Vercel (frontend) + Render (backend)
- ✅ Tạo tài liệu toàn diện & sprint tracking

---

## 2. Demo 🎬

| Phần            | URL                                       | Ghi chú                 |
| --------------- | ----------------------------------------- | ----------------------- |
| **Frontend**    | `https://website-tech-store.vercel.app`   | Demo trên Vercel        |
| **Backend API** | `https://website-tech-store.onrender.com` | JSON Server trên Render |
| **API Docs**    | `/docs/api-spec.md`                       | Danh sách endpoints     |

### 🔐 Demo Account

| Email              | Password | Role  |
| ------------------ | -------- | ----- |
| `admin1@gmail.com` | `123456` | Admin |
| `user1@gmail.com`  | `123456` | User  |

---

## 3. Tech Stack 🛠️

### Frontend

- **React 19** + **TypeScript 5.9** - UI library & type safety
- **Vite 8** - Lightning-fast bundler & dev server
- **React Router DOM 7** - Client-side routing with nested routes
- **TailwindCSS 3.4** - Utility-first CSS framework

### State Management & Data Fetching

- **Redux Toolkit 2.11** - Global state (auth, cart)
- **React Query 5.96** - Server state & caching
- **Redux DevTools** - Debug store in dev

### Form & Validation

- **React Hook Form 7.72** - Lightweight form management
- **Zod 4.3** - TypeScript-first schema validation
- **@hookform/resolvers** - Zod integration

### UI & UX

- **Recharts 3.8** - Analytics charts (dashboard)
- **Lucide React 1.8** - Icon library
- **React Icons 5.6** - Additional icons
- **React Hot Toast 2.6** - Notifications

### Backend & Auth

- **JSON Server 0.17** - Mock REST API
- **json-server-auth 2.1** - JWT authentication
- **Axios 1.14** - HTTP client

### Code Quality

- **ESLint 9.39** - Linting & code style
- **Prettier 3.8** - Code formatter
- **TypeScript ESLint** - Type-aware linting

### Dev Tools

- **Vite** - Build tooling
- **TypeScript Compiler** - Type checking
- **PostCSS & Autoprefixer** - CSS processing

### Deployment

- **Vercel** - Frontend hosting
- **Render** - Backend hosting (JSON Server)

---

## 4. Features (MVP) ✨

### 🔐 Authentication & Authorization

- ✅ Đăng ký tài khoản (Signup)
- ✅ Đăng nhập (Login) với JWT token
- ✅ Đăng xuất (Logout)
- ✅ Refresh token + re-login flow
- ✅ Phân quyền: Admin / Customer

### 🛒 Shopping Features

- ✅ Duyệt sản phẩm (Browse products)
- ✅ Chi tiết sản phẩm (Product detail page)
- ✅ Tìm kiếm sản phẩm (Search by name)
- ✅ Lọc theo danh mục (Filter by category)
- ✅ Sắp xếp (Sort by price, newest)
- ✅ Phân trang (Pagination: 9 items/page)
- ✅ Thêm vào giỏ hàng (Add to cart)
- ✅ Quản lý giỏ hàng (View, update, remove items)
- ✅ Thanh toán (Checkout form with validation)
- ✅ Lịch sử đơn hàng (Order history)

### 📊 Admin Dashboard

- ✅ Thống kê doanh thu (Revenue analytics)
- ✅ Thống kê đơn hàng (Order distribution chart)
- ✅ Top sản phẩm bán chạy (Top products chart)
- ✅ Thẻ KPI (Key metrics)

### 📦 Product Management (Admin)

- ✅ Danh sách sản phẩm (Product list with table)
- ✅ Thêm sản phẩm (Create product)
- ✅ Sửa sản phẩm (Edit product)
- ✅ Xóa sản phẩm (Delete product)
- ✅ Upload ảnh (Image upload with preview)
- ✅ Validate kích thước & định dạng ảnh

### 📋 Order Management (Admin)

- ✅ Danh sách đơn hàng (Order list)
- ✅ Cập nhật trạng thái đơn hàng (Update status)
- ✅ Xóa đơn hàng (Delete order)

### 👥 User Management (Admin)

- ✅ Danh sách người dùng (User list)
- ✅ Khóa/mở tài khoản người dùng (Ban/unban users)

### 🎨 UI/UX

- ✅ Responsive design (Mobile, tablet, desktop)
- ✅ Loading states & error handling
- ✅ Empty states (No products, no orders)
- ✅ Toast notifications (Success, error)
- ✅ Form validation with error messages
- ✅ Modal dialogs (Confirm delete)

---

## 👥 Team Members

- **Nguyễn Trần Phi Hoàng** - Frontend UI & Components Lead
- **Hoàng Ngọc Hải** - Backend API & State Management
- **Nguyễn Văn Sỹ** - Pages & Admin Panel Developer

---

**Last Updated:** 05/05/2026  
**Version:** 1.0.0 (MVP)
