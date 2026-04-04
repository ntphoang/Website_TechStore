import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

// Khởi tạo React Query(quản lý API)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //Tắt tính năng chuyển tab thì reload trang
      retry: 1, //Nếu API bị lỗi thì chỉ thử gọi lại 1 lần
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Bọc RecoilRoot để mở kho Global State cho toàn hệ thống */}
    <RecoilRoot>
      {/* 3. Bọc QueryClientProvider để truyền "trợ lý" xuống cho các component bên dưới xài */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
