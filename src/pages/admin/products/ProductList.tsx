import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import axiosClient from '../../../lib/axiosClient';
import type { Product } from '../../../types/product.type';
import type { Category } from '../../../types/category.type';

import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ConfirmModal from '../../../components/ConfirmModal';

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          axiosClient.get('/products'),
          axiosClient.get('/categories'),
        ]);
        setProducts(productsData as unknown as Product[]);
        setCategories(categoriesData as unknown as Category[]);
      } catch (error) {
        toast.error('Không thể tải danh sách sản phẩm');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Chưa phân loại';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const openDeleteModal = (id: number) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;
    try {
      setIsDeleting(true);
      await axiosClient.delete(`/products/${selectedProductId}`);
      setProducts(products.filter((p) => p.id !== selectedProductId));
      toast.success('Đã xóa sản phẩm thành công!');
    } catch (error) {
      toast.error('Không thể xóa sản phẩm này');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setSelectedProductId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pastel-ice rounded-2xl flex items-center justify-center text-pastel-teal font-black text-xl">
            {products.length}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Kho Sản Phẩm</h1>
            <p className="text-slate-500 text-sm mt-0.5 font-medium">
              Quản lý và cập nhật kho hàng
            </p>
          </div>
        </div>
        <div className="w-full sm:w-56">
          <Button
            onClick={() => navigate('/admin/products/add')}
            className="py-3 shadow-lg shadow-pastel-teal/20"
          >
            + Thêm sản phẩm mới
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-widest">
                <th className="px-8 py-5 font-bold">Hình ảnh</th>
                <th className="px-8 py-5 font-bold">Tên sản phẩm</th>
                <th className="px-8 py-5 font-bold">Danh mục</th>
                <th className="px-8 py-5 font-bold">Giá bán</th>
                <th className="px-8 py-5 font-bold">Kho</th>
                <th className="px-8 py-5 font-bold text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-50 rounded-full mb-4">
                      📦
                    </div>
                    <p className="text-lg font-bold text-slate-800">Chưa có sản phẩm nào</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Bấm nút "Thêm sản phẩm" phía trên để bắt đầu
                    </p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-pastel-ice/10 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-pastel-ice/30 p-2 group-hover:bg-pastel-ice/50 transition-colors">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover mix-blend-multiply rounded-xl"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <p className="font-bold text-slate-800 max-w-[200px] truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-400 font-medium mt-1">ID: #{product.id}</p>
                    </td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center rounded-lg bg-pastel-ice/50 px-3 py-1 text-xs font-bold text-pastel-teal">
                        {getCategoryName(product.categoryId)}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <span className="font-black text-slate-900">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      {product.stock > 0 ? (
                        <span className="font-bold text-slate-600">{product.stock}</span>
                      ) : (
                        <span className="inline-flex items-center rounded-lg bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
                          Hết hàng
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          className="px-4 py-2 bg-slate-50 text-slate-500 hover:bg-pastel-yellow hover:text-yellow-800 rounded-xl text-xs font-bold transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => openDeleteModal(product.id)}
                          className="px-4 py-2 bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-xl text-xs font-bold transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Xóa sản phẩm"
        message="Hành động này không thể hoàn tác. Sản phẩm sẽ bị xóa khỏi hệ thống hoàn toàn."
        confirmLabel="Xác nhận xóa"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleting}
        type="danger"
      />
    </div>
  );
}
