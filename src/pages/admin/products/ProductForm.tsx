import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

// Import Schema và Type theo quy tắc import type
import { productSchema } from '../../../schemas/product.schema';
import type { ProductFormValues } from '../../../schemas/product.schema';
import type { Category } from '../../../types/category.type';
import axiosClient from '../../../lib/axiosClient';

// Import các UI Components
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import TextArea from '../../../components/TextArea';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<Category[]>([]);

  // 1. Khởi tạo React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      imageUrl: '',
      categoryId: 0,
      stock: 0,
    },
  });

  // 2. Tải dữ liệu danh mục và thông tin sản phẩm (nếu ở chế độ chỉnh sửa)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Lấy danh sách danh mục để hiển thị trong Select
        // Lưu ý: axiosClient đã được cấu hình trả về data trực tiếp
        const categoriesData = await axiosClient.get('/categories');
        setCategories(categoriesData as unknown as Category[]);

        if (isEditMode) {
          const productData = await axiosClient.get(`/products/${id}`);
          // Đổ dữ liệu vào form (reset sẽ map các field tương ứng)
          reset(productData as unknown as ProductFormValues);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu form:', error);
        toast.error('Không thể tải dữ liệu sản phẩm');
      }
    };

    fetchInitialData();
  }, [id, isEditMode, reset]);

  // 3. Xử lý gửi dữ liệu (Submit)
  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (isEditMode) {
        await axiosClient.put(`/products/${id}`, data);
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        await axiosClient.post('/products', data);
        toast.success('Thêm sản phẩm mới thành công!');
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Vui lòng điền đầy đủ thông tin sản phẩm vào các trường dưới đây.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hàng 1: Tên và Danh mục */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <Input
            label="Tên sản phẩm"
            placeholder="Ví dụ: iPhone 15 Pro Max"
            error={errors.name?.message}
            {...register('name')}
          />

          <Select
            label="Danh mục sản phẩm"
            error={errors.categoryId?.message}
            {...register('categoryId', { valueAsNumber: true })}
          >
            <option value={0} disabled>
              -- Chọn một danh mục --
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Hàng 2: Giá và Kho */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <Input
            label="Giá bán (VNĐ)"
            type="number"
            placeholder="Nhập giá sản phẩm"
            error={errors.price?.message}
            {...register('price', { valueAsNumber: true })}
          />

          <Input
            label="Số lượng trong kho"
            type="number"
            placeholder="Ví dụ: 50"
            error={errors.stock?.message}
            {...register('stock', { valueAsNumber: true })}
          />
        </div>

        {/* Hàng 3: URL Hình ảnh */}
        <Input
          label="Đường dẫn hình ảnh"
          placeholder="https://example.com/image.jpg"
          error={errors.imageUrl?.message}
          {...register('imageUrl')}
        />

        {/* Hàng 4: Mô tả */}
        <TextArea
          label="Mô tả chi tiết"
          placeholder="Nhập thông tin mô tả sản phẩm..."
          error={errors.description?.message}
          {...register('description')}
        />

        {/* Nút hành động */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition"
          >
            Hủy bỏ
          </button>

          <div className="w-44">
            <Button type="submit" isLoading={isSubmitting}>
              {isEditMode ? 'Cập nhật thay đổi' : 'Tạo sản phẩm'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
