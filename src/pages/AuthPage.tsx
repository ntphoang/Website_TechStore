import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { FaGoogle, FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="relative w-[850px] h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* FORM */}
        <div
          className={`absolute top-0 w-1/2 h-full p-10 transition-all duration-700 ${
            isLogin ? 'right-0' : 'right-1/2'
          }`}
        >
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* SOCIAL */}
          <p className="text-center mt-4">or continue with</p>
          <div className="flex justify-center gap-3 mt-3">
            <Icon icon={<FaGoogle />} />
            <Icon icon={<FaFacebookF />} />
            <Icon icon={<FaGithub />} />
            <Icon icon={<FaInstagram />} />
          </div>
        </div>

        {/* PANEL */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex flex-col justify-center items-center text-center p-10 transition-all duration-700 ${
            isLogin ? 'left-0' : 'left-1/2'
          }`}
        >
          {isLogin ? (
            <>
              <h2 className="text-2xl font-bold mb-3">Hello, Welcome!</h2>
              <p className="mb-4">Don't have an account?</p>
              <button onClick={() => setIsLogin(false)} className="border px-6 py-2 rounded-full">
                Register
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-3">Welcome Back!</h2>
              <p className="mb-4">Already have an account?</p>
              <button onClick={() => setIsLogin(true)} className="border px-6 py-2 rounded-full">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Icon({ icon }: any) {
  return (
    <div className="w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer hover:bg-gray-100">
      {icon}
    </div>
  );
}
