import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema.ts';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => toast.success('Đăng nhập thành công!'),
      onError: () => toast.error('Sai email hoặc mật khẩu!'),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Đăng nhập</h2>
        <p className="text-slate-500 font-medium text-sm">Vui lòng điền thông tin để tiếp tục</p>
      </div>

      <div className="space-y-1">
        <Input label="Email của bạn" placeholder="VD: techstore@email.com" {...register('email')} error={errors.email?.message} />
        <Input
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>

      <div className="flex justify-end mb-6 mt-2">
        <span className="text-sm font-bold text-slate-400 hover:text-pastel-teal cursor-pointer transition-colors">
          Quên mật khẩu?
        </span>
      </div>

      <Button type="submit" isLoading={isLoading} className="py-3 text-base shadow-lg shadow-pastel-teal/20">
        Đăng nhập
      </Button>
    </form>
  );
}