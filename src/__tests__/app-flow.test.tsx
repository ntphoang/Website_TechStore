import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { store } from '../store/store';
import AuthPage from '../pages/AuthPage';
import ProductForm from '../pages/admin/products/ProductForm';
import ProductsPage from '../pages/ProductsPage';

vi.mock('../lib/axiosClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}));

vi.mock('../api/productApi', () => ({
  productApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

import axiosClient from '../lib/axiosClient';
import { productApi } from '../api/productApi';

const mockedAxiosClient = axiosClient as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};
const mockedProductApi = productApi as {
  getAll: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
};

const renderWithProviders = (ui: React.ReactNode, queryClient: QueryClient) =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </Provider>
  );

describe('App UI flow', () => {
  let queryClient: QueryClient;

  const adminUser = {
    id: 1,
    email: 'admin@test.com',
    name: 'Admin Test',
    role: 'admin',
    status: 'active',
    joinDate: '01/01/2026',
  };

  const categories = [{ id: 1, name: 'Thiết bị' }];

  const createdProduct = {
    id: 101,
    name: 'Sản phẩm Flow Test',
    price: 179000,
    description: 'Kiểm thử flow đăng nhập, tạo sản phẩm và tìm kiếm',
    imageUrl: 'https://example.com/image.png',
    categoryId: 1,
    category: 'Thiết bị',
    stock: 12,
  };

  const otherProduct = {
    id: 102,
    name: 'Sản phẩm khác',
    price: 129000,
    description: 'Sản phẩm không liên quan',
    imageUrl: 'https://example.com/other.png',
    categoryId: 1,
    category: 'Thiết bị',
    stock: 8,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('đăng nhập, thêm sản phẩm và tìm kiếm sản phẩm mới trong trang Products', async () => {
    mockedAxiosClient.post.mockImplementation((url: string) => {
      if (url === '/login') {
        return Promise.resolve({ accessToken: 'test-token', user: adminUser });
      }
      return Promise.reject(new Error('Unknown post request'));
    });

    mockedAxiosClient.get.mockImplementation((url: string) => {
      if (url === '/categories') {
        return Promise.resolve(categories);
      }
      return Promise.reject(new Error(`Unknown get request: ${url}`));
    });

    mockedProductApi.create.mockResolvedValue(createdProduct);
    mockedProductApi.getAll.mockResolvedValue([createdProduct, otherProduct]);

    const routes = [
      { path: '/login', element: <AuthPage /> },
      { path: '/admin/dashboard', element: <div>Admin Dashboard</div> },
      { path: '/admin/products/add', element: <ProductForm /> },
      { path: '/admin/products', element: <div>Admin Products Page</div> },
      { path: '/products', element: <ProductsPage /> },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ['/login'] });
    renderWithProviders(<RouterProvider router={router} />, queryClient);

    await userEvent.type(screen.getByLabelText('Email'), 'admin@test.com');
    await userEvent.type(screen.getByLabelText('Mật khẩu'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Đăng nhập' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/admin/dashboard');
    });

    await act(async () => {
      router.navigate('/admin/products/add');
    });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Thêm sản phẩm mới/i })).toBeInTheDocument();
    });

    const file = new File(['dummy content'], 'product.png', { type: 'image/png' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(screen.getByAltText('Preview')).toBeInTheDocument();
    });

    await userEvent.type(screen.getByLabelText('Tên sản phẩm'), createdProduct.name);
    await userEvent.selectOptions(
      screen.getByLabelText('Danh mục'),
      String(createdProduct.categoryId)
    );
    await userEvent.type(screen.getByLabelText('Giá bán (VNĐ)'), String(createdProduct.price));
    await userEvent.type(screen.getByLabelText('Số lượng kho'), String(createdProduct.stock));
    await userEvent.type(screen.getByLabelText('Mô tả chi tiết'), createdProduct.description);
    await userEvent.click(screen.getByRole('button', { name: /Hoàn tất thêm mới/i }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/admin/products');
    });

    await act(async () => {
      router.navigate('/products');
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Tìm kiếm sản phẩm...')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
    await userEvent.type(searchInput, 'Flow Test');

    expect(await screen.findByText(createdProduct.name)).toBeInTheDocument();
    expect(screen.queryByText(otherProduct.name)).not.toBeInTheDocument();
  });
});
