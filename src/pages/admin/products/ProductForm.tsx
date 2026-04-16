import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { productSchema } from '../../../schemas/product.schema';
import type { ProductFormValues } from '../../../schemas/product.schema';
import type { Category } from '../../../types/category.type';
import axiosClient from '../../../lib/axiosClient';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import TextArea from '../../../components/TextArea';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await axiosClient.get('/categories');
        setCategories(categoriesData as unknown as Category[]);

        if (isEditMode) {
          const productData = await axiosClient.get(`/products/${id}`);
          reset(productData as unknown as ProductFormValues);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu form:', error);
        toast.error('Không thể tải dữ liệu sản phẩm');
      }
    };

    fetchInitialData();
  }, [id, isEditMode, reset]);

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
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-3 h-10 bg-pastel-teal rounded-full"></div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">
            {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">
            Điền đầy đủ các thông tin bên dưới để đưa sản phẩm lên kệ.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hàng 1: Tên & Danh mục */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 bg-slate-50/50 p-6 rounded-2xl">
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

        {/* Hàng 2: Giá bán & Số lượng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 bg-slate-50/50 p-6 rounded-2xl">
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

        {/* Hàng 3: Hình ảnh & Mô tả */}
        <div className="bg-slate-50/50 p-6 rounded-2xl space-y-4">
          <Input
            label="Đường dẫn hình ảnh"
            placeholder="https://example.com/image.jpg"
            error={errors.imageUrl?.message}
            {...register('imageUrl')}
          />

          {/* Component TextArea đã được thêm vào đây */}
          <TextArea
            label="Mô tả chi tiết"
            placeholder="Nhập thông tin mô tả cấu hình, tính năng nổi bật của sản phẩm..."
            error={errors.description?.message}
            {...register('description')}
          />
        </div>

        {/* Nút hành động */}
        <div className="flex items-center justify-end gap-4 pt-8">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Hủy bỏ
          </button>

          <div className="w-56">
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="py-3 shadow-lg shadow-pastel-teal/20"
            >
              {isEditMode ? 'Cập nhật thay đổi' : 'Tạo sản phẩm'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
