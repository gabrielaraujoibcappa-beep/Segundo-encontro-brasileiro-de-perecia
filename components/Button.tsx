
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center rounded-lg transition-all duration-300 focus:ring-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-800 shadow-lg shadow-purple-500/30',
    secondary: 'text-white bg-gray-700 hover:bg-gray-600 focus:ring-gray-600 border border-gray-600',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
      {...props}
    >
      {children}
    </button>
  );
};
