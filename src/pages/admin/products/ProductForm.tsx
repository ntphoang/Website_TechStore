import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlineUpload, HiX } from 'react-icons/hi';

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

  const [previewImage, setPreviewImage] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', price: 0, description: '', imageUrl: '', categoryId: 0, stock: 0 },
    mode: 'onChange',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await axiosClient.get<any, Category[]>('/categories');
        setCategories(cats);
        if (isEditMode) {
          const prod = await axiosClient.get(`/products/${id}`);
          reset(prod as any);
          if ((prod as any).imageUrl) {
            setPreviewImage((prod as any).imageUrl);
          }
        }
      } catch (error) {
        toast.error('Lỗi tải dữ liệu');
      }
    };
    loadData();
  }, [id, isEditMode, reset]);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chỉ tải lên file hình ảnh');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Kích thước ảnh tối đa là 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewImage(base64String);
      setValue('imageUrl', base64String, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

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
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in duration-500">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-3 h-10 bg-pastel-teal rounded-full"></div>
        <h2 className="text-3xl font-black text-slate-800">
          {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Hình ảnh sản phẩm</h3>

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center w-full aspect-square rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                isDragging
                  ? 'border-pastel-teal bg-pastel-ice/50'
                  : 'border-slate-300 hover:border-pastel-teal bg-white hover:bg-slate-50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />

              {previewImage ? (
                <>
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold text-sm">Đổi ảnh khác</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage('');
                      setValue('imageUrl', '', { shouldValidate: true });
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <HiOutlineUpload className="w-6 h-6 text-slate-500" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">Nhấn hoặc kéo thả ảnh</p>
                  <p className="text-xs mt-1">PNG, JPG, WEBP (Max 2MB)</p>
                </div>
              )}
            </div>
            {errors.imageUrl && (
              <p className="text-red-500 text-xs mt-2 font-medium">{errors.imageUrl.message}</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <Input
              label="Giá bán (VNĐ)"
              type="number"
              {...register('price', { valueAsNumber: true })}
              error={errors.price?.message}
            />
            <Input
              label="Số lượng kho"
              type="number"
              {...register('stock', { valueAsNumber: true })}
              error={errors.stock?.message}
            />
          </div>

          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <TextArea
              label="Mô tả chi tiết"
              {...register('description')}
              error={errors.description?.message}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <div className="w-48">
              <Button
                type="submit"
                isLoading={isPending}
                className="py-3 shadow-lg shadow-pastel-teal/20"
              >
                {isEditMode ? 'Lưu thay đổi' : 'Hoàn tất thêm mới'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
