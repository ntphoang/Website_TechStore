import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'peach' | 'yellow' | 'ice' | 'mint' | 'teal';
  className?: string;
}

export default function Badge({ children, variant = 'mint', className = '' }: BadgeProps) {
  const variants = {
    peach: 'bg-pastel-peach text-amber-900',
    yellow: 'bg-pastel-yellow text-yellow-900',
    ice: 'bg-pastel-ice text-cyan-900',
    mint: 'bg-pastel-mint text-emerald-900',
    teal: 'bg-pastel-teal text-white',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
