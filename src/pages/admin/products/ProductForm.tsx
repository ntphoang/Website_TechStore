import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { productSchema, type ProductFormValues } from '../../../schemas/product.schema';
import { type Category } from '../../../types';
import axiosClient from '../../../lib/axiosClient';
import { useProductMutation } from '../../../hooks/useProduct';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import TextArea from '../../../components/TextArea';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [categories, setCategories] = useState<Category[]>([]);
  const { create, update, isPending } = useProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', price: 0, description: '', imageUrl: '', categoryId: 0, stock: 0 },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await axiosClient.get<any, Category[]>('/categories');
        setCategories(cats);
        if (isEditMode) {
          const prod = await axiosClient.get(`/products/${id}`);
          reset(prod as any);
        }
      } catch (error) {
        toast.error('Lỗi tải dữ liệu');
      }
    };
    loadData();
  }, [id, isEditMode, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (isEditMode) {
        await update({ id: id!, data });
      } else {
        await create(data);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in duration-500">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-3 h-10 bg-pastel-teal rounded-full"></div>
        <h2 className="text-3xl font-black text-slate-800">
          {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl">
          <Input label="Tên sản phẩm" {...register('name')} error={errors.name?.message} />
          <Select
            label="Danh mục"
            {...register('categoryId', { valueAsNumber: true })}
            error={errors.categoryId?.message}
          >
            <option value={0} disabled>
              -- Chọn danh mục --
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl">
          <Input
            label="Giá bán (VNĐ)"
            type="number"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
          />
          <Input
            label="Kho"
            type="number"
            {...register('stock', { valueAsNumber: true })}
            error={errors.stock?.message}
          />
        </div>

        <div className="bg-slate-50/50 p-6 rounded-2xl space-y-4">
          <Input label="URL Hình ảnh" {...register('imageUrl')} error={errors.imageUrl?.message} />
          <TextArea
            label="Mô tả"
            {...register('description')}
            error={errors.description?.message}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-slate-500 font-bold"
          >
            Hủy
          </button>
          <div className="w-48">
            <Button type="submit" isLoading={isPending}>
              {isEditMode ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
