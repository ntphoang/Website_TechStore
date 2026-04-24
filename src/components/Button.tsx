import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export default function Button({ children, isLoading, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed bg-pastel-teal hover:bg-[#326e6e] ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Đang xử lý...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
