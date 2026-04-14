import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Import cấu hình API và các Type
import axiosClient from '../../../lib/axiosClient';
import type { Product } from '../../../types/product.type';
import type { Category } from '../../../types/category.type';

// Import các UI Components
import Button from '../../../components/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ConfirmModal from '../../../components/ConfirmModal';

export default function ProductList() {
  const navigate = useNavigate();

  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --- STATE QUẢN LÝ MODAL XÓA ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch dữ liệu khi trang vừa render
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Chạy song song 2 API để giảm thời gian chờ
        const [productsData, categoriesData] = await Promise.all([
          axiosClient.get('/products'),
          axiosClient.get('/categories'),
        ]);

        setProducts(productsData as Product[]);
        setCategories(categoriesData as Category[]);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        toast.error('Không thể tải danh sách sản phẩm');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Các hàm Helper xử lý hiển thị UI
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Chưa phân loại';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // 3. Logic Xóa sản phẩm
  const openDeleteModal = (id: number) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;

    try {
      setIsDeleting(true);
      // Gọi API xóa dữ liệu trên Server
      await axiosClient.delete(`/products/${selectedProductId}`);

      // Cập nhật lại UI bằng cách loại bỏ sản phẩm vừa xóa khỏi mảng
      setProducts(products.filter((p) => p.id !== selectedProductId));
      toast.success('Đã xóa sản phẩm thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      toast.error('Không thể xóa sản phẩm này');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setSelectedProductId(null);
    }
  };

  // --- RENDER GIAO DIỆN ---

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý sản phẩm</h1>
          <p className="text-slate-500 text-sm mt-1">
            Danh sách tất cả sản phẩm đang có trong hệ thống
          </p>
        </div>
        <div className="w-48">
          <Button onClick={() => navigate('/admin/products/add')}>+ Thêm sản phẩm mới</Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Hình ảnh</th>
                <th className="px-6 py-4 font-semibold">Tên sản phẩm</th>
                <th className="px-6 py-4 font-semibold">Danh mục</th>
                <th className="px-6 py-4 font-semibold">Giá</th>
                <th className="px-6 py-4 font-semibold">Kho</th>
                <th className="px-6 py-4 font-semibold text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <p className="text-lg font-medium">Chưa có sản phẩm nào</p>
                    <p className="text-sm mt-1">Hãy bấm "Thêm sản phẩm mới" để bắt đầu.</p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    {/* Ảnh */}
                    <td className="px-6 py-4">
                      <div className="h-12 w-12 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (
                              target.src !==
                              'https://img.freepik.com/vector-cao-cap/bieu-tuong-hinh-anh-loi_194117-662.jpg'
                            ) {
                              target.src =
                                'https://img.freepik.com/vector-cao-cap/bieu-tuong-hinh-anh-loi_194117-662.jpg';
                            }
                          }}
                        />
                      </div>
                    </td>
                    {/* Tên */}
                    <td className="px-6 py-4 font-medium text-slate-800 max-w-xs truncate">
                      {product.name}
                    </td>
                    {/* Danh mục */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-100">
                        {getCategoryName(product.categoryId)}
                      </span>
                    </td>
                    {/* Giá */}
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {formatPrice(product.price)}
                    </td>
                    {/* Kho */}
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className="font-medium text-slate-700">{product.stock}</span>
                      ) : (
                        <span className="text-red-500 font-medium">Hết hàng</span>
                      )}
                    </td>
                    {/* Nút hành động */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => openDeleteModal(product.id)}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors"
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

      {/* Modal Xác nhận Xóa */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Xác nhận xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này không? Dữ liệu sau khi xóa sẽ không thể khôi phục."
        confirmLabel="Xóa sản phẩm"
        cancelLabel="Đóng"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleting}
        type="danger"
      />
    </div>
  );
}
