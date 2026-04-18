import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useStoreData } from '../hooks/useProduct';

import HomeHero from '../components/HomeHero';
import HomeFlashSale from '../components/HomeFlashSale'; // 1. IMPORT VÀO ĐÂY
import HomeProducts from '../components/HomeProducts';
import HomeMarketing from '../components/HomeMarketing';

const Home: React.FC = () => {
  const { data, isLoading, isError } = useStoreData();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  }

  if (isError || !data) {
    return <div className="text-center mt-20 text-red-500 font-bold">Không thể tải dữ liệu!</div>;
  }

  // Chia dữ liệu: 4 sản phẩm đầu cho Flash Sale, 8 sản phẩm tiếp theo cho Nổi bật
  const flashSaleProducts = data.products.slice(0, 4);
  const featuredProducts = data.products.slice(4, 12); // Lấy từ vị trí số 4 để không bị trùng

  return (
    <div className="animate-in fade-in duration-700 pb-20 overflow-hidden space-y-20">
      <HomeHero />
      
      {/* 2. CHÈN FLASH SALE VÀO ĐÂY */}
      <HomeFlashSale products={flashSaleProducts} />
      
      <HomeProducts products={featuredProducts} />
      
      <HomeMarketing />
    </div>
  );
};

export default Home;