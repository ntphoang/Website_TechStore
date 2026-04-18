import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

import type { LoginFormData, RegisterFormData } from '../schemas/auth.schema';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const { login, isLoginLoading, register: registerAuth, isRegisterLoading } = useAuth();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = (data: LoginFormData) => login(data);

  const onRegister = (data: RegisterFormData) => {
    const { confirmPassword, ...submitData } = data;
    registerAuth(submitData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-ice via-slate-50 to-pastel-peach/40 p-4">
      <div className="relative w-full max-w-[850px] min-h-[650px] bg-white rounded-3xl shadow-2xl shadow-pastel-teal/20 overflow-hidden flex">
        {/* FORM AREA */}
        <div
          className={`absolute top-0 w-full md:w-1/2 h-full p-8 sm:p-12 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 bg-white ${
            isLogin
              ? 'right-0 md:translate-x-0 opacity-100'
              : 'right-0 md:-translate-x-full opacity-100'
          }`}
        >
          <div className="h-full flex flex-col justify-center">
            {isLogin ? (
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4 animate-fade">
                <h2 className="text-3xl font-black text-slate-800 mb-6">Đăng nhập</h2>

                <Input
                  label="Email"
                  placeholder="techstore@email.com"
                  {...registerLogin('email')}
                  error={loginErrors.email?.message}
                />

                <Input
                  label="Mật khẩu"
                  type="password"
                  placeholder="••••••••"
                  {...registerLogin('password')}
                  error={loginErrors.password?.message}
                />

                {/* NÚT CHÍNH */}
                <Button
                  type="submit"
                  className="w-full py-4 text-base mt-2 bg-pastel-teal hover:bg-[#326e6e] shadow-lg shadow-pastel-teal/30"
                  isLoading={isLoginLoading}
                >
                  Đăng nhập
                </Button>

                {/* NÚT TRANG CHỦ NHẠT HƠN */}
                <Link
                  to="/"
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 text-slate-500 font-semibold hover:bg-slate-200 hover:text-slate-700 transition-all duration-300"
                >
                  <HiOutlineArrowNarrowLeft className="w-5 h-5" />
                  Quay về trang chủ
                </Link>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit(onRegister)} className="space-y-3 animate-fade">
                <h2 className="text-3xl font-black text-slate-800 mb-6">Đăng ký</h2>

                <Input
                  label="Họ và tên"
                  placeholder="Nguyễn Văn A"
                  {...registerSignup('name')}
                  error={signupErrors.name?.message}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    placeholder="abc@email.com"
                    {...registerSignup('email')}
                    error={signupErrors.email?.message}
                  />

                  <Input
                    label="Số điện thoại"
                    placeholder="090..."
                    {...registerSignup('phone')}
                    error={signupErrors.phone?.message}
                  />
                </div>

                <Input
                  label="Mật khẩu"
                  type="password"
                  placeholder="••••••••"
                  {...registerSignup('password')}
                  error={signupErrors.password?.message}
                />

                <Input
                  label="Xác nhận mật khẩu"
                  type="password"
                  placeholder="••••••••"
                  {...registerSignup('confirmPassword')}
                  error={signupErrors.confirmPassword?.message}
                />

                {/* NÚT CHÍNH */}
                <Button
                  type="submit"
                  className="border-2 border-white/50 hover:border-white hover:bg-white hover:text-pastel-teal px-10 py-3 rounded-2xl font-bold transition-all duration-300"
                  isLoading={isRegisterLoading}
                >
                  Đăng ký ngay
                </Button>

                {/* NÚT TRANG CHỦ NHẠT */}
                <Link
                  to="/"
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 text-slate-500 font-semibold hover:bg-slate-200 hover:text-slate-700 transition-all duration-300"
                >
                  <HiOutlineArrowNarrowLeft className="w-5 h-5" />
                  Quay về trang chủ
                </Link>
              </form>
            )}

            {/* SOCIAL */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-400 font-medium">
                    Hoặc tiếp tục với
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Icon
                  icon={<FaGoogle />}
                  hoverColor="hover:text-red-500 hover:border-red-200 hover:bg-red-50"
                />
                <Icon
                  icon={<FaFacebookF />}
                  hoverColor="hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50"
                />
                <Icon
                  icon={<FaGithub />}
                  hoverColor="hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                />
                <Icon
                  icon={<FaInstagram />}
                  hoverColor="hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50"
                />
              </div>
            </div>

            {/* MOBILE SWITCH */}
            <div className="mt-6 text-center text-sm font-bold text-slate-500 md:hidden">
              {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-pastel-teal hover:underline ml-1"
              >
                {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </div>
          </div>
        </div>

        {/* SLIDING PANEL */}
        <div
          className={`hidden md:flex absolute top-0 w-1/2 h-full bg-pastel-teal text-white flex-col justify-center items-center text-center p-12 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] z-20 ${
            isLogin ? 'left-0 translate-x-0' : 'left-0 translate-x-full'
          }`}
        >
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-pastel-mint/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 transition-all duration-700">
            {isLogin ? (
              <>
                <h2 className="text-4xl font-black mb-4">Xin chào!</h2>
                <p className="mb-8 text-pastel-ice font-medium leading-relaxed max-w-sm">
                  Bạn chưa có tài khoản? Hãy đăng ký ngay để trải nghiệm mua sắm tuyệt vời nhất.
                </p>

                <button
                  onClick={() => setIsLogin(false)}
                  className="border-2 border-white/50 hover:border-white hover:bg-white hover:text-pastel-teal px-10 py-3 rounded-2xl font-bold transition-all duration-300"
                >
                  Tạo tài khoản
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-black mb-4">Mừng trở lại!</h2>
                <p className="mb-8 text-pastel-ice font-medium leading-relaxed max-w-sm">
                  Bạn đã có tài khoản? Hãy đăng nhập để tiếp tục.
                </p>

                <button
                  onClick={() => setIsLogin(true)}
                  className="border-2 border-white/50 hover:border-white hover:bg-white hover:text-pastel-teal px-10 py-3 rounded-2xl font-bold transition-all duration-300"
                >
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon({ icon, hoverColor }: { icon: React.ReactNode; hoverColor: string }) {
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center border-2 border-slate-100 rounded-2xl text-slate-400 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${hoverColor}`}
    >
      {icon}
    </div>
  );
}
