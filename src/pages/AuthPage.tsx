import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { FaGoogle, FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-ice via-slate-50 to-pastel-peach/40 p-4">
      <div className="relative w-full max-w-[850px] h-[550px] bg-white rounded-3xl shadow-2xl shadow-pastel-teal/20 overflow-hidden flex">
        {/* KHU VỰC FORM */}
        <div
          className={`absolute top-0 w-full md:w-1/2 h-full p-8 sm:p-12 transition-all duration-700 ease-in-out z-10 bg-white ${
            isLogin ? 'right-0 md:translate-x-0' : 'right-0 md:translate-x-[-100%]'
          }`}
        >
          <div className="h-full flex flex-col justify-center animate-in fade-in duration-500">
            {isLogin ? <LoginForm /> : <RegisterForm />}

            {/* SOCIAL LOGIN */}
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
          </div>
        </div>

        {/* KHU VỰC PANEL TRƯỢT */}
        <div
          className={`hidden md:flex absolute top-0 w-1/2 h-full bg-pastel-teal text-white flex-col justify-center items-center text-center p-12 transition-all duration-700 ease-in-out z-20 ${
            isLogin ? 'left-0 translate-x-0' : 'left-0 translate-x-full'
          }`}
        >
          {/* Lớp trang trí Background chìm */}
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-pastel-mint/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 animate-in fade-in zoom-in duration-500 delay-200">
            {isLogin ? (
              <>
                <h2 className="text-4xl font-black mb-4">Xin chào!</h2>
                <p className="mb-8 text-pastel-ice font-medium leading-relaxed">
                  Bạn chưa có tài khoản? Hãy đăng ký ngay để trải nghiệm mua sắm công nghệ tuyệt vời
                  nhất.
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
                <p className="mb-8 text-pastel-ice font-medium leading-relaxed">
                  Bạn đã có tài khoản? Hãy đăng nhập để xem các ưu đãi và giỏ hàng của bạn.
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
      className={`w-12 h-12 flex items-center justify-center border-2 border-slate-100 rounded-2xl text-slate-400 cursor-pointer transition-all duration-300 ${hoverColor}`}
    >
      {icon}
    </div>
  );
}
