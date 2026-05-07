import React from 'react';

const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClass = "btn-gradient px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 shadow-lg shadow-primary/20";
  
  return (
    <button 
      className={`${baseClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
