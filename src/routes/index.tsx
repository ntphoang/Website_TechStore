import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProductsPage from '../pages/ProductsPage';
import ProductDetail from '../pages/ProductDetail';
import Checkout from '../pages/Checkout';
import MyOrders from '../pages/MyOrders';
import ProductList from '../pages/admin/products/ProductList';
import ProductForm from '../pages/admin/products/ProductForm';
import Dashboard from '../pages/admin/Dashboard';
import OrderList from '../pages/admin/OrderList';
import UserList from '../pages/admin/UserList';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          {
            path: 'products',
            children: [
              { index: true, element: <ProductList /> },
              { path: 'add', element: <ProductForm /> },
              { path: 'edit/:id', element: <ProductForm /> },
            ],
          },
          { path: 'orders', element: <OrderList /> },
          { path: 'users', element: <UserList /> },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetail /> },
      {
        path: 'checkout',
        element: <ProtectedRoute allowedRoles={['admin', 'user']} />,
        children: [{ index: true, element: <Checkout /> }],
      },
      {
        path: 'my-orders',
        element: <ProtectedRoute allowedRoles={['admin', 'user']} />,
        children: [{ index: true, element: <MyOrders /> }],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
